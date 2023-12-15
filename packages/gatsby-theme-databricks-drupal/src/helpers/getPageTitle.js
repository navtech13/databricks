const getPageTitle = (seo) => {
  let title = ""
  if (typeof seo === "object") {
    const metaTitle = seo?.metaTags?.filter((meta) => meta.key === "title").shift()
    if (metaTitle && metaTitle.hasOwnProperty("value")) {
        title = metaTitle.value
    }
  }
  return title
}

export default getPageTitle
