import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Link from "../TextLink"
import Image from "../Image"

const CtaBlock = ({ variant, image, description, cta, summary, eyebrow }) => {
  const variantMap = {
    profileExtraSmall: {
      wrapper: "cta-block-icon-profile-xsmall flex gap-1 flex-wrap",
      content: "flex flex-col justify-center",
      image: "rounded-full overflow-hidden w-5 h-5",
      ctaStyle: "b5 flex flex-row items-center arrow-icon",
      summary: "w-full b5",
      description: "b6",
      imageOptions: {
        imgClassName: "rounded-full",
      },
    },
    profileSmall: {
      image: "w-16 h-16 mb-1",
      imageOptions: {
        imgClassName: "rounded-full",
      },
      description: "profile-card text-navy-06",
    },
    profileLarge: {
      wrapper: "cta-block-profile-large flex gap-2.5 flex-wrap",
      image: "rounded-full overflow-hidden w-16 h-16",
      content: "flex flex-col justify-center flex-1",
      description: "profile-card text-navy-06",
      summary: "w-full text-1.75",
      imageOptions: {
        imgClassName: "rounded-full",
      },
    },
    profileLargeGrid: {
      wrapper: " mb-12 flex w-full gap-2.5 flex-col",
      image: "rounded-full overflow-hidden max-w-[264px]",
      content: "flex flex-col justify-center flex-1",
      description: " h6 text-navy-06 text-center max-w-[264px]",
      summary: "w-full text-1.75",
      imageOptions: {
        imgClassName: "rounded-full",
      },
    },
    profileGray: {
      wrapper: "cta-block-profile-gray flex md:gap-2 gap-1 flex-wrap",
      image: "rounded-full overflow-hidden w-full",
      content: "h6 flex flex-col justify-center flex-1",
      description: "profile-card",
      summary: "w-full text-1.75",
      imageStyles: "grayscale",
      imageOptions: {
        imgClassName: "rounded-full",
      },
    },
    promo: {
      wrapper: "cta-block-promo flex flex-wrap gap-4",
      image: "w-20 lg:w-1/2",
      content: "w-full lg:flex-1",
      description: "promo-card mb-2.5",
    },
    tile: {
      wrapper: "cta-block-tile flex gap-1 flex-col md:gap-2",
      image: "md:w-20 w-4/12",
      description: "profile-card lg:pr-4",
      content: "w-full md:w-auto",
    },
    columns: {
      // TODO: remove deprecated variant
      wrapper: "cta-block-icon icons flex flex-col md:flex-row md:gap-4",
      image: "max-w-[120px] w-full mb-4 md:mb-0",
      description: "profile-card",
      content: "md:w-8/12",
    },
    icon: {
      wrapper: "cta-block-icon flex flex-col gap-2",
      image: "w-12",
      description: "profile-card",
    },
    eyebrow: {
      wrapper: "cta-block-tile flex gap-1 flex-row md:flex-col md:gap-2",
      image: "hidden",
      description: "profile-card lg:pr-4 text-navy-800 b4",
      content: "",
      eyebrow: "block font-bold text-orange-800 pb-1",
      ctaStyle:
        "text-blue-700 hover:text-blue-700 arrow-icon-tertiary tertiary-underline mt-2 flex flex-row items-center",
    },
  }
  const currentVariant = variantMap[variant] || variantMap.tile

  return (
    <div className={currentVariant?.wrapper} data-cy='CtaBlock'>
      <div className={currentVariant?.image}>
        <Image
          className={currentVariant?.imageStyles}
          imageOptions={currentVariant?.imageOptions}
          {...image}
        />
      </div>
      <div className={currentVariant.content}>
        {variant === "eyebrow" ? (
          <h5 className={currentVariant.eyebrow}>{eyebrow}</h5>
        ) : null}
        <RichText className={`${currentVariant.description}`}>
          {description}
        </RichText>
        {cta?.text && (
          <Link
            to={cta.to}
            label={cta.text}
            className={
              currentVariant?.ctaStyle ||
              "arrow-icon mt-2 flex flex-row items-center"
            }
            variant='A'
          >
            {cta.text}
          </Link>
        )}
      </div>
      {summary && <RichText className={currentVariant?.summary}>{summary}</RichText>}
    </div>
  )
}

CtaBlock.propTypes = {
  image: PropTypes.shape({}).isRequired,
  description: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "profileExtraSmall",
    "profileSmall",
    "profileLarge",
    "profileGray",
    "promo",
    "tile",
    "columns",
    "icon",
    "eyebrow",
  ]),
  cta: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
  }),
  summary: PropTypes.string,
  eyebrow: PropTypes.string,
}

CtaBlock.defaultProps = {
  variant: "tile",
  cta: undefined,
  summary: undefined,
  eyebrow: undefined,
}

export default CtaBlock
