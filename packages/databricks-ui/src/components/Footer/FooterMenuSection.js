import React from "react"
import PropTypes from "prop-types"

const FooterMenuSection = ({ children, ...props }) => {
  return (
    <ul
      data-cy='FooterMenuSection'
      className='text-1.5 lg:text-1.4 mb-4 flex flex-col md:mb-5 md:flex-row lg:mb-0 lg:w-7/12'
      {...props}
    >
      {children}
    </ul>
  )
}

FooterMenuSection.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FooterMenuSection
