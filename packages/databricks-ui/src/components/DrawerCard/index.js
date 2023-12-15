import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import Badge from "../Badge"
import IconResolver from "../IconResolver"
import RichText from "../RichText"
import Link from "../Link"
import ThumbnailModal from "../ThumbnailModal"
import LockElement from "../CustomerHubCard/LockElement"

const DrawerCard = ({
  source,
  description,
  eyebrow,
  image,
  title,
  variant,
  videoTime,
  lock,
  ...props
}) => {
  const isVideo = source?.includes("youtube.com") || source?.includes("vimeo.com")
  const contentDrawerStyles =
    "transition-transform duration-300 lg:focus-within:-translate-y-8 lg:group-hover:-translate-y-8"

  const variantMap = {
    small: {
      mainWrapper: "h-[322px] md:h-[344px] lg:h-30",
      contentWrapper: `h-25 lg:min-h-[235px] p-2 flex-1 ${contentDrawerStyles}`,
      image: "h-[120px] w-full flex-shrink-0 lg:h-[140px]",
      icon: "m-2",
      dimming: true,
      eyebrowWrapper: "mb-1",
      title: "h5",
      description: "b5",
    },
    large: {
      mainWrapper: "h-[322px] md:h-[512px] lg:h-full",
      contentWrapper: "h-[202px] md:h-[216px] p-3",
      image: "flex-1",
      imageOptions: {
        style: {
          position: "absolute",
        },
      },
      icon: "m-3",
      dimming: false,
      eyebrowWrapper: "mb-1 md:mb-3",
      title: "h4",
      description: "b4",
    },
  }
  const imageOptions = {
    className: `bg-center max-h-full h-full w-full object-cover scale-[1.04] group-hover:scale-100 group-focus-within:scale-100 transition-transform duration-300`,
    ...variantMap[variant]?.imageOptions,
  }

  const MainWrapper = isVideo ? ThumbnailModal : Link

  return (
    <MainWrapper
      videoSrc={source}
      to={isVideo ? undefined : source}
      className={`border-gray-lines text-navy-800 hover:text-navy-800 ease-hover md:hover:shadow-shadow-2 focus-within:shadow-shadow-2 group relative flex flex-col overflow-hidden border transition-shadow duration-300 hover:no-underline ${
        variantMap[variant]?.mainWrapper
      } ${!isVideo ? "" : "cursor-default"}`}
      {...props}
    >
      {lock && <LockElement isAbsolute className='z-10' />}
      <div className={variantMap[variant]?.image}>
        <Image className='relative h-full' imageOptions={imageOptions} {...image} />
        {variantMap[variant]?.dimming && (
          <div
            aria-hidden
            className='bg-navy-800 absolute inset-0 opacity-0 transition-opacity duration-300 group-focus-within:opacity-20 group-hover:opacity-20'
          />
        )}
      </div>
      {isVideo && videoTime && (
        <div className='bg-navy-800 text-1.5 absolute left-0 top-0 m-1 rounded-sm p-1 font-mono font-medium text-white'>
          {videoTime}
        </div>
      )}

      <div
        className={`border-gray-lines-new relative w-full border-t bg-white ${variantMap[variant].contentWrapper}`}
      >
        <IconResolver
          className={`text-navy-400 absolute right-0 top-0 w-1 group-focus-within:text-orange-600 group-hover:text-orange-600 ${variantMap[variant].icon}`}
          token='linkArrow'
        />
        <div
          className={`flex items-center font-mono uppercase ${variantMap[variant].eyebrowWrapper}`}
        >
          {variant === "large" && (
            <span className='mr-1  inline-block'>
              <Badge type='featured' />
            </span>
          )}
          <span className='text-1'>{eyebrow}</span>
        </div>

        <div>
          <div className={`line-clamp-2 mb-1 ${variantMap[variant].title}`}>
            {title}
          </div>
          <RichText
            className={`text-gray-text line-clamp-3 mb-1 ${variantMap[variant].description}`}
          >
            {description}
          </RichText>
        </div>
      </div>
    </MainWrapper>
  )
}

DrawerCard.propTypes = {
  source: PropTypes.string,
  description: PropTypes.string,
  eyebrow: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
  variant: PropTypes.string,
  videoTime: PropTypes.string,
  lock: PropTypes.bool,
}

DrawerCard.defaultProps = {
  source: undefined,
  description: undefined,
  title: undefined,
  variant: "small",
  videoTime: undefined,
  lock: false,
}

export default DrawerCard
