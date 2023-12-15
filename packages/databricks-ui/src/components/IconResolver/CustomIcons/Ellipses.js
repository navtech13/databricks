import React from "react"

const Ellipses = ({ ...props }) => {
  return (
    <svg
      width='32'
      height='32'
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='8' cy='16.0001' r='2' fill='currentColor' />
      <circle cx='16' cy='16.0001' r='2' fill='currentColor' />
      <circle cx='24' cy='16.0001' r='2' fill='currentColor' />
    </svg>
  )
}

export default Ellipses
