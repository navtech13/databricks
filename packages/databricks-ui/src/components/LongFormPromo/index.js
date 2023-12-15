import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Button from "../Button"
import Image from "../Image"
import Link from "../Link"

const LongFormPromo = ({ children, source, cta, image, ...props }) => {
  return (
    <div
      className='bg-gray-warm-medium flex flex-col items-center p-3 md:flex-row md:p-4'
      {...props}
    >
      <div className='mb-6 w-full md:mb-0 md:pr-8'>
        <RichText className='h4 mb-1 font-bold'>{children}</RichText>
        <RichText className='h5 mb-2.5'>{source}</RichText>
        <Button to={cta.to} as={Link} variant='primary'>
          {cta.label}
        </Button>
      </div>
      <div className='flex justify-center md:justify-end'>
        <Image className='shadow-card-hover h-auto w-[300px] bg-white' {...image} />
      </div>
    </div>
  )
}

LongFormPromo.propTypes = {
  children: PropTypes.node.isRequired,
  source: PropTypes.string.isRequired,
  cta: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
  }),
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
}

LongFormPromo.defaultProps = {
  cta: undefined,
  image: undefined,
}

export default LongFormPromo
