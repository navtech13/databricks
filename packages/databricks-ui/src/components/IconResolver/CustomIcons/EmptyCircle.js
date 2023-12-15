import React from "react"

const EmptyCircle = ({ ...props }) => {
  return (
    <svg
      width='21'
      height='20'
      viewBox='0 0 21 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='10.5' cy='10' r='9.5' stroke='currentColor' />
    </svg>
  )
}

export default EmptyCircle
