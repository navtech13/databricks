const dotenv = require("dotenv")

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})
const login = require("../packages/gatsby-theme-databricks-drupal/src/auth/login")

module.exports = async (req, res) => {
  res.statusCode = 404
  const token = await login.fetchOauthToken(
    process.env.GATSBY_DRUPAL_URL,
    process.env.DRUPAL_AUTH_USERNAME,
    process.env.DRUPAL_AUTH_PASSWORD,
    process.env.DRUPAL_AUTH_CLIENT_ID,
    process.env.DRUPAL_AUTH_CLIENT_SECRET
  )

  if (typeof token === "object") {
    const json = await token
    const response = await fetch(`${process.env.GATSBY_DRUPAL_URL}/graphql`, {
      method: "post",
      // eslint-disable-next-line no-undef
      headers: new Headers({
        Accept: "application/json",
        Authorization: `${json.token_type} ${json.access_token}`,
      }),
      body: JSON.stringify({
        query: `{
          redirects: redirectQuery(
            limit: 10000
          ) {
            entities {
              ... on RedirectRedirect {
                statusCode
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
        `,
      }),
    })

    if (response.ok) {
      const jsonResponse = await response.json()
      jsonResponse.data.redirects.entities.some((element) => {
        if (element.source?.path && req.url.startsWith(`/${element.source.path}`)) {
          res.statusCode = element.statusCode
          res.setHeader("location", element.redirect.url.path)
          return true
        }
        return false
      })
    }
  }
  return res.end()
}
