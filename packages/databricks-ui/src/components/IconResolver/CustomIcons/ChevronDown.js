import React from "react"

const ChevronDown = ({ ...props }) => {
  return (
    <svg
      width='18'
      height='10'
      viewBox='0 0 18 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <g clipPath='url(#clip0_136_6380)'>
        <path
          d='M3.46165 2.0769L9.00011 7.61537L14.5386 2.0769'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_136_6380'>
          <rect
            width='9.69231'
            height='18'
            fill='white'
            transform='translate(18) rotate(90)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}

export default ChevronDown
