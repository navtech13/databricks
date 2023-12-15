import React from "react"
import PropTypes from "prop-types"

const SubsidebarSubMenu = ({ children, ...props }) => {
  return (
    <ul className='pl-1' {...props}>
      {children}
    </ul>
  )
}

SubsidebarSubMenu.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SubsidebarSubMenu
