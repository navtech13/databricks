import React from "react"
import PropTypes from "prop-types"
import eventTracking from "../../../../../gatsby-theme-databricks-drupal/src/helpers/eventTracking"

function SearchItemSingle({ string, word, url }) {
  const handleClick = (clickedUrl, clickedTitle) => {
    const eventData = {
      event: `Search Result Selected`,
      searchContext: "overlay",
      searchQuery: word?.join(" ")?.toLowerCase(),
      searchResultSelectedTitle: clickedTitle,
      searchResultSelectedUrl: clickedUrl,
    }
    eventTracking(eventData)
  }

  return (
    <a
      data-cy='SearchItemSingle'
      href={url}
      style={{ textDecoration: "none" }}
      target='_blank'
      className='anchor_result_parent'
      rel='noreferrer'
      onClick={() => handleClick(url, string)}
    >
      <div
        className='text-gray-text mt-1'
        style={{ height: "max-content" }}
        dangerouslySetInnerHTML={{ __html: string }}
      />
    </a>
  )
}
SearchItemSingle.propTypes = {
  string: PropTypes.instanceOf(Array).isRequired,
  word: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default SearchItemSingle
