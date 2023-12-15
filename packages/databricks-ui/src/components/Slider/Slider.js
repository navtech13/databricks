import React, { useState } from "react"
import PropTypes from "prop-types"
import { EffectFade, Pagination, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-fade"
import "../SimpleSlider/swiperStyles.css"
import Slide from "./Slide"
import SimpleQuoteSlide from "./SimpleQuoteSlide"
import BoxedQuoteSlide from "./BoxedQuoteSlide"
import ArrowButton from "../ButtonGroups/ArrowButton"
import TextSlide from "./TextSlide"

const Slider = ({
  items,
  loop,
  nextLabel,
  prevLabel,
  controlsPosition,
  imageWidth,
  enableControls,
  variant,
  delayPerSlide,
  backgroundColor,
  textColor,
  ...props
}) => {
  const [swiper, setSwiper] = useState()
  const variants = {
    default: { component: Slide, style: { paddingBottom: "40px" } },
    simpleQuote: { component: SimpleQuoteSlide, style: { paddingBottom: "40px" } },
    boxedQuote: { component: BoxedQuoteSlide, style: {} },
    textQuote: { component: TextSlide, style: {} },
  }
  const modules = {
    default: [EffectFade],
    simpleQuote: [EffectFade],
    boxedQuote: [EffectFade, Pagination],
    textQuote: [EffectFade, Autoplay],
  }

  const Component = variants[variant]?.component
  const SwiperModules = modules[variant]
  const textQuoteBackgroundColor = variant === "textQuote" ? backgroundColor : null
  const overflow = variant === "boxedQuote" ? "visible" : "hidden"

  const renderBullet = (index, className) => {
    return `<span class="${className} flat"></span>`
  }
  const autoplayOptions = {
    delay: delayPerSlide || 3000,
    disableOnInteraction: false,
  }

  return (
    <>
      <div>
        <Swiper
          pagination={{
            clickable: true,
            type: "bullets",
            renderBullet,
          }}
          modules={SwiperModules}
          autoplay={autoplayOptions}
          onSwiper={setSwiper}
          style={{
            cursor: "grab",
            backgroundColor: `${textQuoteBackgroundColor}`,
            overflow: `${overflow}`,
            ...variants[variant]?.style,
          }}
          className={`bg-${backgroundColor}`}
          fadeEffect={{ crossFade: true }}
          loop={loop}
          effect='fade'
          {...props}
        >
          {items.map((item) => (
            <SwiperSlide key={item.key}>
              {swiper && (
                <Component
                  swiper={swiper}
                  item={item}
                  nextLabel={nextLabel}
                  prevLabel={prevLabel}
                  controlsPosition={controlsPosition}
                  delay={delayPerSlide || 3000}
                  imageWidth={imageWidth}
                  backgroundColor={backgroundColor}
                  textColor={textColor}
                  enableControls={items.length > 1}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {variant === "boxedQuote" && items.length > 1 && (
        <div className='mt-6 flex flex-col items-center justify-center'>
          <div className=' flex items-center justify-center '>
            <ArrowButton
              onClick={() => swiper.slidePrev()}
              className='mr-2.5'
              arrowLeft
              aria-label={prevLabel}
            />
            <ArrowButton onClick={() => swiper.slideNext()} aria-label={nextLabel} />
          </div>
        </div>
      )}
    </>
  )
}

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  nextLabel: PropTypes.string,
  prevLabel: PropTypes.string,
  loop: PropTypes.bool,
  imageWidth: PropTypes.oneOf(["4", "5", "6"]),
  controlsPosition: PropTypes.oneOf(["left", "right"]),
  variant: PropTypes.oneOf(["default", "simpleQuote", "boxedQuote", "textQuote"]),
  delayPerSlide: PropTypes.number,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  enableControls: PropTypes.bool,
}

Slider.defaultProps = {
  nextLabel: "Next Slide",
  prevLabel: "Previous Slide",
  imageWidth: "4",
  loop: true,
  controlsPosition: "right",
  delayPerSlide: 3000,
  backgroundColor: "#1B3139",
  textColor: undefined,
  enableControls: true,
  variant: "default",
}

export default Slider
