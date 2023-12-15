import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import bgImage from "../../../static/images/bg-two-column.png"

const TwoColumnsContent = ({ firstColumn, secondColumn }) => {
  return (
    <>
      <Image
        className='invisible fixed top-0 left-0 -z-10 h-full w-full overflow-hidden  md:visible'
        imageOptions={{ className: "h-auto w-full" }}
        src={bgImage}
      />
      <div className='two-column-main inner-wrapper mt-8 flex flex-col justify-between md:flex-row'>
        <div className='first-column md:w-6/12'>
          <div className='ml-auto'>{firstColumn}</div>
        </div>
        <div className='second-column md:w-5/12'>
          <div className='mx-auto max-w-[360px]'>{secondColumn}</div>
        </div>
      </div>
    </>
  )
}

TwoColumnsContent.propTypes = {
  firstColumn: PropTypes.node.isRequired,
  secondColumn: PropTypes.node.isRequired,
}

export default TwoColumnsContent
