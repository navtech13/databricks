import React from "react"

const Facebook = ({ ...props }) => {
  return (
    <svg
      width='22'
      height='22'
      viewBox='0 0 22 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label='Facebook'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M11.7509 21.5H1.21423C0.543433 21.5 0 20.9809 0 20.3409V1.65903C0 1.01881 0.543519 0.5 1.21423 0.5H20.7859C21.4564 0.5 22 1.01881 22 1.65903V20.3409C22 20.981 21.4563 21.5 20.7859 21.5H15.1797V13.3676H18.0393L18.4675 10.1983H15.1797V8.17491C15.1797 7.25731 15.4466 6.632 16.8251 6.632L18.5833 6.63127V3.7966C18.2792 3.75798 17.2355 3.67169 16.0213 3.67169C13.4864 3.67169 11.7509 5.14867 11.7509 7.86103V10.1983H8.88393V13.3676H11.7509V21.5Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default Facebook
