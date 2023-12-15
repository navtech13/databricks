import React from "react"

const recaptchaPublicKey = `${process.env.GATSBY_RECAPTCHA_PUBLIC_KEY}`

export const recaptchaCommunityEditionOnClick = () => {
  grecaptcha.ready(() => {
    grecaptcha.execute()
  })
}

export const RecaptchaModal = () => {
  return (
    <div
      id='recaptcha'
      className='g-recaptcha'
      data-sitekey={recaptchaPublicKey}
      data-callback='onRecaptchaSubmit'
      data-size='invisible'
    />
  )
}

const includeRecaptcha = () => {
  window.onRecaptchaSubmit = (token) => {
    window.db_freetrial("recaptcha_token", token)
    window.db_freetrial("action", "process_trial")
    window.db_freetrial("validate_type", "recaptcha")
    window.db_freetrial("cloud", "CE")
  }

  const body = document.getElementsByTagName("body")[0]
  const script = document.createElement("script")
  script.setAttribute("data-ot-ignore", "1")
  script.setAttribute("class", "optanon-category-C0001")
  script.id = "recaptcha-v2"
  script.src = `https://www.google.com/recaptcha/api.js`
  script.setAttribute("type", "text/javascript")
  body.appendChild(script)
}

export default includeRecaptcha
