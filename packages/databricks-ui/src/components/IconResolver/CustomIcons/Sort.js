import React from "react"

const Sort = ({ ...props }) => {
  return (
    <svg width='18' height='18' viewBox='0 0 18 18' fill='none' {...props}>
      <path d='M9 10.6667L6.5 13M6.5 13L4 10.6667M6.5 13V5' stroke='currentColor' />
      <path
        d='M9 7.33333L11.5 5M11.5 5L14 7.33333M11.5 5L11.5 13'
        stroke='currentColor'
      />
    </svg>
  )
}

export default Sort
