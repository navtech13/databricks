import React from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import RichText from "../RichText"

const SortOption = ({ option, handleClick, isActive }) => {
  return (
    <div
      className={`group flex items-center rounded px-1 py-1.5 hover:cursor-pointer ${
        isActive ? "bg-white" : "bg-transparent"
      }`}
      role='checkbox'
      aria-checked={isActive}
      tabIndex='0'
      ariaLabelledby='chk1-label'
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <div
        aria-label='sortoption'
        className={`group-hover:bg-navy-01 rounded-[9px] ${
          isActive ? "bg-navy-06" : "bg-transparent"
        }`}
      >
        <IconResolver
          className={isActive ? "text-white" : "text-navy-06"}
          token='sort'
        />
      </div>
      <RichText className='text-1.5 ml-1'>{option.label}</RichText>
    </div>
  )
}

SortOption.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  isActive: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
}

SortOption.defaultProps = {
  option: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  isActive: false,
}

export default SortOption
