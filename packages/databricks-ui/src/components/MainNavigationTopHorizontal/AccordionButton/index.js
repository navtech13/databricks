import React from "react"
import PropTypes from "prop-types"
import RichText from "../../RichText"

const AccordionButton = ({ active, children, description, className, ...props }) => {
  return (
    <div className={`w-full ${className}`} {...props}>
      <span className='text-1.75 mt-3 flex justify-between text-left leading-none xl:mt-4 xl:block'>
        <span className='text-orange-04-a11y w-full pr-1 font-mono uppercase'>
          {children}
        </span>
      </span>
      {description && (
        <RichText className='text-gray-text text-1.5 mt-0.5 text-left leading-tight'>
          {description}
        </RichText>
      )}
    </div>
  )
}

AccordionButton.propTypes = {
  active: PropTypes.bool,
  description: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

AccordionButton.defaultProps = {
  active: undefined,
  description: undefined,
  className: undefined,
}

export default AccordionButton
