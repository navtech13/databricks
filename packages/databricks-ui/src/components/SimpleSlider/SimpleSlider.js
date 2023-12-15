import React, { useState } from "react"
import PropTypes from "prop-types"
import { EffectFade } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-fade"
import ArrowButton from "../ButtonGroups/ArrowButton"
import "./swiperStyles.css"

const Slider = ({ items, nextLabel, prevLabel, ...props }) => {
  const [swiper, setSwiper] = useState()
  const controls = (
    <div className='mt-4 block'>
      <ArrowButton
        onClick={() => swiper.slidePrev()}
        className='mr-2.5'
        arrowLeft
        aria-label={prevLabel}
      />
      <ArrowButton onClick={() => swiper.slideNext()} aria-label={nextLabel} />
    </div>
  )
  return (
    <div data-cy='Slider' className='simple-slider p-3'>
      <Swiper
        modules={[EffectFade]}
        onSwiper={setSwiper}
        style={{ cursor: "grab" }}
        fadeEffect={{ crossFade: true }}
        loop
        effect='fade'
        {...props}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            {swiper && <div>{item.content}</div>}
            {controls}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  nextLabel: PropTypes.string,
  prevLabel: PropTypes.string,
}

Slider.defaultProps = {
  nextLabel: "Next Slide",
  prevLabel: "Previous Slide",
}

export default Slider
