import { onetrustBody } from "./onetrust"
import { debugBody } from "./debug"
import { rudderstackScript } from "./rudderstack"
import eventTracking, {
  loadOneTrust,
  loadRudderStack,
  handleMarketoEvents,
} from "../helpers/eventTracking"

const debugBodyScript = document.createElement("script")
debugBodyScript.innerHTML = debugBody
debugBodyScript.async = true
document.head.appendChild(debugBodyScript)

const onetrustScript = document.createElement("script")
onetrustScript.innerHTML = onetrustBody
onetrustScript.async = true
document.head.appendChild(onetrustScript)

const rudderstackScriptBody = document.createElement("script")
rudderstackScriptBody.innerHTML = rudderstackScript
rudderstackScriptBody.async = true
document.head.appendChild(rudderstackScriptBody)

loadOneTrust()
loadRudderStack()
handleMarketoEvents()
document.addEventListener(`click`, (e) => {
  const origin = e.target.closest(`a`)
  if (origin) {
    const elementText = origin.hasAttribute("text") ? origin.text : origin.innerText
    const elementHref = origin.hasAttribute("href")
      ? origin.href.replaceAll("https://", "").replaceAll("http://", "")
      : undefined
    const eventData = {
      event: "Link Clicked",
      elementType: "a",
      elementText,
      elementHref,
    }
    eventTracking(eventData)
  }
})
