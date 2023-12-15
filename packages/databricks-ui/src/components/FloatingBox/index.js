import React from "react"
import PropTypes from "prop-types"

const FloatingBox = ({
  children,
  topBackgroundColor,
  bottomBackgroundColor,
  overlapSize,
  topBackgroundSize,
  ...props
}) => {
  return (
    <div className='floating-box' {...props}>
      {topBackgroundColor && (
        <div
          className={`h-${topBackgroundSize} w-full`}
          style={{
            zIndex: "-1",
            backgroundColor: topBackgroundColor?.color || "none",
            opacity: topBackgroundColor?.opacity || "0",
          }}
          aria-hidden
        />
      )}
      <div className='relative'>
        <div
          aria-hidden
          className='absolute inset-0 h-full w-full'
          style={{
            backgroundColor: bottomBackgroundColor?.color || "none",
            opacity: bottomBackgroundColor?.opacity || "0",
          }}
        />
        <div
          className={`floating-box inner-wrapper shadow-card-normal -translate-y-${overlapSize} bg-white px-4 py-6 md:py-4 lg:px-5 lg:py-6`}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

FloatingBox.propTypes = {
  children: PropTypes.node,
  overlapSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  topBackgroundSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  topBackgroundColor: PropTypes.shape({
    color: PropTypes.string,
    opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  bottomBackgroundColor: PropTypes.shape({
    color: PropTypes.string,
    opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
}

FloatingBox.defaultProps = {
  children: undefined,
  overlapSize: "6",
  topBackgroundSize: "12",
  topBackgroundColor: undefined,
  bottomBackgroundColor: undefined,
}

export default FloatingBox
