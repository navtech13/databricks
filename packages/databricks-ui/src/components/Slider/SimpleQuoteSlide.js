import React from "react"
import PropTypes from "prop-types"
import ArrowButton from "../ButtonGroups/ArrowButton"

const SimpleQuoteSlide = ({ item, swiper, prevLabel, nextLabel }) => {
  return (
    <div className='mx-auto flex flex-col-reverse md:flex-row md:justify-between lg:justify-start'>
      {/* Left column */}
      <div className='md:3/12 mt-4 min-w-max md:mt-1 lg:w-2/12'>
        <ArrowButton
          onClick={() => swiper.slidePrev()}
          className='mr-2.5'
          arrowLeft
          aria-label={prevLabel}
        />
        <ArrowButton onClick={() => swiper.slideNext()} aria-label={nextLabel} />
      </div>
      {/* Right column */}
      <div className='flex flex-col gap-2 md:w-9/12 lg:w-8/12'>{item.content}</div>
    </div>
  )
}

SimpleQuoteSlide.propTypes = {
  item: PropTypes.shape({
    content: PropTypes.node,
  }).isRequired,
  swiper: PropTypes.shape({
    slidePrev: PropTypes.func,
    slideNext: PropTypes.func,
  }).isRequired,
  nextLabel: PropTypes.string,
  prevLabel: PropTypes.string,
}

SimpleQuoteSlide.defaultProps = {
  nextLabel: "Next Slide",
  prevLabel: "Previous Slide",
}

export default SimpleQuoteSlide
