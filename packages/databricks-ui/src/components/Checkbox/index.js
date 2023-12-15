import React from "react"
import PropTypes from "prop-types"
import { v4 as uuidv4 } from "uuid"

const Checkbox = ({ item, numTags, setTags, activeFilters, setActiveFilters }) => {
  const setChecked = (e) => {
    const { checked, value } = e.target

    if (checked) {
      setTags(numTags + 1)
    } else {
      setTags(numTags - 1)
    }

    const newFilters = checked
      ? activeFilters.concat([value])
      : activeFilters.filter((filter) => String(filter) !== String(value))
    setActiveFilters(newFilters)
  }

  // get uuid for checkbox ID
  const checkboxId = uuidv4()

  return (
    <div className='px-1.5 py-1' data-cy='Checkbox'>
      <div className='flex items-center'>
        <input
          id={checkboxId}
          type='checkbox'
          value={item.value}
          onChange={setChecked}
          className='border-nav-gray accent-green-04 h-2 w-2 border p-2.5'
          checked={activeFilters?.includes(item.value)}
        />
        <label
          htmlFor={checkboxId}
          className='text-1.5 font-400 select-none pl-1 hover:cursor-pointer'
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
}

Checkbox.defaultProps = {
  item: [],
  numTags: 0,
  setTags: `""`,
  activeFilters: `""`,
  setActiveFilters: `""`,
}
export default Checkbox
