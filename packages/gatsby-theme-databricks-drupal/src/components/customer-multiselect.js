import React from "react"
import PropTypes from "prop-types"
import { CustomerMultiSelect } from "databricks-ui"

export const filterCards = (cards, activeFilters, omitProperty, filterMap) => {
  if (!activeFilters) {
    return cards
  }
  return cards?.filter((card) => {
    return !Object.keys(filterMap).some((key) => {
      if (key === omitProperty || !activeFilters[key]) {
        return false
      }

      if (activeFilters[key]?.length === 0) {
        return false
      }

      return !card[filterMap[key]].some(({ entity }) => {
        return activeFilters[key]?.includes(entity?.entityId)
      })
    })
  })
}

const calculateAvailableFilters = (cards, filterMap) => {
  const filters = {}
  Object.keys(filterMap).forEach((key) => {
    const property = filterMap[key]
    filters[key] = cards?.reduce((acc, card) => {
      card[property].forEach(({ entity }) => {
        if (entity?.entityId && !acc.includes(entity.entityId)) {
          acc.push(entity.entityId)
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
  defaultOpen,
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
      defaultOpen={defaultOpen}
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
  defaultOpen: PropTypes.bool,
  filterMap: PropTypes.shape({}).isRequired,
}

MultiSelect.defaultProps = {
  defaultOpen: false,
}

export default MultiSelect
