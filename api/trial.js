/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
const fetch = require("node-fetch")
const dotenv = require("dotenv")

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration))

function parseCookies(request) {
  const list = {}
  const cookieHeader = request.headers?.cookie
  if (!cookieHeader) return list

  cookieHeader.split(`;`).forEach(function(cookie) {
    // eslint-disable-next-line prefer-const
    let [name, ...rest] = cookie.split(`=`)
    name = name?.trim()
    if (!name) return
    const value = rest.join(`=`).trim()
    if (!value) return
    list[name] = decodeURIComponent(value)
  })
  return list
}

async function freeTrialSignupHelper(req, res, act, retryCount = 0) {
  if (retryCount > 5) {
    return res.status(500).send(`Error encountered!`)
  }

  // determine client IP here and insert into body
  const clientIP =
    "true-client-ip" in req.headers
      ? req.headers["true-client-ip"]
      : "cf-connecting-ip" in req.headers
      ? req.headers["cf-connecting-ip"]
      : "x-forwarded-for" in req.headers
      ? req.headers["x-forwarded-for"]
      : req.ip

  if (req.body) {
    req.body.clientIP = clientIP

    const cookies = parseCookies(req)
    if (
      cookies.db_trial_source !== undefined &&
      cookies.db_trial_source === "ghostinspector"
    ) {
      req.body.dbTrialSource = "ghostinspector"
    } else {
      req.body.dbTrialSource = "unspecified"
    }

    // Leftover for future debug if needed
    // req.body.jsonData = JSON.stringify(req.headers)

    // gather request user agent and pass along in body
    if ("user-agent" in req.headers) {
      req.body.clientUserAgent = req.headers["user-agent"]
    }

    try {
      const response = await fetch(
        `${process.env.GATSBY_TRIAL_SIGNUP_ENDPOINT_CMS}/dbapi/${act}?_format=json`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Basic ${process.env.GATSBY_TRIAL_SIGNUP_BASIC_TOKEN}`,
          },
          processData: false,
          body: JSON.stringify(req.body),
        }
      )
      const jsonResponse = await response.json()
      return res.status(response.status).json(jsonResponse)
    } catch (error) {
      const attemptCount = retryCount + 1
      console.error(`Error (attempt #${attemptCount}):`, error)
      await delay(2000)
      return freeTrialSignupHelper(req, res, act, attemptCount)
    }
  }

  return res.status(200).send(`Missing payload`)
}

const freeTrialSignup = async (req, res) => {
  // set header first to allow request or origin domain (value can be different)
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "*")
  res.setHeader("Access-Control-Allow-Credentials", true)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, OPTIONS, DELETE"
  )
  // Preflight CORS handler
  if (req.method === "OPTIONS") {
    return res.status(200).json({
      body: "OK",
    })
  }
  let act = ""
  if (req.query.act === "validate" || req.query.act === "create") {
    act = req.query.act

    return await freeTrialSignupHelper(req, res, act)
  }
  return res.status(200).send(`Route is not valid!`)
}

export default freeTrialSignup
