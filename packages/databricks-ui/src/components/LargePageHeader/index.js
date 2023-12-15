import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import LottiePlayer from "../LottiePlayer"
import Image from "../Image"
import ContentWrapper from "../ContentWrapper"
import ThumbnailModal from "../ThumbnailModal"
import { useBreakpoint } from "../../utils/use-breakpoint"
import { generateCTAs } from "../../utils/generateCTAs"
import getWidthProportion from "../../utils/getWidthProportion"
import Link from "../Link"
import { theme } from "../../../tailwind.config"

const MediaSection = ({
  image,
  lottie,
  video,
  imageHeightDesktop,
  imageHeightTablet,
}) => {
  const isTablet = useBreakpoint("md")
  const isDesktop = useBreakpoint("xl", true)

  let mediaStyles = { height: "auto", width: "100%" }

  if (isTablet) {
    mediaStyles = {
      media: { height: imageHeightTablet, width: "auto" },
      wrapper: {
        height: imageHeightTablet,
        ...(!lottie && { width: "100%" }),
      },
    }
  }

  if (isDesktop) {
    mediaStyles = {
      media: { height: imageHeightDesktop, width: "auto" },
      wrapper: { height: imageHeightDesktop, ...(!lottie && { width: "100%" }) },
    }
  }

  if (!video) {
    return (
      <div className='shrink-0 lg:self-center' style={mediaStyles?.wrapper}>
        {image && !lottie && (
          <Image
            imageOptions={{
              style: mediaStyles?.media,
              imgStyle: { height: "100%", width: "auto" },
            }}
            {...image}
          />
        )}
        {lottie && !image && <LottiePlayer style={mediaStyles?.media} {...lottie} />}
      </div>
    )
  }
  return (
    <div className='md:w-5/12 lg:w-6/12'>
      <ThumbnailModal alt='video' videoSrc={video.src} {...video.image} />
    </div>
  )
}

const LargePageHeader = ({
  children,
  ctas,
  image,
  imageHeightDesktop,
  imageHeightTablet,
  contentWidthDesktop,
  contentWidthTablet,
  lottie,
  spaceBetweenTablet,
  spaceBetweenDesktop,
  backgroundToken,
  titleColorToken,
  video,
  ...props
}) => {
  return (
    <ContentWrapper
      backgroundColor={{
        color: theme.colors[backgroundToken],
        opacity: 1,
      }}
      className='overflow-hidden'
      {...props}
    >
      <section className='flex flex-col gap-5 py-5 md:flex-row md:gap-0 md:py-8'>
        {/* Content section */}
        <div
          className={`flex shrink-0 flex-col ${getWidthProportion(
            contentWidthTablet,
            "md"
          )} ${getWidthProportion(contentWidthDesktop, "lg")}`}
        >
          <RichText
            style={{ color: theme.colors[titleColorToken] }}
            className='flex flex-col gap-2 md:gap-3'
          >
            {children}
          </RichText>
          {ctas && (
            <div className='mt-4 flex flex-col items-start gap-2 md:mt-4 md:flex-row'>
              {generateCTAs(ctas, Link)}
            </div>
          )}
        </div>
        <div
          aria-hidden
          className={`hidden shrink-0 md:block
        ${getWidthProportion(spaceBetweenTablet, "md")}
        ${getWidthProportion(spaceBetweenDesktop, "lg")}
        `}
        />
        {/* Media Section */}
        <MediaSection
          image={image}
          lottie={lottie}
          video={video}
          imageHeightTablet={imageHeightTablet}
          imageHeightDesktop={imageHeightDesktop}
        />
      </section>
    </ContentWrapper>
  )
}

LargePageHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  ctas: PropTypes.arrayOf(PropTypes.shape({})),
  image: PropTypes.shape({}),
  imageHeightDesktop: PropTypes.string,
  imageHeightTablet: PropTypes.string,
  backgroundToken: PropTypes.string,
  contentWidthDesktop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  contentWidthTablet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  spaceBetweenTablet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  spaceBetweenDesktop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lottie: PropTypes.shape({}),
  titleColorToken: PropTypes.string,
  video: PropTypes.shape({ src: PropTypes.string, image: PropTypes.shape({}) }),
}

LargePageHeader.defaultProps = {
  children: undefined,
  ctas: undefined,
  image: undefined,
  imageHeightDesktop: undefined,
  imageHeightTablet: undefined,
  contentWidthDesktop: 6,
  contentWidthTablet: 7,
  spaceBetweenTablet: 0,
  spaceBetweenDesktop: 0,
  lottie: undefined,
  backgroundToken: "white",
  titleColorToken: undefined,
  video: undefined,
}

MediaSection.propTypes = {
  lottie: PropTypes.shape({}),
  image: PropTypes.shape({}),
  video: PropTypes.shape({ src: PropTypes.string, image: PropTypes.shape({}) }),
  mediaStyles: PropTypes.shape({
    wrapper: PropTypes.shape({}),
    media: PropTypes.shape({}),
  }).isRequired,
  imageHeightDesktop: PropTypes.string,
  imageHeightTablet: PropTypes.string,
}

MediaSection.defaultProps = {
  lottie: undefined,
  image: undefined,
  video: undefined,
  imageHeightDesktop: undefined,
  imageHeightTablet: undefined,
}

export default LargePageHeader
