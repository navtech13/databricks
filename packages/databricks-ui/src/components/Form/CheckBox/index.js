import React from "react"
import PropTypes from "prop-types"
import RichText from "../../RichText"
import IconResolver from "../../IconResolver"

const CheckBox = ({
  text,
  handleClick,
  hideInput,
  active,
  error,
  errorMessage,
  textStyle,
  id,
}) => {
  const style = () => {
    if (error && active) {
      return "border-orange-05 bg-green-04"
    }
    if (error) {
      return "border-orange-05"
    }
    if (active) {
      return "bg-green-04"
    }
    return "hover:bg-gray-warm-medium"
  }
  return (
    <div>
      <label htmlFor={id} className='flex flex-row'>
        <input id={id} type='checkbox' onClick={handleClick} className='sr-only' />
        {!hideInput && (
          <span
            aria-hidden='true'
            className={`flex h-2 min-w-[18px] items-center justify-center border ${style()}`}
          >
            {active && (
              <IconResolver
                token='vector'
                className='pt-6px pl-4px h-7px w-1 text-white'
              />
            )}
          </span>
        )}
        <RichText
          htmlFor={id}
          as='label'
          className={textStyle || `h6 ${hideInput ? "" : "ml-1"}`}
        >
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

CheckBox.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  active: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  textStyle: PropTypes.string,
  id: PropTypes.string,
  hideInput: PropTypes.bool,
}

CheckBox.defaultProps = {
  active: false,
  error: false,
  errorMessage: "This field is required",
  textStyle: undefined,
  handleClick: () => {},
  id: "id",
  hideInput: false,
}

export default CheckBox
