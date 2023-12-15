const sameTab = (to) =>
  !(
    to?.includes(".pdf")
  )
  &&
  (to?.includes("www.databricks.com/") ||
    to?.startsWith("/") ||
    to?.startsWith("#") ||
    to?.includes("localhost") ||
    to?.includes("stage.databricks.com/") ||
    to?.includes("dev-web.databricks.com/") ||
    to?.includes(".vercel.app/"))

export default sameTab
