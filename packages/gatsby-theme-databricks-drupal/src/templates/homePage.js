import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { GeneralPageContent } from "databricks-ui"
import BaseLayout from "../components/base-layout"
import { componentResolver } from "../utils/component-resolver"
import backgroundImage from "../../../databricks-ui/static/images/bg-landing-desktop.png"
import backgroundImageTablet from "../../../databricks-ui/static/images/bg-landing-tablet.png"
import SpacingContext from "../components/SpecificSpacing/SpacingContext"

const GeneralPage = ({ data: { drupal }, location: { pathname }, pageContext }) => {
  const { generalPage } = drupal
  const spacings = generalPage.fieldSpacings?.entity
  const spacingsValue = {
    topSpacing: spacings?.fieldTopSpacing,
    bottomSpacing: spacings?.fieldBottomSpacing,
    topSpacingTablet: spacings?.fieldTopSpacingTablet,
    bottomSpacingTablet: spacings?.fieldBottomSpacingTablet,
    topSpacingDesktop: spacings?.fieldTopSpacingDesktop,
    bottomSpacingDesktop: spacings?.fieldBottomSpacingDesktop,
  }

  const components = componentResolver(generalPage.fieldComponents)
  // TODO: discuss allowing background image to be specified from the CMS

  const customAlert =
    generalPage.fieldCustomAlert &&
    componentResolver([{ ...generalPage.fieldCustomAlert }])

  const background = generalPage.fieldDisplayBackgroundImage
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

  const translations = pageContext?.pathAliasTranslations.map((translation) => ({
    ...translation,
    entityUrl: { path: translation.entityUrl.path.replace("/home", "") },
  }))

  const seo = {
    metaTags: generalPage.entityMetatags,
    urls: {
      current: pathname,
    },
    translations,
  }

  return (
    <BaseLayout
      skipToMain
      customAlert={customAlert}
      hideGlobalAlert={generalPage.fieldHideGlobalAlert}
      hideCustomAlert={generalPage.fieldHideCustomAlert}
      className='general-page home-page-override'
      variant='default'
      seo={seo}
      displayLanguageSelectorModal
    >
      <SpacingContext.Provider
        value={{
          defaultSpacings: spacingsValue,
        }}
      >
        <GeneralPageContent
          hasBackgroundImage={generalPage.fieldDisplayBackgroundImage}
          {...background}
        >
          {components}
        </GeneralPageContent>
      </SpacingContext.Provider>
    </BaseLayout>
  )
}

GeneralPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      generalPage: PropTypes.shape({
        fieldHideGlobalAlert: PropTypes.bool,
        fieldHideCustomAlert: PropTypes.bool,
        fieldCustomAlert: PropTypes.shape({}),
        title: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldComponents: PropTypes.arrayOf(PropTypes.shape({})),
        fieldSpacings: PropTypes.shape({}),
        fieldDisplayBackgroundImage: PropTypes.bool,
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query homePage($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      generalPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodePages
      }
    }
  }
`

export function Head() {
  return (
    <meta
      name='naver-site-verification'
      content='43d5b34cddbedfa354ba7ec36f0abeb577f0aef4'
    />
  )
}

export default GeneralPage
