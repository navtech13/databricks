import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import SearchAlgo from "../../Functions/SearchAlgorithm/SearchAlgo"
import SearchResultsList from "../SearchResultsLists/SearchResultsList"
import NoResultsAvailable from "../NoResultsAvailable/NoResultsAvailable"
import PopularSearch from "../NoSearchTextPopularSearch/PopularSearch"
import Button from "../../../Button"

function RightAlignedSubParent({
  searchedBool,
  ResultsData,
  NilResultsBool,
  resultsBool,
  stringSearched,
  Filter,
}) {
  const [Items, setItems] = useState(ResultsData.result.hits)
  const [maxItems, setMaxItems] = useState(ResultsData.result?.total)

  useEffect(() => {
    setItems(ResultsData.result.hits)
    setMaxItems(ResultsData.result.total)
  }, [ResultsData])

  const SubmitSearch = (page) => {
    SearchAlgo(stringSearched, page, 15, Filter)
      .then((results) => {
        if (results.result.hits.length == 0) {
          SearchResultNull()
          setProgressOFF(true)
        } else {
          setItems([...Items, ...results.result.hits])
          setMaxItems(ResultsData.result.total)
        }
      })
      // Exception Goes here
      .catch((err) => console.log(err))
  }

  const MapReturnedResults = Items.map((obj) => (
    <SearchResultsList key={obj.Id} data={obj} stringSearched={stringSearched} />
  ))

  return (
    <div className='pt-6 md:w-10/12 md:pt-0'>
      {searchedBool && resultsBool && (
        <div>
          {MapReturnedResults}
          {Items.length < maxItems && (
            <Button
              variant='secondary'
              className=' py-1 px-4 text-white md:ml-5'
              onClick={() => SubmitSearch(Items.length / 15 + 1)}
            >
              Load more results{" "}
            </Button>
          )}
        </div>
      )}
      {!searchedBool && !NilResultsBool && <PopularSearch />}
      {searchedBool && NilResultsBool && (
        <>
          <NoResultsAvailable />
          <PopularSearch />
        </>
      )}
    </div>
  )
}

RightAlignedSubParent.defaultProps = {
  Filter: "",
}

RightAlignedSubParent.propTypes = {
  Filter: PropTypes.shape({}),
  NilResultsBool: PropTypes.shape({}).isRequired,
  ResultsData: PropTypes.shape({
    result: PropTypes.shape({
      hits: PropTypes.shape({}),
      total: PropTypes.number.isRequired,
    }),
  }).isRequired,
  UpdateSearchResults: PropTypes.shape({}).isRequired,
  resultsBool: PropTypes.shape({}).isRequired,
  searchedBool: PropTypes.shape({}).isRequired,
  stringSearched: PropTypes.shape({}).isRequired,
}

export default RightAlignedSubParent
