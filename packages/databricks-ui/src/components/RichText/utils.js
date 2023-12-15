import React from "react"

// Check if a URL is external
function isExternalURL(url) {
  const regex = /^(https?:)?\/\/(www\.)?([^/]+)\./
  const domain =
    (typeof window !== "undefined" && window?.location?.hostname) || false
  const isExternalDomain =
    !String(url).includes(domain) &&
    !String(url).includes("www.databricks.com") &&
    !String(url).includes("dev-web.databricks.com") &&
    !String(url).includes("stage.databricks.com")
  return regex.test(url) && isExternalDomain
}

// Check if a URL ends with ".pdf"
function isPDFLink(url) {
  return url?.toLowerCase()?.endsWith(".pdf")
}

function shouldOpenInNewTab(url) {
  if (!url) return false

  return isExternalURL(url) || isPDFLink(url)
}

// Uses a regular expression to get the anchors from the string.
function getUrlsFromString(content) {
  const urls = []

  content.replace(
    /[^<]*(<a([^<]*)href="([^"]+)"([^<]*)>([^<]+)<\/a>)/g,
    (...rest) => {
      urls.push(Array.prototype.slice.call(rest, 1, 6))
    }
  )

  return urls
}

// Function to add target="_blank" to external and PDF links in the content
export function processContent(children) {
  // Check if the children is a string
  if (typeof children === "string") {
    const urls = getUrlsFromString(children)
    let modifiedContent = children

    // Replace each URL with a modified anchor tag
    urls?.forEach((urlMatch) => {
      const [fullMatch, beforeHref, url, afterHref, customText] = urlMatch
      const linkText = customText || url
      // TODO: Reintroduce some sort of DOMParser to handle other props like classNames
      if (url && shouldOpenInNewTab(url)) {
        modifiedContent = modifiedContent.replace(
          fullMatch,
          `<a href="${url}" target="_blank" rel="noreferrer">${linkText}</a>`
        )
      } else {
        modifiedContent = modifiedContent.replace(
          fullMatch,
          `<a href="${url}" rel="noreferrer">${linkText}</a>`
        )
      }
    })

    return modifiedContent
  }

  // If the children is not a string or a React node, return it as-is
  return children
}
