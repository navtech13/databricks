const MAX_FORMS = 20

const storeFormSubmit = (action, cloud) => {
  // Load existing page history from localStorage or initialize an empty array
  let curformSubmissions = JSON.parse(localStorage.getItem("trialSubmittions")) || []

  // Get the current page's URL
  const currentPageUrl = window.location.pathname

  // Find the index of the current page in the history
  const pageIndex = curformSubmissions.findIndex(
    (page) => page.url === currentPageUrl
  )

  if (pageIndex !== -1) {
    // If the page is already in the history, update its count and move it to the front
    curformSubmissions[pageIndex].count += 1
    curformSubmissions[pageIndex].cloud = cloud
    curformSubmissions[pageIndex].time = new Date().getTime()
    const [currentPage] = curformSubmissions.splice(pageIndex, 1)
    curformSubmissions.unshift(currentPage)
  } else {
    // If the page is not in the history, add it to the front with a count of 1
    curformSubmissions.unshift({
      url: currentPageUrl,
      count: 1,
      time: new Date().getTime(),
      cloud,
    })
  }

  // Trim the history to keep only the last MAX_FORMS forms
  if (curformSubmissions.length > MAX_FORMS) {
    curformSubmissions = curformSubmissions.slice(0, MAX_FORMS)
  }

  // Update localStorage with the modified history
  localStorage.setItem(`dbTrial${action}`, JSON.stringify(curformSubmissions))
}

export default storeFormSubmit
