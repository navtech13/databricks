import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GeneralPageContent } from "databricks-ui"
import BaseLayout from "../components/base-layout"
import { componentResolver } from "../utils/component-resolver"
import backgroundImage from "../../../databricks-ui/static/images/bg-landing-desktop.png"
import backgroundImageTablet from "../../../databricks-ui/static/images/bg-landing-tablet.png"
import stringSlugify from "../helpers/stringSlugify"
import SpacingContext from "../components/SpecificSpacing/SpacingContext"

const PartnerPage = ({ data: { drupal }, location: { pathname }, pageContext }) => {
  const { partnerPage } = drupal

  const spacings = partnerPage.fieldSpacings?.entity
  const spacingsValue = {
    topSpacing: spacings?.fieldTopSpacing,
    bottomSpacing: spacings?.fieldBottomSpacing,
    topSpacingTablet: spacings?.fieldTopSpacingTablet,
    bottomSpacingTablet: spacings?.fieldBottomSpacingTablet,
    topSpacingDesktop: spacings?.fieldTopSpacingDesktop,
    bottomSpacingDesktop: spacings?.fieldBottomSpacingDesktop,
  }

  const components = componentResolver(partnerPage.fieldComponents, pageContext)
  // TODO: discuss allowing background image to be specified from the CMS

  const customAlert =
    partnerPage.fieldCustomAlert &&
    componentResolver([{ ...partnerPage.fieldCustomAlert }])

  const background = partnerPage.fieldDisplayBackgroundImage
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
    metaTags: partnerPage.entityMetatags,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }
  return (
    <BaseLayout
      skipToMain
      customAlert={customAlert}
      hideGlobalAlert={partnerPage.fieldHideGlobalAlert}
      hideCustomAlert={partnerPage.fieldHideCustomAlert}
      className={`general-page general-page${stringSlugify(pathname)}`}
      variant={partnerPage.fieldShowSidebarNavigation ? "simpleDark" : "default"}
      seo={seo}
    >
      <SpacingContext.Provider
        value={{
          defaultSpacings: spacingsValue,
        }}
      >
        <GeneralPageContent
          hasBackgroundImage={partnerPage.fieldDisplayBackgroundImage}
          {...background}
        >
          {components}
        </GeneralPageContent>
      </SpacingContext.Provider>
    </BaseLayout>
  )
}

PartnerPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      partnerPage: PropTypes.shape({
        fieldHideGlobalAlert: PropTypes.bool,
        fieldHideCustomAlert: PropTypes.bool,
        fieldCustomAlert: PropTypes.arrayOf(PropTypes.shape({})),
        title: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldComponents: PropTypes.arrayOf(PropTypes.shape({})),
        fieldSpacings: PropTypes.arrayOf(PropTypes.shape({})),
        fieldDisplayBackgroundImage: PropTypes.bool,
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query partnerPage($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      partnerPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodePartner
      }
    }
  }
`

export default PartnerPage
