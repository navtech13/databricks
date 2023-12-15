import React from "react"
import PropTypes from "prop-types"

const MainNavigationMenu = ({ children, divider, ...props }) => {
  return (
    <>
      <ul {...props}>{children}</ul>
      {divider && (
        <div
          aria-hidden
          className='border-dark-gray my-4 mx-2.5 w-20 border-t border-opacity-0 lg:w-auto lg:border-opacity-100'
        />
      )}
    </>
  )
}

MainNavigationMenu.propTypes = {
  children: PropTypes.node.isRequired,
  divider: PropTypes.bool,
}

MainNavigationMenu.defaultProps = {
  divider: false,
}

export default MainNavigationMenu
