import React from "react"

const Twitter = ({ ...props }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 48 48'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label='Twitter'
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d="M28.9523 20.3247L46.4371 0H42.2938L27.1117 17.6477L14.9858 0H1L19.3367 26.6864L1 48H5.14358L21.1763 29.3635L33.9821 48H47.9679L28.9513 20.3247H28.9523ZM23.2771 26.9215L21.4192 24.2642L6.63658 3.11923H13.0009L24.9306 20.1839L26.7885 22.8412L42.2957 45.0226H35.9314L23.2771 26.9225V26.9215Z" fill="currentColor"/>
    </svg>
  )
}

export default Twitter
