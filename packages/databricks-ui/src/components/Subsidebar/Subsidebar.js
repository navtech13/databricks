import React from "react"
import PropTypes from "prop-types"

const Subsidebar = ({ children, ...props }) => {
  return (
    <ul
      className='fixed left-20 hidden -translate-y-12 bg-white transition-all duration-200 focus-within:flex group-hover:flex'
      {...props}
    >
      {children}
    </ul>
  )
}

Subsidebar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Subsidebar
