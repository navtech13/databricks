/* eslint-disable no-loop-func */
exports.createPages = async ({ graphql, actions }) => {
  const { createRedirect } = actions

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
      handleRedirectCreation("test", ["hamza"])
    })
  })
}
