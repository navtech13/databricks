import "databricks-ui/src/css/index.css"
import { Modal } from "databricks-ui"

Modal.setRootElement("#___gatsby")

export const onInitialClientRender = () => {
  document.querySelector("body").dataset.gatsbystatus = "loaded"
}

export { wrapPageElement } from "./gatsby-ssr" // eslint-disable-line
