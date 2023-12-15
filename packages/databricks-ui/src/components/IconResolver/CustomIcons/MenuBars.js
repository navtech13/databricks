import React from "react"

const MenuBars = ({ ...props }) => {
  return (
    <svg
      viewBox='0 0 512 512'
      aria-hidden='true'
      role='img'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width='1em'
      height='1em'
      {...props}
    >
      <path
        fill='currentColor'
        d='M0 96c0-13.255 10.745-24 24-24h464c13.255 0 24 10.745 24 24s-10.745 24-24 24H24c-13.255 0-24-12.745-24-24zm0 160c0-13.255 10.745-24 24-24h464c13.255 0 24 10.745 24 24s-12.745 24-24 24H24c-13.255 0-24-12.745-24-24zm0 160c0-13.255 10.745-24 24-24h464c13.255 0 24 10.745 24 24s-12.745 24-24 24H24c-13.255 0-24-12.745-24-24z'
      />
    </svg>
  )
}

export default MenuBars
