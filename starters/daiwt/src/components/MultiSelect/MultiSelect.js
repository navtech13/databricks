/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import PropTypes from "prop-types"
import { CustomerMultiSelect } from "databricks-ui"

export const filterCards = (cards, activeFilters, omitProperty, filterMap) => {
  if (!activeFilters) {
    return cards
  }
  return cards?.filter((card) => {
    return !Object.keys(filterMap).some((key) => {
      if (key === omitProperty) {
        return false
      }

      if (activeFilters[key].length === 0) {
        return false
      }

      return !card[filterMap[key]].some((e) => {
        return activeFilters[key].includes(e)
      })
    })
  })
}

const calculateAvailableFilters = (cards, filterMap) => {
  const filters = {}
  Object.keys(filterMap).map((key) => {
    const property = filterMap[key]
    filters[key] = cards?.reduce((acc, card) => {
      card[property].forEach((e) => {
        if (!acc.includes(e)) {
          acc.push(e)
        }
      })
      return acc
    }, [])
  })
  return filters
}

const MultiSelect = ({
  title,
  items,
  cards,
  property,
  activeFilters,
  setActiveFilters,
  filterMap,
}) => {
  const availableFilters = calculateAvailableFilters(
    filterCards(cards, activeFilters, property, filterMap),
    filterMap
  )

  return (
    <CustomerMultiSelect
      title={title}
      items={items?.[property]}
      activeFilters={activeFilters?.[property]}
      availableFilters={availableFilters?.[property]}
      setActiveFilters={(e) =>
        setActiveFilters((prev) => ({ ...prev, [property]: e }))
      }
    />
  )
}

MultiSelect.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  property: PropTypes.string.isRequired,
  activeFilters: PropTypes.shape({}).isRequired,
  setActiveFilters: PropTypes.func.isRequired,
  filterMap: PropTypes.shape({}).isRequired,
}

export default MultiSelect
