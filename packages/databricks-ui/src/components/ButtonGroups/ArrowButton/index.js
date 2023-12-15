import React from "react"
import PropTypes from "prop-types"
import IconResolver from "../../IconResolver"

const sizeMap = {
  standard: {
    wrapper: "h-[48px] w-[48px]",
    icon: "w-2.5",
  },
  large: {
    wrapper: "h-[64px] w-[64px]",
    icon: "w-[28px] h-3",
  },
}

const ArrowButton = ({ as, disabled, arrowLeft, size, className, ariaLabel, ...props }) => {
  const Component = as
  const currentSize = sizeMap[size] || sizeMap.standard
  return (
    <Component
      data-cy='ArrowButton'
      disabled={disabled}
      type='button'
      aria-label={ariaLabel}
      className={`inline-flex ${currentSize.wrapper} items-center justify-center rounded-full border-orange-500 bg-orange-500 hover:bg-orange-400 disabled:border disabled:bg-[transparent] ${className}`}
      {...props}
    >
      <IconResolver
        token='arrowRightThin'
        className={`${disabled ? `text-orange-500` : `text-navy-800`} ${
          arrowLeft ? "rotate-180" : ""
        } ${currentSize.icon}`}
      />
    </Component>
  )
}

ArrowButton.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  arrowLeft: PropTypes.bool,
  size: PropTypes.oneOf(["standard", "large"]),
  ariaLabel: PropTypes.string
}

ArrowButton.defaultProps = {
  as: "button",
  disabled: false,
  arrowLeft: false,
  className: "",
  size: "standard",
  ariaLabel: ""
}

export default ArrowButton
