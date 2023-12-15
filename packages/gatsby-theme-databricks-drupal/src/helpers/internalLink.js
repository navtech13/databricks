import { useCurrentPrefix } from "../utils/current-prefix"

const internalLink = (to) => {
  if (!to) {
    return true
  }
  // Specific to blog homepage
  if (to === "/") {
    return false
  }
  // Javascript execution links are internal links
  if (
    // eslint-disable-next-line no-script-url
    to?.indexOf("javascript:") === 0
  ) {
    return true
  }
  // Links from blog/page/121 (linking to legacy) return 404
  if (
    // 2019 and older
    to?.indexOf("/blog/201") === 0 ||
    to?.indexOf("/blog/2021") === 0 ||
    to?.indexOf("/blog/2020") === 0
  ) {
    return false
  }
  if (to?.indexOf("http") === 0) {
    return false
  }
  if (typeof window !== "undefined") {
    const langPrefix = useCurrentPrefix()
    const currentPath = window.location.pathname
      .replace(langPrefix, "")
      .split("/")
      .filter((path) => path)
    const rootPath = currentPath[0] ? currentPath[0].replace("/", "") : "/"
    const internal = /^\/(?!\/)/.test(to)
    const regex = new RegExp(rootPath)
    const isMigrated = regex.test(to)
    const samePage = /^#/.test(to)
    return samePage || (internal && isMigrated)
  }

  return false
}

export default internalLink
