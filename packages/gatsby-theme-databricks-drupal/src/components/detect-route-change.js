import { useEffect } from "react"

const DetectRouteChange = () => {
  const syncDrupalPreviewRoutes = (path) => {
    if (window && window.top !== window.self) {
      // @TODO: Pass the targetOrigin from the Drupal site as ENV.
      window.parent.postMessage(
        {
          type: "GATSBY_DRUPAL_ROUTE_SYNC",
          path,
        },
        "*"
      )
    }
  }

  useEffect(() => {
    const observed = document.getElementsByTagName("a")
    for (let i = 0; i < observed.length; i += 1) {
      observed[i].addEventListener(
        "click",
        function (e) {
          e.target.getAttribute("href")
          const isExternalURL = (url) => url.startsWith("/blog")
          if (!isExternalURL(e.target.href)) {
            e.preventDefault()
            syncDrupalPreviewRoutes(e.target.getAttribute("href"))
          }
        },
        false
      )
    }
  }, [])

  return null
}

export default DetectRouteChange
