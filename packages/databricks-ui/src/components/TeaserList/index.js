import React from "react"
import PropTypes from "prop-types"
import Teaser from "../Teaser"

const TeaserList = ({ items, ...props }) => {
  return (
    <div {...props}>
      {items.map((item, i) => (
        <Teaser
          className={`border-gray-lines mx-1 my-5 border-t pt-2.5 lg:pt-4 ${
            i === 0 ? "mt-0" : ""
          }`}
          {...item}
        />
      ))}
    </div>
  )
}

TeaserList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default TeaserList
