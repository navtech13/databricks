import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import BaseLayout from "../components/base-layout"
import { componentResolver } from "../utils/component-resolver"
import SpacingContext from "../components/SpecificSpacing/SpacingContext"

const PartnerSolutionPage = ({
  data: { drupal },
  location: { pathname },
  pageContext,
}) => {
  const { partnerSolutionPage } = drupal
  const spacings = partnerSolutionPage.fieldSpacings?.entity
  const spacingsValue = {
    topSpacing: spacings?.fieldTopSpacing,
    bottomSpacing: spacings?.fieldBottomSpacing,
    topSpacingTablet: spacings?.fieldTopSpacingTablet,
    bottomSpacingTablet: spacings?.fieldBottomSpacingTablet,
    topSpacingDesktop: spacings?.fieldTopSpacingDesktop,
    bottomSpacingDesktop: spacings?.fieldBottomSpacingDesktop,
  }

  const components = componentResolver(partnerSolutionPage.fieldComponents)

  const customAlert =
    partnerSolutionPage.fieldCustomAlert &&
    componentResolver([{ ...partnerSolutionPage.fieldCustomAlert }])

  const seo = {
    metaTags: partnerSolutionPage.entityMetatags,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }
  return (
    <BaseLayout
      customAlert={customAlert}
      hideGlobalAlert={partnerSolutionPage.fieldHideGlobalAlert}
      hideCustomAlert={partnerSolutionPage.fieldHideCustomAlert}
      className='general-page'
      variant='default'
      seo={seo}
      skipToMain
    >
      <SpacingContext.Provider
        value={{
          defaultSpacings: spacingsValue,
        }}
      >
        {components}
      </SpacingContext.Provider>
    </BaseLayout>
  )
}

PartnerSolutionPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      partnerSolutionPage: PropTypes.shape({
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
  pageContext: PropTypes.shape({
    recentPressReleases: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
}

export const pageQuery = graphql`
  query partnerSolutionPage($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      partnerSolutionPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodePartnerSolution
      }
    }
  }
`

export default PartnerSolutionPage
