import React from "react"
import PropTypes from "prop-types"

const LoadingSpinner = ({ className, label }) => {
  return (
    <div
      data-cy='LoadingSpinner'
      className={`flex select-none flex-col items-center justify-center ${className}`}
      role='status'
    >
      <div className='border-navy-01 border-t-orange-04 loading-spinner mb-0.5 h-5 w-5 animate-spin rounded-full border-8' />
      <span className>{label}</span>
    </div>
  )
}

LoadingSpinner.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
}

LoadingSpinner.defaultProps = {
  className: "",
  label: "Loading...",
}

export default LoadingSpinner
