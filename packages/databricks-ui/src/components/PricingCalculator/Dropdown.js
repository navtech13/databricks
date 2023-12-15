import React from "react"
import PropTypes from "prop-types"
import Select, { components } from "react-select"
import IconResolver from "../IconResolver"
import dropdownStyles from "./dropdownStyles"

const Dropdown = ({ name, label, options, setInput, selected, labelVariant }) => {
  const variantMap = {
    "A": "font-bold",
    "B": "h4"
  }
  const style = variantMap[labelVariant]
  return (
    <>
      <p className={style}>{name}</p>
      <Select
        options={options}
        aria-label={label}
        placeholder={'Select'}
        styles={dropdownStyles()}
        onChange={setInput}
        value={selected || ''}
        isOptionSelected={(option, selectValue) => selectValue.some(i => i === option)}
        components={{
          DropdownIndicator: (props) => {
            return (
              <components.DropdownIndicator {...props}>
                <IconResolver className='text-[#A4A4A4]' token='chevronDown' />
              </components.DropdownIndicator>
            )
          },
        }}
      />
    </>
  )
}

Dropdown.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  setInput: PropTypes.func.isRequired,
  selected: PropTypes.string,
  labelVariant: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ).isRequired,
}

Dropdown.defaultProps = {
  label: "",
  labelVariant: "",
  selected: "",
}

export default Dropdown
