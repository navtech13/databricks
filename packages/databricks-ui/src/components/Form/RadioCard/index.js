import React from "react"
import PropTypes from "prop-types"
import RichText from "../../RichText"
import Image from "../../Image"

const RadioCard = ({
  text,
  image,
  name,
  id,
  inputProps,
  handleClick,
  active,
  ...props
}) => {
  return (
    <div {...props}>
      <input id={id} type='radio' name={name} className='hidden' {...inputProps} />
      <button
        type='button'
        className='block w-full'
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick()
          }
        }}
      >
        <label
          className={`${
            active ? "border-navy-06" : "border-gray-lines"
          } hover:shadow-card-normal flex cursor-pointer gap-1 rounded-sm border px-1 py-1.5 duration-200`}
          htmlFor={id}
        >
          <Image imageOptions={{ className: "h-3" }} aria-hidden {...image} />
          <RichText className='b4'>{text}</RichText>
        </label>
      </button>
    </div>
  )
}

RadioCard.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  active: PropTypes.bool,
  id: PropTypes.string.isRequired,
  inputProps: PropTypes.shape({}),
  image: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
}

RadioCard.defaultProps = {
  handleClick: () => {},
  active: false,
  inputProps: undefined,
}

export default RadioCard
