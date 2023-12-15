const path = require(`path`)
const template = path.resolve(`./src/templates/jobDetail.js`)

const stringSlugify = (string) => {
  return string
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/\//g, "-")
    .replace(/[^\w-]+/g, "")
}

const getJobPostPathname = (node) => {
  const [department] = node.departments ? node.departments : []
  const departmentSlug = stringSlugify(department ? `${department.name}` : ``)
  const jobSlug = stringSlugify(`${node.title}`)

  return `/company/careers/${departmentSlug}/${jobSlug}-${node.gh_Id}`
}
const createJobPostPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          site {
            siteMetadata {
              embedGreenhouseForm
              greenhouseBoardToken
            }
          }
          allGreenhouseJob {
            edges {
              node {
                id
                internal_job_id
                gh_Id
                offices {
                  name
                }
                departments {
                  name
                }
                title
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }

        const jobNodes = result.data.allGreenhouseJob.edges
        const embedGreenhouseForm = Boolean(
          result.data.site.siteMetadata.embedGreenhouseForm
        )
        const { greenhouseBoardToken } = result.data.site.siteMetadata

        jobNodes.forEach(({ node }) => {
          const pathname = getJobPostPathname(node)
          const { id } = node
          const test = !!node.offices

          if (!test) {
            console.log(node)
          }

          createPage({
            path: pathname,
            component: template,
            context: {
              embedGreenhouseForm,
              greenhouseBoardToken,
              pathname,
              id,
              greenhouseId: node.gh_Id,
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

module.exports = createJobPostPages
