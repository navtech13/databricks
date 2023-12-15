import React from "react"
import PropTypes from "prop-types"
import TextButton from "../TextButton"
import RichText from "../RichText"
import Image from "../Image"
import Link from "../Link"

const variantMap = {
  default: {
    container:
      "bg-gray-cool py-3 px-1.5 h-[400px] md:h-[500px] lg:h-full lg:py-6 lg:px-6",
    imageContainer: "shadow-card-normal h-25 mb-2.5 md:h-[350px] lg:mb-2 lg:h-auto",
    imageOptions: { className: "h-full object-contain lg:h-auto" },
    textContainer: "",
    textStyles: "b5",
    ctaStyles: "hover:text-orange-04 b4 mt-1.5 lg:mt-1.5",
  },
  megaMenu: {
    container:
      "flex flex-row-reverse xl:justify-end py-2.4 xl:pb-1.6 gap-0.8 xl:flex xl:flex-col-reverse xl:bg-oat-light xl:h-full xl:pr-3 xl:-mr-3 px-1.6 justify-between",
    imageContainer: "xl:max-w-[360px] xl:max-h-full w-1/3 xl:w-full",
    imageStyles: "h-full",
    imageOptions: { className: "h-full" },
    textContainer:
      "xl:w-full w-2/3 flex gap-0.8 flex-col xl:min-h-[108px] xl:max-w-[360px]",
    textStyles: " text-1 xl:text-1.4 line-clamp-2",
    ctaStyles:
      "xl:text-1.6 text-1.4 arrow-icon-tertiary tertiary-underline text-navy-800 overflow-hidden hover:text-navy-800",
  },
}

const PromotionBlock = ({
  children,
  image,
  cta,
  className,
  variant,
  eyebrow,
  ...props
}) => {
  const currentVariant = variantMap[variant]
  return (
    <div
      data-cy='PromotionBlock'
      className={`${currentVariant.container} ${className}`}
      {...props}
    >
      {image ? (
        <Link
          to={cta?.to}
          tabIndex={-1}
          className={`${currentVariant.imageContainer}`}
        >
          <Image
            className={currentVariant.imageStyles || ""}
            imageOptions={currentVariant.imageOptions}
            {...image}
          />
        </Link>
      ) : (
        <div />
      )}
      <div className={`${currentVariant.textContainer}`}>
        {eyebrow && (
          <p className='text-1 text-gray-text font-mono uppercase leading-none'>
            {eyebrow}
          </p>
        )}
        <RichText className={`${currentVariant.textStyles}`}>{children}</RichText>
        <TextButton
          className={`${currentVariant.ctaStyles}`}
          to={cta.to}
          aria-label={cta.label}
          variant='A'
        >
          {cta.text}
        </TextButton>
      </div>
    </div>
  )
}

PromotionBlock.propTypes = {
  children: PropTypes.node.isRequired,
  cta: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
    label: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  eyebrow: PropTypes.string,
  variant: PropTypes.oneOf(["megaMenu", "default"]),
  image: PropTypes.shape({}),
}

PromotionBlock.defaultProps = {
  className: "",
  eyebrow: undefined,
  variant: "default",
  image: undefined,
}

export default PromotionBlock
