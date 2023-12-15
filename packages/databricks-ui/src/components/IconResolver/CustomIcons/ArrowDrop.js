import React from "react"

const ArrowDrop = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      {...props}
    >
      <path d='M7 10L12 15L17 10H7Z' fill='currentColor' />
    </svg>
  )
}

export default ArrowDrop
