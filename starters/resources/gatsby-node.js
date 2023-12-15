/* eslint-disable no-loop-func */
const path = require("path")
// eslint-disable-next-line no-unused-vars
const fs = require("fs")

// eslint-disable-next-line import/no-unresolved
const ReactHtmlParser = require("html-react-parser")

const {
  moveAssets,
} = require(`../../packages/gatsby-theme-databricks-drupal/src/utils/move-assets`)

const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const {
  getResourceTrack,
  getResourceCampaignIdbyNodeId,
} = require("../../packages/gatsby-theme-databricks-drupal/src/utils/tracks-utils")

exports.onPostBuild = () => {
  moveAssets()
}

let trackData = {}

const fetchResourceTrackData = () => {
  const tracksApiUrl = `${process.env.GATSBY_DRUPAL_URL}/dbapi/tracks?published=${
    process.env.IS_STAGING !== "true"
  }`

  fetch(tracksApiUrl)
    .then((res) => res.json())
    .then((response) => {
      trackData = response || {}
    })
    .catch((err) => {
      throw new Error(`error fetching resource tracks data: ${err}`)
    })
}

exports.onPreInit = () => {
  fetchResourceTrackData()
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-pdf/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  await graphql(`
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
    result.data.drupal.availableLanguages.filter((language) => language),
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
      resourcePages: nodeQuery(
        revisions: ${revision}
        sort: {field: "created", direction: DESC}
        filter: {conditions: [{operator: EQUAL, field: "type", value: ["resource"]}, {operator: IN, field: "status", value: ${status}}]}
        limit: ${process.env.GATSBY_QUERY_LIMIT || "10000"}
      ) {
        entities {
          id: entityId
          entityUrl {
            path
          }
          ... on Drupal_NodeResource {
            nid
            vid: vid
          }
          entityTranslations {
            entityLanguage {
              id
            }
            entityUrl {
              path
            }
          }
        }
      }
      trackResources: nodeQuery(
        revisions: ${revision}
        sort: {field: "created", direction: DESC}
        filter: {conditions: [{operator: EQUAL, field: "type", value: ["track"]}, {operator: IN, field: "status", value: ${status}}]}
        limit: ${process.env.GATSBY_QUERY_LIMIT || "10000"}
      ) {
        entities {
          ... on Drupal_NodeTrack {
            resources: fieldTrackResources {
              entity {
                ... on Drupal_ParagraphTrackResources {
                  resource: fieldResource {
                    entity {
                      id: entityId
                      entityUrl {
                        path
                      }
                      ... on Drupal_NodeResource {
                        nid
                        vid: vid
                        title
                        fieldEnableRecommendedTrack
                        fieldEnableSkipForm
                      }
                      entityTranslations {
                        entityLanguage {
                          id
                        }
                        entityUrl {
                          path
                        }
                      }
                    }
                  }
                }
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

    const trackSuffix = "-track"

    const createLanguagePages = (
      pathAlias,
      pathAliasTranslations,
      template,
      id,
      vid,
      customValues
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

        const trackEnabled = nodePath?.includes(trackSuffix)

        createPage({
          path: nodePath,
          component: path.resolve(
            `../../packages/gatsby-theme-databricks-drupal/src/templates/${template}`
          ),
          context: {
            langPrefix: prefix,
            language: language.entityLanguage.id.toUpperCase().replace(/-/g, "_"),
            pathAliasTranslations,
            ...(id && { id }),
            ...(vid && { vid }),
            trackEnabled,
            ...customValues,
          },
        })
      })
    }
    // Create resource pages.

    const { entities: resourcePages } = result.data.drupal.resourcePages

    resourcePages.forEach((resourcePage) => {
      const pathAlias = resourcePage.entityUrl.path
      const pathAliasTranslations = resourcePage.entityTranslations
      const revisionId = `${resourcePage.vid}`
      createLanguagePages(
        pathAlias,
        pathAliasTranslations,
        "resourcePage.js",
        resourcePage.id,
        revisionId
      )

      // Create associated Thank You pages.
      const thankYouPath = `${pathAlias}/thank-you`
      const thankYouPathTranslations = pathAliasTranslations.map((translation) => ({
        ...translation,
        entityUrl: { path: `${translation.entityUrl.path}/thank-you` },
      }))

      createLanguagePages(
        thankYouPath,
        thankYouPathTranslations,
        "thankYouPage.js",
        resourcePage.id,
        revisionId
      )
    })

    // Create resource tracks pages
    const tracks = result.data.drupal.trackResources.entities
    tracks.forEach((track) => {
      if (track.resources?.length > 1) {
        track.resources.forEach((item) => {
          const resourcePage = item.entity.resource.entity
          const pathAlias = resourcePage.entityUrl.path
          const pathAliasTranslations = resourcePage.entityTranslations
          const revisionId = `${resourcePage.vid}`
          const trackPath = `${pathAlias}${trackSuffix}`
          const trackPathTranslations = pathAliasTranslations.map((translation) => ({
            ...translation,
            entityUrl: { path: `${translation.entityUrl.path}${trackSuffix}` },
          }))

          createLanguagePages(
            trackPath,
            trackPathTranslations,
            "resourcePage.js",
            resourcePage.id,
            revisionId,
            { campaignId: getResourceCampaignIdbyNodeId(trackData, resourcePage.id) }
          )

          const trackThankYouPath = `${pathAlias}${trackSuffix}/thank-you`
          const trackThankYouPathTranslations = pathAliasTranslations.map(
            (translation) => ({
              ...translation,
              entityUrl: {
                path: `${translation.entityUrl.path}${trackSuffix}/thank-you`,
              },
            })
          )

          createLanguagePages(
            trackThankYouPath,
            trackThankYouPathTranslations,
            "trackThankYouPage.js",
            resourcePage.id,
            revisionId,
            { track: getResourceTrack(trackData, resourcePage.id) }
          )
        })
      }
    })

    // Create hub page
    const resources = []
    resources.push(resourcePages)

    fs.readdirSync(
      `../../packages/gatsby-theme-databricks-drupal/src/templates/pages/resources/`
    ).forEach((file) => {
      if (!file.includes(".js")) {
        return
      }
      const subFolder = "resources"
      const pagePath = file.replace(".js", "")
      // createLanguagePages(
      //   `/${pagePath === "index" ? subFolder : `${subFolder}/${pagePath}`}`,
      //   [],
      //   `/pages/${subFolder}/${file}`,
      //   1234,
      //   resources
      // )
      createPage({
        path: `/${pagePath === "index" ? subFolder : `${subFolder}/${pagePath}`}`,
        component: path.resolve(
          `../../packages/gatsby-theme-databricks-drupal/src/templates/pages/${subFolder}/${file}`
        ),
        context: {
          langPrefix: "",
          language: "EN",
          resources,
        },
      })
    })
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
