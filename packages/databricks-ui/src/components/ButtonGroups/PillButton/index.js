import React from "react"
import PropTypes from "prop-types"
import RichText from "../../RichText"

const PillButton = ({ as, disabled, label, ...props }) => {
  const Component = as
  return (
    <Component
      data-cy='PillButton'
      disabled={disabled}
      className={`mr-1 flex items-center justify-center rounded-[45px] py-1 px-4
        ${
          disabled
            ? `bg-green-01`
            : `bg-green-04 hover:bg-green-05 active:bg-green-03`
        }`}
      {...props}
    >
      <RichText className='b4 font-medium text-white'>{label}</RichText>
    </Component>
  )
}

PillButton.propTypes = {
  as: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
}

PillButton.defaultProps = {
  as: "button",
  disabled: false,
  label: undefined,
}

export default PillButton
