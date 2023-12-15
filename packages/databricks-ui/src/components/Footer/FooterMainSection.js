import React from "react"
import PropTypes from "prop-types"

const FooterMainSection = ({ children, ...props }) => {
  return (
    <div
      className='mb-4 flex flex-col justify-between lg:mb-8 lg:flex-row'
      {...props}
    >
      {children}
    </div>
  )
}

FooterMainSection.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FooterMainSection
