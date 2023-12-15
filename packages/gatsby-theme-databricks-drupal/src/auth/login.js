require("isomorphic-fetch")

async function fetchOauthToken(uri, username, password, clientId, clientSecret) {
  const formData = new URLSearchParams()
  formData.append("grant_type", "password")
  formData.append("username", username)
  formData.append("password", password)
  formData.append("client_id", clientId)

  if (clientSecret) {
    formData.append("client_secret", clientSecret)
  }

  // eslint-disable-next-line no-undef
  const response = await fetch(`${uri}/oauth/token`, {
    method: "post",
    // eslint-disable-next-line no-undef
    headers: new Headers({
      Accept: "application/json",
    }),
    body: formData,
    httpHeaders: {
      Authorization: `Basic ${process.env.DRUPAL_AUTH_TOKEN}`,
    },
  })
  if (response.ok) {
    const json = await response.json()
    return json
  }

  if (!response.ok) {
    const json = await response.json()
    return json
  }

  return false
}

exports.fetchOauthToken = fetchOauthToken
