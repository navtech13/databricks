import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import { useBreakpoint } from "../../utils/use-breakpoint"
import ArrowButton from "../ButtonGroups/ArrowButton"
import ThumbnailModal from "../ThumbnailModal"
import MediaButton from "../ButtonGroups/MediaButton"
import LinkModal from "../LinkModal"

const Slide = ({
  item,
  swiper,
  prevLabel,
  nextLabel,
  controlsPosition,
  imageWidth,
  enableControls,
}) => {
  const isTablet = useBreakpoint("md")

  const imageWidthMap = {
    4: { image: "lg:w-4/12", content: "lg:w-7/12" },
    5: { image: "lg:w-5/12", content: "lg:w-6/12" },
    6: { image: "lg:w-6/12", content: "lg:w-5/12" },
  }

  const controls = enableControls ? (
    <div>
      <ArrowButton
        onClick={() => swiper.slidePrev()}
        className='mr-2.5'
        arrowLeft
        aria-label={prevLabel}
      />
      <ArrowButton onClick={() => swiper.slideNext()} aria-label={nextLabel} />
    </div>
  ) : (
    <></>
  )

  const widthMap = imageWidthMap[imageWidth] || imageWidthMap[6]
  const imageElement = item.videoSrc ? (
    <>
      <div className='swiper-no-swiping group relative'>
        <div className='pointer-events-none absolute top-1/2 left-1/2 z-10  -translate-y-1/2  -translate-x-1/2'>
          <MediaButton play={false} />
        </div>
        <ThumbnailModal videoSrc={item.videoSrc} {...item.image} />
      </div>
    </>
  ) : (
    <Image {...item.image} />
  )

  return (
    <div className='mx-auto flex flex-col md:flex-row md:justify-between'>
      {/* Left column */}
      <div
        className={`mb-5 flex ${
          item.videoSrc ? "w-full" : "w-8/12"
        } flex-col gap-2.5 md:mb-0 md:w-5/12 ${widthMap.image}`}
      >
        {item.image && <>{imageElement}</>}
        {controlsPosition === "left" && isTablet && controls}
      </div>
      {/* Right column */}
      <div className={`flex flex-col md:w-6/12 md:gap-2 ${widthMap.content}`}>
        {(item.headerTitle || item.headerImage) && (
          <div className='flex min-h-[60px] flex-row items-center gap-4 md:gap-8'>
            {item.headerTitle && (
              <span className='h6 text-gray-text'>{item.headerTitle}</span>
            )}
            {item.headerImage && (
              <Image
                className='max-h-8 w-full max-w-[116px]'
                imageOptions={{
                  className: "max-h-8 w-auto",
                  imgStyle: { maxHeight: "60px", width: "auto" },
                }}
                {...item.headerImage}
              />
            )}
          </div>
        )}
        <div className='flex flex-col gap-2.5 md:gap-2'>{item.content}</div>
        {(item.cta?.to || item.videoSrc) && (
          <LinkModal videoSource={item.videoSrc} to={item.cta?.to}>
            {item.cta?.label || "Learn more"}
          </LinkModal>
        )}
        {(controlsPosition === "right" || !isTablet) && controls}
      </div>
    </div>
  )
}

Slide.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.shape({}),
    videoSrc: PropTypes.string,
    headerTitle: PropTypes.string,
    headerImage: PropTypes.shape({}),
    cta: PropTypes.shape({
      label: PropTypes.string,
      to: PropTypes.string,
    }),
    content: PropTypes.node,
  }).isRequired,
  swiper: PropTypes.shape({
    slidePrev: PropTypes.func,
    slideNext: PropTypes.func,
  }).isRequired,
  nextLabel: PropTypes.string,
  prevLabel: PropTypes.string,
  controlsPosition: PropTypes.oneOf(["left", "right"]),
  imageWidth: PropTypes.oneOf(["4", "5", "6"]),
  enableControls: PropTypes.bool,
}

Slide.defaultProps = {
  nextLabel: "Next Slide",
  prevLabel: "Previous Slide",
  controlsPosition: "right",
  imageWidth: "50",
  enableControls: true,
}

export default Slide
