import React, { useState } from "react"
import PropTypes from "prop-types"
import ArrowButton from "../ButtonGroups/ArrowButton"
import IconResolver from "../IconResolver"

const TextSlide = ({
  item,
  swiper,
  prevLabel,
  nextLabel,

  textColor,
}) => {
  const [paused, setPaused] = useState(false)
  return (
    <div className='shadow-legacy-card-normal flex w-full flex-col items-center justify-center gap-4 p-3 pb-4  text-center md:px-5 md:pt-5 lg:px-12 lg:pt-12 lg:pb-8'>
      <div
        style={{ color: `${textColor}` }}
        className='flex flex-col items-center justify-center gap-4 text-center'
      >
        {item.content}
      </div>
      <div>
        <ArrowButton
          className='bg-navy-01'
          onClick={() => swiper.slidePrev()}
          arrowLeft
          aria-label={prevLabel}
        />
        {paused ? (
          <button
            type='button'
            label='play'
            className='px-3 py-1'
            onClick={() => {
              setPaused(false)
              return swiper.autoplay.start()
            }}
          >
            <span className='bg-navy-01 flex  h-2.5 w-2.5 items-center justify-center rounded-full '>
              <div className=' flex h-2 w-2 items-center justify-between rounded-full border'>
                <IconResolver className='mx-auto h-1 w-[6px]' token='play' />
              </div>
            </span>
          </button>
        ) : (
          <button
            type='button'
            label='pause'
            className='px-3 py-1'
            onClick={() => {
              setPaused(true)
              return swiper.autoplay.stop()
            }}
          >
            <span className='bg-navy-01 flex  h-2.5 w-2.5 items-center justify-center rounded-full '>
              <div className=' flex h-2 w-2 items-center justify-between rounded-full border'>
                <IconResolver className='mx-auto h-1 w-[6px]' token='pause' />
              </div>
            </span>
          </button>
        )}
        <ArrowButton
          className='bg-navy-01'
          onClick={() => swiper.slideNext()}
          aria-label={nextLabel}
        />
      </div>
    </div>
  )
}

TextSlide.propTypes = {
  item: PropTypes.shape({
    content: PropTypes.node,
  }).isRequired,
  swiper: PropTypes.shape({
    slidePrev: PropTypes.func,
    slideNext: PropTypes.func,
    autoplay: PropTypes.func,
  }).isRequired,
  nextLabel: PropTypes.string,
  prevLabel: PropTypes.string,
  textColor: PropTypes.string,
}

TextSlide.defaultProps = {
  nextLabel: "Next Slide",
  prevLabel: "Previous Slide",
  textColor: "#FFFFFF",
}

export default TextSlide
