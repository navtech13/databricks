const path = require(`path`)
const template = path.resolve(`./src/templates/careersDepartmentPage.js`)

const stringSlugify = (string) => {
  return string
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/\//g, "-")
    .replace(/[^\w-]+/g, "")
}

const createDepartmentPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allGreenhouseDepartment {
            edges {
              node {
                id
                name
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }

        result.data.allGreenhouseDepartment.edges.forEach(({ node }) => {
          const { id } = node
          const pathname = `/${stringSlugify(node.name)}/`

          createPage({
            path: pathname,
            component: template,
            context: {
              pathname,
              id,
              langPrefix: "prefix",
              language: "EN",
              ...(id && { id }),
            },
          })
        })
      })
    ).catch((reason) => {
      console.error(reason)
      process.exit(1)
    })
  })
}

module.exports = createDepartmentPages
