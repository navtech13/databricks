import React, { useRef, useEffect, useState, useContext } from "react"
import PropTypes from "prop-types"
import SearchAlgo from "../../Functions/SearchAlgorithm/SearchAlgo"
import SearchIcon from "../../../../../../../assets/global/images/Icon Container.svg"
import SearchContext from "../SearchContext/SearchContext"
import eventTracking from "../../../../../../gatsby-theme-databricks-drupal/src/helpers/eventTracking"

function TopSubParent({
  UpdateSearchResults,
  UpdateSearchString,
  SearchResultNull,
  searchedBool,
  ResLen,
  SearchBlank,
}) {
  const [ProgressOFF, setProgressOFF] = useState(false)
  const [String, setString] = useState("")
  const { MainData, search_string } = useContext(SearchContext)
  const SearchText = useRef()
  // SearchBlank={() => {setSearched(false);setNoResults(false);setResults(false)}}

  useEffect(() => {
    const query = decodeURI(window.location.search)
      .replace("?", "")
      .split("&")
      .map((param) => param.split("="))
      .reduce((values, [key, value]) => {
        values[key] = value
        return values
      }, {})

    if (JSON.stringify(query) !== JSON.stringify({ "": undefined })) {
      SearchText.current = query.search
      UpdateSearchString(query.search)
      SubmitSearch()
    }
  }, [])
  useEffect(() => {
    setString(search_string)
  }, [])
  useEffect(() => {
    setProgressOFF(false)
  }, [search_string])
  const SubmitSearch = () => {
    SearchAlgo(SearchText.current, 1, 15)
      .then((results) => {
        if (results.result.hits.length === 0) {
          SearchResultNull(results)
          setProgressOFF(true)
        } else UpdateSearchResults(results)
        UpdateSearchString(SearchText.current)
        ResLen = results.result.total
        setString(SearchText.current)
      })
      // Exception Goes here
      .catch((err) => console.log(err))
  }

  const SubmitForm = (form) => {
    form.preventDefault()
    if (SearchText.current.length > 0) {
      const eventData = {
        event: `Search Query Submitted`,
        searchQuery: SearchText.current,
        searchContext: `searchPage`,
      }
      eventTracking(eventData)
      SubmitSearch()
    } else SearchBlank()
  }

  return (
    <>
      <section>
        <h1 className='order-none flex h-16 flex-none items-center text-6xl font-medium not-italic tracking-normal text-black'>
          Search databricks.com
        </h1>
        <br />
        <form
          onSubmit={SubmitForm}
          className='order-none flex h-5 w-full flex-none flex-row items-center gap-2 self-stretch bg-white py-2.5 pl-2.5'
        >
          <img src={SearchIcon} alt='search icon' className='w-3' />
          <input
            defaultValue={search_string}
            key={search_string}
            type='text'
            className='w-full outline-none'
            placeholder='What can we help you find?'
            onChange={(e) => {
              SearchText.current = e.target.value
              if (e.target.value.length == 0) {
                SearchBlank()
              }
            }}
          />
          <button
            className='bg-orange-04-a11y relative right-0 order-1 flex h-5 w-10 flex-none flex-row items-center gap-16 py-1 px-2 text-white hover:bg-orange-700  hover:text-white active:bg-orange-500'
            type='submit'
          >
            Search
          </button>
        </form>
        <br />
        {searchedBool && !ProgressOFF && (
          <h5 className='order-none h-3 flex-none items-center text-base font-normal not-italic leading-6'>
            Showing {ResLen} results of{" "}
            <span className='font-bold'>"{search_string}"</span>
          </h5>
        )}
        {ProgressOFF && (
          <h5>
            Showing {0} results of <span>"{search_string}"</span>
          </h5>
        )}
      </section>
      <br />
    </>
  )
}

TopSubParent.propTypes = {
  UpdateSearchResults: PropTypes.func.isRequired,
  UpdateSearchString: PropTypes.func.isRequired,
  SearchResultNull: PropTypes.func.isRequired,
  searchedBool: PropTypes.bool.isRequired,
  ResLen: PropTypes.number.isRequired,
  SearchBlank: PropTypes.func.isRequired,
}

export default TopSubParent
