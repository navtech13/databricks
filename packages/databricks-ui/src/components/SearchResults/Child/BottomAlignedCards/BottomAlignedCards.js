import PropTypes from "prop-types"
import React from "react"
import GoToArrow from "../../../../../../../assets/global/images/icn_arrow.svg"

function BottomAlignedCards({ data }) {
  return (
    <div
      data-cy='BottomAlignedCards'
      className='shadow-card-normal hover:border-b-orange-03 mt-5 flex w-full flex-none flex-row items-center justify-center gap-2 border-b border-solid border-white bg-white p-2 lg:mr-2.5 lg:w-1/2 '
    >
      <div className='w-1/4 lg:w-1/3 '>
        <img src={data.img} alt='' />
      </div>
      <div className='w-3/4 lg:w-8/12 '>
        <h4 className='text-1.5 order-none flex flex-none items-center font-mono font-normal uppercase leading-5'>
          {data.type}
        </h4>
        <h5 className='order-1 my-1 flex flex-none items-center self-stretch font-medium leading-6'>
          {data.title}
        </h5>
        <p className='text-gray-text text-1.75 order-2 flex-none self-stretch font-normal leading-5'>
          {data.para}
        </p>
        <a
          href={data.hlink}
          target='_blank'
          className='order-none mt-1 flex flex-none items-center text-base font-normal leading-6'
          rel='noreferrer'
        >
          {data.linkLabel} <img className='m-0.5 h-1.5 w-3' src={GoToArrow} alt='' />
        </a>
      </div>
    </div>
  )
}

BottomAlignedCards.propTypes = {
  data: PropTypes.shape({
    hlink: PropTypes.string,
    img: PropTypes.string,
    linkLabel: PropTypes.string,
    para: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
}

export default BottomAlignedCards
