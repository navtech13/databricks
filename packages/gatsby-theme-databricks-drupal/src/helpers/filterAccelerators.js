/**
 *
 * @param {*} items
 * @param {*} activeFilters
 * @returns sorted items by Industry
 */

const filterIndustries = (items, activeFilters) => {
  let newItems = items.filter((item) => {
    item.entity?.fieldIndustry?.forEach((industry) => {
      return activeFilters.includes(industry?.entity?.name)
    })
    return item.entity?.fieldIndustry?.some((category) =>
      activeFilters.includes(category?.entity?.name)
    )
  })

  return activeFilters.length > 0 ? newItems : items
}

const filterPartners = (items, activeFilters) => {
  let newItems = items.filter((item) => {
    return activeFilters.includes(
      item.entity?.fieldAcceleratorPartnerTerm?.entity?.name?.toLowerCase()
    )
  })

  return activeFilters.length > 0 ? newItems : items
}

export { filterIndustries, filterPartners }
