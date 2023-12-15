import React from "react"

const Vector = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='10'
      height='7'
      viewBox='0 0 10 7'
      fill='none'
      {...props}
    >
      <path
        d='M3.5123 7L0 3.74209L1.05145 2.7668L3.5123 5.04249L8.94855 0L10 0.975296L3.5123 7Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default Vector
