import React from "react"

const Checked = ({ ...props }) => {
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
      <path
        d='M7.5123 13.5L4 10.2421L5.05145 9.2668L7.5123 11.5425L12.9485 6.5L14 7.4753L7.5123 13.5Z'
        fill='currentColor'
      />
      <rect x='0.5' y='1' width='17' height='17' stroke='currentColor' />
    </svg>
  )
}

export default Checked
