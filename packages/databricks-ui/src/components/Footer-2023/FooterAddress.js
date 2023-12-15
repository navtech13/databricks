import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"

const FooterAddress = ({ children, ...props }) => {
  return (
    <RichText className=' text-1.5 max-w-[164px] leading-5' {...props}>
      {children}
    </RichText>
  )
}

FooterAddress.propTypes = {
  children: PropTypes.node.isRequired,
}

export default FooterAddress
