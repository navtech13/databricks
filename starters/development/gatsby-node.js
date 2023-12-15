/* eslint-disable no-loop-func */
const path = require("path")
const fs = require("fs")
const ReactHtmlParser = require("html-react-parser")

console.log("development package")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

const baseClientRoutes = ["/blog"]

const postFragment = `title
id: entityId
entityCreated(format: "F j, Y")
entityUrl {
  path
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
            ]
          }
        ) {
          count
        }
      }
    }
  `).then((result) => [
    result.data.drupal.availableLanguages,
    result.data.drupal.nodeQuery.count,
  ])

  const blogPages = {}

  let defaultLanguage = "en"

  const batchSize = process.env.GATSBY_BLOG_BATCH_SIZE || 3 // This is the limit for the number of nodes that can be queried at once.
  const blogLimit = process.env.GATSBY_QUERY_LIMIT || blogNodeCount
  for (let i = 0; i < blogLimit; i += batchSize) {
    /* eslint-disable no-await-in-loop */
    await Promise.all(
      availableLanguages.map(async ({ id, isDefault }) => {
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
              sort: { field: "created", direction: DESC }
              filter: {
                conditions: [
                  { operator: EQUAL, field: "type", value: ["post"] }
                  { operator: EQUAL, field: "status", value: ["1"] }
                ]
              }
              limit: ${batchSize}
              offset: ${i}
            ) {
              entities(language: ${id.toUpperCase()}) {
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
      resourcePages: nodeQuery(
        sort: {field: "created", direction: DESC}
        filter: {conditions: [{operator: EQUAL, field: "type", value: ["resource"]}, {operator: EQUAL, field: "status", value: ["1"]}]}
        limit: ${process.env.GATSBY_QUERY_LIMIT || "10000"}
      ) {
        entities {
          id: entityId
          entityUrl {
            path
          }
        }
      }
      landingPages: nodeQuery(
        sort: {field: "created", direction: DESC}
        filter: {conditions: [{operator: EQUAL, field: "type", value: ["pages"]}, {operator: EQUAL, field: "status", value: ["1"]}]}
        limit: ${process.env.GATSBY_QUERY_LIMIT || "10000"}
      ) {
        entities {
          id: entityId
          entityUrl {
            path
          }
        }
      }
      legalPages: nodeQuery(
        sort: {field: "created", direction: DESC}
        filter: {conditions: [{operator: EQUAL, field: "type", value: ["legal"]}, {operator: EQUAL, field: "status", value: ["1"]}]}
        limit: ${process.env.GATSBY_QUERY_LIMIT || "10000"}
      ) {
        entities {
          id: entityId
          entityUrl {
            path
          }
        }
      }
      twoColumnsPages: nodeQuery(
        sort: {field: "created", direction: DESC}
        filter: {conditions: [{operator: EQUAL, field: "type", value: ["two_columns"]}, {operator: EQUAL, field: "status", value: ["1"]}]}
        limit: ${process.env.GATSBY_QUERY_LIMIT || "10000"}
      ) {
        entities {
          id: entityId
          entityUrl {
            path
          }
        }
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

    const createLanguagePages = (pathAlias, template, id) => {
      const isClientRoute = baseClientRoutes.includes(pathAlias)

      availableLanguages.forEach((language) => {
        const prefix = language.prefix.length ? `/${language.prefix}` : ""

        createPage({
          path: `${prefix}${pathAlias}`,
          component: path.resolve(
            `../../packages/gatsby-theme-databricks-drupal/src/templates/${template}`
          ),
          ...(isClientRoute && {
            matchPath: `${prefix}${pathAlias}/*`,
          }),
          context: {
            langPrefix: prefix,
            language: language.id.toUpperCase(),
            ...(id && { id }),
          },
        })
      })
    }

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

    // Create static pages
    fs.readdirSync(
      `../../packages/gatsby-theme-databricks-drupal/src/templates/pages/`
    ).forEach((file) => {
      if (!file.includes(".js")) {
        return
      }
      const pagePath = file.replace(".js", "")
      createLanguagePages(
        `/${pagePath === "index" ? "" : pagePath}`,
        `/pages/${file}`
      )
    })

    // Create reseource pages.

    const { entities: resourcePages } = result.data.drupal.resourcePages

    resourcePages.forEach((resourcePage) => {
      const pathAlias = resourcePage.entityUrl.path
      createLanguagePages(pathAlias, "resourcePage.js", resourcePage.id)
    })

    // Create landing pages.

    const { entities: landingPages } = result.data.drupal.landingPages

    landingPages.forEach((landingPage) => {
      const pathAlias = landingPage.entityUrl.path
      createLanguagePages(pathAlias, "landingPage.js", landingPage.id)
    })

    // Create legal pages.

    const { entities: legalPages } = result.data.drupal.legalPages

    legalPages.forEach((legalPage) => {
      const pathAlias = legalPage.entityUrl.path
      createLanguagePages(pathAlias, "legalPage.js", legalPage.id)
    })

    // Create two columns pages.

    const { entities: twoColumnsPages } = result.data.drupal.twoColumnsPages

    twoColumnsPages.forEach((twoColumnsPage) => {
      const pathAlias = twoColumnsPage.entityUrl.path
      createLanguagePages(pathAlias, "twoColumnsPage.js", twoColumnsPage.id)
    })

    // Create blog post pages.

    const languageMetadata = (postIndex, elementIndex, elementKey, buildObject) => {
      const metadata = {}
      const parentMetadata = {}

      availableLanguages.forEach((language) => {
        const elementData =
          blogPages[language.id][postIndex][elementKey][elementIndex].entity
        const parentData = elementData?.parent?.[0]?.entity
        metadata[language.id] = buildObject(elementData)
        if (parentData) {
          parentMetadata[language.id] = buildObject(parentData)
        }
      })

      return [metadata, parentMetadata]
    }

    const defaultBlogPages = blogPages[defaultLanguage]

    if (defaultBlogPages) {
      const authors = {}
      const categories = {}
      // clear directory for JSON data
      if (fs.existsSync(`./public/data/blog/`)) {
        fs.rmSync(`./public/data/blog/`, { recursive: true })
      }
      fs.mkdirSync(`./public/data/blog/`, { recursive: true })
      const itemsPerPage = 10
      let currentItem = 1
      const blogPagesFull = [] // array that contains all the pages to create
      const blogPagesPage = [] // array that contains all the blogpost for each page

      defaultBlogPages.forEach((blogPage, index) => {
        if (!blogPage.fieldAuthors) {
          fs.writeFileSync("foo.txt", JSON.stringify(blogPage))
        }
        blogPage.fieldAuthors.forEach((element, authorIndex) => {
          // Add the index to the author object
          if (!authors[element.entity.fieldSlug]) {
            const [metadata] = languageMetadata(
              index,
              authorIndex,
              "fieldAuthors",
              (authorData) => ({
                title: `POSTS BY ${authorData.name.toUpperCase()}`,
                name: authorData.name,
                slug: authorData.fieldSlug,
                parent: {
                  title: "All",
                  slug: "blog",
                },
              })
            )

            authors[element.entity.fieldSlug] = {
              metadata,
              posts: [index],
            }
            return
          }
          authors[element.entity.fieldSlug].posts = [
            ...authors[element.entity.fieldSlug].posts,
            index,
          ]
        })

        // Add the index to the category object
        const addedCategories = []
        blogPage.fieldCategories.forEach((element, blogIndex) => {
          const currentSlug = element.entity.fieldSlug
          const parentSlug = element.entity.parent?.[0]?.entity?.fieldSlug
          if (!categories[currentSlug]) {
            const [metadata, parentMetadata] = languageMetadata(
              index,
              blogIndex,
              "fieldCategories",
              (categoryData) => {
                const parentObject = categoryData.parent?.[0].entity
                const parent = parentObject
                  ? {
                      title: parentObject.name,
                      slug: parentObject.fieldSlug,
                    }
                  : null

                return {
                  title: categoryData.name,
                  slug: categoryData.fieldSlug,
                  parent,
                }
              }
            )

            categories[currentSlug] = {
              metadata,
              posts: [],
            }

            if (parentSlug && !categories[parentSlug]) {
              categories[parentSlug] = {
                metadata: parentMetadata,
                posts: [],
              }
            }
          }

          if (!addedCategories.includes(currentSlug)) {
            categories[currentSlug].posts = [...categories[currentSlug].posts, index]
            addedCategories.push(currentSlug)
          }
          if (parentSlug && !addedCategories.includes(parentSlug)) {
            categories[parentSlug].posts = [...categories[parentSlug].posts, index]
            addedCategories.push(parentSlug)
          }
        })

        const pathAlias = blogPage.entityUrl.path
        createLanguagePages(pathAlias, "blogDetail.js", blogPage.id)
        if (allRedirects[pathAlias]) {
          handleRedirectCreation(pathAlias, allRedirects[pathAlias])
        }

        // add blogPage to page array
        if (currentItem < itemsPerPage) {
          blogPagesPage.push(index)
        }
        // if itemsPerPage limit is reached, add page array to full array and clear variables to start over
        if (currentItem === itemsPerPage) {
          blogPagesFull.push([...blogPagesPage])
          blogPagesPage.splice(0, blogPagesPage.length)
          currentItem = 0
        }
        currentItem += 1
      })

      // check if there are any remaining blogs for the last page
      if (blogPagesPage.length > 0) {
        blogPagesFull.push([...blogPagesPage])
        blogPagesPage.splice(0, blogPagesPage.length)
      }

      // create json for each page of all blogposts
      blogPagesFull.forEach((page, index) => {
        availableLanguages.forEach(({ prefix, id }) => {
          const pageData = page.map((post) => blogPages[id][post])

          fs.writeFileSync(
            `./public/data/blog/${prefix}all_${index + 1}.json`,
            JSON.stringify(
              {
                metadata: {
                  title: "All",
                  slug: "blog",
                  hasNextPage: index < blogPagesFull.length - 1,
                },
                posts: pageData,
              },
              {},
              2
            )
          )
        })
      })

      const splitIntoPages = (objectToPaginate, key, fileName) => {
        let currentPage = 1
        for (let i = 0; i < objectToPaginate[key].posts.length; i += itemsPerPage) {
          availableLanguages.forEach(({ prefix, id }) => {
            const chunk = objectToPaginate[key].posts
              .slice(i, i + itemsPerPage)
              .map((post) => {
                return blogPages[id][post]
              })

            fs.writeFileSync(
              `./public/data/blog/${prefix}${fileName}_${key}_${currentPage}.json`,
              JSON.stringify(
                {
                  metadata: {
                    ...objectToPaginate[key].metadata[id],
                    hasNextPage:
                      i + itemsPerPage < objectToPaginate[key].posts.length,
                  },
                  posts: chunk,
                },
                {},
                2
              )
            )
          })
          currentPage += 1
        }
      }

      // create authors json files
      Object.keys(authors).forEach((key) => {
        splitIntoPages(authors, key, "author")
      })
      // create categories json files
      Object.keys(categories).forEach((key) => {
        splitIntoPages(categories, key, "category")
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
