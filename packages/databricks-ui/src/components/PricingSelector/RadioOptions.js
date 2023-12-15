import React, { useState } from "react"
import PropTypes from "prop-types"

const RadioOptions = ({
  title,
  options,
  rollover,
  name,
  setInput,
  selected,
  cloud,
}) => {
  return (
    <div className='flex w-full flex-col md:w-1/3'>
      <p className='h4'>
        {title}
        {rollover && <span className='text-orange-04'> Help me choose</span>}
      </p>
      <div className='flex'>
        {options.map((item) => (
          <div className='mr-2.5 flex items-center'>
            <input
              className='mr-0.5 h-2 w-2'
              type='radio'
              key={item.value}
              id={item.value}
              value={selected}
              name={name}
              onChange={() => setInput(item.value)}
              checked={selected === item.value}
              disabled={
                (cloud === "GCP" || cloud === "Azure") && item.value === "enterprise"
              }
            />
            <label htmlFor={item.value}>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

RadioOptions.propTypes = {
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  rollover: PropTypes.bool,
  name: PropTypes.string.isRequired,
  setInput: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
  cloud: PropTypes.string.isRequired,
}

RadioOptions.defaultProps = {
  title: "Select plan",
  rollover: false,
}

export default RadioOptions
