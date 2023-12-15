import React from "react"
import PropTypes from "prop-types"

const Footer = ({ children, ...props }) => {
  return (
    <footer
      data-cy='Footer'
      className='footer-2023 bg-navy-800 text-white'
      {...props}
    >
      <div className='inner-wrapper py-13'>{children}</div>
    </footer>
  )
}

Footer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Footer
