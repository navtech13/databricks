import React from "react"

const ArrowRight = ({ ...props }) => {
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
        d='M0 5.99219L12 5.99219'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeMiterlimit='10'
      />
      <path
        d='M7 10.9961L12 5.99609L7 0.996094'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeMiterlimit='10'
      />
    </svg>
  )
}

export default ArrowRight
