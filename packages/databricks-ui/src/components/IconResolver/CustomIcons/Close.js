import React from "react"

const Close = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='16'
      height='15'
      viewBox='0 0 16 15'
      fill='none'
      {...props}
    >
      <path fill='currentColor' d='m14.01.075 1.414 1.414L1.99 14.924.575 13.51z' />
      <path fill='currentColor' d='M.576 1.49 1.99.074 15.425 13.51l-1.414 1.414z' />
    </svg>
  )
}

export default Close
