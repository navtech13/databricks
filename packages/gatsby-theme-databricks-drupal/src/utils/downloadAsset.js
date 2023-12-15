/* eslint-disable no-console */

export const downloadFromUrl = async (url) => {
  try {
    // Fetch the file and create a Blob
    const response = await fetch(url)
    const blob = await response.blob()

    // Create a URL for the Blob
    const objectUrl = window.URL.createObjectURL(blob)

    // Create an anchor element to trigger the download
    const anchor = document.createElement("a")
    anchor.href = objectUrl
    anchor.download = url.split("/").pop() // Set the downloaded file name

    // Trigger a click event on the anchor element
    anchor.click()

    // Clean up by revoking the Blob URL
    window.URL.revokeObjectURL(objectUrl)
  } catch (error) {
    console.error("Error downloading file:", error)
  }
}

export const validateFileFormat = (url) => {
  const formats = ["pdf", "zip", "py", "dbc"]
  const isValidAsset = formats.some((format) => url?.includes(`.${format}`))

  return isValidAsset
}
