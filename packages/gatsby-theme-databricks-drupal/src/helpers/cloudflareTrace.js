/* eslint-disable no-unused-vars */
import getVisitorLocation from "../utils/get-visitor-location"

const setCookie = (name, value, days) => {
  let expires = ""
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = `; expires=${date.toUTCString()}`
  }

  document.cookie = `${name}=${value || ""}${expires}; path=/`
}

const isValidJson = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const cloudflareTrace = async () => {
  let dbCountry = null
  let countryCode = ""
  let countryName = ""
  let dbCountryCookie =
    document.cookie.match("(^|;)\\s*db_country\\s*=\\s*([^;]+)")?.pop() || ""
  if (dbCountryCookie !== "" && isValidJson(dbCountryCookie)) {
    dbCountryCookie = JSON.parse(dbCountryCookie)
    countryCode = dbCountryCookie.country_code
    countryName = dbCountryCookie.country_name
    return { countryCode, countryName }
  }
  return fetch("https://www.databricks.com/cdn-cgi/trace")
    .then((res) => res.text())
    .then((response) => {
      const cfTrace = []
      const lines = response.split("\n")
      lines.forEach((line) => {
        const keyValue = line.split("=")
        cfTrace[keyValue[0]] = decodeURIComponent(keyValue[1] || "")
      })
      // eslint-disable-next-line no-shadow
      let countryCode = ""
      let ipAddress = ""
      if (cfTrace.loc !== undefined) {
        countryCode = cfTrace.loc
        const regionNames = new Intl.DisplayNames(["en"], { type: "region" })
        countryName = regionNames.of(countryCode)
      }

      if (cfTrace.ip !== undefined) {
        ipAddress = cfTrace.ip
      }

      if (countryCode !== "") {
        dbCountry = {
          country_code: countryCode,
          country_name: countryName,
          IP: ipAddress,
        }
        setCookie("db_country", JSON.stringify(dbCountry), 30)
      }

      return { countryCode, countryName }
    })
    .catch((error) => {
      console.log(error)
      return { countryCode: "", countryName: "" }
    })
}

export default cloudflareTrace
