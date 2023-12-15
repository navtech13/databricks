/* eslint-disable no-loop-func */
const path = require("path")
const fs = require("fs")
const ReactHtmlParser = require("html-react-parser")

console.log("blog legacy  package")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const pageList = ["index.js", "404.js"]

const web = process.env.web || "blog-legacy"

function copyDirectory(source, destination) {
  if (fs.existsSync(destination)) {
    fs.rmSync(destination, { recursive: true })
  }
  fs.mkdirSync(destination, { recursive: true })

  fs.readdirSync(source, { withFileTypes: true }).forEach((entry) => {
    const sourcePath = path.join(source, entry.name)
    const destinationPath = path.join(destination, entry.name)

    // eslint-disable-next-line no-unused-expressions
    entry.isDirectory()
      ? copyDirectory(sourcePath, destinationPath)
      : fs.copyFileSync(sourcePath, destinationPath)
  })
}

function deleteFiles(from) {
  fs.readdirSync(from, { withFileTypes: true }).forEach((entry) => {
    const sourcePath = path.join(from, entry.name)

    if (entry.isFile()) {
      fs.rmSync(sourcePath, { recursive: true })
    } else {
      console.log("skipping folder", sourcePath)
    }
  })
}

exports.onPostBuild = () => {
  console.log("started onpostbuild")
  const outputDir = `${web}-assets`
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true })
  }
  if (fs.existsSync(`./public/${outputDir}`)) {
    fs.rmSync(`./public/${outputDir}`, { recursive: true })
  }
  copyDirectory("./public", outputDir)

  copyDirectory(outputDir, `./public/${outputDir}`)

  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true })
  }

  deleteFiles(`./public/`)
  console.log("finished onpostbuild")
}

exports.onPreInit = () => {
  console.log("building blog pages")
}

