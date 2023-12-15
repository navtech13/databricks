import React from "react"

const Language = (props) => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <circle cx='10' cy='10' r='7.5' stroke='currentColor' />
    <path
      d='M13.5 10C13.5 12.1483 13.0635 14.0686 12.3812 15.4332C11.6839 16.8278 10.8132 17.5 10 17.5C9.18684 17.5 8.31607 16.8278 7.61879 15.4332C6.93646 14.0686 6.5 12.1483 6.5 10C6.5 7.85165 6.93646 5.93141 7.61879 4.56675C8.31607 3.17219 9.18684 2.5 10 2.5C10.8132 2.5 11.6839 3.17219 12.3812 4.56675C13.0635 5.93141 13.5 7.85165 13.5 10Z'
      stroke='currentColor'
    />
    <path d='M17 10H3' stroke='currentColor' />
    <path d='M16.5 6H3.5' stroke='currentColor' />
    <path d='M16.5 14H3.5' stroke='currentColor' />
  </svg>
)
export default Language
