import React from "react"
import PropTypes from "prop-types"
import IconResolver from "../../IconResolver"

const MediaButton = ({ handleClick, play, disabled, className }) => {
  return (
    <button
      data-cy='MediaButton'
      disabled={disabled}
      type='button'
      className={`flex h-8 w-8 items-center justify-center ${
        disabled
          ? `bg-navy-01`
          : `bg-orange-04 hover:bg-orange-05 group-hover:bg-orange-05 active:bg-orange-03`
      } ${className}`}
      onClick={handleClick}
    >
      {play ? (
        <IconResolver aria-hidden='true' token='pause' className='text-white' />
      ) : (
        <IconResolver
          aria-hidden='true'
          token='play'
          className='ml-0.5 text-white'
        />
      )}
    </button>
  )
}

MediaButton.propTypes = {
  play: PropTypes.bool,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

MediaButton.defaultProps = {
  play: true,
  handleClick: () => {},
  disabled: false,
  className: "",
}

export default MediaButton
