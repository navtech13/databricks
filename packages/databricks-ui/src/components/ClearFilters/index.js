import React from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import RichText from "../RichText"

const ClearFilters = ({ handleReset, children }) => {
  return (
    <div
      data-cy='ClearFilters'
      className='text-navy-06 hover:text-navy-03 flex items-center hover:cursor-pointer'
      onClick={handleReset}
      role='button'
      tabIndex={0}
      aria-labelledby='clear'
      onKeyDown={handleReset}
    >
      <IconResolver className='hover:text-navy-03 w-1.5' token='refresh' />
      <RichText className='text-1.5 ml-0.5'>{children}</RichText>
    </div>
  )
}

ClearFilters.propTypes = {
  handleReset: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default ClearFilters
