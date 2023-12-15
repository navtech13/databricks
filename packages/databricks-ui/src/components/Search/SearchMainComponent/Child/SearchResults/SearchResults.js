import React from "react"
import PropTypes from "prop-types"
import SearchItemSingle from "../../../SearchResultItemSingle/SearchItemSingle"

function SearchResults({ searchResults, Search }) {
  return (
    <section>
      {searchResults.result.hits.length > 0 && (
        <ul className='list-none py-2.5 pr-4' data-cy='SearchResults'>
          {searchResults.result.hits.map((data) => (
            <SearchItemSingle
              key={data.href}
              string={data.highlight.TitleToDisplay[0]}
              url={data.href}
              word={Search.split(" ")}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

SearchResults.propTypes = {
  searchResults: PropTypes.objectOf(PropTypes.shape()).isRequired,
  Search: PropTypes.string.isRequired,
}

export default SearchResults
