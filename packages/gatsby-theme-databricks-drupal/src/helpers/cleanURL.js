const cleanURL = (url) => {
  if (typeof url !== "string" && !(url instanceof String)) {
    return ""
  }

  let returnURL = url
  returnURL = returnURL
    .replace("//cms.databricks.com", "//www.databricks.com")
    .replace("//live-databricksinc.pantheonsite.io", "//www.databricks.com")

  return returnURL
}

export default cleanURL
