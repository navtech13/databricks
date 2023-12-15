import React from "react"
import PropTypes from "prop-types"

const Exclude = ({ className, ...props }) => {
  return (
    <svg
      width='58'
      height='200'
      viewBox='0 0 58 200'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 200L58 100V200H0ZM0 0H58V100L0 0Z'
        fill='currentColor'
      />
    </svg>
  )
}

Exclude.propTypes = {
  className: PropTypes.string,
}
Exclude.defaultProps = {
  className: "",
}

export default Exclude
