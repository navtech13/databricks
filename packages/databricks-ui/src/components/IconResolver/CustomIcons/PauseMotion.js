import React from "react"

const PauseMotion = () => {
  return (
    <svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='11' cy='11' r='11' fill='white' fillOpacity='0.6' />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 15V7H10V15H8ZM12 15V7H14V15H12Z'
        fill='currentColor'
      />
      <circle cx='11' cy='11' r='8.5' stroke='currentColor' />
    </svg>
  )
}

export default PauseMotion
