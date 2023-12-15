import React, { useState } from "react"
import PropTypes from "prop-types"
import Select, { createFilter } from "react-select"
import RichText from "../../RichText"
import selectStyles from "./selectStyles"

const SelectComponent = ({
  id,
  label,
  error,
  errorMessage,
  options,
  onChange,
  value,
  variant,
  placeholder,
}) => {
  const variants = {
    primary: {
      placeholder: "",
      label: `absolute top-0 transform duration-300
      ${value?.label && value?.label !== "" ? `text-1.5` : `translate-y-1`}
      ${error ? `text-orange-05` : `text-navy-04`}`,
      errorLabel: "b6 text-orange-05",
    },
    secondary: {
      wrapper: "pt-2.5",
      label: `absolute top-0 text-1.75 text-navy-06`,
      errorLabel: "b6 text-orange-05",
      placeholder,
    },
  }
  const [ignoreCase, setIgnoreCase] = useState(true)
  const [matchFromStart, setMatchFromStart] = useState(true)
  const filterConfig = {
    ignoreCase,
    matchFrom: matchFromStart ? "start" : "any",
  }
  return (
    <div
      className={`relative z-10 wrapper-${id} ${variants[variant]?.wrapper || ""}`}
    >
      <div className='relative z-20'>
        <Select
          id={id}
          onChange={onChange}
          value={value}
          options={options}
          styles={selectStyles(error, variant)}
          isSearchable
          placeholder={variants[variant]?.placeholder}
          filterOption={createFilter(filterConfig)}
        />
      </div>
      <RichText as='label' htmlFor={id} className={variants[variant]?.label}>
        {label}
      </RichText>
      {error && (
        <label htmlFor={id} className={variants[variant]?.errorLabel}>
          {errorMessage}
        </label>
      )}
    </div>
  )
}

SelectComponent.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }),
}

SelectComponent.defaultProps = {
  value: undefined,
  error: false,
  variant: "primary",
  placeholder: "Select",
}

export default SelectComponent
