import React from "react"
import PropTypes from "prop-types"
import ClearFilters from "../ClearFilters"

const NoResultsCard = ({ handleReset }) => {
  return (
    <div
      data-cy='NoResultsCard'
      className='bg-gray-warm-light flex w-full flex-col items-center px-5 py-3'
    >
      <div className='mb-1.5'>🤔</div>
      <h5 className='w-30 mb-1.5 text-center md:w-[340px] lg:w-[329px]'>
        No results available. Try adjusting the filters or start a new search.
      </h5>
      <ClearFilters handleReset={handleReset}>reset the list</ClearFilters>
    </div>
  )
}

NoResultsCard.propTypes = {
  handleReset: PropTypes.func.isRequired,
}

export default NoResultsCard
