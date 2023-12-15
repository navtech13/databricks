import React from "react"

const extractString = (obj) => {
  if (typeof obj === "string") {
    return obj.replace(/(<([^>]+)>)/gi, "").trim()
  }
  if (React.isValidElement(obj)) {
    return extractString(obj.props.children)
  }
  if (Array.isArray(obj)) {
    return obj.map((e) => extractString(e)).join(" ").trim()
  }
  if (obj) {
    return obj.toString().replace(/(<([^>]+)>)/gi, "").trim()
  }
  return ""
}
export default extractString
