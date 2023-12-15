import React from "react"

function CircledHyphen({ ...props }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      fill='none'
      viewBox='0 0 20 20'
      {...props}
    >
      <circle cx='10' cy='10' r='10' fill='currentColor' />
      <path stroke='#fff' strokeWidth='2' d='M5.592 10.006l8.816-.012' />
    </svg>
  )
}

export default CircledHyphen
