import Cookies from "js-cookie"

const handleMaxMindResponse = (geoipResponse) => {
  const setCookie = (name, value, days) => {
    let expires = ""
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = `; expires=${date.toUTCString()}`
    }

    document.cookie = `${name}=${value || ""}${expires}; path=/`
  }
  const dbCountry = {
    country_code: geoipResponse.country.iso_code,
    country_name: geoipResponse.country.names.en,
  }
  if (Cookies) {
    // Not using js-cookie to write since the character encoding causes issues with Wordpress, which doesn't use js-cookie
    // Cookies.set("db_country", JSON.stringify(dbCountry), { expires: 30 })
    setCookie("db_country", JSON.stringify(dbCountry), 30)
  }
}

const getVisitorLocation = () => {
  if (Cookies) {
    const knownLocationCookie = Cookies.get("db_country")
    if (typeof knownLocationCookie === "undefined") {
      const geoip2 = window.geoip2 || undefined
      return new Promise((resolve, reject) => {
        if (typeof geoip2 !== "undefined") {
          const onSuccess = (location) => {
            handleMaxMindResponse(location)
            resolve(location)
          }
          const onError = (error) => {
            reject(error)
          }
          geoip2.country(onSuccess, onError)
        }
      })
    }
    const knownLocation = JSON.parse(knownLocationCookie)
    if (!knownLocation.country_code) {
      Cookies.remove("db_country")
    }
  }

  return false
}

export default getVisitorLocation
