import React from "react"
import PropTypes from "prop-types"
import RadioCard from "../../Form/RadioCard"

const RadioCardWidget = ({ id, schema, uiSchema, value, onChange }) => {
  return (
    <div className='flex flex-col gap-2'>
      {schema.enum
        .filter((val) => uiSchema["ui:options"].radioOptions[val])
        .map((val) => {
          const currentElement = uiSchema["ui:options"].radioOptions[val]
          return (
            <RadioCard
              key={val}
              id={`${id}-${val}`}
              text={currentElement.text}
              image={currentElement.image}
              name={schema.name}
              handleClick={() => {
                onChange(val)
              }}
              active={val === value}
            />
          )
        })}
    </div>
  )
}

RadioCardWidget.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.shape({
    enum: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string,
  }).isRequired,
  uiSchema: PropTypes.shape({
    "ui:options": PropTypes.shape({
      radioOptions: PropTypes.shape({}),
    }),
  }).isRequired,
}

RadioCardWidget.defaultProps = {
  value: "",
}

export default RadioCardWidget
