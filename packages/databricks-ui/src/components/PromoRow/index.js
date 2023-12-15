import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Link from "../Link"
import Image from "../Image"
import Exclude from "./Exclude"
import ThumbnailModal from "../ThumbnailModal"
import LottiePlayer from "../LottiePlayer"
import Wrapper from "../ContentWrapper"
import { useBreakpoint } from "../../utils/use-breakpoint"

const PromoRow = ({
  border,
  bgColor,
  borderColor,
  eyebrowColor,
  titleColor,
  bodyColor,
  ctaColor,
  eyebrow,
  body,
  cta,
  headlineTag,
  headline,
  outerPaddingTop,
  outerPaddingBottom,
  innerPaddingTop,
  innerPaddingBottom,
  image,
  videoImage,
  videoSrc,
  lottie,
  ...props
}) => {
  const borderMap = {
    all: "border-t border-b",
    bottom: "border-b",
    top: "border-t",
  }
  const borderStyles = borderMap[border] || borderMap.all
  const bgColorStyle = `bg-${bgColor}`
  const borderColorStyle = `border-${borderColor}`
  const excludeColorStyle = `text-${bgColor}`
  const eyebrowColorStyle = `text-${eyebrowColor}`
  const titleColorStyle = `text-${titleColor}`
  const bodyColorStyle = `text-${bodyColor}`
  const ctaColorStyle = `text-${ctaColor} hover:text-${ctaColor}`
  const outerPaddingTopStyle = `pt-${outerPaddingTop}`
  const outerPaddingBottomStyle = `pb-${outerPaddingBottom}`
  const innerPaddingTopStyle = `md:pt-${innerPaddingTop}`
  const innerPaddingBottomStyle = `pb-${innerPaddingBottom}`

  const Headline = headlineTag

  const isTablet = useBreakpoint("md")

  const InnerSection = (
    <div
      className={`md:inner-wrapper flex flex-col justify-between md:flex-row md:items-center lg:justify-center ${innerPaddingTopStyle} ${innerPaddingBottomStyle}`}
    >
      {/* Media Section */}
      <div className='h-25 relative mb-6 overflow-hidden md:mb-0 md:w-6/12 md:rounded-l-full lg:mr-4 lg:w-5/12'>
        {/* Image and Gif */}
        {image && (
          <Image
            imageOptions={{
              className: "h-25 object-cover cursor-default",
            }}
            {...image}
          />
        )}
        {/* Video with modal
   As a matter of accessibility, a direct Embed video (without modal) was not added
   because it would hide most of the video controls.
   Figma requirement is to maintain a 200px height at all scenarios  */}
        {videoSrc && videoImage && (
          <ThumbnailModal
            imageOptions={{ className: "min-h-[200px] object-cover" }}
            {...videoImage}
            videoSrc={videoSrc}
          />
        )}
        {/* Lottie animation */}
        {lottie && <LottiePlayer className='h-25 w-full' {...lottie} />}
        {/* Right -2px was added due to an issue with the SVG asset */}
        <Exclude
          className={`absolute right-0 top-0 hidden md:block ${excludeColorStyle}`}
          aria-hidden
        />
      </div>
      {/* Content Section */}
      <div className='mx-auto w-[90%] md:mx-0 md:w-5/12'>
        {eyebrow && (
          <div
            className={`text-1.5 mb-2.5 flex flex-wrap font-mono uppercase ${eyebrowColorStyle}`}
          >
            {eyebrow.map((item, index) => (
              <p>
                {item}
                {index < eyebrow.length - 1 && (
                  <span className='text-gray-text mx-2 font-bold'>/</span>
                )}
              </p>
            ))}
          </div>
        )}
        {headline && (
          <Headline className={`mb-2 ${titleColorStyle}`}>{headline}</Headline>
        )}
        {body && <RichText className={`b5 mb-2 ${bodyColorStyle}`}>{body}</RichText>}
        {cta?.to && cta?.label && (
          <Link
            className={`arrow-icon-tertiary tertiary-underline text-1.75 font-medium ${ctaColorStyle}`}
            to={cta.to}
          >
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  )

  return (
    // Outer Wrapper
    <section
      className={`${bgColorStyle} ${outerPaddingTopStyle} ${outerPaddingBottomStyle}`}
      {...props}
    >
      {/* Border Wrapper */}
      <div className={`${borderStyles} ${borderColorStyle}`}>
        {/* Inner section */}
        {isTablet ? <Wrapper>{InnerSection}</Wrapper> : InnerSection}
      </div>
    </section>
  )
}

PromoRow.propTypes = {
  border: PropTypes.oneOf(["all", "top", "bottom"]),
  bgColor: PropTypes.string,
  borderColor: PropTypes.string,
  eyebrowColor: PropTypes.string,
  titleColor: PropTypes.string,
  bodyColor: PropTypes.string,
  ctaColor: PropTypes.string,
  eyebrow: PropTypes.arrayOf(PropTypes.string),
  headline: PropTypes.string,
  headlineTag: PropTypes.string,
  body: PropTypes.string,
  cta: PropTypes.shape({
    label: PropTypes.string,
    to: PropTypes.string,
  }),
  outerPaddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  outerPaddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  innerPaddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  innerPaddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.PropTypes.shape({}),
  videoImage: PropTypes.PropTypes.shape({}),
  videoSrc: PropTypes.string,
  lottie: PropTypes.PropTypes.shape({}),
}

PromoRow.defaultProps = {
  border: "all",
  bgColor: "white",
  borderColor: "gray-lines",
  eyebrowColor: "navy-800",
  titleColor: "navy-800",
  bodyColor: "gray-text",
  ctaColor: "blue-700",
  eyebrow: [],
  headline: undefined,
  headlineTag: "h3",
  body: undefined,
  cta: undefined,
  outerPaddingTop: 15,
  outerPaddingBottom: 15,
  innerPaddingTop: 6,
  innerPaddingBottom: 6,
  videoSrc: undefined,
  image: undefined,
  videoImage: undefined,
  lottie: undefined,
}

export default PromoRow
