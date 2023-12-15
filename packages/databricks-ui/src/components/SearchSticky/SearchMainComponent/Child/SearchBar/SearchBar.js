import React, { useRef } from "react"
import PropTypes from "prop-types"
import SearchAlgo from "../../../../SearchResults/Functions/SearchAlgorithm/SearchAlgo"
import debounce from "../../../SearchAlgorithm/APIDebouncer"
import eventTracking from "../../../../../../../gatsby-theme-databricks-drupal/src/helpers/eventTracking"
import IconResolver from "../../../../IconResolver"

function SearchBar({ ModifyResults, ModifySearch, CloseSearch }) {
  const input = useRef("")
  const SubmitSearchRequest = () => {
    const searchText = input.current
    SearchAlgo(searchText, 1, 5)
      .then((results) => {
        ModifySearch(searchText)
        ModifyResults(results)
      })
      .catch((err) => {
        console.log(err)
        // Exception code goes here of API failure
      })
  }

  const DebounceIntegratedCaller = debounce(() => SubmitSearchRequest())

  const InputChangeListener = (e) => {
    const currentValue = e.target.value
    if (currentValue !== "") {
      input.current = e.target.value
      DebounceIntegratedCaller()
    }
  }

  const SubmitForm = (form) => {
    const eventData = {
      event: `Search Query Submitted`,
      searchQuery: input.current,
      searchContext: `overlay`,
    }
    eventTracking(eventData)
    form.preventDefault()
    window.location.href = `/search?type=pending&search=${input.current}`
  }
  return (
    <form onSubmit={SubmitForm} className='flex w-full items-center'>
      <input
        type='text'
        name='search'
        className='h3 order-none flex h-[41px] w-full  flex-row items-start bg-white py-2 pl-2 pr-3 outline-none'
        placeholder='How can we help you?'
        onChange={InputChangeListener}
        aria-autocomplete='none'
        autoComplete='false'
      />

      <button
        type='submit'
        className='bg-navy-800 order-1 flex h-[41px] w-[74px] flex-none flex-row items-center gap-12 py-2 px-1 text-white lg:h-[43px] lg:w-[94px] lg:px-2'
        onClick={SubmitSearchRequest}
      >
        Search
      </button>
      {/* TODO: validate if onClick event is meant to close the modal or clear the input */}
      <button
        className='order-2 ml-2'
        type='button'
        onClick={CloseSearch}
        aria-label='Close search'
      >
        <IconResolver className='text-gray-secondary' token='close' />
      </button>
    </form>
  )
}

SearchBar.propTypes = {
  ModifyResults: PropTypes.func,
  ModifySearch: PropTypes.func,
  CloseSearch: PropTypes.func,
}
SearchBar.defaultProps = {
  ModifyResults: undefined,
  ModifySearch: undefined,
  CloseSearch: undefined,
}

export default SearchBar
