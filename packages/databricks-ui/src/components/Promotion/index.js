import React from "react"
import PropTypes from "prop-types"

const Promotion = ({ children, className, ...props }) => {
  return (
    <aside data-cy='Promotion' className={`mt-8 px-2 ${className}`} {...props}>
      {children}
    </aside>
  )
}

Promotion.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Promotion.defaultProps = {
  className: "",
}

export default Promotion
