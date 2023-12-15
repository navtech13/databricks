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

const SolutionAcceleratorPage = ({
  data: { drupal },
  location: { pathname },
  pageContext,
}) => {
  const { solutionAccelerators } = drupal
  const spacings = solutionAccelerators.fieldSpacings?.entity
  const spacingsValue = {
    topSpacing: spacings?.fieldTopSpacing,
    bottomSpacing: spacings?.fieldBottomSpacing,
    topSpacingTablet: spacings?.fieldTopSpacingTablet,
    bottomSpacingTablet: spacings?.fieldBottomSpacingTablet,
    topSpacingDesktop: spacings?.fieldTopSpacingDesktop,
    bottomSpacingDesktop: spacings?.fieldBottomSpacingDesktop,
  }

  const components = componentResolver(solutionAccelerators.fieldComponents)
  // TODO: discuss allowing background image to be specified from the CMS

  const customAlert =
    solutionAccelerators.fieldCustomAlert &&
    componentResolver([{ ...solutionAccelerators.fieldCustomAlert }])

  const background = solutionAccelerators.fieldDisplayBackgroundImage
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
    metaTags: solutionAccelerators.entityMetatags,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }
  return (
    <BaseLayout
      customAlert={customAlert}
      hideGlobalAlert={solutionAccelerators.fieldHideGlobalAlert}
      hideCustomAlert={solutionAccelerators.fieldHideCustomAlert}
      className={`general-page general-page${stringSlugify(pathname)}`}
      variant='default'
      seo={seo}
      skipToMain
    >
      <SpacingContext.Provider
        value={{
          defaultSpacings: spacingsValue,
        }}
      >
        <GeneralPageContent
          hasBackgroundImage={solutionAccelerators.fieldDisplayBackgroundImage}
          {...background}
        >
          {components}
        </GeneralPageContent>
      </SpacingContext.Provider>
    </BaseLayout>
  )
}

SolutionAcceleratorPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      solutionAccelerators: PropTypes.shape({
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
  query solutionAcceleratorsPage($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      solutionAccelerators: nodeRevisionById(id: $vid, language: $language) {
        ...NodeSolutionAccelerator
      }
    }
  }
`

export default SolutionAcceleratorPage
