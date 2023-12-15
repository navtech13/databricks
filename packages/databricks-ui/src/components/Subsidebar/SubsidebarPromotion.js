import React from "react"
import PropTypes from "prop-types"
import TextButton from "../TextButton"
import RichText from "../RichText"

const SubsidebarPromotion = ({ children, cta, ...props }) => {
  return (
    <div className='bg-gray-cool w-[385px] p-8' {...props}>
      <RichText>{children}</RichText>
      <TextButton
        className='hover:text-orange-04 mt-4'
        to={cta.to}
        aria-label={cta.label}
        variant='A'
      >
        {cta.text}
      </TextButton>
    </div>
  )
}

SubsidebarPromotion.propTypes = {
  children: PropTypes.node.isRequired,
  cta: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
}

export default SubsidebarPromotion
