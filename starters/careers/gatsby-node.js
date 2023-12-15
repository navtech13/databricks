/* eslint-disable no-loop-func */
const path = require("path")
const fs = require("fs")
const ReactHtmlParser = require("html-react-parser")

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const createJobPostPages = require("./gatsby/create-jobpost-pages")
// const createDepartmentPages = require("./gatsby/create-department-pages")

const web = process.env.web || "careers"

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
  console.log("building careers pages")
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const languageLimit = process.env.GATSBY_QUERY_LIMIT_LANGUAGE || "en"

  createJobPostPages({ actions, graphql })
  // createDepartmentPages({ actions, graphql })

  const [availableLanguages] = await graphql(`
    {
      drupal {
        availableLanguages {
          name
          prefix
          id
          isDefault
        }
      }
    }
  `).then((result) => [
    result.data.drupal.availableLanguages.filter(
      (language) => language.id === languageLimit
    ),
  ])

  let status = '["1"]'
  let revision = "DEFAULT"
  if (process.env.IS_STAGING === "true" || process.env.NODE_ENV !== "production") {
    status = '["0", "1"]'
    revision = "LATEST"
  }

  return graphql(`
    {
      drupal {
        availableLanguages {
          name
          prefix
          id
        }
        generalPages: nodeQuery(
          sort: {field: "created", direction: DESC}
          revisions: ${revision}
          filter: {
            conditions: [
              {operator: EQUAL, field: "type", value: ["pages"]},
              {operator: IN, field: "status", value: ${status}}
            ]
          }
          limit: ${process.env.GATSBY_QUERY_LIMIT || "10000"}
        ) {
          entities {
            id: entityId
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
            ... on Drupal_NodePages {
              nid
              vid
            }
          }
        }
      }
      allGreenhouseOffice(filter: {}) {
        nodes {
          gh_Id
          id
          name
          parent_id
          jobs {
            gh_Id
          }
          children {
            ... on GreenhouseOffice {
              gh_Id
              parent_id
              name
              jobs {
                gh_Id
              }
              childrenGreenhouseOffice {
                gh_Id
                parent_id
                name
                jobs {
                  gh_Id
                }
                childrenGreenhouseOffice {
                  gh_Id
                  name
                  parent_id
                  jobs {
                    gh_Id
                  }
                  childrenGreenhouseOffice {
                    gh_Id
                    name
                    parent_id
                    jobs {
                      gh_Id
                    }
                  }
                }
              }
            }
          }
        }
      }
      allGreenhouseDepartment {
        nodes {
          name
          jobs {
            id
            title
            absolute_url
            gh_Id
            internal_job_id
            updated_at
            offices {
              id
              name
            }
            location {
              name
            }
            departments {
              name
            }
            metadata {
              value
            }
          }
          parent {
            ... on GreenhouseDepartment {
              id
              name
              jobs {
                id
                title
                absolute_url
                gh_Id
                internal_job_id
                updated_at
                offices {
                  id
                  name
                }
                location {
                  name
                }
                departments {
                  name
                }
                metadata {
                  value
                }
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
      pathAliasTranslations.forEach((language) => {
        const prefix = language.entityLanguage.length
          ? `/${language.entityLanguage.id}`
          : ""

        const translatedPath = pathAliasTranslations.find(
          (translation) =>
            translation?.entityLanguage?.id === language.entityLanguage.id
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
            data: result.data,
            language: language.entityLanguage.id.toUpperCase().replace(/-/g, "_"),
            pathAliasTranslations,
            ...(id && { id }),
            ...(vid && { vid }),
          },
        })
      })
    }

    // Create general pages.

    const { entities: generalPages } = result.data.drupal.generalPages

    generalPages.forEach((generalPage) => {
      const pathAlias = generalPage.entityUrl.path
      const revisionId = `${generalPage.vid}`
      const pathAliasTranslations = generalPage.entityTranslations
      if (pathAlias.includes("careers")) {
        createLanguagePages(
          pathAlias,
          pathAliasTranslations,
          "generalPage.js",
          generalPage.id,
          revisionId
        )
      }
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
    // // Create redirects
    // const allRedirects = {}
    // result.data.drupal.redirects.entities.forEach((element) => {
    //   if (!element.redirect?.url?.path) {
    //     return
    //   }
    //   if (!allRedirects[element.redirect.url.path]) {
    //     allRedirects[element.redirect.url.path] = []
    //   }
    //   allRedirects[element.redirect.url.path].push(element.source.path)
    // })

    // Object.keys(allRedirects).forEach((key) => {
    //   // eslint-disable-next-line no-unused-vars
    //   allRedirects[key].forEach((element) => {
    //     handleRedirectCreation(key, allRedirects[key])
    //   })
    // })
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
