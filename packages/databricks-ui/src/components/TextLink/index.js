import React from "react"
import PropTypes from "prop-types"
import Link from "../Link"

const LinkComponent = ({
  as,
  to,
  label,
  variant,
  children,
  disabled,
  className,
  ...props
}) => {
  const Component = as || Link
  const variants = {
    A: disabled
      ? "text-navy-01 hover:text-navy-01 active:text-navy-01 hover:no-underline after:absolute after:content-['\u2192']"
      : "",
    B: disabled
      ? "text-navy-01 hover:text-navy-01 active:text-navy-01 hover:no-underline"
      : "text-navy-06 hover:text-navy-03 active:text-navy-06",
    C: `${
      disabled ? "hover:no-underline" : ""
    } py-1 block bg-nav-gray hover:bg-gray px-2.5 text-white hover:no-underline hover:text-white active:text-white`,
    D: `p-1 inline-block rounded text-center text-1.75 font-bold text-white hover:text-white hover:no-underline active:text-white ${
      disabled
        ? "bg-navy-06"
        : "bg-orange-04-a11y hover:bg-orange-700 hover:text-white active:bg-orange-500 disabled:bg-navy-300 transition-all duration-200"
    }`,
  }

  return (
    <Component
      to={!disabled && to}
      aria-disabled={disabled}
      aria-label={label || children}
      className={`${disabled ? "cursor-default" : "cursor-pointer"} ${
        variants[variant]
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}

LinkComponent.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
}

LinkComponent.defaultProps = {
  variant: "D",
  className: "",
  label: null,
  disabled: false,
  to: null,
  as: null,
}

export default LinkComponent
