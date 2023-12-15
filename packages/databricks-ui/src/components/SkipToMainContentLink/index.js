import React from "react"
import PropTypes from "prop-types"

const SkipToMainLink = ({ label, href, ...props }) => {
  return (
    <a
      href={href}
      className='focus:text-navy-06 sr-only focus:not-sr-only focus:absolute focus:left-1 focus:top-1 focus:z-[200] focus:bg-white focus:px-2'
      {...props}
    >
      {label}
    </a>
  )
}

SkipToMainLink.propTypes = {
  label: PropTypes.oneOf(PropTypes.arrayOf(PropTypes.string), PropTypes.string),
  href: PropTypes.string,
}

SkipToMainLink.defaultProps = {
  label: "Skip to main content",
  href: "#main",
}

export default SkipToMainLink
