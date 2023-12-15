import {
  DRUPAL_UNIFY_SEARCH_ACCESS,
  DRUPAL_UNIFY_SEARCH_UID,
  DRUPAL_UNIFY_SEARCH_URL,
} from "./config"

async function SearchAlgo(string, page, limit, filter) {
  const myHeaders = new Headers()
  myHeaders.append("Content-Type", "application/json")

  const raw = JSON.stringify({
    react: 1,
    accessToken: DRUPAL_UNIFY_SEARCH_ACCESS,
    searchString: string,
    from: (page - 1) * 15,
    sortby: "_score",
    orderBy: "desc",
    pageNo: page,
    aggregations: filter,
    resultsPerPage: limit,
    exactPhrase: "",
    withOneOrMore: "",
    withoutTheWords: "",
    pageSize: 10,
    sid: "",
    language: "en",
    mergeSources: false,
    versionResults: false,
    smartFacetsClicked: false,
    uid: DRUPAL_UNIFY_SEARCH_UID,
    smartFacets: false,
    getAutoTunedResult: true,
    getSimilarSearches: true,
    showContentTag: true,
  })

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  }

  const response = await fetch(DRUPAL_UNIFY_SEARCH_URL, requestOptions).then((res) =>
    res.json()
  )

  return response
}

export default SearchAlgo
