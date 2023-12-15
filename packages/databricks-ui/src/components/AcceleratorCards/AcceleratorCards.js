import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import AcceleratorCard from "../AcceleratorCard"
import { filterIndustries } from "../../../../gatsby-theme-databricks-drupal/src/helpers/filterAccelerators"
import getQueryParam from "gatsby-theme-databricks-drupal/src/helpers/getQueryParam"
import search from "../../../../gatsby-theme-databricks-drupal/src/helpers/search"
import sorting from "../../../../gatsby-theme-databricks-drupal/src/helpers/sorting"
import NoResultsCard from "../NoResultsCard"
import Grid from "../Grid"
import resolveImage from "gatsby-theme-databricks-drupal/src/utils/resolve-image"

const AcceleratorCards = ({
  items,
  activeIndustries,
  activeSort,
  searchTerms,
  handleReset,
  clearUrl,
}) => {
  const [activeItems, setActiveItems] = useState(sorting(items, "initial"))

  const updateUrl = () => {
    // eslint-disable-next-line no-restricted-globals
    const filtersExist = getQueryParam("industry", location.search)

    if (
      (items.length > 0 && activeIndustries.length === 0 && clearUrl) ||
      (items.length > 0 && !filtersExist)
    ) {
      window.history.pushState(
        {},
        "",
        `${`${window.location.origin}${window.location.pathname}`}`
      )
    }
    if (activeIndustries.length > 0) {
      const filteredString = activeIndustries.reduce((result, item, index) => {
        return `${result}${index ? "," : ""}${encodeURIComponent(item)}`
      }, "")
      window.history.pushState(
        {},
        "",
        `${`${window.location.origin}${window.location.pathname}?industry=${filteredString}`}`
      )
    }
  }

  useEffect(() => {
    const filteredIndustries = filterIndustries(items, activeIndustries)
    const sortedFilteredItems = sorting(filteredIndustries, activeSort)
    const filteredBySearch = search(sortedFilteredItems, searchTerms)
    setActiveItems(filteredBySearch)
    updateUrl()
  }, [activeIndustries, items, searchTerms, activeSort])

  if (activeItems?.length > 0) {
    return (
      <Grid columns={3.5} gap={1}>
        {activeItems.map((item) => {
          const badges = [
            item.entity?.fieldFeatured ? "featured" : undefined,
            item.entity?.fieldNew ? "new" : undefined,
            item.entity?.fieldHot ? "hot" : undefined,
          ]
          let hrefUrl = item.entity?.fieldLink.url.path
          if (
            hrefUrl.includes("/node/") &&
            item.entity.fieldLink.uri?.includes("internal:")
          ) {
            hrefUrl = item.entity.fieldLink.uri.substr(9)
          }
          return (
            <AcceleratorCard
              key={item.entity.uuid}
              image={item.entity.fieldImage && resolveImage(item.entity.fieldImage)}
              lock={item.entity.fieldBoolean}
              content={item.entity.fieldTitle}
              partner={item.entity.fieldAcceleratorPartnerTerm.entity.name}
              badges={badges}
              href={hrefUrl}
            />
          )
        })}
      </Grid>
    )
  }
  return <NoResultsCard handleReset={handleReset} />
}

AcceleratorCards.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
    })
  ).isRequired,
  activeIndustries: PropTypes.arrayOf(PropTypes.string),
  activeSort: PropTypes.string,
  searchTerms: PropTypes.string,
  handleReset: PropTypes.func.isRequired,
  clearUrl: PropTypes.bool,
}

AcceleratorCards.defaultProps = {
  activeSort: "",
  searchTerms: "",
  activeIndustries: [],
  clearUrl: false,
}

export default AcceleratorCards
