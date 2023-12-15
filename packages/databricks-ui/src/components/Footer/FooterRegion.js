import React from "react"
import PropTypes from "prop-types"

const FooterRegion = ({ children, ...props }) => {
  return (
    <div className='footer-region flex md:w-6/12 lg:w-4/12' {...props}>
      {children}
    </div>
  )
}

FooterRegion.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FooterRegion
