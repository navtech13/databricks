import React from "react"
import PropTypes from "prop-types"

const SubsidebarMenu = ({ children, ...props }) => {
  return (
    <li className='block min-w-[330px] py-6 px-4 only-of-type:min-w-[440px]'>
      <ul {...props}>{children}</ul>
    </li>
  )
}

SubsidebarMenu.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SubsidebarMenu
