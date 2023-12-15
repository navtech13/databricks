import { compose } from "./func"
import { fetchQueryFromCms, fetchResolver } from "./fetcher"

const getPageQuery = (nid, lang) => `
  query {
    drupal: nodeById(id: "${nid}", language: ${lang}) {
      __typename
    }
  }
`

// eslint-disable-next-line import/prefer-default-export
export const fetchNodeType = compose(fetchResolver, fetchQueryFromCms(getPageQuery))
