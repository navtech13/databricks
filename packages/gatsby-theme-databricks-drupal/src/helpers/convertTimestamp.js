export const convertTimestampToDate = (timestamp, options) => {
  const date = new Date(timestamp * 1000).toLocaleDateString("en-US", options)
  return date
}

export const convertTimestampToLocalTime = (timestamp, options) => {
  const time = new Date(timestamp).toLocaleTimeString("en-US", options)
  return time
}

export const convertDrupalDateToLocalDate = (timestamp, options) => {
  let time = new Date(timestamp).toLocaleTimeString("en-US", options)
  let date = time.split(",")
  return date[0] + ', ' + date[1] 
}

export const convertDateString = (date, options) => {
  let dateString = new Date(date).toLocaleDateString('en-US', options)
  return dateString
}
