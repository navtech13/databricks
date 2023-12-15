import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"

const isBrowser = typeof window !== "undefined"

const PageTracker = () => {
  const MAX_PAGES = 20
  const MAX_FORMS = 20
  const [formSubmissions, setFormSubmissions] = useState([])
  const [userPersona, setUserPersona] = useState("")
  const userActivityObj = isBrowser
    ? JSON.parse(localStorage.getItem("userActivity")) || []
    : []
  const [userActivity, setUserActivity] = useState(userActivityObj)
  const [sessionDurations, setSessionDurations] = useState([])

  const handleLinkClick = (event) => {
    const linkData = {
      timestamp: new Date(),
      type: "link_click",
      target: event.target.href,
    }
    setUserActivity((prevActivity) => [...prevActivity, linkData])
  }

  const handleScroll = () => {
    const windowHeight = window.innerHeight
    const { scrollHeight } = document.documentElement
    const scrollTop = window.scrollY

    const scrolledPercent = (scrollTop / (scrollHeight - windowHeight)) * 100

    // Determine the scroll percentage and add it to the state
    if (scrolledPercent === 50 || scrolledPercent === 75) {
      const scrollData = {
        timestamp: new Date(),
        type: "scroll",
        scroll: scrolledPercent,
      }
      setUserActivity((prevActivity) => [...prevActivity, scrollData])
    }
  }

  const handleFormSubmit = (event) => {
    const formSubmitData = {
      timestamp: new Date(),
      type: "form_submit",
      formId: event?.target?.id,
    }
    setUserActivity((prevActivity) => [...prevActivity, formSubmitData])
  }

  const trackUserActivity = (event) => {
    if (isBrowser) {
      if (event.type === "click" && event.target.tagName === "A") {
        handleLinkClick(event)
      } else if (event.type === "scroll") {
        handleScroll()
      } else if (event.type === "submit" && event.target.tagName === "FORM") {
        handleFormSubmit(event)
      }
    }
  }

  const parseHeapCookie = () => {
    // Get all cookies starting with "_hp2_props"
    const cookieNames = Object.keys(Cookies.get()).filter((name) =>
      name.startsWith("_hp2_props")
    )

    // Loop through the matching cookies
    cookieNames.forEach((cookieName) => {
      // Get the cookie value
      const cookieValue = Cookies.get(cookieName)

      try {
        // Parse the cookie value as JSON (adjust parsing logic if needed)
        const parsedValue = JSON.parse(cookieValue)
        const { workspaceId } = parsedValue
        Object.entries(parsedValue).forEach((entry) => {
          const [key, value] = entry
          if (key.indexOf("Experiment:") === -1) {
            localStorage.setItem(`db_${key}_${workspaceId}`, JSON.stringify(value))

            // STANDARD_TIER
            // DEVELOPER_BASIC_TIER
            // STANDARD_W_SEC_TIER
            // ENTERPRISE_TIER_V2
            // TRAINING_BASIC_TIER
            // ENTERPRISE_TIER
            // LEGACY_PROFESSIONAL_TIER
            // LEGACY_STARTER_TIER
            // DEDICATED_TIER
            // Are there other types of paying customers?
            if (value.indexOf("ENTERPRISE_") >= 0) {
              localStorage.setItem(`dbEnterpriseAccount`, true)
            }
            if (value.indexOf("TRAINING_BASIC_") >= 0) {
              localStorage.setItem(`dbTrainingAccount`, true)
            }
            if (value.indexOf("DEVELOPER_BASIC_TIER") >= 0) {
              localStorage.setItem(`dbCEAccount`, true)
            }
          }
        })
      } catch (error) {
        console.error("Error parsing or saving cookie:", error)
      }
    })
  }

  const storeLastFormSubmits = () => {
    if (isBrowser) {
      const timeoutId = setTimeout(function () {
        if (window.MktoForms2) {
          window.MktoForms2.whenReady(function (form) {
            form.onSuccess(function () {
              // Load existing page history from localStorage or initialize an empty array
              let curformSubmissions =
                JSON.parse(localStorage.getItem("dbFormSubmissions")) || []

              // Get the current page's URL
              const currentPageUrl = window.location.pathname

              // Find the index of the current page in the history
              const pageIndex = curformSubmissions.findIndex(
                (page) => page.url === currentPageUrl
              )

              if (pageIndex !== -1) {
                // If the page is already in the history, update its count and move it to the front
                curformSubmissions[pageIndex].count += 1
                curformSubmissions[pageIndex].time = new Date().getTime()
                const [currentPage] = curformSubmissions.splice(pageIndex, 1)
                curformSubmissions.unshift(currentPage)
              } else {
                // If the page is not in the history, add it to the front with a count of 1
                curformSubmissions.unshift({
                  url: currentPageUrl,
                  count: 1,
                  time: new Date().getTime(),
                })
              }

              // Trim the history to keep only the last MAX_FORMS forms
              if (curformSubmissions.length > MAX_FORMS) {
                curformSubmissions = curformSubmissions.slice(0, MAX_FORMS)
              }

              // Update localStorage with the modified history
              localStorage.setItem(
                "dbFormSubmissions",
                JSON.stringify(curformSubmissions)
              )
            })
          })
        }
      }, 300)
      if (window.MktoForms2) {
        clearTimeout(timeoutId)
      }
    }
  }

  const storePageHistory = () => {
    // Load existing page history from localStorage or initialize an empty array
    let pageHistory = JSON.parse(localStorage.getItem("dbPageHistory")) || []

    // Get the current page's URL
    const currentPageUrl = window.location.pathname

    // Find the index of the current page in the history
    const pageIndex = pageHistory.findIndex((page) => page.url === currentPageUrl)

    if (pageIndex !== -1) {
      // If the page is already in the history, update its count and move it to the front
      pageHistory[pageIndex].count += 1
      pageHistory[pageIndex].time = new Date().getTime()
      const [currentPage] = pageHistory.splice(pageIndex, 1)
      pageHistory.unshift(currentPage)
    } else {
      // If the page is not in the history, add it to the front with a count of 1
      pageHistory.unshift({
        url: currentPageUrl,
        count: 1,
        time: new Date().getTime(),
      })
    }

    // Trim the history to keep only the last MAX_PAGES pages
    if (pageHistory.length > MAX_PAGES) {
      pageHistory = pageHistory.slice(0, MAX_PAGES)
    }

    // Update localStorage with the modified history
    localStorage.setItem("dbPageHistory", JSON.stringify(pageHistory))
  }

  useEffect(() => {
    if (isBrowser) {
      document.addEventListener("click", trackUserActivity)
      // document.addEventListener("scroll", trackUserActivity)
      document.addEventListener("submit", trackUserActivity)
      storePageHistory()
      storeLastFormSubmits()
      parseHeapCookie()
      // Load session durations from localStorage on mount
      const savedDurations = JSON.parse(localStorage.getItem("sessionDurations")) || []
      setSessionDurations(savedDurations)

      return () => {
        document.removeEventListener("click", trackUserActivity)
        // document.removeEventListener("scroll", trackUserActivity)
        document.removeEventListener("submit", trackUserActivity)
      }
    }
  }, [])

  useEffect(() => {
    const startTimestamp = Date.now()

    const handleSessionEnd = () => {
      const endTimestamp = Date.now()
      const sessionDuration = endTimestamp - startTimestamp

      setSessionDurations((prevDurations) => {
        const newDurations = [sessionDuration, ...prevDurations].slice(0, 5)
        localStorage.setItem("sessionDurations", JSON.stringify(newDurations))
        return newDurations
      })
    }

    if (isBrowser) {
      window.addEventListener("beforeunload", handleSessionEnd)

      return () => {
        window.removeEventListener("beforeunload", handleSessionEnd)
      }
    }
  }, [])

  // useEffect(() => {
  //   // Analyze user activity to determine personas
  //   const determinePersona = () => {
  //     // Count different types of activities
  //     const linkClicks = userActivity.filter(
  //       (activity) => activity.type === "link_click"
  //     ).length
  //     const formSubmits = userActivity.filter(
  //       (activity) => activity.type === "form_submit"
  //     ).length
  //     const scrolls = userActivity.filter(
  //       (activity) => activity.type === "scroll"
  //     ).length

  //     // Define some basic criteria to determine personas
  //     if (linkClicks >= 5) {
  //       setUserPersona("Engaged Explorer")
  //     } else if (formSubmits >= 3) {
  //       setUserPersona("Active Participant")
  //     } else if (scrolls >= 50) {
  //       setUserPersona("Content Consumer")
  //     } else {
  //       setUserPersona("Casual Observer")
  //     }
  //     localStorage.setItem("dbPersona", JSON.stringify(userPersona))
  //   }

  //   if (isBrowser) {
  //     determinePersona()

  //     // Save user activity in localStorage
  //     localStorage.setItem("userActivity", JSON.stringify(userActivity))
  //   }
  // }, [userActivity])

  return <div />
}

export default PageTracker
