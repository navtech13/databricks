/* eslint-disable no-loop-func */
const path = require("path")
const fs = require("fs")
const ReactHtmlParser = require("html-react-parser")

console.log("blog  package")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

let jsonPath = ""

const web = `${process.env.GATSBY_QUERY_LIMIT_LANGUAGE}-blog`

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

const pageList = ["index.js", "blog.js", "404.js"]

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

const baseClientRoutes = ["/blog"]

exports.onPreInit = () => {
  jsonPath = "." // config.root
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  const languageLimit = process.env.GATSBY_QUERY_LIMIT_LANGUAGE || "en"

  // Timestamp value. Defaults to the 01/01/2022.
  const dateLimit = Number.parseInt(
    process.env.GATSBY_QUERY_LIMIT_DATE || "1672531200", // Date and time (GMT): Sunday, January 1, 2023 12:00:00 AM
    10
  )

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
              { operator: EQUAL, field: "langcode", value: "${languageLimit}" }
            ]
          }
        ) {
          count
        }
      }
    }
  `).then((result) => [
    result.data.drupal.availableLanguages.filter(
      (language) => language.id === languageLimit
    ),
    result.data.drupal.nodeQuery.count,
  ])

  const blogPages = {}

  let defaultLanguage = languageLimit

  const batchSize = Number.parseInt(process.env.GATSBY_BLOG_BATCH_SIZE || 250, 10) // This is the limit for the number of nodes that can be queried at once.
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
      const isClientRoute = baseClientRoutes.includes(pathAlias)

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
            ...(isClientRoute && {
              matchPath: `${nodePath}/*`,
            }),
            context: {
              langPrefix: prefix,
              language: language.id.toUpperCase().replace(/-/g, "_"),
              ...(id && { id }),
              ...(vid && { vid }),
              pathAliasTranslations,
              // ...(pathAlias === "/blog" && {
              //   assetPrefix:
              //     process.env.GATSBY_ASSET_PREFIX &&
              //     process.env.NODE_ENV === "production"
              //       ? `/${process.env.GATSBY_ASSET_PREFIX}`
              //       : "",
              // }),
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
      const localBlogData = `${jsonPath}/public/data/blog/`
      // clear directory for JSON data
      if (fs.existsSync(localBlogData)) {
        fs.rmSync(localBlogData, { recursive: true })
      }
      fs.mkdirSync(localBlogData, { recursive: true })
      const itemsPerPage = 10
      let currentItem = 1
      const blogPagesFull = [] // array that contains all the pages to create
      const blogPagesPage = [] // array that contains all the blogpost for each page

      defaultBlogPages.forEach((blogPage, index) => {
        blogPage.fieldAuthors.forEach((element, authorIndex) => {
          // skip if author reference is no good
          if (!element || !element.entity) {
            return
          }

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

        // Generate the blog post HTML
        // Skips if the date is before the limit
        // Parsed is given in milliseconds, so dateLimit must be converted
        if (Date.parse(blogPage.isoDate) >= dateLimit * 1000) {
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
        }

        // add blogPage to page array
        if (currentItem <= itemsPerPage) {
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
            `${jsonPath}/public/data/blog/${prefix}all_${index + 1}.json`,
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
              `${jsonPath}/public/data/blog/${prefix}${fileName}_${key}_${currentPage}.json`,
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

      const buildCategoryItems = (fieldCategories) => {
        const body = fieldCategories
          .map((category) => {
            return `<category><![CDATA[${category.entity.name}]]></category>`
          })
          .join("")
        return body
      }

      const buildRssItems = (items, categoryTitle, feedUrl) => {
        const header = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
          xmlns:content="http://purl.org/rss/1.0/modules/content/"
          xmlns:wfw="http://wellformedweb.org/CommentAPI/"
          xmlns:dc="http://purl.org/dc/elements/1.1/"
          xmlns:atom="http://www.w3.org/2005/Atom"
          xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
          xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
          xmlns:media="http://search.yahoo.com/mrss/" >

        <channel>
          <title>${
            categoryTitle !== ""
              ? `${categoryTitle} &#8211; Databricks`
              : "Databricks"
          }</title>
          <atom:link href="https://www.databricks.com${feedUrl.replace(
            "./public",
            ""
          )}/feed.xml" rel="self" type="application/rss+xml" />
          <link>https://www.databricks.com</link>
          <description>Making big data simple.</description>
          <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
          <language>${languageLimit}</language>
          <sy:updatePeriod>hourly	</sy:updatePeriod>
          <sy:updateFrequency>1	</sy:updateFrequency>
          <generator>https://wordpress.org/?v=5.8.3</generator>

        <image>
          <url>https://www.databricks.com/wp-content/uploads/2019/12/cropped-databricks-icon-32x32.png</url>
          <title>${
            categoryTitle !== ""
              ? `${categoryTitle} &#8211; Databricks`
              : "Databricks"
          } &#8211; Databricks</title>
          <link>https://www.databricks.com</link>
          <width>32</width>
          <height>32</height>
        </image> `
        const body = items
          .map((item) => {
            const teaserStr = item.body?.teaser
            const pubDate = new Date(item.isoDate).toUTCString()
            let itemPath = item.entityUrl.path

            let title = item.title
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&apos;")

            if (!itemPath.startsWith("http")) {
              if (!itemPath.startsWith("/")) {
                itemPath = `/${itemPath}`
              }
              itemPath = `https://www.databricks.com${itemPath}`
            }

            return `
              <item>
                <title>${title}</title>
                <pubDate>${pubDate}</pubDate>
                <link>${itemPath}</link>
                <description><![CDATA[${teaserStr}]]></description>
                ${buildCategoryItems(item.fieldCategories)}
                <content:encoded><![CDATA[${teaserStr}]]></content:encoded>
                <guid isPermaLink="false">https://www.databricks.com/node/${
                  item.id
                }</guid>
              </item>
              `
          })
          .join("")

        const footer = `
          </channel>
        </rss>
        `
        return header.concat(body).concat(footer)
      }

      const generateRssFeed = (objectToPaginate, key) => {
        if (key) {
          availableLanguages.forEach(({ id }) => {
            const chunk = objectToPaginate[key].posts
              .slice(0, itemsPerPage)
              .map((post) => {
                return blogPages[id][post]
              })

            if (objectToPaginate[key].metadata[id]?.slug) {
              const localRssFolderPrefix = `${jsonPath}/public/blog/category/`

              // Create path with category names (include parent is exists)
              const localRssFolder = objectToPaginate[key].metadata[id].parent
                ? `${localRssFolderPrefix}${objectToPaginate[key].metadata[id].parent.slug}/${objectToPaginate[key].metadata[id].slug}`
                : `${localRssFolderPrefix}${objectToPaginate[key].metadata[id].slug}`
              const categoryTitle = objectToPaginate[key].metadata[id].parent
                ? `${objectToPaginate[key].metadata[id].parent.title}`
                : `${objectToPaginate[key].metadata[id].title}`

              fs.mkdirSync(localRssFolder, { recursive: true })

              handleRedirectCreation(`${localRssFolder}/feed.xml`, [
                `${localRssFolder}/feed`,
              ])

              fs.writeFileSync(
                `${localRssFolder}/feed.xml`,
                buildRssItems(chunk, categoryTitle, localRssFolder)
              )
            }
          })
        } else {
          availableLanguages.forEach(({ id }) => {
            const localRssFolder = `${jsonPath}/public/blog`
            fs.writeFileSync(
              `${localRssFolder}/feed.xml`,
              buildRssItems(objectToPaginate.slice(0, 25), "", `${localRssFolder}`)
            )
          })
        }
      }

      // Recursively delete all files of a specific extension in the current directory
      const deleteFiles = (dir, ext) => {
        if (fs.existsSync(dir)) {
          fs.readdirSync(dir).forEach((file) => {
            const curPath = path.join(dir, file)
            if (fs.lstatSync(curPath).isDirectory()) {
              // recurse
              deleteFiles(curPath, ext)
            } else {
              // delete file
              if (path.extname(curPath) === ext) {
                fs.unlinkSync(curPath)
              }
            }
          })
        }
      }

      // Delete all empty directories in the current directory
      const deleteEmptyDirectories = (dir) => {
        if (fs.existsSync(dir)) {
          fs.readdirSync(dir).forEach((file) => {
            const curPath = path.join(dir, file)
            if (fs.lstatSync(curPath).isDirectory()) {
              // recurse
              deleteEmptyDirectories(curPath)
              // delete directory if empty
              if (fs.readdirSync(curPath).length === 0) {
                fs.rmdirSync(curPath)
              }
            }
          })
        }
      }

      deleteFiles(`${jsonPath}/public/blog`, ".xml")
      deleteEmptyDirectories(`${jsonPath}/public/blog`)

      // create authors json files
      Object.keys(authors).forEach((key) => {
        splitIntoPages(authors, key, "author")
      })
      // create categories json files
      Object.keys(categories).forEach((key) => {
        splitIntoPages(categories, key, "category")
        generateRssFeed(categories, key)
      })

      generateRssFeed(defaultBlogPages)
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
          console.log("source.entity.url:", source.entity.url)
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
            name: filenameRegex.exec(
              source.fieldMediaImage.url.replace("%", "").replace("300x250", "")
            )[0],
          }).catch((err) => {
            console.log("source.fieldMediaImage:", source.fieldMediaImage)
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
            console.log("source.fieldAvatar:", source.fieldAvatar)
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
