import React from "react"
import PropTypes from "prop-types"
import CheckBox from "../../Form/CheckBox"

const CheckboxWidget = ({ id, value, label, options, onChange }) => {
  return (
    <CheckBox
      text={label}
      textStyle={`b6 text-gray-text ${options.hideInput ? "" : "ml-1"}`}
      id={id}
      hideInput={options.hideInput}
      handleClick={() => {
        onChange(!value)
      }}
      active={value}
    />
  )
}

CheckboxWidget.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.bool,
  label: PropTypes.string.isRequired,
  options: PropTypes.shape({
    hideInput: PropTypes.bool,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
}

CheckboxWidget.defaultProps = {
  value: false,
}

export default CheckboxWidget
