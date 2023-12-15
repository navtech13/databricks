import React from "react"

const LinkArrow = ({ ...props }) => {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath='url(#clip0_240_5232)'>
        <path
          d='M1.22193 12L10.3081 2.91004L10.2924 9.91917H12V0H2.08355L2.06788 1.6897H9.08616L0 10.7797L1.22193 12Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_240_5232'>
          <rect width='12' height='12' fill='none' />
        </clipPath>
      </defs>
    </svg>
  )
}

export default LinkArrow
