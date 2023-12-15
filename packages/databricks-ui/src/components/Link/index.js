import React from "react"
import PropTypes from "prop-types"
import { useLocation } from "@reach/router"
import internalLink from "../../../../gatsby-theme-databricks-drupal/src/helpers/internalLink"
import eventTracking from "../../../../gatsby-theme-databricks-drupal/src/helpers/eventTracking"
import isSameTab from "../../utils/sameTab"
import extractString from "../../utils/extractString"

const LinkComponent = ({ to, children, onClickCallback, event, ...props }) => {
  const internal = internalLink(to)
  let urlPath = ""
  try {
    urlPath = useLocation()
  } catch (e) {
    // catch situation where LocationProvider is not available (e.g. Storybook) instead of throwing Exception
  }

  const sameTab = internal || isSameTab(to)

  const linkClick = (anchorClickEvent, linkTo, linkChildren) => {
    if (urlPath !== "" && linkTo) {
      const elementText = extractString(linkChildren)
      let elementHref = ""
      if (linkTo) {
        // format href link with full url, no protocol
        elementHref =
          linkTo.startsWith("/") || linkTo.startsWith("#")
            ? urlPath.host + linkTo
            : linkTo.replaceAll("https://", "").replaceAll("http://", "")
      }
      const eventData = {
        event: "Link Clicked",
        elementType: "a",
        elementText,
        elementHref,
      }
      eventTracking(eventData)
    }
    if (event) {
      const eventHandler = new CustomEvent(event, {
        detail: { to, target: anchorClickEvent.target, event: anchorClickEvent },
      })
      document.dispatchEvent(eventHandler)
    }
    if (typeof onClickCallback === "function") {
      onClickCallback(anchorClickEvent)
    }
  }

  return internal ? (
    <a
      href={to}
      {...props}
      onClick={(anchorClickEvent) => linkClick(anchorClickEvent, to, children)}
    >
      {children}
    </a>
  ) : (
    <a
      data-external-link='true'
      href={to}
      {...props}
      onClick={(anchorClickEvent) => linkClick(anchorClickEvent, to, children)}
      {...(!sameTab && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  )
}

LinkComponent.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClickCallback: PropTypes.func,
  event: PropTypes.string,
}

LinkComponent.defaultProps = {
  to: null,
  onClickCallback: undefined,
  event: undefined,
}

export default LinkComponent
