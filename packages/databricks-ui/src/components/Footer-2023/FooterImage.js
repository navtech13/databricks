import React from "react"
import PropTypes from "prop-types"

const FooterImage = ({ children, className, ...props }) => {
  return (
    <div className={`main-image max-w-[126px] ${className}`} {...props}>
      {children}
    </div>
  )
}

FooterImage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
FooterImage.defaultProps = {
  className: "",
}

export default FooterImage
