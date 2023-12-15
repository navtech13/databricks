const stringSlugify = (string) => {
  return string
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/\//g, "-")
    .replace(/[^\w-]+/g, "")
}

export default stringSlugify
