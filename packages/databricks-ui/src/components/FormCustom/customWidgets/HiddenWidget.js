import React from "react"
import PropTypes from "prop-types"

const HiddenWidget = ({ id, value, onChange, schema }) => {
  return (
    <input
      key={id}
      id={id}
      type='hidden'
      name={schema.name}
      value={value || ""}
      onChange={(event) => onChange(event.target.value || undefined)}
    />
  )
}

HiddenWidget.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
}

HiddenWidget.defaultProps = {
  value: "",
}

export default HiddenWidget
