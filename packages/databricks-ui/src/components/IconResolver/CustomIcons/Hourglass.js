import React from "react"

const Hourglass = ({ ...props }) => {
  return (
    <svg width='24' height='25' viewBox='0 0 24 25' fill='none' {...props}>
      <path
        d='M21 6H3L9.85714 16V21H13.2857V16L21 6Z'
        stroke='white'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Hourglass
