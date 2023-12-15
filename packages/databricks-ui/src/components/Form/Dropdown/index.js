import React, { useState } from "react"
import PropTypes from "prop-types"
import IconResolver from "../../IconResolver"
import RichText from "../../RichText"

const Dropdown = ({ label, items, isRequired, id }) => {
  const [value, setValue] = useState("")
  const [isActive, setActive] = useState(false)

  const handleChange = (e) => {
    setValue(e.target.value)

    if (e.target.value !== "") {
      setActive(true)
    } else {
      setActive(false)
    }
  }
  return (
    <div className='relative z-0'>
      <select
        className='border-navy-03 hover:border-navy-06 focus:border-navy-06 active:border-navy-06 invalid:border-orange-05 peer block w-full appearance-none border-0 border-b bg-transparent py-1 px-0 focus:border-b-2 focus:outline-none focus:ring-0 active:border-b-2'
        value={value}
        onChange={handleChange}
        id={id}
      >
        <option value='' aria-label='empty' />
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <label
        className={`text-navy-04 peer-focus:text-navy-04 absolute top-0.5 origin-[0] duration-300 peer-focus:left-0 ${
          isActive ? "-translate-y-2.5 scale-75" : ""
        }`}
        htmlFor={id}
      >
        {label}
        {isRequired && <RichText className='text-orange-05 ml-0.5'>*</RichText>}
      </label>
      <IconResolver
        token='chevronDown'
        className='text-navy-04 absolute top-2 right-0'
      />
    </div>
  )
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  isRequired: PropTypes.bool,
  id: PropTypes.string.isRequired,
}

Dropdown.defaultProps = {
  isRequired: false,
}

export default Dropdown
