import React from "react"
import PropTypes from "prop-types"

export const DemoNav = ({ className }) => {
  return <div className={className}> </div>
}
DemoNav.propTypes = {
  className: PropTypes.string.isRequired,
}

export const DemoFooter = ({ className }) => {
  return <div className={className}> </div>
}
DemoFooter.propTypes = {
  className: PropTypes.string.isRequired,
}
