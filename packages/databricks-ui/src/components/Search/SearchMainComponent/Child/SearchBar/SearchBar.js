import React, { useRef } from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import SearchAlgo from "../../../../SearchResults/Functions/SearchAlgorithm/SearchAlgo"
import SearchIcon from "../../../../../../../../assets/global/images/Icon Container.svg"
import debounce from "../../../SearchAlgorithm/APIDebouncer"
import Image from "../../../../Image"
import eventTracking from "../../../../../../../gatsby-theme-databricks-drupal/src/helpers/eventTracking"

function SearchBar({ ModifyResults, ModifySearch }) {
  const input = useRef("")
  const SubmitSearchRequest = (form) => {
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
    navigate(`/search?type=pending&search=${input.current}`)
  }
  return (
    <form onSubmit={SubmitForm} className='flex w-full items-center'>
      <Image className='w-3' src={SearchIcon} alt='' />
      <input
        type='text'
        name='search'
        className='order-none flex h-5 w-full  flex-row items-start bg-white py-2.5 pl-2.5 pr-4 outline-none'
        placeholder='What can we help you find?'
        onChange={InputChangeListener}
        aria-autocomplete='none'
        autoComplete='false'
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />

      <button
        type='submit'
        className='bg-orange-04-a11y order-1 flex h-5 w-10 flex-none flex-row items-center gap-16 py-2.5 px-1 text-white hover:bg-orange-700 hover:text-white active:bg-orange-500 lg:h-5 lg:w-12 lg:px-2.5'
        onClick={SubmitSearchRequest}
      >
        Search
      </button>
    </form>
  )
}

SearchBar.propTypes = {
  ModifyResults: PropTypes.func.isRequired,
  ModifySearch: PropTypes.func.isRequired,
}

export default SearchBar
