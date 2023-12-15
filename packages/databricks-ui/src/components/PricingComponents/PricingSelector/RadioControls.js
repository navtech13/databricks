import React from "react"
import PropTypes from "prop-types"
import Link from "../../Link"

const RadioControls = ({
  title,
  options,
  selected,
  rolloverCta,
  setInput,
  ...props
}) => {
  return (
    <div {...props}>
      <div className='mb-1 flex'>
        <h4>{title}</h4>
        {rolloverCta && (
          <Link className='h5 mt-0.5 ml-1' to={rolloverCta.to}>
            {rolloverCta.text}
          </Link>
        )}
      </div>
      <div className='flex flex-wrap justify-between gap-2 md:justify-start'>
        {options?.map((item) => {
          const id = `pricing-${item.value}`
          return (
            <div
              className={`flex items-center ${
                item.disabled ? "text-light-gray" : ""
              }`}
            >
              <input
                className='mr-0.5 h-3 w-3'
                type='radio'
                key={item.value}
                id={id}
                disabled={item.disabled}
                value={item.value}
                onChange={() => (item.disabled ? null : setInput(item.value))}
                checked={item.disabled ? false : selected === item.value}
              />
              <label htmlFor={id}>{item.label}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

RadioControls.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  rolloverCta: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
  }),
  selected: PropTypes.string,
  setInput: PropTypes.func.isRequired,
}

RadioControls.defaultProps = {
  rolloverCta: null,
  selected: "",
}

export default RadioControls
