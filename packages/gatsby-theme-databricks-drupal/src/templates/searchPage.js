import React from "react"
import BaseLayout from "../components/base-layout"
import ResultParent from "../../../databricks-ui/src/components/SearchResults/Parent/SearchResultParent"

const SearchPage = () => {
  // TODO: implement SEO image
  const seo = {
    metaTags: [
      {
        type: "Drupal_MetaValue",
        key: "title",
        value: "Search | Databricks",
      },
      {
        type: "Drupal_MetaValue",
        key: "description",
        value: "Search",
      },
    ],
    urls: {
      current: "/search",
    },
  }

  return (
    <BaseLayout
      className='search-page'
      variant='default'
      seo={seo}
      showResultParent
      skipToMain
    >
      <ResultParent />
    </BaseLayout>
  )
}

export default SearchPage
