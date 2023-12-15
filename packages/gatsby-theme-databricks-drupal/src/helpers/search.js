const search = (items, searchTerms) => {
  return items.filter((item) => {
    let title = item.entity?.fieldTitle && item.entity?.fieldTitle.toLowerCase()
    if (item?.blurb) {
      title += item.blurb && item.blurb.toLowerCase()
    }
    return title?.indexOf(searchTerms) >= 0
  })
}

export default search
