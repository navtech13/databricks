import React from "react"

const ArrowLeft = ({ ...props }) => {
  return (
    <svg
      width='14'
      height='12'
      viewBox='0 0 14 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M14 6L2 6'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeMiterlimit='10'
      />
      <path
        d='M7 0.996094L2 5.99609L7 10.9961'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeMiterlimit='10'
      />
    </svg>
  )
}

export default ArrowLeft
