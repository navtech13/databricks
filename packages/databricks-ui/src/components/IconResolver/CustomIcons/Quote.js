import React from "react"

const Quote = ({ ...props }) => {
  return (
    <svg
      width='10'
      height='7'
      viewBox='0 0 10 7'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M0.5 6.467L3.11 0H4.85L3.226 6.467H0.5ZM5.024 6.467L7.663 0H9.403L7.75 6.467H5.024Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default Quote
