/* eslint-disable no-loop-func */
const ReactHtmlParser = require("react-html-parser")
const path = require("path")
const fs = require("fs")

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql }) => {
  return graphql(`
    {
      drupal {
        availableLanguages {
          name
          prefix
          id
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Adds RemoteImageSourceSet type, which is used to fetch
  // the Drupal generated image sizes (replacing Gatsby Image generation at
  // build time)
  const typeDefs = `
    type RemoteImageSourceSet implements Node @dontInfer {
      originalImage: File
      sources: [RemoteImageSource]
    }
    type RemoteImageSource {
      imageData: File
      optimizedImageData: File
      width: String
    }
  `
  createTypes(typeDefs)
}

exports.createResolvers = ({ actions, getCache, createNodeId, createResolvers }) => {
  const { createNode } = actions
  const filenameRegex = RegExp(/([^/]+)(?=\.\w+$)/)

  const createInlineImages = (source) => {
    const getImageFromHtmlNodeRecursively = (htmlNode) => {
      if (!htmlNode || !htmlNode.props) {
        return null
      }

      if (htmlNode.type === "img") {
        return htmlNode.props.src
      }
      // TODO
      // Hamza to Ask OH about this code
      // if (htmlNode.props.children) {
      //   return htmlNode.props.children
      //     .filter((item) => typeof item === "object" && item !== null)
      //     .map((element) => {
      //       return getImageFromHtmlNodeRecursively(element)
      //     })
      //     .filter((item) => item && item.length !== 0)
      //     .filter((item) => item)
      //     .toString()
      // }
      return null
    }
    const inlineImagesFields = ReactHtmlParser.default(source)
    const inlineImages = inlineImagesFields
      .map((htmlnode) => {
        return getImageFromHtmlNodeRecursively(htmlnode)
      })
      .filter((htmlnode) => {
        return htmlnode != null && htmlnode !== ""
      })
    if (inlineImages.length < 1) {
      return null
    }

    return (
      inlineImages.map((inlineImage) => {
        let imageUrl = process.env.GATSBY_DRUPAL_URL + inlineImage
        if (inlineImage.startsWith("https://")) {
          imageUrl = inlineImage
        }
        const fileNode = createRemoteFileNode({
          url: imageUrl,
          getCache,
          createNode,
          createNodeId,
        }).catch((err) => {
          throw err
        })
        return fileNode
      }) || []
    )
  }

  const svgResolver = {
    image: {
      type: "File",
      resolve: (source) => {
        if (!source?.entity?.url?.endsWith("svg")) {
          return null
        }

        return createRemoteFileNode({
          url: source?.entity?.url,
          getCache,
          createNode,
          createNodeId,
          httpHeaders: {
            Authorization: `Basic ${process.env.DRUPAL_AUTH_TOKEN}`,
          },
          name: source.entity.filename.split(".")[0],
        }).catch((err) => {
          console.log(source.entity.url)
          console.log("caught error:", err)
        })
      },
    },
  }

  // Resolver that adds fetches the Drupal generated image sizes
  const remoteSourceImageResolver = (source) => {
    const url = source?.fieldMediaImage?.url || source?.thumbnail?.url
    if (!url) {
      return null
    }

    // Fetches the original image. Since we are registering it as remote
    // file node, Gatsby Images are still available in the schema, but they
    // will not get generated unless we query them
    const node = {
      originalImage: createRemoteFileNode({
        url: url?.split("?")[0],
        getCache,
        createNode,
        createNodeId,
        name: filenameRegex?.exec(decodeURI(url))[0],
      }).catch((err) => {
        console.log("caught error:", err)
      }),
      sources: null,
    }

    // Svgs do not need to be resized, so we return the object
    // without the sources field
    if (url.includes(".svg")) {
      return node
    }
    // Function that registers the different generated sizes as remote file nodes
    // Registering them is needed to download the images at build time
    // Drupal returns a string with the URLs for the different sizes, so we
    // split them and iterate over them
    node.sources =
      source?.fieldMediaImage?.ResponsiveImageStructured?.sources[0].srcset
        ?.split(",")
        .map((item) => {
          const sourceUrl = item.split(" ").find((str) => str.startsWith("/"))

          // The string returns relative paths, so we append the Drupal URL.
          // We use the media id as the file name
          const completeUrl = `${process.env.GATSBY_DRUPAL_URL}${sourceUrl}`
          const fileNode = createRemoteFileNode({
            url: completeUrl,
            getCache,
            createNode,
            createNodeId,
            name: `${source?.mid}`,
          }).catch((err) => {
            console.log("caught error:", err)
          })

          // Drupal can serve png and jpg images in WebP format.
          // If the image has this format, we fetch the .webp image
          // and add it in the optimized image data field
          let optimizedFileNode
          const formatExtensionRegex = /\.(png|jpg|jpeg)/i

          if (completeUrl.match(formatExtensionRegex)) {
            optimizedFileNode = createRemoteFileNode({
              url: completeUrl.replace(formatExtensionRegex, ".webp"),
              getCache,
              createNode,
              createNodeId,
              name: `${source?.mid}`,
            }).catch((err) => {
              console.log("caught error:", err)
            })
          }

          // The original string also includes the width of the image, which
          // will be used to determine what image to use in at which viewport size
          const imageWidth = item.split(" ").find((str) => str.match(/^\d/))

          return {
            imageData: fileNode,
            optimizedImageData: optimizedFileNode,
            width: item.split(" ").find((str) => str.match(/^\d/)),
          }
        })

    return node
  }

  const resolvers = {
    Drupal_FieldSiteSettingEntityHeaderLogosFieldMobileImage: svgResolver,
    Drupal_FieldSiteSettingEntityHeaderLogosFieldDesktopImage: svgResolver,
    Drupal_MediaImage: {
      remoteSourceSet: {
        type: `RemoteImageSourceSet`,
        resolve: remoteSourceImageResolver,
      },
      gatsbyImageFile: {
        type: `File`,
        resolve(source) {
          return createRemoteFileNode({
            url:
              source?.fieldMediaImage?.derivative?.url?.split("?")[0] ||
              source?.fieldMediaImage?.url?.split("?")[0],
            getCache,
            createNode,
            createNodeId,
            httpHeaders: {
              Authorization: `Basic ${process.env.DRUPAL_AUTH_TOKEN}`,
            },
            name: filenameRegex?.exec(decodeURI(source?.fieldMediaImage?.url))[0],
          }).catch((err) => {
            console.log("caught error:", err)
          })
        },
      },
      placeholderRatio: {
        type: `Float`,
        async resolve(source) {
          const { fieldMediaImage } = source
          if (
            fieldMediaImage &&
            typeof fieldMediaImage.height === "number" &&
            typeof fieldMediaImage.width === "number" &&
            fieldMediaImage.width !== 0
          ) {
            return (fieldMediaImage.height / fieldMediaImage.width) * 100
          }
          return null
        },
      },
    },
    Drupal_MediaVideo: {
      remoteSourceSet: {
        type: `RemoteImageSourceSet`,
        resolve: remoteSourceImageResolver,
      },
      gatsbyImageFile: {
        type: `File`,
        resolve(source) {
          if (!source?.fieldMediaImage) return
          return createRemoteFileNode({
            url: source?.fieldMediaImage
              ? source?.fieldMediaImage?.derivative?.url?.split("?")[0] ||
                source?.fieldMediaImage?.url?.split("?")[0]
              : "",
            getCache,
            createNode,
            createNodeId,
            httpHeaders: {
              Authorization: `Basic ${process.env.DRUPAL_AUTH_TOKEN}`,
            },
            name:
              source?.fieldMediaImage &&
              filenameRegex?.exec(source?.fieldMediaImage?.url?.replace("%", ""))[0],
          }).catch((err) => {
            console.log(source.fieldMediaImage)
            console.log("caught error:", err)
          })
        },
      },
    },
    Drupal_MediaRemoteVideo: {
      remoteSourceSet: {
        type: `RemoteImageSourceSet`,
        resolve: remoteSourceImageResolver,
      },
      gatsbyImageFile: {
        type: `File`,
        resolve(source) {
          return createRemoteFileNode({
            url:
              source?.fieldMediaImage?.derivative?.url?.split("?")[0] ||
              source?.fieldMediaImage?.url?.split("?")[0] ||
              source?.thumbnail?.url?.split("?")[0],
            getCache,
            createNode,
            createNodeId,
            httpHeaders: {
              Authorization: `Basic ${process.env.DRUPAL_AUTH_TOKEN}`,
            },
            name: filenameRegex.exec(source?.thumbnail?.url?.replace("%", ""))[0],
          }).catch((err) => {
            console.log(source.thumbnail)
            console.log("caught error:", err)
          })
        },
      },
      videoEmbedSrc: {
        type: `String`,
        resolve(source) {
          const videoUrl = source.fieldMediaOembedVideo

          if (videoUrl.includes("youtube")) {
            return videoUrl.replace("watch?v=", "embed/")
          }

          if (
            videoUrl.includes("vimeo") &&
            !videoUrl.includes("player.vimeo.com/video/")
          ) {
            return videoUrl.replace("vimeo.com/", "player.vimeo.com/video/")
          }

          return videoUrl
        },
      },
    },
    Drupal_MediaLottieFile: {
      lottieFile: {
        type: `File`,
        resolve(source) {
          return createRemoteFileNode({
            url: source.fieldMediaLottieFile?.entity?.url,
            getCache,
            createNode,
            createNodeId,
            httpHeaders: {
              Authorization: `Basic ${process.env.DRUPAL_AUTH_TOKEN}`,
            },
            name: source.name.replace(" ", "_").replace("%", ""),
          }).catch((err) => {
            console.log(source.fieldMediaLottieFile)
            console.log("caught error:", err)
          })
        },
      },
      placeholderRatio: {
        type: `Float`,
        async resolve(source) {
          const ratio = await fetch(source?.fieldMediaLottieFile?.entity?.url)
            .then((response) => {
              return response.json()
            })
            .then((data) => {
              return (data.h / data.w) * 100
            })
          return ratio
        },
      },
    },
    Drupal_NodeUser: {
      avatarImage: {
        type: `File`,
        resolve(source) {
          if (!source.fieldAvatar) {
            return null
          }
          return createRemoteFileNode({
            url: source?.fieldAvatar,
            getCache,
            createNode,
            createNodeId,
            name: source.title,
          }).catch((err) => {
            console.log(source.fieldAvatar)
            console.log("caught error:", err)
          })
        },
      },
    },
    Drupal_FieldNodeResourceFieldCustomHeaderLogos: {
      gatsbyFile: {
        type: "File",
        resolve: (source) => {
          if (!source?.entity?.url?.match(/\.(png|svg|jpe?g|gif)$/)) {
            return null
          }

          return createRemoteFileNode({
            url: source?.entity?.url,
            getCache,
            createNode,
            createNodeId,
            httpHeaders: {
              Authorization: `Basic ${process.env.DRUPAL_AUTH_TOKEN}`,
            },
            name: source.description,
          }).catch((err) => {
            console.log(source.entity.url)
            console.log("caught error:", err)
          })
        },
      },
    },
    Drupal_ParagraphPromotion: {
      inlineImages: {
        type: `[File]`,
        resolve(source) {
          if (!source.fieldBody || !source.fieldBody.value) {
            return null
          }
          const inlineimgs = createInlineImages(source.fieldBody.value)
          return inlineimgs
        },
      },
    },
  }

  createResolvers(resolvers)
}

const copyDirectory = (source, destination, directoryWhitelist = []) => {
  if (fs.existsSync(destination)) {
    fs.rmSync(destination, { recursive: true })
  }

  fs.mkdirSync(destination, { recursive: true })

  fs.readdirSync(source, { withFileTypes: true }).forEach((entry) => {
    const sourcePath = path.join(source, entry.name)
    const destinationPath = path.join(destination, entry.name)

    // eslint-disable-next-line no-unused-expressions
    if (!entry.isDirectory() && !entry.name.endsWith(".html")) {
      fs.copyFileSync(sourcePath, destinationPath)
      return
    }

    if (directoryWhitelist.includes(entry.name) || directoryWhitelist.length === 0) {
      copyDirectory(sourcePath, destinationPath)
    }
  })
}

const assetPrefix = process.env.GATSBY_ASSET_PREFIX

exports.onPostBuild = (_, config) => {
  if (!assetPrefix) {
    console.log("Skipped onPostBuild because GATSBY_ASSET_PREFIX is not set")
    return
  }

  console.log("Started onpostbuild")
  const assetDirectories = ["page-data", "data", "icons", "static", "sitemap"]
  const sourceDir = path.join(config.root, "public")
  const outputDir = path.join(sourceDir, assetPrefix)

  copyDirectory(sourceDir, outputDir, assetDirectories)

  console.log("Finished onpostbuild")
}
