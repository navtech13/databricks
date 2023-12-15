import React from "react"
import NotFoundImage from "../../../../../../../assets/global/images/not_found.svg"

function NoResultsAvailable() {
  return (
    <section
      data-cy='NoResultsAvailable'
      className='bg-gray-warm-light mb-8 flex flex-none flex-grow-0 flex-col items-center self-stretch py-4 px-5 md:ml-4 '
    >
      <img src={NotFoundImage} className='w-4' alt='not found image' />
      <h5 className='mt-1 text-center sm:w-[350px]' id='no-results'>
        No results available. Try adjusting the filters or start a new search.
      </h5>
    </section>
  )
}

export default NoResultsAvailable
