import {DRUPAL_UNIFY_SEARCH_ACCESS,DRUPAL_UNIFY_SEARCH_UID,DRUPAL_UNIFY_SEARCH_URL} from "./config"

const FetchAPI = async (string,page) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "autocomplete": true,
    "react": 1,
    "accessToken": DRUPAL_UNIFY_SEARCH_ACCESS,
    "searchString": string,
    "from": 0,
    "sortby": "_score",
    "orderBy": "desc",
    "pageNo": page,
    "aggregations": [],
    "resultsPerPage": 15,
    "exactPhrase": "",
    "withOneOrMore": "",
    "withoutTheWords": "",
    "pageSize": 10,
    "sid": "",
    "language": "en",
    "mergeSources": false,
    "versionResults": false,
    "smartFacetsClicked": false,
    "uid": DRUPAL_UNIFY_SEARCH_UID,
    "smartFacets": true
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let response = await fetch(DRUPAL_UNIFY_SEARCH_URL, requestOptions).then((res) => res.json()).then((e) => console.log(e))

    return response
}

export default FetchAPI