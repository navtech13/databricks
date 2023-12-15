import { compose } from "./func"
import { fetchQueryFromCms, fetchResolver } from "./fetcher"

const allQueries = require("../fragments/query-drupal")
/** @todo Share this query with /stories/Page.stories.js query? */
// const getPageQuery = (nid, lang) => `query {
//   ${menuQuery(lang)}
// }`
const getPageQuery = (nodeType, nid, lang) => {
  const queryMapping = {
    NodePost: allQueries.NodePost,
    NodeLegal: allQueries.NodeLegal,
    NodeResource: allQueries.NodeResource,
    NodeThankYouPage: allQueries.NodeThankYouPage,
    NodePages: allQueries.NodePages,
    NodeTwoColumns: allQueries.NodeTwoColumns,
    NodePressRelease: allQueries.NodePressRelease,
    NodeCustomer: allQueries.NodeCustomer,
    NodeDemoPage: allQueries.NodeDemoPage,
    NodePartner: allQueries.NodePartner,
    NodePartnerSolution: allQueries.NodePartnerSolution,
    NodePartnerSolutionTy: allQueries.NodePartnerSolutionTy,
    NodePartnerSolutionForm: allQueries.NodePartnerSolutionForm,
    NodeSolutionAccelerator: allQueries.NodeSolutionAccelerator,
    NodeGlossaries: allQueries.NodeGlossaries,
  }

  let globalContext = ""

  // global context queries
  // glossary page
  if (nid.toString() === "4301") {
    globalContext = allQueries.globalContextGlossary(lang)
  }

  const nodeQuery = queryMapping[nodeType] || ""
  // We need to query for the sidebar on NodeLegal pages.
  if (nodeType == "NodeLegal") {
    return `  
      query {
        drupal: nodeQuery(revisions: LATEST, filter: {conditions: [{field: "nid", value: ["${nid}"]}]}) {
          entities (language: ${lang}) {
            ... on Node {
              title
              __typename
              ${nodeQuery}
            }
          }
        }
        ${globalContext}
        legalSubnav: menuByName(name: "legal", language: ${lang}) {
          title: name
          links {
            __typename
            text: label
            url {
              routed
              path
            }
            links {
              __typename
              text: label
              url {
                routed
                path
              }
              links {
                __typename
                text: label
                url {
                  routed
                  path
                }
              }
            }
          }
        }     
      }`
  }

  return `
    query nodePost {
      drupal: nodeQuery(revisions: LATEST, filter: {conditions: [{field: "nid", value: ["${nid}"]}]}) {
        entities (language: ${lang}) {
          ... on Node {
            title
            __typename
            ${nodeQuery}
          }
        }
      }
      ${globalContext}
    }
  `
}

// eslint-disable-next-line import/prefer-default-export
export const fetchPageFromCms = compose(
  fetchResolver,
  fetchQueryFromCms(getPageQuery)
)
