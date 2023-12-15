import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Background, BreadcrumbNavigation } from "databricks-ui"
import BaseLayout from "../components/base-layout"
import { componentResolver } from "../utils/component-resolver"
import splitComponentsByHero from "../helpers/splitComponentsByHero"
import stringSlugify from "../helpers/stringSlugify"
import SpacingContext from "../components/SpecificSpacing/SpacingContext"
import convertToRelativeURL from "../helpers/convertToRelativeURL"
import GlobalContext from "../components/global-context"

const GeneralPage = ({ data: { drupal }, location: { pathname }, pageContext }) => {
  const { generalPage } = drupal
  const backgroundVariant = generalPage?.fieldBackgroundStyle
  const spacings = generalPage.fieldSpacings?.entity
  const spacingsValue = {
    topSpacing: spacings?.fieldTopSpacing,
    bottomSpacing: spacings?.fieldBottomSpacing,
    topSpacingTablet: spacings?.fieldTopSpacingTablet,
    bottomSpacingTablet: spacings?.fieldBottomSpacingTablet,
    topSpacingDesktop: spacings?.fieldTopSpacingDesktop,
    bottomSpacingDesktop: spacings?.fieldBottomSpacingDesktop,
  }
  const displayBreadcrumbs = generalPage.fieldTopBannerDisplay
  const { breadcrumb } = generalPage.entityUrl
  const breadcrumbItems = breadcrumb?.map((item) => ({
    to: convertToRelativeURL(item?.url.path),
    ...item,
  }))

  useEffect(() => {
    if (
      !generalPage.fieldGated ||
      !generalPage.fieldUrl?.url?.path ||
      !generalPage.fieldBlurb
    ) {
      return
    }
    const hasCookie = document.cookie
      .match(`(^|;)\\s*${generalPage.fieldBlurb}\\s*=\\s*([^;]+)`)
      ?.pop()
    if (!hasCookie) {
      window.location = generalPage.fieldUrl?.url?.path
    }
  }, [generalPage.fieldGated, generalPage.fieldUrl, generalPage.fieldBlurb])

  const getComponents = splitComponentsByHero(generalPage.fieldComponents)

  const componentsBeforeHeroResolved = componentResolver(
    getComponents.componentsBeforeHero,
    pageContext
  )
  const components = componentResolver(
    getComponents.componentsAfterHero,
    pageContext
  )

  const customAlert =
    generalPage.fieldCustomAlert &&
    componentResolver([{ ...generalPage.fieldCustomAlert }])

  // TODO: implement SEO image
  const seo = {
    metaTags: generalPage.entityMetatags,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }
  return (
    <BaseLayout
      skipToMain
      customAlert={customAlert}
      hideGlobalAlert={generalPage.fieldHideGlobalAlert}
      hideCustomAlert={generalPage.fieldHideCustomAlert}
      className={`general-page general-page${stringSlugify(pathname)}`}
      variant={generalPage.fieldShowSidebarNavigation ? "simpleDark" : "default"}
      seo={seo}
      displayLanguageSelectorModal
    >
      <GlobalContext.Provider value={pageContext?.globalContext}>
        <SpacingContext.Provider
          value={{
            defaultSpacings: spacingsValue,
          }}
        >
          {displayBreadcrumbs && <BreadcrumbNavigation items={breadcrumbItems} />}
          {componentsBeforeHeroResolved}
          {generalPage.fieldDisplayBackgroundImage ? (
            <Background variant={backgroundVariant || "anchored_left"}>
              {components}
            </Background>
          ) : (
            components
          )}
        </SpacingContext.Provider>
      </GlobalContext.Provider>
    </BaseLayout>
  )
}

GeneralPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  pageContext: PropTypes.shape({
    pathAliasTranslations: PropTypes.arrayOf(PropTypes.shape({})),
    globalContext: PropTypes.shape({}),
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      generalPage: PropTypes.shape({
        fieldHideGlobalAlert: PropTypes.bool,
        fieldHideCustomAlert: PropTypes.bool,
        fieldCustomAlert: PropTypes.arrayOf(PropTypes.shape({})),
        title: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldComponents: PropTypes.arrayOf(PropTypes.shape({})),
        fieldSpacings: PropTypes.shape({}),
        fieldDisplayBackgroundImage: PropTypes.bool,
        fieldTopBannerDisplay: PropTypes.bool,
        entityUrl: PropTypes.shape({
          breadcrumb: PropTypes.arrayOf(
            PropTypes.shape({
              url: PropTypes.shape({
                path: PropTypes.string,
              }),
            })
          ),
        }),
        fieldAdminSettings: PropTypes.shape({
          entity: PropTypes.shape({
            fieldBackgroundVariant: PropTypes.string,
          }),
        }),
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query generalPage($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      generalPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodePages
      }
    }
  }
`

export default GeneralPage
