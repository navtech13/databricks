import React from "react"
import PropTypes from "prop-types"
import BinarySelector from "../../BinarySelector"

const BinarySelectorWidget = ({ id, value, onChange, uiSchema, schema }) => {
  const radioOptions = uiSchema["ui:options"].radioOptions
  const options = Object.keys(radioOptions).map((value) => ({
    id: value,
    description: radioOptions[value]?.description,
    image: radioOptions[value]?.image,
    title: radioOptions[value]?.title,
  }))
  return (
    <BinarySelector
      id={id}
      onChange={onChange}
      value={value}
      ctaLabel={schema.submitText}
      options={options}
    />
  )
}

BinarySelectorWidget.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  uiSchema: PropTypes.shape({
    "ui:options": PropTypes.shape({
      radioOptions: PropTypes.arrayOf({}),
    }),
  }),
  schema: PropTypes.shape({
    submitText: PropTypes.string,
  }).isRequired,
}

export default BinarySelectorWidget
