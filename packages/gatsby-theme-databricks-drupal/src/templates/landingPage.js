import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { LandingPageContent } from "databricks-ui"
import BaseLayout from "../components/base-layout"
import { componentResolver } from "../utils/component-resolver"
import backgroundImage from "../../../databricks-ui/static/images/bg-landing-desktop.png"
import backgroundImageTablet from "../../../databricks-ui/static/images/bg-landing-tablet.png"

const LandingPage = ({ data: { drupal }, location: { pathname } }) => {
  const { landingPage } = drupal

  const components = componentResolver(landingPage.fieldComponents)
  // TODO: discuss allowing background image to be specified from the CMS

  const customAlert =
    landingPage.fieldCustomAlert &&
    componentResolver([{ ...landingPage.fieldCustomAlert }])

  const background = landingPage.fieldDisplayBackgroundImage
    ? {
        backgroundImage: {
          src: backgroundImage,
          alt: "",
        },
        backgroundImageTablet: {
          src: backgroundImageTablet,
          alt: "",
        },
      }
    : {}

  // TODO: implement SEO image
  const seo = {
    metaTags: landingPage.entityMetatags,
    urls: {
      current: pathname,
    },
  }
  return (
    <BaseLayout
      customAlert={customAlert}
      hideGlobalAlert={landingPage.fieldHideGlobalAlert}
      className='landing-page'
      variant='default'
      seo={seo}
      skipToMain
    >
      <LandingPageContent {...background}>{components}</LandingPageContent>
    </BaseLayout>
  )
}

LandingPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      landingPage: PropTypes.shape({
        fieldHideGlobalAlert: PropTypes.bool,
        fieldCustomAlert: PropTypes.arrayOf(PropTypes.shape({})),
        title: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldComponents: PropTypes.arrayOf(PropTypes.shape({})),
        fieldDisplayBackgroundImage: PropTypes.bool,
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query landingPage($id: String!, $language: Drupal_LanguageId!) {
    drupal {
      landingPage: nodeById(id: $id, language: $language) {
        ...NodePages
      }
    }
  }
`

export default LandingPage
