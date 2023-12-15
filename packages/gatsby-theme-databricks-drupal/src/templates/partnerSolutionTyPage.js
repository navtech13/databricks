import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import BaseLayout from "../components/base-layout"
import { componentResolver } from "../utils/component-resolver"
import SpacingContext from "../components/SpecificSpacing/SpacingContext"

const PartnerSolutionTyPage = ({
  data: { drupal },
  location: { pathname },
  pageContext,
}) => {
  const { partnerSolutionTyPage } = drupal
  const spacings = partnerSolutionTyPage.fieldSpacings?.entity
  const spacingsValue = {
    topSpacing: spacings?.fieldTopSpacing,
    bottomSpacing: spacings?.fieldBottomSpacing,
    topSpacingTablet: spacings?.fieldTopSpacingTablet,
    bottomSpacingTablet: spacings?.fieldBottomSpacingTablet,
    topSpacingDesktop: spacings?.fieldTopSpacingDesktop,
    bottomSpacingDesktop: spacings?.fieldBottomSpacingDesktop,
  }

  const customAlert =
    partnerSolutionTyPage.fieldCustomAlert &&
    componentResolver([{ ...partnerSolutionTyPage.fieldCustomAlert }])

  const components = componentResolver(partnerSolutionTyPage.fieldTopContent)

  const seo = {
    metaTags: partnerSolutionTyPage.entityMetatags,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }

  return (
    <BaseLayout
      customAlert={customAlert}
      hideGlobalAlert={partnerSolutionTyPage.fieldHideGlobalAlert}
      hideCustomAlert={partnerSolutionTyPage.fieldHideCustomAlert}
      className='partner-solution-ty-page'
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

PartnerSolutionTyPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      partnerSolutionTyPage: PropTypes.shape({
        title: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldTopContent: PropTypes.arrayOf(PropTypes.shape({})),
      }),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({}).isRequired,
}

export const pageQuery = graphql`
  query partnerSolutionTyPage($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      partnerSolutionTyPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodePartnerSolutionTy
      }
    }
  }
`

export default PartnerSolutionTyPage
