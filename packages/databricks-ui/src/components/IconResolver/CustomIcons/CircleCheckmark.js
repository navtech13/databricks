import React from "react"

const CircleCheckmark = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='21'
    height='20'
    fill='none'
    viewBox='0 0 21 20'
    {...props}
  >
    <circle cx='10.5' cy='10' r='10' fill='currentColor' />
    <path stroke='#fff' strokeWidth='2' d='M7.206 10.238l2.5 2.5 6-6' />
  </svg>
)
export default CircleCheckmark
