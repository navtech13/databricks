/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery, navigate } from "gatsby"
import NotFoundPage from "../../../../../../../packages/gatsby-theme-databricks-drupal/src/templates/pages/404"
import getQueryParam from "../../../../../../../packages/gatsby-theme-databricks-drupal/src/helpers/getQueryParam"

const Job = ({ location }) => {
  const requestedJobId = getQueryParam("gh_jid", location?.href)
  const useInternalPaths = () => {
    const {
      pages: { nodes },
    } = useStaticQuery(graphql`
      {
        pages: allSitePage {
          nodes {
            path
            pageContext
          }
        }
      }
    `)
    return nodes
  }

  // Redirect greenhouse links to actual pages
  const existingJobs = useInternalPaths()
  if (existingJobs.length > 0 && requestedJobId) {
    existingJobs.map((jobPage) => {
      if (jobPage?.pageContext?.greenhouseId === parseInt(requestedJobId)) {
        navigate(jobPage.path.concat(location?.search))
      }
      return {}
    })
    return true
  }
  return <NotFoundPage location={location} />
}

Job.propTypes = {
  location: PropTypes.shape({
    origin: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
}

export default Job
