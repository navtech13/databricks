import React from "react"
import PropTypes from "prop-types"
import RichText from "../../RichText"

const MessageField = ({ id, label, error, errorMessage, input, ...props }) => {
  return (
    <div className='relative'>
      <textarea
        type='text'
        id={id}
        onChange={input}
        className={`b3 bg-gray-warm-medium text-navy-06 peer block min-h-[128px] 
          w-full appearance-none border-0 border-b px-2 focus:border-b-2 focus:outline-none  
            ${input ? `py-2` : `py-3`}
            ${
              error
                ? `border-orange-05 focus:border-orange-05 hover:border-orange-05`
                : `border-navy-03 focus:border-navy-06 hover:border-navy-06`
            }`}
        placeholder=' '
        {...props}
      />
      <div className='bg-gray-warm-medium absolute top-0 h-3 w-full' />
      <RichText
        as='label'
        htmlFor={id}
        className={`b3 absolute top-0 origin-[0] translate-y-[1px] translate-x-2 
          scale-75 transform duration-300 peer-placeholder-shown:translate-y-2 
          peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:translate-y-[1px] peer-focus:scale-75
          ${
            error
              ? `text-orange-05 peer-focus:text-orange-05`
              : `text-navy-04 peer-focus:text-navy-04 `
          }`}
      >
        {label}
      </RichText>
      {error ? (
        <label htmlFor={id} className='b6 text-orange-05'>
          {errorMessage}
        </label>
      ) : null}
    </div>
  )
}

MessageField.propTypes = {
  label: PropTypes.string.isRequired,
  input: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  id: PropTypes.string,
}

MessageField.defaultProps = {
  input: undefined,
  error: false,
  errorMessage: undefined,
  id: "id",
}

export default MessageField
