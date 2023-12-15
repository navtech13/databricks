import React from "react"
import PropTypes from "prop-types"

const FooterRegionItem = ({ children, separator, ...props }) => {
  return (
    <div className='basis-full' {...props}>
      <div className={`${separator ? "border-navy-04 border-l pl-2" : ""}`}>
        {children}
      </div>
    </div>
  )
}

FooterRegionItem.propTypes = {
  children: PropTypes.node.isRequired,
  separator: PropTypes.bool,
}

FooterRegionItem.defaultProps = {
  separator: false,
}

export default FooterRegionItem
