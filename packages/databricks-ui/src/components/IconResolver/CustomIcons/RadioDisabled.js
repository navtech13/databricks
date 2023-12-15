import React from "react"

const RadioDisabled = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill='none'
      {...props}
    >
      <circle cx='6' cy='6' r='5.5' stroke='currentColor' />
    </svg>
  )
}

export default RadioDisabled
