import React from "react"
import PropTypes from "prop-types"
import TextLink from "../TextLink"
import RichText from "../RichText"
import Image from "../Image"

const CtaHexImage = ({ children, title, image, cta, className }) => {
  return (
    <div
      data-cy='CtaHexImage'
      className={`flex flex-col items-start gap-4 md:flex-row md:gap-0 ${className} justify-between`}
    >
      {image && (
        <div className='hex-image h-20 w-20 md:relative md:after:block md:after:pb-[100%]'>
          <Image
            className='h-full w-full md:absolute md:top-0 md:left-0'
            imageOptions={{ className: "h-full object-cover" }}
            {...image}
          />
        </div>
      )}
      <RichText className='b1 md:w-5/12'>{title}</RichText>
      <div className='md:w-1/3'>
        <RichText className='b4 rich-text-body'>{children}</RichText>
        {cta && (
          <TextLink
            variant='A'
            className='b4 mt-2.5 block after:ml-0.5'
            to={cta.to}
            label={cta.label}
          >
            <span className='arrow-icon'>{cta.label}</span>
          </TextLink>
        )}
      </div>
    </div>
  )
}

CtaHexImage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  cta: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
  }),
}

CtaHexImage.defaultProps = {
  className: "",
  cta: undefined,
}

export default CtaHexImage
