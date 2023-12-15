const arkosePublicKey = `${process.env.GATSBY_ARKOSE_PUBLIC_KEY}`

const inlineScript = `
function setupEnforcement(myEnforcement) {
  //db_debug("Set Arkose configuration")
  myEnforcement.setConfig({
    data: { blob: document.getElementById("arkose-js").getAttribute("data-blob") },
    language: document.getElementsByTagName("html")[0].getAttribute("lang")
      ? document.getElementsByTagName("html")[0].getAttribute("lang").split("0")[0]
      : "en",
    selector: "#community-edition",
    onCompleted: function (response) {
      //db_debug("Arkose Event: onCompleted()")
      //db_debug(response)
      try {
        window.db_freetrial("arkose_token_response", response.token)
        window.db_freetrial("action", "process_trial")
        window.db_freetrial("validate_type", "arkose")
        window.db_freetrial("cloud", "CE")
        // document.getElementById("submit").click()
      } catch (error) {
        //db_debug("Arkose onCompleted: " + error.message)
      }
      //db_debug("Arkose Event: onCompleted() : response token set and form submitted")
    },
    onFailed: function (response) {
      //db_debug("Arkose Event: onFailed()")
      //db_debug(response)
    },
    onReady: function () {
      //db_debug("Arkose Event: onReady()")
      document.getElementById("community-edition").addEventListener("click", (e) => {
        //db_debug("Arkose Event: community-edition click")
      })
    },
    onHide: () => {
      //db_debug("Arkose Event: onHide()")
    },
    onReset: () => {
      //db_debug("Arkose Event: onReset()")
    },
    onShow: () => {
      //db_debug("Arkose Event: onShow()")
    },
    onShown: () => {
      //db_debug("Arkose Event: onShown()")
    },
    onSuppress: () => {
      //db_debug("Arkose Event: onSuppress()")
    },
    onError: (response) => {
      //db_debug("Arkose Event: onError()")
      //db_debug(response)
    },
    accessibilitySettings: { lockFocusToModal: true },
  })
}`

const includeArkose = () => {
  const body = document.getElementsByTagName("body")[0]
  const script = document.createElement("script")
  script.setAttribute("data-ot-ignore", "1")
  script.setAttribute("class", "optanon-category-C0001")
  script.id = "arkose-js"
  script.dataset.blob = window.db_arkoseDE_ID
  script.setAttribute("type", "text/javascript")
  script.innerHTML = inlineScript
  body.appendChild(script)

  const script2 = document.createElement("script")
  script2.setAttribute("data-ot-ignore", "1")
  script2.setAttribute("class", "optanon-category-C0001")
  script2.src = `https://client-api.arkoselabs.com/v2/${arkosePublicKey}/api.js`
  script2.dataset.callback = "setupEnforcement"
  script2.setAttribute("async", "")
  script2.setAttribute("defer", "")
  body.appendChild(script2)
}

export default includeArkose
