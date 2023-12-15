import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Image from "../Image"
import Button from "../Button"
import Link from "../Link"
import LottiePlayer from "../LottiePlayer"
import ThumbnailModal from "../ThumbnailModal"
import EmbedVideo from "../EmbedVideo"

const Hero = ({
  image,
  lottie,
  children,
  title,
  titleColor,
  variant,
  topLabel,
  topLabelColor,
  childrenColor,
  ctas,
  imageLink,
  videoSrc,
  background,
  heroAlignment,
  topSpacing,
  bottomSpacing,
  pageType,
  ...props
}) => {
  const hasAsset = image || videoSrc || lottie || heroAlignment
  const variantMap = {
    twoColumns: {
      imageStyles: "pb-5 md:pb-0",
      container: "min-h-[450px]",
      textStyles: "h3",
      titleStyles: "md:mb-4",
      buttonStyles: "secondary",
      textContainer: "md:pb-8",
      ctasStyles: "mt-4",
    },
    twoColumnsGray: {
      background: "bg-gray-warm-light",
      imageStyles: "pb-5 md:pb-0",
      container: "min-h-[450px]",
      textStyles: "h3",
      titleStyles: "md:mb-4",
      buttonStyles: "secondary",
      textContainer: "md:pb-8",
      ctasStyles: "mt-4",
    },
    twoColumnsWhite: {
      background: "bg-white",
      imageStyles: "pb-5 md:pb-0",
      container: "min-h-[450px]",
      textStyles: "h3",
      titleStyles: "md:mb-4",
      textContainer: `${
        hasAsset ? "lg:w-6/12" : "lg:w-8/12"
      } md:pb-5 md:pb-6 lg:pb-8`,
      buttonStyles: "secondary",
      ctasStyles: "mt-4",
    },
    twoColumnsNavy: {
      background: "bg-navy-06",
      imageStyles: "pb-5 md:pb-0",
      container: "min-h-[450px]",
      textStyles: "h3 text-white ",
      titleStyles: "md:mb-4 text-white",
      buttonStyles: "secondaryNavy",
      textContainer: "md:pb-8",
      ctasStyles: "mt-4",
    },
    twoColumnsGreen: {
      background: "bg-green-01",
      imageStyles: "lg:w-6/12",
      container: "min-h-[400px]",
      textStyles: "h3 ",
      titleStyles: "md:mb-1",
      buttonStyles: "secondary",
      textContainer: "md:pb-8",
      ctasStyles: "mt-4",
    },
    twoColumnsCondensed: {
      background: "bg-white",
      imageStyles: "pb-5 md:pb-0",
      container: "min-h-[250px]",
      textStyles: "h3",
      titleStyles: "md:mb-4",
      textContainer: "md:pb-8",
      buttonStyles: "secondary",
      ctasStyles: "mt-4",
    },
    twoColumnsCondensedTransparent: {
      imageStyles: "pb-5 md:pb-0",
      container: "min-h-[250px]",
      textStyles: "h3",
      titleStyles: "md:mb-4",
      textContainer: "md:pb-8",
      buttonStyles: "secondary",
      ctasStyles: "mt-4",
    },
    banner: {
      background: "bg-gray-warm-light btn-bg",
      textStyles: "h4 lg:h3 text-navy-01",
      textContainer: "lg:w-6/12 md:pb-2.5 lg:pb-8",
      container: "justify-center",
      titleStyles: "h2",
      textVariant: "heroBanner",
      imageStyles: "lg:w-4/12 md:w-5/12 self-stretch",
      ctasStyles: "mt-2.5",
    },
    bannerWhite: {
      background: "bg-white btn-bg",
      container: "py-1",
      textStyles: "h4 lg:h3 text-navy-06",
      textContainer: "w-full md:w-full md:pb-5 md:pb-8 lg:pb-8",
      titleStyles: "text-navy-06 font-medium",
      textVariant: "heroBanner",
      imageStyles: "lg:w-4/12 md:w-5/12 mb-5 md:mb-0",
      ctasStyles: "mt-2.5",
    },
    bannerGray: {
      background: "bg-gray-warm-medium btn-bg",
      container: "py-1",
      textStyles: "h4 lg:h3 text-navy-06",
      textContainer: "w-full md:w-full md:pb-5 md:pb-8 lg:pb-8",
      titleStyles: "text-navy-06 font-medium",
      textVariant: "heroBanner",
      imageStyles: "lg:w-4/12 md:w-5/12 mb-5 md:mb-0",
      ctasStyles: "mt-2.5",
    },
    largeBanner: {
      background: "bg-navy-06 btn-bg",
      textStyles: "h3 text-white",
      textContainer: `${
        hasAsset ? "lg:w-6/12" : "lg:w-8/12"
      } md:py-[180px] lg:py-[180px]`,
      container: "md:gap-8",
      titleStyles: "h1 text-white",
      imageStyles: "mb-5 md:mb-0",
      ctasStyles: "mt-2.5",
    },
  }

  const MediaWrapper = imageLink ? Link : "div"
  const ImageElement = videoSrc
    ? ({ ...rest }) => <ThumbnailModal videoSrc={videoSrc} {...rest} />
    : Image
  const isBackgroundHex = background?.startsWith("#")
  return (
    <div
      style={{ ...(isBackgroundHex && { background }) }}
      className={(!isBackgroundHex && background) || variantMap[variant]?.background}
    >
      {/* TODO Hamza to figure out how to deal with hero alignment */}
      <section
        data-cy='Hero'
        className={`${
          image || videoSrc || lottie || heroAlignment || !hasAsset
            ? "justify-between"
            : "justify-center"
        } xxl:max-w-[1456px] mx-auto flex w-[90%] max-w-[508px] flex-col items-center md:max-w-[704px] md:flex-row lg:max-w-[966px] xl:max-w-[1146px] ${
          variantMap[variant]?.container || ""
        }
        ${topSpacing}
        ${bottomSpacing}
        `}
        {...props}
      >
        <div
          className={`w-full pt-5 pb-5 md:w-6/12 ${
            variantMap[variant]?.textContainer || ""
          }
          ${!hasAsset && "md:w-10/12 lg:w-9/12"}
          `}
        >
          {topLabel && (
            <p
              className='text-orange-03 mb-2.5'
              {...(topLabelColor && { style: { color: topLabelColor } })}
            >
              {topLabel}
            </p>
          )}
          {title && (
            <h1
              className={`mb-2.5 ${variantMap[variant]?.titleStyles || ""}`}
              {...(titleColor && { style: { color: titleColor } })}
            >
              <RichText>
                {title.replace("\\n", "<br />")}
              </RichText>
            </h1>
          )}
          <RichText
            className={variantMap[variant]?.textStyles}
            {...(childrenColor && { style: { color: childrenColor } })}
          >
            {children}
          </RichText>
          {ctas?.length > 0 && (
            <div
              className={`flex items-start lg:flex-row  ${
                variantMap[variant]?.ctasStyles || ""
              }
              ${hasAsset && "flex-col"}
              `}
            >
              {ctas.map((element, index) => {
                return (
                  <Button
                    as={Link}
                    className={`${
                      hasAsset
                        ? "mr-2 mb-2.5 last:mb-0 last:mr-0 lg:mr-3"
                        : "mr-2 last:mr-0"
                    }
                    `}
                    variant={
                      index === 0 ? "primary" : variantMap[variant]?.buttonStyles
                    }
                    to={element.to}
                  >
                    {element.label || element.text}
                  </Button>
                )
              })}
            </div>
          )}
        </div>
        {image && (
          <MediaWrapper
            className={`w-full md:w-5/12 ${variantMap[variant]?.imageStyles || ""}`}
            {...imageLink}
          >
            <ImageElement
              className={`${pageType === "Resources" ? "max-w-[360px]" : ""} `}
              imageOptions={{ className: "h-full", objectFit: "contain" }}
              {...image}
            />
          </MediaWrapper>
        )}
        {lottie && (
          <MediaWrapper
            className={`w-full md:w-5/12 ${variantMap[variant]?.imageStyles || ""}`}
            {...imageLink}
          >
            <LottiePlayer {...lottie} />
          </MediaWrapper>
        )}
        {!image && videoSrc && (
          <div
            className={`w-full md:mb-0 md:w-5/12 ${
              variantMap[variant]?.imageStyles || ""
            }`}
          >
            <div className='bg-navy-06 relative'>
              <EmbedVideo videoSrc={videoSrc} alt={title} />
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

Hero.propTypes = {
  children: PropTypes.node,
  image: PropTypes.shape({}),
  lottie: PropTypes.shape({}),
  title: PropTypes.string,
  heroAlignment: PropTypes.string,
  variant: PropTypes.oneOf([
    "twoColumns",
    "twoColumnsGray",
    "twoColumnsWhite",
    "twoColumnsNavy",
    "twoColumnsGreen",
    "twoColumnsCondensed",
    "banner",
    "bannerGray",
    "largeBanner",
  ]),
  topLabel: PropTypes.string,
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  imageLink: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
  }),
  background: PropTypes.string,
  videoSrc: PropTypes.string,
  topLabelColor: PropTypes.string,
  titleColor: PropTypes.string,
  childrenColor: PropTypes.string,
  topSpacing: PropTypes.string,
  bottomSpacing: PropTypes.string,
  pageType: PropTypes.string,
}

Hero.defaultProps = {
  title: undefined,
  topLabel: undefined,
  image: undefined,
  lottie: undefined,
  variant: "twoColumns",
  ctas: undefined,
  imageLink: undefined,
  background: undefined,
  videoSrc: undefined,
  children: undefined,
  topLabelColor: undefined,
  titleColor: undefined,
  childrenColor: undefined,
  heroAlignment: undefined,
  topSpacing: "",
  bottomSpacing: "",
  pageType: "",
}

export default Hero
