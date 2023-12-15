/* eslint-disable no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react"
import { Button } from "databricks-ui"
import TextInput from "../../../databricks-ui/src/components/Form/TextInput"
import CheckBox from "../../../databricks-ui/src/components/Form/CheckBox"
import RadioButton from "../../../databricks-ui/src/components/Form/RadioButton"
import MessageField from "../../../databricks-ui/src/components/Form/MessageField"

const Form = (job) => {
  const jobQuestions = job.questions
  const locationQuestions = job.location_questions ? job.location_questions : []
  const questions = [...jobQuestions, ...locationQuestions]

  return (
    <form name='contact' method='POST'>
      {questions.map((question, index) => (
        <FieldLayout question={question} key={index} />
      ))}
      <Button type='submit' variant='primary'>
        Submit Application
      </Button>
    </form>
  )
}

export default Form

const FieldLayout = ({ question }) => {
  const [field] = question.fields
  const isHiddenField = Boolean(field.type === "input_hidden")

  if (isHiddenField) {
    return (
      <>
        {question.fields.map((field, index) => (
          <FormField
            key={index.toString()}
            field={field}
            requiredString={question.required}
          />
        ))}
      </>
    )
  }

  return (
    <div className='mb-2.5'>
      <label htmlFor={question.label} className='lock mb-2.5 text-sm text-gray-100'>
        {Boolean(question.required) && (
          <span className='required text-orange-05'>*</span>
        )}
        {question.label}
      </label>
      {Boolean(question.description) && (
        <div className='description'>{question.description}</div>
      )}
      {question.fields.map((field, index) => (
        <FormField
          key={index.toString()}
          field={field}
          requiredString={question.required}
        />
      ))}
    </div>
  )
}

const FormField = ({ field, requiredString }) => {
  const props = {
    name: field.name,
    values: field.values && field.values.length ? field.values : null,
    required: Boolean(requiredString),
  }

  const FIELD_TYPES = {
    input_hidden: <FieldInputHidden {...props} />,
    input_text: <FieldInputText {...props} />,
    input_file: <FieldInputFile {...props} />,
    textarea: <FieldTextArea {...props} />,
    multi_value_single_select: <MultiValueSingleSelect {...props} />,
    multi_value_multi_select: <FieldSelectCheckboxes {...props} />,
  }

  if (field.type in FIELD_TYPES) {
    return FIELD_TYPES[field.type]
  }

  return null
}

const FieldInputHidden = ({ name }) => {
  return <input type='hidden' id={name} name={name} />
}

const FieldInputText = ({ name, required }) => {
  return <TextInput type='text' id={name} name={name} required={required} />
}

const FieldInputFile = ({ name, required }) => {
  return (
    <div className='file-upload-layout'>
      <input
        type='file'
        id={name}
        name={name}
        required={required}
        accept='.doc,.docx,.pdf,.rtf,.txt'
      />
      <div className='file-upload-message'>
        File can be .doc(x), .pdf, .rtf, or .txt.
      </div>
    </div>
  )
}

const FieldTextArea = ({ name, required }) => {
  return <MessageField id={name} name={name} required={required} />
}

const MultiValueSingleSelect = (props) => {
  const { values } = props
  return values.length > 4 ? (
    <FieldSelectOptions {...props} />
  ) : (
    <FieldSelectRadios {...props} />
  )
}

const FieldSelectOptions = ({ name, values, required }) => {
  return (
    <select id={name} name={name} required={required}>
      <option value=''>Please Select</option>
      {values.map((value) => (
        <option key={value.toString()} value={value.value}>
          {value.label}
        </option>
      ))}
    </select>
  )
}

const FieldSelectRadios = ({ name, values, required }) => {
  return (
    <div className='radios'>
      {values.map((value) => (
        <label key={value.toString()}>
          <RadioButton
            text={name}
            name={name}
            value={value.value}
            required={required}
          />
          <span>{value.label}</span>
        </label>
      ))}
    </div>
  )
}

const FieldSelectCheckboxes = ({ name, values, required }) => {
  return (
    <div className='checkboxes'>
      {values.map((value, index) => (
        <label key={index.toString()}>
          <CheckBox name={name} value={value.value} required={required} />
          <span>{value.label}</span>
        </label>
      ))}
    </div>
  )
}
