import React from "react"

const CircleFailed = ({ ...props }) => {
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
        d='M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM12.4621 13.7879L10 11.3258L7.53797 13.7879L6.21214 12.4621L8.6742 10L6.21212 7.53794L7.53794 6.21211L10 8.6742L12.4621 6.21211L13.7879 7.53794L11.3259 10L13.7879 12.4621L12.4621 13.7879Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default CircleFailed
