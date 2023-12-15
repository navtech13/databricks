import React from "react"
import PropTypes from "prop-types"
import Link from "../../Link"
import RichText from "../../RichText"

const AccordionLink = ({ children, description, className, ...props }) => {
  const { onClickCallback, ...otherProps } = props
  return (
    <Link
      className={`text-navy-800 hover:text-navy-800 hover:no-underline ${className}`}
      onClickCallback={onClickCallback}
      {...otherProps}
    >
      <span className='w-full'>{children}</span>
      {description && (
        <RichText className='text-gray-text text-1.5 mt-0.5 text-left leading-tight'>
          {description}
        </RichText>
      )}
    </Link>
  )
}

AccordionLink.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  className: PropTypes.string,
  onClickCallback: PropTypes.func,
}
AccordionLink.defaultProps = {
  description: undefined,
  className: undefined,
  onClickCallback: undefined,
}
export default AccordionLink
