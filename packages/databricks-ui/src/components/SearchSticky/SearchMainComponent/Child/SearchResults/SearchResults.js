import React from "react"
import PropTypes from "prop-types"
import SearchItemSingle from "../../../SearchResultItemSingle/SearchItemSingle"

function SearchResults({ searchResults, Search }) {
  return (
    <section>
      {searchResults.result.hits.length > 0 && (
        <ul className='list-none py-2 pr-3' data-cy='SearchResults'>
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
  searchResults: PropTypes.shape({
    result: PropTypes.shape({
      hits: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }),
  Search: PropTypes.string,
}
SearchResults.defaultProps = {
  searchResults: undefined,
  Search: undefined,
}
export default SearchResults
