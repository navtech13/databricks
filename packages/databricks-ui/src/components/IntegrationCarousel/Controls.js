import React, { useState } from "react"
import PropTypes from "prop-types"
import { Swiper } from "swiper"
import ArrowButton from "../ButtonGroups/ArrowButton"
import IconResolver from "../IconResolver"

/**
 * @typedef {{ swiper: import('swiper').Swiper, autoplay?: boolean }} Props
 * @type {React.FC<Props>} Controls
 */
const Controls = ({ swiper, autoplay }) => {
  const [autoplayEnabled, setAutoPlayEnabled] = useState(autoplay)
  return (
    <div className='relative z-10 pb-4'>
      <ArrowButton
        arrowLeft
        className='bg-white'
        onClick={() => swiper.slidePrev()}
      />
      <button
        type='button'
        className='py-1 px-3'
        onClick={() => {
          setAutoPlayEnabled(!autoplayEnabled)
          if (autoplayEnabled) {
            swiper.autoplay.stop()
            return
          }

          swiper.autoplay.start()
        }}
      >
        <span className='flex h-2 w-2 items-center rounded-full border bg-white'>
          <IconResolver
            className='mx-auto h-1 w-1'
            token={autoplayEnabled ? "pause" : "play"}
          />
        </span>
      </button>
      <ArrowButton className='bg-white' onClick={() => swiper.slideNext()} />
    </div>
  )
}

Controls.propTypes = {
  swiper: PropTypes.objectOf(Swiper).isRequired,
  autoplay: PropTypes.bool,
}

Controls.defaultProps = {
  autoplay: false,
}

export default Controls
