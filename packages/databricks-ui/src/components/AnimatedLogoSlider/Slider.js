import React, { useState, useEffect, useMemo, useRef } from "react"
import PropTypes from "prop-types"
import { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useBreakpoint } from "../../utils/use-breakpoint"
import IconResolver from "../IconResolver"
import Image from "../Image"
import Link from "../Link"
import "./AnimatedLogoSlider.css"
import "swiper/css"

const Slider = ({ paddingTop, paddingBottom, logos, speed, variant, color, pauseAriaLabel, playAriaLabel }) => {
  const [swiper, setSwiper] = useState()
  const [playState, setPlayState] = useState(true)
  const [loading, setLoading] = useState(true)
  const timeLeft = useRef(speed)
  const transitionStart = useRef(new Date())
  const isDesktop = useBreakpoint("lg")

  const duplicatedLogos = useMemo(() => {
    return logos
      .slice()
      .concat(logos)
      .map((logo, i) => ({ ...logo, key: i }))
  }, [logos])

  // max sizes of each slide based on design specs.
  // used for calculating transitions.
  const slideWidth = isDesktop ? 224 : 208

  const deviceMap = {
    desktop: {
      paddingTop: "64px",
      paddingBottom: "24px",
    },
    tablet: {
      paddingTop: "32px",
      paddingBottom: "32px",
    },
  }

  const device = isDesktop ? "desktop" : "tablet"

  useEffect(() => {
    if (swiper) {
      setTimeout(() => {
        swiper.allowTouchMove = false
        const nextTranslate = swiper.snapIndex * slideWidth

        swiper.wrapperEl.style.transitionDuration = "90000ms"

        swiper.wrapperEl.style.transform = "translate3d(0px, 0px, 0px)"

        swiper.wrapperEl.style.transitionDuration = `${
          ((nextTranslate + swiper.getTranslate()) / slideWidth) * speed
        }ms`

        swiper.wrapperEl.style.transform = `traslate3d(${
          nextTranslate * -1
        }px, 0px, 0px)`
        swiper.autoplay.start()

        setLoading(false)

        swiper.updateProgress()
        swiper.updateSize()
        swiper.updateSlides()
      }, 700)
    }
  }, [swiper])

  const onPausePlaySwipper = () => {
    setPlayState(!playState)
  }

  const pauseMotion = () => {
    swiper.autoplay.stop()

    // then you set the transition duration on zero
    swiper.wrapperEl.style.transitionDuration = "0ms"

    // then you set the wrapper translation hard on its current translation value
    // this might also work with swiper.setWrapperTranslate(swiper.getWrapperTranslate())
    swiper.wrapperEl.style.transform = `translate3d(${swiper.getTranslate()}px, 0px, 0px)`

    timeLeft.current = transitionStart.current - new Date() + timeLeft.current
  }

  const resumeMotion = () => {
    const realIndex = swiper?.realIndex
    swiper.slideToLoop(realIndex - 1, 999999999)
    setTimeout(() => {
      swiper.slideToLoop(realIndex, timeLeft.current)
      swiper.autoplay.start()
      transitionStart.current = new Date()
    }, 1)
  }

  useEffect(() => {
    if (!swiper) {
      return
    }
    if (!playState) {
      pauseMotion()
      swiper.allowTouchMove = true
      return
    }
    resumeMotion()
    swiper.allowTouchMove = false
  }, [playState])

  return (
    <div
      className='animated-logo-slider'
      style={{
        opacity: loading ? 0 : 1,
        transition: "opacity 1s",
        paddingTop: paddingTop || deviceMap[device].paddingTop,
        paddingBottom: paddingBottom || deviceMap[device].paddingBottom,
      }}
    >
      <div className='relative flex h-8 w-full items-center overflow-hidden'>
        <Swiper
          style={{ height: "100%" }}
          onSwiper={setSwiper}
          slidesPerView='auto'
          speed={speed}
          loop
          onTransitionEnd={() => {
            if (swiper && swiper.autoplay.running) {
              swiper.wrapperEl.style.transitionDuration = "0 ms"
            }
            transitionStart.current = new Date()
            timeLeft.current = speed
          }}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            enabled: false,
          }}
          modules={[Autoplay]}
        >
          {duplicatedLogos.map((logo) => {
            const Component = logo.link ? Link : "div"
            return (
              <SwiperSlide
                onMouseEnter={() => {
                  if (!logo.link) return
                  if (!playState) {
                    return
                  }
                  pauseMotion()
                }}
                onMouseLeave={() => {
                  if (!logo.link) return
                  if (!playState) {
                    return
                  }
                  resumeMotion()
                }}
                key={logo.key}
                style={{
                  height: "48px",
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className={logo.link && "slide-link"}
              >
                <Component
                  className={`inline ${logo.link ? "cursor-pointer" : ""}`}
                  {...(logo.link && { to: logo.link })}
                >
                  <Image
                    className='h-5 w-full object-contain'
                    imageOptions={{
                      className: "h-full max-h-[48px] w-full",
                    }}
                    {...logo}
                  />
                </Component>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      {(variant === "default" || variant === "dark-default") && (
        <div className='absolute right-0 z-50 hidden -translate-y-[64px] p-2 pl-10 md:block'>
          <div
            style={{
              background: `linear-gradient(270deg, ${color} 34.09%, ${color}00 100%)`,
            }}
            className='absolute left-0 top-0 z-0 h-full w-full'
          />
          <button
            type='button'
            aria-label={playState ? pauseAriaLabel : playAriaLabel}
            onClick={onPausePlaySwipper}
            className='relative mt-0.5'
          >
            <IconResolver
              className='h-1 w-1'
              token={playState ? "pauseMotion" : "playMotion"}
            />
          </button>
        </div>
      )}
    </div>
  )
}

export default Slider

Slider.propTypes = {
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.string,
      link: PropTypes.string,
      target: PropTypes.string,
    })
  ).isRequired,
  variant: PropTypes.oneOf(["default", "ticker", "dark-default"]),
  speed: PropTypes.string,
  color: PropTypes.string.isRequired,
  pauseAriaLabel: PropTypes.string.isRequired,
  playAriaLabel: PropTypes.string.isRequired
}

Slider.defaultProps = {
  paddingTop: undefined,
  paddingBottom: undefined,
  variant: "default",
  speed: 6000
}
