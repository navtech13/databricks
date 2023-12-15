const convertToRelativeURL = (url) => {
  if (typeof url !== "string" && !(url instanceof String)) {
    return ""
  }
  const isRelative = !url.includes('://');
  
  if (isRelative) {
    // If the URL is already relative, return it as is
    return url;
  }
  
  const urlObject = new URL(url);
  const path = urlObject.pathname + urlObject.search + urlObject.hash;
  return path;
}

export default convertToRelativeURL
