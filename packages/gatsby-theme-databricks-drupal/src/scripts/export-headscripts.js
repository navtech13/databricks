import { onetrustBody } from "./onetrust"
import { debugBody } from "./debug"

const debugBodyScript = document.createElement("script")
debugBodyScript.innerHTML = debugBody
document.head.appendChild(debugBodyScript)
