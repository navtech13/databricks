import React, { useState } from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import { useBreakpoint } from "../../utils/use-breakpoint"
import Link from "../Link"
import ThumbnailModal from "../ThumbnailModal"
import LottiePlayer from "../LottiePlayer"
import RichText from "../RichText"
import getWidthProportion from "../../utils/getWidthProportion"

const CustomerStoryTabs = ({ items, variant, alignment, ...props }) => {
  const [activeTab, setActiveTab] = useState(items[0])
  const [activeIndex, setActiveIndex] = useState(1)
  const isTablet = useBreakpoint("md")
  const isDesktop = useBreakpoint("lg")
  const maxWidth = 1146
  const selectorWidth = Math.floor((1 / items.length) * 100)
  const selectorSpacing = isTablet ? 32 : 15
  // Due to decimal handling by javascript, some pixels are missing for the current implementation
  // adding offset to correct this value
  const selectorOffset = variant === "text" ? 10 : 0
  const itemLength = maxWidth / items.length - selectorSpacing
  const handleClick = (item, i) => {
    setActiveTab(item)
    setActiveIndex(i + 1)
  }

  const currentAlignment = alignment || (variant === "text" ? "top" : "bottom")

  const alignmentMap = {
    bottom: {
      selectorStyle: "border-t-2 md:-top-0.5",
      section: "md:flex-col",
      tablistButtonStyles: "pb-1 md:pb-0 md:pt-2",
      tablistSubWrapperStyles: `md:mt-5 gap-2 md:gap-4 md:mb-0 md:border-b-0 md:border-t grid grid-cols-${items.length}`,
      selectorBehavior: {
        width: `calc(${selectorWidth}% - ${selectorSpacing - selectorOffset}px)`,
        left: `calc(${selectorWidth * activeIndex - selectorWidth}%
         ${
           activeIndex === items.length
             ? `+ ${selectorSpacing - selectorOffset}px`
             : ""
         }
         ${
           activeIndex > 1 && activeIndex !== items.length
             ? `+ ${selectorSpacing / 2 - selectorOffset}px`
             : ""
         })`,
      },
      tablistWrapper: "",
      tablistButtonBehavior: null,
    },
    top: {
      selectorStyle: "border-t-4",
      section: "",
      tablistButtonStyles: "ml-2 md:ml-4 first:ml-0 flex text-left pb-2 md:pb-2.5",
      tablistSubWrapperStyles: "md:mb-4 min-w-full flex w-fit",
      selectorBehavior: {
        width: `${itemLength}px`,
        left: `calc(${itemLength * activeIndex - itemLength}px
          ${activeIndex > 1 ? `+ ${selectorSpacing * (activeIndex - 1)}px` : ""})`,
      },
      tablistWrapper: "overflow-scroll scroll-bar-transparent",
      tablistButtonBehavior: {
        minWidth: `${itemLength}px`,
        maxWidth: `${itemLength}px`,
      },
    },
  }

  return (
    <section
      className={`flex flex-col-reverse ${alignmentMap[currentAlignment]?.section}`}
      {...props}
    >
      <div className='relative'>
        {/* Main Section */}
        {items.map((item) => {
          const active = activeTab.id === item.id
          return (
            <div
              aria-hidden={!active}
              key={`tabpanel-${item.id}`}
              aria-labelledby={`tab-${item.id}`}
              id={`tabpanel-${item.id}`}
              role='tabpanel'
              className={`flex w-full flex-col transition-all duration-300 md:flex-row ${
                active
                  ? "z-0 cursor-auto opacity-100"
                  : "absolute top-0 z-[-10] cursor-none opacity-0"
              }`}
            >
              {/* Content */}
              <div className='mb-2 flex-shrink-0 md:mb-0 md:min-h-[572px] md:w-7/12 md:pr-2 lg:min-h-[416px] lg:pr-4'>
                {item.stats && (
                  <div className='mb-2 flex w-full '>
                    {item.stats.map((stat) => {
                      const widthMobile = stat.columns
                        ? getWidthProportion(stat.columns)
                        : ""
                      const widthTablet = stat.columnsTablet
                        ? getWidthProportion(stat.columnsTablet, "md")
                        : ""
                      const widthDesktop = stat.columnsDesktop
                        ? getWidthProportion(stat.columnsDesktop, "lg")
                        : ""
                      return (
                        <div
                          key={stat.id}
                          className={`pr-3 md:pr-6 ${widthMobile} ${widthTablet} ${widthDesktop} last:pr-0`}
                        >
                          <p className='h2'>{stat.title}</p>
                          <RichText className='h5'>{stat.description}</RichText>
                        </div>
                      )
                    })}
                  </div>
                )}
                {item.title && <div className='h3 mb-2'>{item.title}</div>}
                {item.body && <RichText className='b4'>{item.body}</RichText>}
                {item.cta.to && (
                  <div className='mt-2'>
                    <Link
                      to={item.cta.to}
                      className='arrow-icon-tertiary  tertiary-underline text-blue-700 hover:text-blue-700'
                    >
                      {item.cta.label}
                    </Link>
                  </div>
                )}
              </div>
              {/* Media */}
              {item.image && (
                <Image
                  className={`flex-shrink-0 duration-500 md:w-5/12 ${
                    active ? "block" : "hidden"
                  }`}
                  {...item.image}
                />
              )}
              {item.video && (
                <ThumbnailModal
                  alt={item.title}
                  videoSrc={item.video.src}
                  className={`flex-shrink-0 duration-500 md:w-5/12 ${
                    active ? "block" : "hidden"
                  }`}
                  {...item.video.image}
                />
              )}
              {item.lottie && (
                <LottiePlayer
                  className={`flex-shrink-0 duration-500 md:w-5/12 ${
                    active ? "block" : "hidden"
                  }`}
                  {...item.lottie}
                />
              )}
            </div>
          )
        })}
      </div>
      {/* Customer Tabs */}
      <div className={`${alignmentMap[currentAlignment].tablistWrapper}`}>
        <div
          className={`border-gray-lines relative mb-3 border-b ${alignmentMap[currentAlignment]?.tablistSubWrapperStyles}`}
          role='tablist'
        >
          {items.map((item, i) => {
            const active = activeTab.id === item.id
            return (
              <button
                key={`tab-${item.id}`}
                id={`tab-${item.id}`}
                aria-controls={`tabpanel-${item.id}`}
                aria-selected={active}
                type='button'
                role='tab'
                onClick={() => {
                  handleClick(item, i)
                }}
                className={`w-full ${alignmentMap[currentAlignment]?.tablistButtonStyles} flex justify-center`}
                style={
                  isDesktop
                    ? alignmentMap.bottom.tablistButtonBehavior
                    : alignmentMap[currentAlignment].tablistButtonBehavior
                }
              >
                {variant === "image" && (
                  <Image
                    className={`h-10 w-full max-w-[185px] transition-opacity duration-300 hover:opacity-100 ${
                      active ? "opacity-100" : "opacity-25"
                    }`}
                    imageOptions={{
                      className: "w-full h-full object-contain",
                      objectFit: "contain",
                    }}
                    {...item.tabImage}
                    placeholderRatio={null}
                  />
                )}
                {variant === "text" && (
                  <span className='h5 font-bold'>{item.headline}</span>
                )}
              </button>
            )
          })}
          <div
            aria-hidden
            className={`pointer-events-none absolute bottom-0 w-full border-orange-500 transition-all duration-300  md:border-t-4 ${alignmentMap[currentAlignment]?.selectorStyle}`}
            style={
              isDesktop
                ? alignmentMap.bottom.selectorBehavior
                : alignmentMap[currentAlignment].selectorBehavior
            }
          />
        </div>
      </div>
    </section>
  )
}

CustomerStoryTabs.propTypes = {
  variant: PropTypes.oneOf(["image", "text"]),
  alignment: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      body: PropTypes.string,
      headline: PropTypes.string,
      cta: PropTypes.shape({
        label: PropTypes.string,
        to: PropTypes.string,
      }),
      stats: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string,
        })
      ),
    })
  ).isRequired,
}

CustomerStoryTabs.defaultProps = {
  variant: "image",
  alignment: null,
}

export default CustomerStoryTabs
