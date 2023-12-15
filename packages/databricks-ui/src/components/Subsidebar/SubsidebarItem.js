import React from "react"
import PropTypes from "prop-types"
import TextButton from "../TextButton"

const SubsidebarItem = ({ label, to, variant, children, ...props }) => {
  const variants = {
    A: "b2 py-1",
    B: "b4 py-0.5",
  }
  return (
    <li {...props}>
      <TextButton
        className={variants[variant]}
        to={to}
        aria-label={label}
        variant='B'
      >
        {label}
      </TextButton>
      {children}
    </li>
  )
}

SubsidebarItem.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.string,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

SubsidebarItem.defaultProps = {
  variant: "A",
  children: undefined,
}

export default SubsidebarItem
