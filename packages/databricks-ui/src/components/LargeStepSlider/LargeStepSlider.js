import React, { useState } from "react"
import PropTypes from "prop-types"
import { Swiper, SwiperSlide } from "swiper/react"
import { useBreakpoint } from "../../utils/use-breakpoint"
import ArrowButton from "../ButtonGroups/ArrowButton"
import RichText from "../RichText"
import HeaderSection from "../HeaderSection"
import "swiper/css"
import "./styles.css"

const LargeStepSlider = ({ title, eyebrow, description, cards, cardsPerView, leftArrowAriaLabel, rightArrowAriaLabel }) => {
  const [swiper, setSwiper] = useState()
  const [currentIndex, setCurrentIndex] = useState(0)
  const isTablet = useBreakpoint("md")
  const isDesktop = useBreakpoint("xl")

  const controls = (
    <div className='flex w-full flex-shrink-0 justify-center md:w-auto lg:justify-between'>
      <ArrowButton
        className='mr-0.8'
        onClick={() => swiper.slidePrev()}
        arrowLeft
        disabled={currentIndex === 0}
        ariaLabel={leftArrowAriaLabel}
      />
      <ArrowButton
        disabled={currentIndex === cards.length - cardsPerView}
        onClick={() => swiper.slideNext()}
        ariaLabel={rightArrowAriaLabel}
      />
    </div>
  )

  let spaceBetween = 16
  let breakpointCards = 1
  if (isTablet) {
    breakpointCards = 2
  }
  if (isDesktop) {
    spaceBetween = 48
    breakpointCards = cardsPerView
  }

  return (
    <div data-cy='LargeStepSlider' className='large-step-slider'>
      <HeaderSection
        className='pb-3'
        eyebrow={eyebrow}
        title={title}
        variant='dark'
      />
      <div className='flex items-end justify-between gap-2.5 pb-4 xl:pb-6'>
        <RichText className='xxl:w-5/12 text-navy-300 w-full md:w-7/12 xl:w-6/12'>
          {description}
        </RichText>
        {isTablet && controls}
      </div>
      <Swiper
        onSwiper={setSwiper}
        slidesPerView={breakpointCards}
        spaceBetween={spaceBetween}
        speed={breakpointCards > 1 ? 480 : 720}
        onTransitionEnd={() => setCurrentIndex(swiper.realIndex)}
      >
        {cards?.map((card) => (
          <SwiperSlide className='h-full max-w-[335px] lg:max-w-none' key={card.key}>
            {card}
          </SwiperSlide>
        ))}
      </Swiper>
      {!isTablet && <div className='pt-4'>{controls}</div>}
    </div>
  )
}

LargeStepSlider.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  cards: PropTypes.PropTypes.node.isRequired,
  description: PropTypes.node,
  cardsPerView: PropTypes.number,
}

LargeStepSlider.defaultProps = {
  eyebrow: undefined,
  title: undefined,
  description: undefined,
  cardsPerView: 1,
}

export default LargeStepSlider
