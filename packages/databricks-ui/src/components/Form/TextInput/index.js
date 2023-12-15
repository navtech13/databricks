import React from "react"
import PropTypes from "prop-types"
import RichText from "../../RichText"

const TextInput = ({
  id,
  input,
  label,
  error,
  errorMessage,
  className,
  variant,
  ...props
}) => {
  const variantStyles = {
    primary: {
      input: `b3 text-navy-06 pb-1 peer block max-h-8 w-full appearance-none border-b px-0 pt-3 focus:border-b-2 focus:outline-none
        ${
          error
            ? `border-orange-05 focus:border-orange-05 hover:border-orange-05`
            : `border-navy-03 focus:border-navy-06 hover:border-navy-06`
        }`,
      label: `
        b4 absolute top-0 origin-[0] translate-y-[1px] scale-75 transform duration-300
        peer-placeholder-shown:translate-y-2
        peer-placeholder-shown:scale-100 peer-focus:left-0
        peer-focus:translate-y-[1px]
        peer-focus:scale-75
        ${
          error
            ? `text-orange-05 peer-focus:text-orange-05`
            : ` text-navy-04 peer-focus:text-navy-04 `
        }`,
      errorLabel: "b6 text-orange-05",
    },
    secondary: {
      input: `text-gray-text text-1.75 text-navy-06 py-0.5 pr-1 block w-full border pl-1 focus:outline-none
        ${
          error
            ? `border-orange-02 focus:border-orange-02 hover:border-orange-02`
            : `border-gray-lines focus:border-navy-04 hover:border-navy-01`
        }`,
      label: `text-1.75 absolute top-0 text-navy-06`,
      errorLabel: "b7 text-orange-05",
      wrapper: "pt-3",
    },
  }

  return (
    <div
      className={`relative ${variantStyles[variant]?.wrapper || ""} ${className}`}
    >
      <input
        type='text'
        id={id}
        onChange={input}
        className={variantStyles[variant]?.input}
        placeholder=' '
        {...props}
      />
      <RichText as='label' htmlFor={id} className={variantStyles[variant]?.label}>
        {label}
      </RichText>
      {error ? (
        <label htmlFor={id} className={variantStyles[variant]?.errorLabel}>
          {errorMessage}
        </label>
      ) : null}
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  input: PropTypes.func,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  id: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary"]),
}

TextInput.defaultProps = {
  className: "",
  input: undefined,
  error: false,
  errorMessage: undefined,
  id: "id",
  variant: "primary",
}

export default TextInput
