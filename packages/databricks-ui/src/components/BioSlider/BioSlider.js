import React, { useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import PropTypes from "prop-types"
import { EffectFade } from "swiper"
import Slide from "./Slide"
import Modal from "./Modal"

const BioSlider = ({ children, items, childrenIndex }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [swiper, setSwiper] = useState()
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div>
      <Modal
        className='bioSliderModal'
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <Swiper
          modules={[EffectFade]}
          onSwiper={setSwiper}
          fadeEffect={{ crossFade: true }}
          loop
          effect='fade'
          initialSlide={currentIndex}
        >
          {items.map((item) => {
            return (
              <SwiperSlide className='bg-white' key={item.key}>
                {swiper && <Slide swiper={swiper} item={item} />}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Modal>
      <button
        type='button'
        className='w-full text-left'
        onClick={() => {
          setIsOpen(true)
          setCurrentIndex(childrenIndex)
        }}
      >
        {children}
      </button>
    </div>
  )
}

BioSlider.propTypes = {
  children: PropTypes.node,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  childrenIndex: PropTypes.number.isRequired,
}

BioSlider.defaultProps = {
  children: null,
  items: null,
}

export default BioSlider
