/* eslint-disable func-names */
/* eslint-disable block-scoped-var */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-throw-literal */
/* eslint-disable no-var */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-spread */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
/* eslint-disable camelcase */
const SimpleDTO = (a) => {
  var is_usepastel = window._PastelLocation !== undefined
  var dtoData = null

  // Skip the prefill if on usepastel
  if (is_usepastel) {
    return null
  }

  db_debug("SimpleDTO Initialized")

  const e = Function.prototype.call.bind(Array.prototype.slice)
  if (a.mode === "receive") {
    var c = document.createElement("iframe")
    c.setAttribute("id", "db_dto_iframe")
    c.setAttribute("data-transfer-object", "true")
    ;[
      ["visibility", "hidden"],
      ["position", "absolute"],
      ["height", "0"],
    ].forEach(function (b) {
      c.style.setProperty.apply(c.style, b)
    })
    const d = document.createElement("a")
    d.href = a.dataSrc || ""
    c.src = d.href
    a.noReplaceQuery || (d.search = document.location.search)
    window.__mktTokVal &&
    (d.search +=
      (d.search.length > 1 ? "&" : "") + ["mkt_tok", window.__mktTokVal].join("="))
    a.noInit
    document.body.appendChild(c)

    /* eslint-disable */
    c.addEventListener("load", function() {
      c.contentWindow.postMessage('db_request_prefill_data', "https://pages.databricks.com");
      db_debug('DTOSend', 'db_request_prefill_data')
    });

    window.addEventListener('message', (event) => {
      if (!event.origin.endsWith("databricks.com")) {
        return
      }
      if (event && event.data && event.data.dto_status && event.data.dto_status === 'completed') {
        db_debug('DTOReturned', event)
        dtoData = {}
        dtoData["mktoPreFillFields"] = event.data
        a.cb.call(this, f)
      }
    });
    /* eslint-enable */
  }
  var f = this
  return {
    getGlobal() {
      return dtoData
    },
    cleanup() {
      if (c && c.parentNode) {
        c.parentNode.removeChild(c)
      }
    },
    parse(b) {
      b = document.querySelector(`.dto-xml[data-field-collection="${b}"]`).text
      b = new DOMParser().parseFromString(b, "application/xml")
      let a = b.querySelector("mktoPreFillFields")
      a = a.getAttribute("varName") || a.tagName
      let c = {}
      e(b.querySelectorAll("mktoPreFillFields mktoField")).forEach(function (a) {
        c[a.getAttribute("inputName")] = a.textContent
      })
      c['dto_status'] = 'completed'
      return self[a] = c
    },
  }
}

export default SimpleDTO
