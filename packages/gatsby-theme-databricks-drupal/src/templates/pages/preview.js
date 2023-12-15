import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { fetchPageFromCms } from "../../helpers/client-queries"
import BlogDetail from "../blogDetail"
import LandingPage from "../landingPage"
import LegalPage from "../legalPage"
import ResourcePage from "../resourcePage"
import TwoColumnsPage from "../twoColumnsPage"
import NotFoundPage from "./404"
import GeneralPage from "../generalPage"

const Preview = ({ location }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState(null)
  // Build Time Data Fetching

  /** @todo Prevent this route from rendering on live site. */
  /** @todo Require Drupal authentication to view this route.  */

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    // Default to Homepage.
    const nid = urlSearchParams.get("nid") || "11"
    const lang = urlSearchParams.get("lang") || "EN"
    fetchPageFromCms(nid, lang).then((result) => {
      setData(result)
      setIsLoaded(true)
    })
  }, [])

  let newData = {}
  if (isLoaded) {
    if (data && data.data?.drupal.__typename) {
      switch (data.data.drupal.__typename) {
        case "NodePost":
          newData = {
            drupal: {
              article: data.data.drupal,
            },
          }
          return <BlogDetail data={newData} location={{ pathname: "preview" }} />
        case "NodeTwoColumns":
          newData = {
            drupal: {
              twoColumnsPage: data.data.drupal,
            },
          }
          return <TwoColumnsPage data={newData} location={{ pathname: "preview" }} />
        case "NodePages":
          newData = {
            drupal: {
              landingPage: data.data.drupal,
            },
          }
          return <LandingPage data={newData} location={{ pathname: "preview" }} />
        case "NodePages":
          newData = {
            drupal: {
              generalPage: data.data.drupal,
            },
          }
          return <GeneralPage data={newData} location={{ pathname: "preview" }} />
        case "NodeResource":
          newData = {
            drupal: {
              resourcePage: data.data.drupal,
            },
          }
          return <ResourcePage data={newData} location={{ pathname: "preview" }} />
        case "NodeLegal":
          newData = {
            drupal: {
              legalPage: data.data.drupal,
            },
          }
          return <LegalPage data={newData} location={{ pathname: "preview" }} />
        default:
          return <div>Template not supported</div>
      }
    } else {
      return <NotFoundPage location={location} />
    }
  }
  return <div>Loading...</div>
}

Preview.propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
    origin: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
}
export default Preview
