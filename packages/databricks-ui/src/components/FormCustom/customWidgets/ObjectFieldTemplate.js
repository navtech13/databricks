import React from "react"
import PropTypes from "prop-types"

const ObjectFieldTemplate = ({ schema, idSchema, title, properties }) => {
  return (
    <fieldset id={idSchema.$id}>
      <div className='mb-0.5 flex w-full items-baseline justify-between'>
        <legend className='h4' id={`${idSchema.$id}__title`}>
          {title}
        </legend>
        {schema.step && schema.nextStep > 1 && (
          <div className='text-gray-text text-1.5 schema-step font-mono'>
            {schema.step}/2
          </div>
        )}
      </div>
      {properties.map(({ content }) => content)}
    </fieldset>
  )
}

ObjectFieldTemplate.propTypes = {
  schema: PropTypes.shape({
    step: PropTypes.number,
    nextStep: PropTypes.number,
  }).isRequired,
  idSchema: PropTypes.shape({
    $id: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.node.isRequired,
    }).isRequired
  ).isRequired,
}

export default ObjectFieldTemplate
