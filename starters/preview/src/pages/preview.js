import React, { useState, useEffect } from "react"
import { fetchPageFromCms } from "../../../../packages/gatsby-theme-databricks-drupal/src/helpers/client-queries"
import BlogDetail from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/blogDetail"
import LandingPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/landingPage"
import GeneralPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/generalPage"
import LegalPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/legalPage"
import ResourcePage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/resourcePage"
import TwoColumnsPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/twoColumnsPage"
import ThankYouPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/thankYouPage"
import CustomerPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/customerPage"
import DetectRouteChange from "../../../../packages/gatsby-theme-databricks-drupal/src/components/detect-route-change"
import DemoPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/demoPage"
import PartnerPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/partnerPage"
import PartnerSolutionPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/partnerSolutionPage"
import PartnerSolutionTyPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/partnerSolutionTyPage"
import PartnerSolutionFormPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/partnerSolutionFormPage"
import SolutionAcceleratorPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/solutionAccelerators"
import GlossaryPage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/glossaryPage"
import PressReleasePage from "../../../../packages/gatsby-theme-databricks-drupal/src/templates/pressReleasePage"
import { fetchNodeType } from "../../../../packages/gatsby-theme-databricks-drupal/src/helpers/fetchNodeType"

// eslint-disable-next-line react/prop-types
const Preview = ({ location }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [data, setData] = useState(null)
  const [mode, setMode] = useState(null)
  // Build Time Data Fetching

  /** @todo Prevent this route from rendering on live site. */
  /** @todo Require Drupal authentication to view this route.  */

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    // Default to Homepage.
    const nid = urlSearchParams.get("nid") || "11"
    const lang = urlSearchParams.get("lang") || "EN"
    const viewMode = urlSearchParams.get("mode") || ""
    // Drupal Preview is set up with JA instead of JP
    const langOverride = lang === "JP" ? "JA" : lang

    fetchNodeType(nid, langOverride).then((result) => {
      const isTyMode =
        mode === "thankyou" ? "NodeThankYouPage" : result.data.drupal?.__typename
      fetchPageFromCms(isTyMode, nid, langOverride).then(
        // eslint-disable-next-line no-shadow
        (result) => {
          setData(result)
          setMode(viewMode)
          setIsLoaded(true)
        }
      )
    })
  }, [mode])

  let newData = {}
  let pageContext = {}
  if (isLoaded) {
    const entity =
      data.data.drupal.entities.length > 0 ? data.data.drupal.entities[0] : null
    const legalSubnav = data?.data.legalSubnav
    if (entity?.__typename) {
      switch (entity.__typename) {
        case "NodePost":
          newData = {
            drupal: {
              article: entity,
            },
          }
          return (
            <>
              <BlogDetail data={newData} location={{ pathname: "preview" }} />
              <DetectRouteChange />
            </>
          )
        case "NodeTwoColumns":
          newData = {
            drupal: {
              twoColumnsPage: entity,
            },
          }
          return <TwoColumnsPage data={newData} location={{ pathname: "preview" }} />
        case "NodeLandingPage":
          newData = {
            drupal: {
              landingPage: entity,
            },
          }
          return <LandingPage data={newData} location={{ pathname: "preview" }} />
        case "NodePages":
          newData = {
            drupal: {
              generalPage: entity,
            },
          }
          if (data.data?.globalContext?.glossary) {
            pageContext = {
              globalContext: {
                glossaryInfo: {
                  glossary: {
                    entities: data.data.globalContext.glossary,
                  },
                },
              },
            }
          }
          return (
            <GeneralPage
              data={newData}
              pageContext={pageContext}
              location={{ pathname: "preview" }}
            />
          )
        case "NodeResource":
          newData = {
            drupal: {
              resourcePage: entity,
              thankYouPage: entity,
            },
          }
          if (mode === "thankyou") {
            return <ThankYouPage data={newData} location={{ pathname: "preview" }} />
          }
          return <ResourcePage data={newData} location={{ pathname: "preview" }} />
        case "NodeLegal":
          newData = {
            drupal: {
              legalPage: entity,
              legalSubnav,
            },
          }
          return <LegalPage data={newData} location={{ pathname: "preview" }} />
        case "NodeCustomer":
          newData = {
            drupal: {
              customerPage: entity,
            },
          }
          return <CustomerPage data={newData} location={{ pathname: "preview" }} />
        case "NodeDemoPage":
          newData = {
            drupal: {
              demoPage: entity,
            },
          }
          return <DemoPage data={newData} location={{ pathname: "preview" }} />
        case "NodePartner":
          newData = {
            drupal: {
              partnerPage: entity,
            },
          }
          return <PartnerPage data={newData} location={{ pathname: "preview" }} />
        case "NodePartnerSolution":
          newData = {
            drupal: {
              partnerSolutionPage: entity,
              partnerSolutionTyPage: entity,
              partnerSolutionFormPage: entity,
            },
          }
          if (mode === "connect") {
            return (
              <PartnerSolutionFormPage
                data={newData}
                location={{ pathname: "preview" }}
              />
            )
          }
          if (mode === "thankyou") {
            return (
              <PartnerSolutionTyPage
                data={newData}
                location={{ pathname: "preview" }}
              />
            )
          }
          return (
            <PartnerSolutionPage data={newData} location={{ pathname: "preview" }} />
          )
        case "NodeSolutionAccelerator":
          newData = {
            drupal: {
              solutionAccelerators: entity,
            },
          }
          return (
            <SolutionAcceleratorPage
              data={newData}
              location={{ pathname: "preview" }}
            />
          )
        case "NodeGlossaries":
          newData = {
            drupal: {
              glossaryPage: entity,
            },
          }
          return <GlossaryPage data={newData} location={{ pathname: "preview" }} />
        case "NodePressRelease":
          newData = {
            drupal: {
              pressReleasePage: entity,
            },
          }
          return (
            <PressReleasePage data={newData} location={{ pathname: "preview" }} />
          )
        default:
          return <div>Template not supported</div>
      }
    } else {
      return <div>Failed to load page, contact dev</div>
    }
  }
  return <div>Loading...</div>
}
export default Preview
