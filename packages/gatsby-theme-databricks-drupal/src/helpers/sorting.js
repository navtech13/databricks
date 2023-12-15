const sorting = (items, type) => {
  switch (type) {
    case "initial":
      items.sort((a, b) => a.entity?.fieldTitle.localeCompare(b.entity?.fieldTitle))
      items.sort((a) => (a?.entity?.fieldFeatured ? -1 : 1))
      break
    case "alphabetical":
      items.sort((a, b) => a.entity?.fieldTitle.localeCompare(b.entity?.fieldTitle))
      break
    case "newest":
      items.sort((a, b) => new Date(b.date) - new Date(a.date))
      items.sort((a) => (a?.entity?.fieldNew ? -1 : 1))
      break
    case "popular":
      items.sort((a) => (a?.entity?.fieldHot ? -1 : 1))
      break
    default:
      break
  }

  return items
}

export default sorting
