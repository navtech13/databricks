import React from "react"
import PropTypes from "prop-types"
import TextLink from "../TextLink"

const SidebarItem = ({ label, to, type, active, children, ...props }) => {
  const types = {
    hover: {
      variant: "C",
      styles: !active && "hover:bg-gray leading-5 transition-all duration-200",
    },
    button: { variant: "D", styles: "mx-1 mb-1" },
    text: { variant: "C", styles: "" },
  }

  return (
    <li data-cy='SidebarItem' className={`group ${types[type].styles}`} {...props}>
      <TextLink
        variant={types[type].variant}
        label={label}
        to={to}
        className={`${type === "hover" ? "focus:bg-gray hover:no-underline" : ""}`}
      >
        {label}
      </TextLink>
      {children}
    </li>
  )
}

SidebarItem.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  type: PropTypes.string,
  active: PropTypes.bool,
}

SidebarItem.defaultProps = {
  type: "hover",
  active: false,
  children: undefined,
}

export default SidebarItem
