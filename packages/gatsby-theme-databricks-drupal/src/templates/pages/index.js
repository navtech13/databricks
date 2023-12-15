import React from "react"
import PropTypes from "prop-types"
import BaseLayout from "../../components/base-layout"
import BlogContent from "../../components/blog-content"

const Index = ({ location }) => {
  // Fallback if users land haere
  if (typeof window !== "undefined") {
    window.location.href = "https://www.databricks.com?redirect=true"
  }
  return (
    <BaseLayout
      seo={{
        urls: {
          base: location.origin,
          current: location.pathname,
          qs: location.search,
        },
      }}
    >
      <BlogContent>Example Page</BlogContent>
    </BaseLayout>
  )
}

Index.propTypes = {
  location: PropTypes.shape({
    origin: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
}

export default Index
