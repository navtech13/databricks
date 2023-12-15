import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import Link from "../Link"
import RichText from "../RichText"
import ThumbnailModal from "../ThumbnailModal"
import LottiePlayer from "../LottiePlayer"
import Cta from "./Cta"
import CtaRow from "./CtaRow"
import RiveAnimation from "../RiveAnimation"

const CtaImageBlock = ({
  children,
  title,
  subtitle,
  image,
  lottie,
  imageLink,
  imagePosition,
  imageModal,
  verticalAlignment,
  displayShadow,
  cta,
  ctaRow,
  textLink,
  imageWidth,
  spaceBetween,
}) => {
  const positions = {
    left: {
      wrapper: "md:gap-1 md:flex-row",
      content: `md:w-6/12 lg:flex-1`,
      image: `md:w-5/12 lg:w-${imageWidth}/12`,
    },
    right: {
      wrapper: "md:gap-1 md:flex-row-reverse",
      content: `md:w-6/12 lg:flex-1`,
      image: `md:w-5/12 lg:w-${imageWidth}/12`,
    },
  }

  const itemsAlignmentMap = {
    top: "items-start",
    center: "items-center",
    bottom: "items-end",
  }

  const itemsAlignment = verticalAlignment
    ? itemsAlignmentMap[verticalAlignment]
    : "items-center"

  const imageShadow =
    displayShadow === true
      ? { filter: "drop-shadow(0 4px 30px rgba(27,49,57,0.1))" }
      : {}

  const ImageWrapper = imageLink ? Link : "div"
  const ImageElement = imageModal ? ThumbnailModal : Image

  const isRiveAnimation = imageLink ? imageLink.split(".").pop() === "riv" : false

  return (
    <div
      data-cy='CtaImageBlock'
      className={`CtaImageBlock cta-image-row cta-image-position-${imagePosition} flex flex-col-reverse justify-between ${itemsAlignment} ${positions[imagePosition]?.wrapper}`}
    >
      {isRiveAnimation ? (
        <div className='mt-4 w-full md:order-none md:mt-0 md:mb-0 md:w-5/12 '>
          <div className='block h-[238px] lg:h-[400px] xl:h-[524px]'>
            <RiveAnimation src={imageLink} />
          </div>
        </div>
      ) : (
        <ImageWrapper
          className={`image-position-${imagePosition} ${imageShadow} mt-4 w-full md:order-none md:mt-0 md:mb-0 md:w-5/12 ${positions[imagePosition]?.image}`}
          to={imageLink}
          {...imageLink}
          style={imageShadow}
        >
          {image && <ImageElement {...image} />}
          {lottie && <LottiePlayer {...lottie} />}
        </ImageWrapper>
      )}
      <div aria-hidden className={`lg:w-${spaceBetween}/12`} />
      <div className={`mt-4 md:mt-0 ${positions[imagePosition]?.content} w-full`}>
        {title && <h3 className={`mb-2 ${ctaRow ? "font-medium" : ""}`}>{title}</h3>}
        {subtitle && <div className='h4 mb-2'>{subtitle}</div>}
        <RichText variant='body'>{children}</RichText>
        <Cta cta={cta} textLink={textLink} />
        <CtaRow ctaRow={ctaRow} />
      </div>
    </div>
  )
}

CtaImageBlock.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.shape({}),
  lottie: PropTypes.shape({}),
  imagePosition: PropTypes.oneOf(["left", "right"]),
  imageModal: PropTypes.bool,
  displayShadow: PropTypes.bool,
  imageLink: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
  }),
  verticalAlignment: PropTypes.oneOf(["top", "center", "bottom"]),
  cta: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({ to: PropTypes.string, label: PropTypes.string }),
  ]),
  ctaRow: PropTypes.arrayOf(PropTypes.shape({})),
  textLink: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
  }),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  imageWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  spaceBetween: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

CtaImageBlock.defaultProps = {
  imagePosition: "right",
  verticalAlignment: "center",
  image: undefined,
  lottie: undefined,
  imageLink: undefined,
  imageModal: undefined,
  displayShadow: false,
  cta: undefined,
  ctaRow: undefined,
  textLink: undefined,
  title: undefined,
  subtitle: undefined,
  imageWidth: undefined,
  spaceBetween: undefined,
}

export default CtaImageBlock
