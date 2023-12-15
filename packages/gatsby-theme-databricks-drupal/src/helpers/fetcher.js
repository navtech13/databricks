const login = require("../auth/login")

// Promise -> Object
export const fetchResolver = async (fetchFn) => {
  const data = await fetchFn
  if (typeof data === "object") {
    return data
  }

  return data
}

// Fn -> args -> Promise
export const fetchQueryFromCms =
  (queryFn) =>
  async (...args) => {
    const token = await login.fetchOauthToken(
      process.env.GATSBY_DRUPAL_URL,
      process.env.GATSBY_DRUPAL_AUTH_USERNAME,
      process.env.GATSBY_DRUPAL_AUTH_PASSWORD,
      process.env.GATSBY_DRUPAL_AUTH_CLIENT_ID,
      process.env.GATSBY_DRUPAL_AUTH_CLIENT_SECRET
    )
    if (typeof token === "object") {
      const json = await token
      const query = queryFn(...args)
      const response = await fetch(`${process.env.GATSBY_DRUPAL_URL}/graphql`, {
        method: "post",
        // eslint-disable-next-line no-undef
        headers: new Headers({
          Accept: "application/json",
          Authorization: `${json.token_type} ${json.access_token}`,
        }),
        body: JSON.stringify({
          query,
        }),
      })
      if (response.ok) {
        const jsonResponse = await response.json()
        return jsonResponse
      }
      return { error: true }
    }
    return { error: true }
  }
