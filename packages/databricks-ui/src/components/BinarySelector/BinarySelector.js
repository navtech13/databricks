import React from "react"
import PropTypes from "prop-types"
import Button from "../Button"
import RichText from "../RichText"
import RadioButton from "../Form/RadioButton"
import Image from "../Image"

const BinarySelector = ({
  description,
  ctaLabel,
  disclaimer,
  options,
  onChange,
  value,
  ...props
}) => {
  return (
    <div className='flex flex-col gap-1.5'>
      {options.map((option) => {
        const active = value === option.id
        const radioButtonText = (
          <div className='text-1.75 ml-0.5 flex cursor-pointer flex-row items-center gap-1.5'>
            {option.image && <Image {...option.image} />}
            {option.title}
          </div>
        )
        return (
          <label
            htmlFor={option.id}
            key={option.id}
            className={` ${
              active ? "border-navy-06" : "border-navy-02"
            } cursor-pointer border py-3 px-2`}
          >
            <RadioButton
              errorMessage='Error'
              text={radioButtonText}
              active={active}
              handleClick={() => onChange(option.id)}
              id={option.id}
            />

            {active && (
              <RichText className='text-gray-text text-1.5 mt-1.5 pl-4'>
                {option.description}
              </RichText>
            )}
          </label>
        )
      })}
    </div>
  )
}

BinarySelector.propTypes = {
  description: PropTypes.string,
  ctaLabel: PropTypes.string,
  disclaimer: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.shape({}),
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

BinarySelector.defaultProps = {
  description: undefined,
  ctaLabel: undefined,
  disclaimer: undefined,
  value: undefined,
}

export default BinarySelector
