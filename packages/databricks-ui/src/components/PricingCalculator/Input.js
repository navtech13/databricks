import React from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

const Input = ({ name, min, max, tooltip, setInput, inputValue }) => {
  const changeInput = (val) => {
    // validation
    if (val <= max && val >= min) {
      setInput(val)
    }
  }
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-center'>
        {tooltip && (
          <Tippy content={tooltip}>
            <button type='button'>
              <IconResolver token='help' className='text-light-gray mr-1 h-2 w-2' />
            </button>
          </Tippy>
        )}
        <p className='font-bold'>{name}</p>
      </div>
      <input
        className='border-gray-lines h-5 border text-center'
        type='number'
        min={min}
        max={max}
        onChange={(e) => changeInput(e.target.value)}
        value={inputValue}
      />
    </div>
  )
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  tooltip: PropTypes.node,
  setInput: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
}

Input.defaultProps = {
  min: 0,
  max: 1000000,
  tooltip: undefined,
  inputValue: "",
}

export default Input
