import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import BaseLayout from "../components/base-layout"
import { componentResolver } from "../utils/component-resolver"
import SpacingContext from "../components/SpecificSpacing/SpacingContext"

const PartnerSolutionFormPage = ({
  data: { drupal },
  location: { pathname },
  pageContext,
}) => {
  const { partnerSolutionFormPage } = drupal
  const spacings = partnerSolutionFormPage.fieldSpacings?.entity
  const spacingsValue = {
    topSpacing: spacings?.fieldTopSpacing,
    bottomSpacing: spacings?.fieldBottomSpacing,
    topSpacingTablet: spacings?.fieldTopSpacingTablet,
    bottomSpacingTablet: spacings?.fieldBottomSpacingTablet,
    topSpacingDesktop: spacings?.fieldTopSpacingDesktop,
    bottomSpacingDesktop: spacings?.fieldBottomSpacingDesktop,
  }

  const components = componentResolver(partnerSolutionFormPage.fieldRelatedContent)
  const sidebarComponents = componentResolver(
    partnerSolutionFormPage.fieldSidebarComponents
  )

  const seo = {
    metaTags: partnerSolutionFormPage.entityMetatags,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }

  return (
    <BaseLayout
      className='partner-solution-form-page'
      variant='simple'
      seo={seo}
      skipToMain
    >
      <SpacingContext.Provider
        value={{
          defaultSpacings: spacingsValue,
        }}
      >
        <div className='inner-wrapper my-8 flex flex-col justify-between md:flex-row lg:my-10'>
          <div className='first-column md:w-6/12'>{sidebarComponents}</div>
          <div className='second-column md:w-5/12'>{components}</div>
        </div>
      </SpacingContext.Provider>
    </BaseLayout>
  )
}

PartnerSolutionFormPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      partnerSolutionFormPage: PropTypes.shape({
        title: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldRelatedContent: PropTypes.arrayOf(PropTypes.shape({})),
        fieldSidebarComponents: PropTypes.arrayOf(PropTypes.shape({})),
      }),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({}).isRequired,
}

export const pageQuery = graphql`
  query partnerSolutionFormPage($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      partnerSolutionFormPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodePartnerSolutionForm
      }
    }
  }
`

export default PartnerSolutionFormPage
