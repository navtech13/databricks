import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import ArrowButton from "../ButtonGroups/ArrowButton"
import RichText from "../RichText"

const Slide = ({ item, prevLabel, nextLabel, swiper }) => {
  const { image, description, name, title } = item
  return (
    <div className='scroll-bar-transparent flex max-h-[100vh] cursor-default flex-col overflow-scroll p-2 pt-8 md:flex-row md:justify-between md:p-4 md:pt-20 '>
      <div className='mb-2 flex flex-row justify-between align-bottom md:mr-2 lg:mr-4 '>
        <Image
          imageContainerOptions={{
            className: "w-full",
          }}
          imageOptions={{
            className:
              "rounded-full shadow-card-normal md:min-w-[164px] lg:min-w-[264px] w-16",
          }}
          {...image}
        />
        <div className='min-w-max self-end md:hidden'>
          <ArrowButton
            onClick={() => swiper.slidePrev()}
            className='mr-2'
            arrowLeft
            aria-label={prevLabel}
          />
          <ArrowButton onClick={() => swiper.slideNext()} aria-label={nextLabel} />
        </div>
      </div>
      <div className='text-navy-06'>
        <div className='mb-3'>
          <h2 className='font-normal'>{name}</h2>
          <h4 className='font-bold'>{title}</h4>
        </div>
        <RichText className='scroll-bar-navy-02 b2 mb-12 -mr-1 max-h-[320px] pr-2.5 md:mb-0 md:-mr-2.5 md:max-h-[480px] md:pr-8 lg:max-h-[520px]'>
          {description}
        </RichText>
        <div className='mt-6 hidden pb-12 md:block'>
          <ArrowButton
            onClick={() => swiper.slidePrev()}
            className='mr-2'
            arrowLeft
            aria-label={prevLabel}
          />
          <ArrowButton onClick={() => swiper.slideNext()} aria-label={nextLabel} />
        </div>
      </div>
    </div>
  )
}

Slide.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.shape({}),
    description: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
  }),
  nextLabel: PropTypes.string,
  prevLabel: PropTypes.string,
  swiper: PropTypes.shape({
    slidePrev: PropTypes.func,
    slideNext: PropTypes.func,
  }).isRequired,
}

Slide.defaultProps = {
  item: {
    image: null,
    description: "",
    name: "",
    title: "",
  },
  nextLabel: "Next Slide",
  prevLabel: "Previous Slide",
}
export default Slide
