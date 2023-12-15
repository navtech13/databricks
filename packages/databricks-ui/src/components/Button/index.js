import React from "react"
import PropTypes from "prop-types"
import { useLocation } from "@reach/router"
import eventTracking from "../../../../gatsby-theme-databricks-drupal/src/helpers/eventTracking"
import extractString from "../../utils/extractString"

const Button = ({ variant, as, className, ...props }) => {
  const Component = as
  let urlPath = ""
  try {
    urlPath = useLocation()
  } catch (e) {
    // catch situation where LocationProvider is not available (e.g. Storybook) instead of throwing Exception
  }

  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    tertiary: "btn-tertiary",
    secondaryNavy: "btn-secondary-navy",
    promo: "btn-promo",
    disabled: "text-white bg-navy-01 hover:text-white",
    white: "btn-white",
    whiteRounded: "btn-white rounded-full",
  }

  const linkClick = (to, children) => {
    if (urlPath !== "") {
      const elementText = extractString(children)
      let elementHref = ""
      if (to) {
        // format href link with full url, no protocol
        elementHref =
          to.startsWith("/") || to.startsWith("#")
            ? urlPath.host + to
            : to.replaceAll("https://", "").replaceAll("http://", "")
      }

      const eventData = {
        event: "Link Clicked",
        elementType: "button",
        elementText,
        elementHref,
      }
      eventTracking(eventData)
    }
  }

  return (
    <Component
      data-cy='Button'
      onClick={() => linkClick(props.to, props.children)}
      className={`b4 inline-block py-1 px-2.5 transition duration-200 ease-in-out hover:no-underline ${variants[variant]} ${className}`}
      {...props}
    />
  )
}

Button.propTypes = {
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "tertiary",
    "secondaryNavy",
    "disabled",
    "promo",
    "white",
    "whiteRounded",
  ]),
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
  className: PropTypes.string,
}

Button.defaultProps = {
  variant: "primary",
  as: "a",
  className: "",
}

export default Button
