const getQueryParam = (queryName, queryPath) => {
  queryName = queryName.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]") // eslint-disable-line
  const regex = new RegExp(`[\\?&]${queryName}=([^&#]*)`, "i")
  const results = regex.exec(queryPath)

  if (!results) {
    return ""
  }

  const decodedValue = results[1].replace(/\+/g, " ")

  try {
    const decodedQueryParam = decodeURIComponent(decodedValue)
    return decodedQueryParam
  } catch (error) {
    return ""
  }
}

export default getQueryParam
