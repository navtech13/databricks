import React from "react"
import { useLocation } from "@reach/router"
import PropTypes from "prop-types"
import { processContent } from "./utils"
import eventTracking from "gatsby-theme-databricks-drupal/src/helpers/eventTracking"
// import HtmlParser from "gatsby-theme-databricks-drupal/src/helpers/htmlParser"

const RichText = ({ children, variant, as: Component, ...props }) => {
  const variants = {
    body: "rich-text-body",
    blog: "rich-text-blog",
  }
  const richTextClickHandler = (e) => {
    let urlPath = ""
    let urlHost = ""
    try {
      urlPath = useLocation()
      urlHost = urlPath.host
    } catch (e) {
      if (typeof window !== "undefined") {
        urlHost = window.location.host
      }
    }

    const targetLink = e.target.closest("a")
    if (!targetLink) return
    const to = targetLink.href

    const elementText = targetLink.innerHTML ? targetLink.innerHTML : ""
    let elementHref = ""
    if (to) {
      // format href link with full url, no protocol
      elementHref =
        to.startsWith("/") || to.startsWith("#")
          ? urlHost + to
          : to.replaceAll("https://", "").replaceAll("http://", "")
    }

    const eventData = {
      event: "Link Clicked",
      elementType: "a",
      elementText: elementText,
      elementHref: elementHref,
    }
    eventTracking(eventData)

  }

  if (typeof children === "string") {
    // -- Can't use HtmlParser here, breaks layout for pages like /trust/security-features
    /*
    const content = HtmlParser(children)
    return (
      <Component className={variants[variant] || ""} {...props}>
        {content}
      </Component>
    ) */

    const content = processContent(children)
    const hasHTML = /<[a-z][\s\S]*>/i.test(content)
    if (hasHTML) {
      return (
        <Component
          className={variants[variant] || ""}
          {...props}
          dangerouslySetInnerHTML={{ __html: content }}
          onClick={richTextClickHandler}
        />
      )
    }
  }
  return (
    <Component className={variants[variant] || ""} {...props}>
      {children}
    </Component>
  )
}

RichText.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(["default", "body", "blog"]),
  as: PropTypes.string,
}

RichText.defaultProps = {
  variant: undefined,
  as: "div",
  children: null,
}

export default RichText
