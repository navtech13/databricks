import React from "react"
import PropTypes from "prop-types"
import RichText from "../../RichText"
import IconResolver from "../../IconResolver"

const DropdownField = ({
  id,
  handleClick,
  className,
  label,
  error,
  errorMessage,
  options,
  onChange,
  value,
}) => {
  const emptyValueElement = options.find((option) => option.id === "")

  return (
    <div className={`component-dropdownfield relative cursor-pointer ${className}`}>
      <IconResolver
        token='arrowDrop'
        className='text-navy-04 absolute top-0 right-0 translate-y-2'
        htmlFor={id}
      />
      <select
        id={id}
        value={value}
        type='dropdown'
        onClick={handleClick}
        onChange={onChange}
        className={`
        b4 text-navy-06 peer block max-h-8 w-full cursor-pointer appearance-none border-b px-0 pb-1 pt-2.5 focus:border-b-2 focus:outline-none
          ${
            error
              ? `border-orange-05 focus:border-orange-05 hover:border-orange-05`
              : `border-navy-03 focus:border-navy-06 hover:border-navy-06`
          }`}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.text}
          </option>
        ))}
      </select>
      <RichText
        as='label'
        htmlFor={id}
        className={`b3 absolute top-0 max-h-3 transform duration-300 
        ${
          emptyValueElement?.text || (value && value !== "")
            ? `origin-[0] translate-y-[1px] scale-75`
            : `translate-y-2`
        } 
        ${error ? `text-orange-05` : `text-navy-04`}`}
      >
        {label}
      </RichText>
      {error && (
        <label htmlFor={id} className='b6 text-orange-05'>
          {errorMessage}
        </label>
      )}
    </div>
  )
}

DropdownField.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

DropdownField.defaultProps = {
  handleClick: () => {},
  className: "",
  error: false,
  errorMessage: undefined,
  id: "id",
  onChange: () => {},
  value: "",
}

export default DropdownField
