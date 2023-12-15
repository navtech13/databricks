import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { Autoplay, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import ArrowButton from "../ButtonGroups/ArrowButton"
import IconResolver from "../IconResolver"
import "./swiperStyles.css"
import { theme } from "../../../tailwind.config"

const screenMap = [theme.screens.md, theme.screens.lg, theme.screens.xl]

const renderBullet = (index, className) => {
  return `<span class="${className} flat"></span>`
}

const Slider = React.forwardRef(function (
  {
    items,
    nextLabel,
    prevLabel,
    playLabel,
    pauseLabel,
    pagination,
    autoplayDelay,
    columns,
    controls,
    ...props
  },
  ref
) {
  const slidesPerView = typeof columns === "number" ? [columns] : columns
  const breakpoints = {}
  const defaultRef = useRef()
  const sliderRef = ref || defaultRef
  const [domLoaded, setDomLoaded] = useState(false)
  const [swiper, setSwiper] = useState()
  const [paused, setPaused] = useState(false)
  const autoplayOptions = {
    delay: autoplayDelay,
    disableOnInteraction: false,
  }

  screenMap.forEach((value, index) => {
    if (!screenMap[index]) {
      return
    }
    if (screenMap[index] === "768px") {
      breakpoints[screenMap[index].replace("px", "")] = {
        slidesPerView: 3,
        spaceBetween: 16,
      }
    } else {
      breakpoints[screenMap[index].replace("px", "")] = {
        slidesPerView: 3,
        spaceBetween: 32,
      }
    }
  })

  useEffect(() => {
    setDomLoaded(true)
  }, [])

  const isPagination = columns === 1

  return (
    <div data-cy='Slider' className='card-slider -ml-1 overflow-hidden px-1'>
      <div
        onMouseEnter={() => !paused && swiper.autoplay.stop()}
        onMouseLeave={() => !paused && swiper.autoplay.start()}
        className='-mx-4 min-h-[500px] pb-2.5'
      >
        {items && domLoaded && (
          <Swiper
            ref={sliderRef}
            spaceBetween={16}
            key={columns}
            modules={[Autoplay, Pagination]}
            autoplay={!isPagination && autoplayOptions}
            onSwiper={setSwiper}
            loop
            slidesPerView={slidesPerView[0]}
            breakpoints={breakpoints}
            threshold={20}
            pagination={
              isPagination && {
                clickable: true,
                type: "bullets",
                renderBullet,
              }
            }
            {...props}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className='self-stretch'>
                {swiper && (
                  <div key={item.id} className='h-full py-3 md:pb-4'>
                    {item.content}
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      {controls && (
        <div className='relative z-10 mb-1 -mt-2.5 text-center'>
          <ArrowButton
            onClick={() => swiper.slidePrev()}
            arrowLeft
            aria-label={prevLabel}
          />
          {paused ? (
            <button
              type='button'
              label={playLabel}
              className='py-1 px-3'
              onClick={() => {
                setPaused(false)
                return swiper.autoplay.start()
              }}
            >
              <span className='flex h-2 w-2 items-center rounded-full border'>
                <IconResolver className='mx-auto h-1 w-[6px]' token='play' />
              </span>
            </button>
          ) : (
            <button
              type='button'
              label={pauseLabel}
              className='py-1 px-3'
              onClick={() => {
                setPaused(true)
                return swiper.autoplay.stop()
              }}
            >
              <span className='flex h-2 w-2 items-center rounded-full border'>
                <IconResolver className='mx-auto h-1 w-[6px]' token='pause' />
              </span>
            </button>
          )}
          <ArrowButton onClick={() => swiper.slideNext()} aria-label={nextLabel} />
        </div>
      )}
    </div>
  )
})

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  nextLabel: PropTypes.string,
  prevLabel: PropTypes.string,
  playLabel: PropTypes.string,
  pauseLabel: PropTypes.string,
  pagination: PropTypes.bool,
  controls: PropTypes.bool,
  autoplayDelay: PropTypes.number,
  columns: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
}

Slider.defaultProps = {
  nextLabel: "Next Slide",
  prevLabel: "Previous Slide",
  playLabel: "play slider",
  pauseLabel: "pause slider",
  controls: true,
  pagination: false,
  autoplayDelay: 3000,
  columns: [1, 3],
}

export default Slider
