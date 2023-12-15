import React from "react"
import PropTypes from "prop-types"
import TextInput from "../../Form/TextInput"

const TextWidget = ({ id, value, label, onChange, schema, rawErrors }) => {
  return (
    <TextInput
      key={id}
      id={id}
      value={value || ""}
      error={rawErrors?.[0] && true}
      errorMessage={rawErrors?.[0]}
      onChange={(event) => onChange(event.target.value || undefined)}
      label={label}
      {...(schema.format && { type: schema.format })}
      variant='secondary'
    />
  )
}

TextWidget.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  rawErrors: PropTypes.arrayOf(PropTypes.string),
  schema: PropTypes.shape({
    format: PropTypes.string,
  }).isRequired,
}

TextWidget.defaultProps = {
  value: "",
  rawErrors: [],
}

export default TextWidget
