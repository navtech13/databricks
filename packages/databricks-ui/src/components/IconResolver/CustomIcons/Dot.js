import React from "react"

const Dot = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='4'
      height='4'
      viewBox='0 0 4 4'
      fill='none'
      {...props}
    >
      <rect width='4' height='4' rx='2' fill='currentColor' />
    </svg>
  )
}

export default Dot
