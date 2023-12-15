const filterIndustries = (items, activeFilters) => {
  let foundItems = []
  let currentFilters = []

  const checkData = () => {
    items.forEach((item) => {
      if (currentFilters.length > 0) {
        let itemContains = []
        // loop through all currentFilters and if item has all then return it
        currentFilters.forEach((filterItem) => {
          item.entity?.fieldIndustry?.forEach((industry) => {
            if (industry.entity?.name === filterItem) {
              itemContains = itemContains.concat(true)
            } else {
              itemContains = itemContains.concat(false)
            }
          })
        })
        if (itemContains.indexOf(true) !== -1) {
          foundItems = foundItems.concat(item)
        }
      } else {
        foundItems = foundItems.concat(item)
      }
    })
  }

  activeFilters.forEach((item) => {
    currentFilters = currentFilters.concat(item)
  })

  const checkActiveFilters = () => {
    if (currentFilters.length > 0) {
      checkData()
    } else {
      foundItems = items
    }
  }

  checkActiveFilters()

  return foundItems
}

export default filterIndustries
