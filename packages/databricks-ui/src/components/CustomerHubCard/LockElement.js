import PropTypes from "prop-types"
import React from "react"
import IconResolver from "../IconResolver"

const LockElement = ({ isSmall, isAbsolute, className = "" }) => {
  return (
    <div
      className={`${isAbsolute ? "absolute top-2 right-2" : ""} bg-navy-800 ${
        isSmall ? "h-3 w-3" : "h-4 w-4"
      } flex items-center justify-center rounded-full ${className}`}
    >
      <IconResolver
        token='lock'
        className={`${isSmall ? "w-1.5" : "w-2"} text-white`}
      />
    </div>
  )
}

LockElement.propTypes = {
  isSmall: PropTypes.bool,
  isAbsolute: PropTypes.bool,
  className: PropTypes.string,
}

LockElement.defaultProps = {
  isSmall: false,
  isAbsolute: false,
  className: "",
}

export default LockElement
