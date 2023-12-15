import React from "react"

const LogoSeparator = ({ ...props }) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='M1 1L10 10M19 19L10 10M10 10L19 1M10 10L1 19' stroke='currentColor' />
    </svg>
  )
}

export default LogoSeparator
