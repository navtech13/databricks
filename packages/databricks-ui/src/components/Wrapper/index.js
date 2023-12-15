import React from "react"
import PropTypes from "prop-types"

const Wrapper = ({ children, title, secondaryTitle, className, ...props }) => {
  return (
    <div data-cy='Wrapper' className={`outer-wrapper ${className}`} {...props}>
      <div className='inner-wrapper'>
        {title && <h2 className='section-title'>{title}</h2>}
        {children}
      </div>
    </div>
  )
}
Wrapper.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  secondaryTitle: PropTypes.string,
}

Wrapper.defaultProps = {
  title: undefined,
  className: "",
  secondaryTitle: "",
}

export default Wrapper
