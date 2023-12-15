import React from "react"

const ArrowUp = ({ ...props }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='8'
      height='6'
      viewBox='0 0 8 6'
      fill='currentColor'
      {...props}
    >
      <path
        d='M7.42985 4.52637L4.46136 1.47407'
        stroke='currentColor'
        strokeWidth='1.1197'
        strokeLinecap='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M1.49301 4.52612L4.46149 1.47383L1.49301 4.52612Z'
        fill='currentColor'
      />
      <path
        d='M1.49301 4.52612L4.46149 1.47383'
        stroke='currentColor'
        strokeWidth='1.1197'
        strokeLinecap='round'
      />
    </svg>
  )
}

export default ArrowUp
