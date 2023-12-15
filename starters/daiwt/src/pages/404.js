/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import PropTypes from "prop-types"
import NotFoundPage from "gatsby-theme-databricks-drupal/src/templates/pages/404"

const NotFoundPage404 = ({ location }) => {
  return <NotFoundPage location={location} />
}

NotFoundPage404.propTypes = {
  location: PropTypes.shape({
    origin: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
}

export default NotFoundPage404
