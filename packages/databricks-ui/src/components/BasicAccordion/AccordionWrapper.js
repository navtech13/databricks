import React from "react"
import PropTypes from "prop-types"

const AccordionWrapper = ({
  children,
  title,
  sectionTitle,
  className,
  ...props
}) => {
  return (
    <div className={`outer-wrapper ${className}`} {...props}>
      <div className='inner-wrapper'>
        {sectionTitle && <h2 className='text-2.5 mb-2 font-bold'>{sectionTitle}</h2>}
        {title && <h2 className='section-title'>{title}</h2>}
        {children}
      </div>
    </div>
  )
}
AccordionWrapper.propTypes = {
  title: PropTypes.string,
  secondaryTitle: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  sectionTitle: PropTypes.string,
}

AccordionWrapper.defaultProps = {
  title: undefined,
  secondaryTitle: undefined,
  className: "",
  sectionTitle: "",
}

export default AccordionWrapper
