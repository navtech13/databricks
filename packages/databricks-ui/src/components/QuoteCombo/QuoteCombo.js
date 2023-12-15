import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Link from "../TextLink"
import Image from "../Image"

const QuoteCombo = ({ image, graphic, children, cta, attribution }) => {
  return (
    <div className='border-gray-lines flex flex-col gap-3 border-t py-3 md:flex-row lg:gap-4'>
      <div className='w-5/12 md:w-2/12'>
        <Image {...image} />
      </div>
      <div className='w-full md:w-10/12 lg:w-8/12'>
        <RichText className='rich-text-body mb-2'>{children}</RichText>
        {attribution && (
          <RichText className='rich-text-body text-gray-text mb-2'>
            {attribution}
          </RichText>
        )}
        {cta?.text && (
          <Link
            to={cta.to}
            label={cta.text}
            className='arrow-icon flex items-center gap-1'
            variant='A'
          >
            {graphic && <Image className='inline-block w-3' {...graphic} />}
            {cta.text}
          </Link>
        )}
      </div>
    </div>
  )
}

QuoteCombo.propTypes = {
  image: PropTypes.shape({}).isRequired,
  graphic: PropTypes.shape({}),
  children: PropTypes.string.isRequired,
  cta: PropTypes.shape({
    text: PropTypes.string,
    to: PropTypes.string,
  }),
  attribution: PropTypes.string,
}

QuoteCombo.defaultProps = {
  graphic: undefined,
  cta: undefined,
  attribution: undefined,
}

export default QuoteCombo
