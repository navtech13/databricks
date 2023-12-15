const filterPartners = (items, activeFilters) => {
  let newItems = items.filter((item) => {
    return activeFilters.includes(item.categories.partner)
  })

  return activeFilters.length > 0 ? newItems : items
}

export default filterPartners
