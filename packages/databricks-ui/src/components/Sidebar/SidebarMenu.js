import React from "react"
import PropTypes from "prop-types"

const SidebarMenu = ({ children, divider, ...props }) => {
  return (
    <ul {...props}>
      {children}
      {divider && (
        <div aria-hidden className='border-dark-gray my-4 mx-1 border-t' />
      )}
    </ul>
  )
}

SidebarMenu.propTypes = {
  children: PropTypes.node.isRequired,
  divider: PropTypes.bool,
}

SidebarMenu.defaultProps = {
  divider: false,
}

export default SidebarMenu
