import React from "react"
import PropTypes from "prop-types"
import Select from "../../Form/Select"

const SelectWidget = ({ id, label, onChange, value, schema, rawErrors }) => {
  return (
    <Select
      id={id}
      label={label}
      error={rawErrors?.[0] && true}
      errorMessage={rawErrors?.[0]}
      onChange={(event) => onChange(event.value)}
      placeholder={schema.placeholder || ""}
      value={value && { value, label: value }}
      options={[...schema.enum.map((val) => ({ value: val, label: val }))]}
      variant='secondary'
    />
  )
}

SelectWidget.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.shape({
    enum: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  rawErrors: PropTypes.arrayOf(PropTypes.string),
}

SelectWidget.defaultProps = {
  value: "",
  rawErrors: [],
}

export default SelectWidget
