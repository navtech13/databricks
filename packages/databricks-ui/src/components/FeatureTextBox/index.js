import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import TextLink from "../TextLink"
import RichText from "../RichText"

const FeatureTextBox = ({ image, cta, children, ...props }) => {
  return (
    <div
      data-cy='FeatureTextBox'
      className='flex flex-col gap-2 md:flex-row md:gap-2.5 lg:gap-4'
      {...props}
    >
      <div className='max-w-[194px] md:w-3/12 md:max-w-full lg:px-4'>
        {image && <Image {...image} />}
      </div>
      <div className='flex flex-col gap-1 md:w-9/12 md:gap-1'>
        {children && <RichText className='b2'>{children}</RichText>}
        {cta && (
          <TextLink
            label={cta.label}
            variant='A'
            className='arrow-icon b4 after:ml-0.5'
            to={cta.to}
          >
            {cta.label}
          </TextLink>
        )}
      </div>
    </div>
  )
}

FeatureTextBox.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  image: PropTypes.shape({}),
  cta: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
  }),
}

FeatureTextBox.defaultProps = {
  children: undefined,
  image: undefined,
  cta: undefined,
}

export default FeatureTextBox
