/* eslint-disable prettier/prettier */
import Cookies from "js-cookie"

const getValidationMethod = () => {
  const dbCaptchaSetting = Cookies.get("db_captcha_setting")
  if (dbCaptchaSetting && dbCaptchaSetting === "novalidation") {
      console.log("db_no_validate")
      return "novalidation"
  }

  if (process.env.GATSBY_VERIFICATION_TYPE === "choose") {
    let cookieVerificationType = Cookies.get("db_verification_type")
    if (
      typeof cookieVerificationType !== "undefined" &&
      ["arkose", "recaptcha"].includes(cookieVerificationType)
    ) {
      return cookieVerificationType
    }
    if (Math.random() < 0.5) {
      cookieVerificationType = "recaptcha"
    } else {
      cookieVerificationType = "arkose"
    }
    Cookies.set("db_verification_type", cookieVerificationType, {
      expires: 7,
      path: "",
    })
    return cookieVerificationType
  }
  return process.env.GATSBY_VERIFICATION_TYPE
}

export default getValidationMethod