const postFragment = `title
id: entityId
vid: vid
entityCreated(format: "F j, Y")
isoDate: entityCreated
entityUrl {
  path
}
entityTranslations {
  entityLanguage {
    id
  }
  entityUrl {
    path
  }
}
fieldAuthors {
  entity {
    ... on Drupal_NodeUser {
      fieldSlug
      entityId
      name: entityLabel
      fieldAvatar
      entityUrl {
        path
      }
      fieldMedia {
        entity {
          ... on Drupal_MediaImage {
            fieldMediaImage {
              url
              alt
            }
          }
        }
      }
    }
  }
}
body {
  teaser:viewModeFieldFormatter(mode:TEASER)
}
fieldCategories {
  entity {
    ... on Drupal_TaxonomyTermCategories {
      tid
      name
      fieldSlug
      entityUrl {
        path
      }
      parent {
        entity {
          ... on Drupal_TaxonomyTermCategories {
            name
            fieldSlug
          }
        }
      }
    }
  }
}`

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const languageLimit = process.env.GATSBY_QUERY_LIMIT_LANGUAGE || "en"
  const dateLimit = process.env.GATSBY_QUERY_LIMIT_DATE || "1672531200" // Date and time (GMT): Sunday, January 1, 2023 12:00:00 AM

  const [availableLanguages, blogNodeCount] = await graphql(`
    {
      drupal {
        availableLanguages {
          name
          prefix
          id
          isDefault
        }
        nodeQuery(
          sort: { field: "created", direction: DESC }
          filter: {
            conditions: [
              { operator: EQUAL, field: "type", value: ["post"] }
              { operator: EQUAL, field: "status", value: ["1"] }
              { operator: EQUAL, field: "langcode", value: "en" }
            ]
          }
        ) {
          count
        }
      }
    }
  `).then((result) => [
    result.data.drupal.availableLanguages.filter(
      (language) => language.id === languageLimit || language.isDefault
    ),
    result.data.drupal.nodeQuery.count,
  ])

  const blogPages = {}

  let defaultLanguage = "en"

  const batchSize = Number.parseInt(process.env.GATSBY_BLOG_BATCH_SIZE || 3, 10) // This is the limit for the number of nodes that can be queried at once.
  const blogLimit = Number.parseInt(
    process.env.GATSBY_QUERY_LIMIT || blogNodeCount,
    10
  )

  let status = '["1"]'
  let revision = "DEFAULT"
  if (process.env.IS_STAGING === "true" || process.env.NODE_ENV !== "production") {
    status = '["0", "1"]'
    revision = "LATEST"
  }

  for (let i = 0; i < blogLimit; i += batchSize) {
    /* eslint-disable no-await-in-loop */
    await Promise.all(
      availableLanguages.map(async ({ id, isDefault }) => {
        if (languageLimit === id || isDefault) {
          if (isDefault) {
            defaultLanguage = id
          }
          if (!blogPages[id]) {
            blogPages[id] = []
          }

          blogPages[id] = [
            ...blogPages[id],
            ...(await graphql(`
          {
            drupal {
              blogPages: nodeQuery(
                revisions: ${revision}
                sort: { field: "created", direction: DESC, language: ${defaultLanguage.toUpperCase()} }
                filter: {
                  conditions: [
                    { operator: EQUAL, field: "type", value: ["post"] }
                    {operator: IN, field: "status", value: ${status}}
                    { operator: EQUAL, field: "langcode", value: "${defaultLanguage}" }
                    { operator: SMALLER_THAN, field: "created", value: ["${dateLimit}"] }
                  ]
                }
                limit: ${batchSize}
                offset: ${i}
              ) {
                entities(language: ${id.toUpperCase().replace(/-/g, "_")}) {
                  ... on Drupal_NodePost {
                    ${postFragment}
                  }
                }
              }
            }
          }`).then((result) => {
              return result.data.drupal.blogPages.entities
            })),
          ]
        }
      })
    )
  }

  return graphql(`
    {
      drupal {
        availableLanguages {
          name
          prefix
          id
        }
        redirects: redirectQuery {
          entities {
            ... on Drupal_RedirectRedirect {
              redirect: redirectRedirect {
                url {
                  path
                }
              }
              source: redirectSource {
                path
              }
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors
    }

    const createLanguagePages = (
      pathAlias,
      pathAliasTranslations,
      template,
      id,
      vid
    ) => {
      availableLanguages.forEach((language) => {
        if (language.id === languageLimit) {
          const prefix = language.prefix.length ? `/${language.prefix}` : ""

          const translatedPath = pathAliasTranslations.find(
            (translation) => translation?.entityLanguage?.id === language.id
          )

          const nodePath = translatedPath
            ? translatedPath.entityUrl.path
            : `${prefix}${pathAlias}`

          createPage({
            path: nodePath,
            component: path.resolve(
              `../../packages/gatsby-theme-databricks-drupal/src/templates/${template}`
            ),
            context: {
              langPrefix: prefix,
              language: language.id.toUpperCase().replace(/-/g, "_"),
              ...(id && { id }),
              ...(vid && { vid }),
              pathAliasTranslations,
            },
          })
        }
      })
    }

    // Create static pages
    fs.readdirSync(
      `../../packages/gatsby-theme-databricks-drupal/src/templates/pages/`
    ).forEach((file) => {
      if (!file.includes(".js") || !pageList.includes(file)) {
        return
      }
      const pagePath = file.replace(".js", "")
      createLanguagePages(
        `/${pagePath === "index" ? "" : pagePath}`,
        [],
        `/pages/${file}`
      )
    })

    // Create redirects

    const allRedirects = {}
    result.data.drupal.redirects.entities.forEach((element) => {
      if (!element.redirect?.url?.path) {
        return
      }
      if (!allRedirects[element.redirect.url.path]) {
        allRedirects[element.redirect.url.path] = []
      }
      allRedirects[element.redirect.url.path].push(element.source.path)
    })

    const handleRedirectCreation = (destination, redirects) => {
      redirects.forEach((redirect) => {
        createRedirect({
          fromPath: `/${redirect}`,
          toPath: destination,
          isPermanent: true,
          redirectInBrowser: true,
        })
      })
    }

    // Create blog post pages.
    const defaultBlogPages = blogPages[defaultLanguage]

    if (defaultBlogPages) {
      defaultBlogPages.forEach((blogPage) => {
        const revisionId = `${blogPage.vid}`

        const pathAlias = blogPage.entityUrl.path
        const pathAliasTranslations = blogPage.entityTranslations
        createLanguagePages(
          pathAlias,
          pathAliasTranslations,
          "blogDetail.js",
          blogPage.id,
          revisionId
        )
        if (allRedirects[pathAlias]) {
          handleRedirectCreation(pathAlias, allRedirects[pathAlias])
        }
      })
    }
  })
}

exports.createResolvers = ({ actions, getCache, createNodeId, createResolvers }) => {
  const { createNode } = actions
  const filenameRegex = RegExp(/([^/]+)(?=\.\w+$)/)

  const createInlineImages = (source) => {
    const images = []

    // eslint-disable-next-line consistent-return
    const getInlineImage = (htmlNode) => {
      // Stop search if no node was found
      if (!htmlNode || !htmlNode.props) {
        return null
      }

      // If image was found, push src to images array
      if (htmlNode.type === "img") {
        images.push(htmlNode.props.src)
      }

      // Handle case when children is array
      if (htmlNode.props.children && Array.isArray(htmlNode.props.children)) {
        htmlNode.props.children.forEach((child) => {
          // Repeat process for each child
          getInlineImage(child)
        })
      }

      // handle case when children is object and not array
      if (
        htmlNode.props.children &&
        !Array.isArray(htmlNode.props.children) &&
        htmlNode.props.children.props
      ) {
        // Repeat process for only child
        getInlineImage(htmlNode.props.children)
      }
    }

    const inlineImagesFields = ReactHtmlParser.default(source)
    inlineImagesFields.forEach((htmlNode) => {
      getInlineImage(htmlNode)
    })

    if (images.length < 1) {
      return null
    }

    return (
      images.map((inlineImage) => {
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
        if (!source.entity.url.endsWith("svg")) {
          return null
        }

        return createRemoteFileNode({
          url: source.entity.url,
          getCache,
          createNode,
          createNodeId,
          httpHeaders: {
            Authorization: `Basic ${process.env.DRUPAL_AUTH_TOKEN}`,
          },
          name: source.entity.filename.split(".")[0],
        }).catch((err) => {
          console.log("caught error:", err)
        })
      },
    },
  }

  const resolvers = {
    Drupal_FieldSiteSettingEntityHeaderLogosFieldMobileImage: svgResolver,
    Drupal_FieldSiteSettingEntityHeaderLogosFieldDesktopImage: svgResolver,
    Drupal_MediaImage: {
      gatsbyImageFile: {
        type: `File`,
        resolve(source) {
          return createRemoteFileNode({
            url:
              source.fieldMediaImage.derivative?.url.split("?")[0] ||
              source.fieldMediaImage.url.split("?")[0],
            getCache,
            createNode,
            createNodeId,
            httpHeaders: {
              Authorization: `Basic ${process.env.DRUPAL_AUTH_TOKEN}`,
            },
            name: filenameRegex.exec(source.fieldMediaImage.url.replace("%", ""))[0],
          }).catch((err) => {
            console.log("caught error:", err)
          })
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
            url: source.fieldAvatar,
            getCache,
            createNode,
            createNodeId,
            name: source.title,
          }).catch((err) => {
            console.log("caught error:", err)
          })
        },
      },
    },
    Drupal_NodePost: {
      inlineSnippets: {
        type: `[String]`,
        resolve(source) {
          if (!source.body || !source.body.value) {
            return null
          }

          const getSnippetFromHtmlNode = (htmlNode) => {
            if (!htmlNode?.props) {
              return null
            }

            // TODO
            // Hamza to ask OH
            if (htmlNode.type === "pre" && htmlNode.props.children) {
              return htmlNode.props.children.toString()
            }

            return null
          }

          const parsedBody = ReactHtmlParser.default(source.body.value)
          const inlineSnippets = parsedBody
            .map((htmlnode) => {
              return getSnippetFromHtmlNode(htmlnode)
            })
            .filter((htmlnode) => {
              return htmlnode != null
            })

          return inlineSnippets
        },
      },
      inlineImages: {
        type: ["File"],
        resolve(source) {
          if (
            !source.body ||
            !source.body.value ||
            process.env.GATSBY_BLOG_INLINE_IMAGES !== "enabled"
          ) {
            return null
          }
          const inlineimgs = createInlineImages(source.body.value)
          return inlineimgs
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
