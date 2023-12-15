const filterJobs = (items, locationFilter, departmentFilter) => {
  let foundItems = []

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const getOffices = (item) => {
    return item.location?.name
  }

  const checkData = () => {
    items.forEach((item) => {
      let itemContains = []

      if (locationFilter.length > 0 && departmentFilter.length > 0) {
        // perform an AND filter on location and dept
        locationFilter.forEach((filterItem) => {
          const offices = getOffices(item)
          let found = false
          const tags = filterItem.tags.split(";").concat(filterItem.value)
          const officeFound = tags.some((item) => offices.includes(item))
          if (officeFound) {
            departmentFilter.forEach((filterItem) => {
              if (item.filterDept) {
                if (slugify(item?.filterDept) === slugify(filterItem.value)) {
                  found = true
                }
              }
            })
          }
          itemContains = itemContains.concat(found)
        })
      } else if (locationFilter.length > 0) {
        // perform just location filter
        locationFilter.forEach((filterItem) => {
          const offices = getOffices(item)
          let found = false
          const tags = filterItem.tags.split(";").concat(filterItem.value)
          found = tags.some((item) => offices.includes(item))
          itemContains = itemContains.concat(found)
        })
      } else {
        // perform just dept filter
        departmentFilter.forEach((filterItem) => {
          let found = false
          if (item.filterDept) {
            if (slugify(item?.filterDept) === slugify(filterItem.value)) {
              found = true
            }
          }
          itemContains = itemContains.concat(found)
        })
      }

      if (itemContains.indexOf(true) !== -1) {
        foundItems = foundItems.concat(item)
      }
    })
  }

  const checkActiveFilters = () => {
    if (locationFilter.length > 0 || departmentFilter.length > 0) {
      checkData()
    } else {
      foundItems = items
    }
  }

  checkActiveFilters()

  return foundItems
}

export default filterJobs
