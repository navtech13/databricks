/* eslint-disable react/prop-types */
import React, { useRef } from "react"
import PropTypes from "prop-types"
import Select, { components } from "react-select"
import selectStyles from "./selectStyles"
import IconResolver from "../../IconResolver"

const SelectComponent = ({
  id,
  options,
  onChange,
  value,
  allLabel,
  closeLabel,
  label,
}) => {
  const selectRef = useRef()
  return (
    <Select
      aria-label={label}
      ref={selectRef}
      id={id}
      onChange={onChange}
      value={value}
      options={options}
      styles={selectStyles(label)}
      isSearchable={false}
      placeholder={null}
      allowSelectAll
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      blurInputOnSelect={false}
      components={{
        MenuList: ({ setValue, children, ...props }) => {
          const interactionElement = (
            <div className='flex justify-between'>
              <button
                className='b5 p-1.5 pb-1'
                onClick={() => {
                  selectRef.current.blur()
                }}
                type='button'
              >
                {closeLabel}
              </button>
              <button
                className='b5 p-1.5 pb-1'
                type='button'
                onClick={() => setValue(options)}
              >
                {allLabel}
              </button>
            </div>
          )
          return (
            <components.MenuList {...props}>
              {interactionElement}
              {children}
            </components.MenuList>
          )
        },
        DropdownIndicator: (props) => {
          return (
            <components.DropdownIndicator {...props}>
              <IconResolver className='text-navy-06' token='arrowDown' />
            </components.DropdownIndicator>
          )
        },
        Option: ({
          label: optionLabel,
          isSelected,
          value: optionValue,
          setValue,
          ...props
        }) => {
          return (
            <div>
              <components.Option {...props}>
                <div className='flex cursor-pointer items-center'>
                  <IconResolver
                    className='mr-1'
                    token={isSelected ? "checked" : "checkboxEmpty"}
                  />
                  <span className='b4'>{optionLabel}</span>
                </div>
              </components.Option>
            </div>
          )
        },
      }}
    />
  )
}
SelectComponent.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  allLabel: PropTypes.string,
  closeLabel: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
}

SelectComponent.defaultProps = {
  value: undefined,
  label: "Select",
  allLabel: "Select All",
  closeLabel: "Close",
}

export default SelectComponent
