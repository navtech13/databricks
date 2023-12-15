import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import IndustryCardItems from "../IndustryCardItems"
import filterIndustries from "../../../../gatsby-theme-databricks-drupal/src/helpers/filterIndustries"
import search from "../../../../gatsby-theme-databricks-drupal/src/helpers/search"
import sorting from "../../../../gatsby-theme-databricks-drupal/src/helpers/sorting"
import NoResultsCard from "../NoResultsCard"
import resolveImage from "../../../../gatsby-theme-databricks-drupal/src/utils/resolve-image"

const IndustryCards = ({
  items,
  activeFilters,
  activeSort,
  searchTerms,
  handleReset,
}) => {
  const [activeItems, setActiveItems] = useState()

  useEffect(() => {
    const filteredItems = filterIndustries(items, activeFilters)
    const sortedFilteredItems = sorting(filteredItems, activeSort)
    const filteredBySearch = search(sortedFilteredItems, searchTerms)
    setActiveItems(filteredBySearch)
  }, [activeFilters, items, searchTerms, activeSort])

  if (activeItems?.length > 0) {
    return (
      <div className='w-full'>
        {activeItems.map((item) => (
          <IndustryCardItems
            key={item.entity?.uuid}
            title={item.entity?.fieldTitle}
            image={resolveImage(item.entity?.fieldImage)}
            type={item.type}
            relatedLinks={item.entity?.fieldItems}
            ctaLabel={item.entity?.fieldCtaLabel}
            ctaLink={
              item.entity?.fieldSolutionsIndustryPage?.entity?.entityUrl?.path
            }
          />
        ))}
      </div>
    )
  }
  return <NoResultsCard handleReset={handleReset} />
}

IndustryCards.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  activeSort: PropTypes.string,
  searchTerms: PropTypes.string,
  handleReset: PropTypes.func.isRequired,
}

IndustryCards.defaultProps = {
  activeFilters: [],
  activeSort: "ASC",
  searchTerms: "",
  items: [{}],
}

export default IndustryCards
