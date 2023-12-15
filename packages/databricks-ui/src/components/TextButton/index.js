import React from "react"
import PropTypes from "prop-types"
import Link from "../Link"

const TextButton = ({ children, disabled, variant, className, to, ...props }) => {
  const variants = {
    A: "arrow-icon",
    B: `text-navy-06 arrow-icon arrow-icon-hover ${
      disabled ? "" : "hover:text-orange-04"
    }  transition-all duration-200 hover:no-underline`,
    C: "arrow-icon-tertiary tertiary-underline",
    D: "arrow-icon-tertiary",
  }
  return (
    <Link
      to={to}
      className={`block ${disabled ? "disabled" : ""} ${
        variants[variant]
      } ${className}`}
      {...props}
    >
      {children}
    </Link>
  )
}

TextButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(["A", "B", "C", "D"]),
  className: PropTypes.string,
  to: PropTypes.string,
}

TextButton.defaultProps = {
  disabled: false,
  variant: "B",
  className: "",
  to: undefined,
}

export default TextButton
