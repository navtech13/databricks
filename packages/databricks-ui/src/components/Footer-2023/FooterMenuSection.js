import React from "react"
import PropTypes from "prop-types"

const FooterMenuSection = ({ children, ...props }) => {
  return (
    <ul
      className='my-4 flex flex-col gap-4 lg:my-0 lg:w-full lg:flex-row'
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
