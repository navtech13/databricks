import React from "react"

const Minus = ({ ...props }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 9L20 9V11L0 11L0 9Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default Minus
