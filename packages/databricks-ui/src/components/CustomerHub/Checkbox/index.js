import React from "react"
import PropTypes from "prop-types"
import { v4 as uuidv4 } from "uuid"

const Checkbox = ({
  item,
  numTags,
  setTags,
  activeFilters,
  disabled,
  setActiveFilters,
}) => {
  const handleChecked = (e) => {
    const { checked, value } = e.target

    if (checked) {
      setActiveFilters([...activeFilters, value])
      setTags(numTags + 1)
    } else {
      setActiveFilters(activeFilters.filter((filter) => filter !== value))
      setTags(numTags - 1)
    }
  }

  // get uuid for checkbox ID
  const checkboxId = uuidv4()

  const checked = activeFilters.includes(item.value)

  return (
    <div className='px-1.5 py-1' data-cy='Checkbox'>
      <div className='flex items-center'>
        <input
          id={checkboxId}
          type='checkbox'
          value={item.value}
          disabled={disabled && !checked}
          onChange={handleChecked}
          className={`border-nav-gray accent-green-04 h-2 w-2 flex-shrink-0 border p-2.5 ${
            disabled ? "" : "hover:cursor-pointer"
          }`}
          checked={checked}
        />
        <label
          htmlFor={checkboxId}
          className={`text-1.5 font-400 select-none pl-1 ${
            disabled ? "" : "hover:cursor-pointer"
          }`}
        >
          {item.label}
        </label>
      </div>
    </div>
  )
}

Checkbox.propTypes = {
  item: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  numTags: PropTypes.number,
  setTags: PropTypes.func,
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  setActiveFilters: PropTypes.func,
  disabled: PropTypes.bool,
}

Checkbox.defaultProps = {
  item: [],
  numTags: 0,
  setTags: `""`,
  activeFilters: [],
  setActiveFilters: `""`,
  disabled: false,
}
export default Checkbox
