import React from "react"

const CheckboxEmpty = ({ ...props }) => {
  return (
    <svg
      width='18'
      height='19'
      viewBox='0 0 18 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <rect x='0.5' y='1' width='17' height='17' fill='transparent' />
      <rect x='0.5' y='1' width='17' height='17' stroke='currentColor' />
    </svg>
  )
}

export default CheckboxEmpty
