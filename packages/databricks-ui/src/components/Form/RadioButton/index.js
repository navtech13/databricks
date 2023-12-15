import React from "react"
import PropTypes from "prop-types"
import RichText from "../../RichText"
import IconResolver from "../../IconResolver"

const RadioButton = ({ text, handleClick, active, error, errorMessage, id }) => {
  const style = () => {
    if (error && active) {
      return "border-orange-05 bg-navy-06"
    }
    if (error) {
      return "border-orange-05"
    }
    if (active) {
      return "bg-navy-06"
    }
    return "hover:bg-gray-warm-medium"
  }
  return (
    <div>
      <label htmlFor={id} className='flex cursor-pointer flex-row items-center'>
        <input
          id={id}
          type='radio'
          onClick={handleClick}
          className='appearance-none'
        />
        <span
          aria-hidden='true'
          className={`flex h-2 min-w-[16px] items-center justify-center rounded-full border ${style()}`}
        >
          {active && (
            <IconResolver token='dot' className='w-0.5 rounded-full text-white' />
          )}
        </span>
        <RichText htmlFor={id} as='label' className='b6 ml-1'>
          {text}
        </RichText>
      </label>
      {error ? (
        <label htmlFor={id} className='b6 text-orange-05 ml-3'>
          {errorMessage}
        </label>
      ) : null}
    </div>
  )
}

RadioButton.propTypes = {
  text: PropTypes.PropTypes.node.isRequired,
  handleClick: PropTypes.func,
  active: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string.isRequired,
  id: PropTypes.string,
}

RadioButton.defaultProps = {
  active: false,
  error: false,
  handleClick: () => {},
  id: "id",
}

export default RadioButton
