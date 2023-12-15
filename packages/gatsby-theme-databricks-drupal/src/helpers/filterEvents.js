const filterEvents = (items, activeFilters, filterType) => {
  let foundItems = []
  let currentFilters = []

  const slugify = (str) => {
    return str
      ?.toLowerCase()
      .trim()
      .replace(/[^一-龠ぁ-ゔァ-ヴーa-zA-Z0-9ａ-ｚＡ-Ｚ０-９가-힣々〆〤\s\w-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const checkData = () => {
    items.forEach((item) => {
      if (currentFilters.length > 0) {
        let itemContains = []
        // loop through all currentFilters and if item has all then return it
        currentFilters.forEach((filterItem) => {
          if (slugify(item[filterType]) === slugify(filterItem)) {
            itemContains = itemContains.concat(true)
          } else {
            itemContains = itemContains.concat(false)
          }
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

export default filterEvents
