import React from "react"
import PropTypes from "prop-types"

const FooterMainSection = ({ children, ...props }) => {
  return (
    <div
      className='mb-8 flex flex-col justify-between lg:flex-row-reverse lg:gap-4'
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
