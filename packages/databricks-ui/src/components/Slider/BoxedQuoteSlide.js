import React from "react"
import PropTypes from "prop-types"

const BoxedQuoteSlide = ({ item }) => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='shadow-legacy-card-normal mb-5 flex w-full flex-col items-center justify-center gap-3 bg-white p-3 pb-4 text-center md:px-5 md:pt-5 lg:px-10'>
        {item.content}
      </div>
    </div>
  )
}

BoxedQuoteSlide.propTypes = {
  item: PropTypes.shape({
    content: PropTypes.node,
  }).isRequired,
}

export default BoxedQuoteSlide
