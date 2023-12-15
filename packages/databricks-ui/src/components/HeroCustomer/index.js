import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import ThumbnailModal from "../ThumbnailModal"
import Image from "../Image"
import Link from "../Link"
import { generateCTAs } from "../../utils/generateCTAs"

// The image Styles absolute position may not be needed, but removing this for the default variant
// will alter the bottom spacings on all the places it's implemented (this may cause regression if
// custom spacings were added to the component).
const variantMap = {
  no_stats: {
    title: "h1-5 font-medium",
    description: "md:h4 text-2",
    buttonStyles: "w-full max-w-[130px] md:max-w-max md:px-4",
    buttonsWrapper: "pt-4 flex flex-col items-start gap-2.5 md:flex-row lg:gap-4",
    imageStyles: "",
  },
  default: {
    title: "title",
    description: "h3",
    buttonStyles: null,
    buttonsWrapper: "pt-4 flex flex-col items-start gap-2.5 lg:flex-row lg:gap-4",
    imageStyles: "md:absolute",
  },
}

const HeroCustomer = ({
  title,
  description,
  logo,
  eyebrow,
  image,
  items,
  ctas,
  variant,
}) => {
  const currentVariant = variantMap[variant] || variantMap.default
  const ImageElement = image?.videoSrc ? ThumbnailModal : Image
  return (
    <section
      data-cy='HeroCustomer'
      className='flex flex-col justify-between gap-4 md:flex-row md:gap-2 lg:gap-4'
    >
      <div className='w-full md:w-7/12'>
        {logo && (
          <Image
            imageOptions={{ className: "h-full object-contain object-left" }}
            className='mb-2 h-6 w-[293px] lg:h-8'
            {...logo}
          />
        )}
        {eyebrow && (
          <RichText className='h4 text-maroon-04 mb-2 font-bold'>{eyebrow}</RichText>
        )}
        <div className='text-navy-06 flex flex-col gap-2'>
          <h1 className={`${currentVariant.title}`}>{title}</h1>
          {description && (
            <RichText className={`${currentVariant.description}`}>
              {description}
            </RichText>
          )}
        </div>
        {items?.length > 0 && (
          <div className='flex gap-3 pt-4 md:w-full md:gap-4 lg:gap-4'>
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <RichText className='h2'>{item.title}</RichText>
                  <RichText className='h5'>{item.description}</RichText>
                </div>
              )
            })}
          </div>
        )}
        {ctas.length > 0 && (
          <div className={`${currentVariant.buttonsWrapper}`}>
            {generateCTAs(ctas, Link, currentVariant.buttonStyles)}
          </div>
        )}
      </div>
      <div className='w-full md:relative md:w-5/12'>
        <ImageElement
          className={`xxl:w-[85%] w-auto md:h-auto md:w-full ${currentVariant.imageStyles}`}
          {...image}
        />
      </div>
    </section>
  )
}

HeroCustomer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  eyebrow: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
    })
  ),
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    videoSrc: PropTypes.string,
  }),
  logo: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  variant: PropTypes.oneOf(["no_stats", "default"]),
}

HeroCustomer.defaultProps = {
  eyebrow: undefined,
  description: undefined,
  image: undefined,
  logo: undefined,
  items: undefined,
  ctas: undefined,
  variant: "default",
}

export default HeroCustomer
