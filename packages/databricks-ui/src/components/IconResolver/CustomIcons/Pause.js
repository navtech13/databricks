import React from "react"

const Pause = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='26'
      viewBox='0 0 24 26'
      fill='none'
      {...props}
    >
      <rect width='8' height='26' fill='currentColor' />
      <rect x='16' width='8' height='26' fill='currentColor' />
    </svg>
  )
}

export default Pause
