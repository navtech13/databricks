/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { graphql, navigate } from "gatsby"
import { Hero, RichText, IconResolver, Image } from "databricks-ui"
import Cookies from "js-cookie"
import HtmlParser from "../helpers/htmlParser"
import BaseLayout from "../components/base-layout"
import resolveImage from "../utils/resolve-image"
import resolveLottie from "../utils/resolve-lottie"
import useTranslate from "../utils/translate"
import { componentResolver } from "../utils/component-resolver"
import getKnownLead from "../helpers/mktoLead"
import eventTracking from "../helpers/eventTracking"
import { useLanguageContext } from "../components/language-provider"

const ResourcePage = ({ data: { drupal }, location: { pathname }, pageContext }) => {
  const { resourcePage } = drupal
  const [loading, setLoading] = useState(resourcePage.fieldEnableSkipForm || false)
  const { translate } = useTranslate()
  const heroAlignment = "justify-left"

  const { currentLanguage } = useLanguageContext()

  const hero = {
    title: resourcePage.title,
    titleColor: resourcePage.fieldTitleColor?.color,
    heroColorOverride: resourcePage.fieldHeroColorOverride?.color,
    children: resourcePage.fieldSubtitle,
    childrenColor: resourcePage.fieldSubtitleColor?.color,
    image: resolveImage(resourcePage.fieldMedia),
    topLabel: resourcePage.fieldKicker,
    pageType: "Resources",
    topLabelColor: resourcePage.fieldColorPicker?.color,
    heroAlignment,
    background: resourcePage.fieldHeroColorOverride
      ? resourcePage.fieldHeroColorOverride?.color
      : resourcePage.fieldHeroBackgroundVariant,
    ...(resourcePage.fieldMedia.__typename === "Drupal_MediaImage"
      ? { image: resolveImage(resourcePage.fieldMedia) }
      : {
          lottie: resolveLottie(resourcePage.fieldMedia),
        }),
  }

  const trackEnabled = pageContext?.trackEnabled

  // for track enabled pages, replace resource campaign id with campaign id from resource track
  if (trackEnabled) {
    resourcePage.fieldSidebarComponents.forEach((component) => {
      if (component.entity.__typename === "Drupal_ParagraphMarketoForm") {
        component.entity.fieldCampaignId = pageContext?.campaignId
      }
    })
  }

  const firstColumn = componentResolver(resourcePage.fieldComponents)
  const secondColumn = componentResolver(resourcePage.fieldSidebarComponents)

  const customAlert =
    resourcePage.fieldCustomAlert &&
    componentResolver([{ ...resourcePage.fieldCustomAlert }])

  const seo = {
    metaTags: resourcePage.entityMetatags,
    image: resourcePage?.fieldMedia?.entity?.fieldMediaImage,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }

  let customLogos = resourcePage.fieldCustomHeaderLogos.map((logo) => ({
    image: {
      src: logo.gatsbyFile?.publicURL,
      alt: logo.description,
    },
    alt: logo.description,
  }))
  // override deprecated image field with media gallery field if exists
  if (resourcePage?.fieldLogos?.length > 0) {
    customLogos = resourcePage.fieldLogos.map((logo) => ({
      image: {
        src: logo.entity?.gatsbyImageFile?.publicURL,
        alt: logo.entity?.fieldMediaImage?.alt,
      },
      alt: logo.entity?.fieldMediaImage?.alt,
    }))
  }
  const modifiedBodyValue = <HtmlParser content={resourcePage.body.processed} />
  const relatedResources = resourcePage.fieldRelatedPosts?.map(({ entity }) => {
    return { ...entity }
  })

  useEffect(() => {
    let knownLocation = ""

    // Return if the skip form is not enabled
    if (!resourcePage.fieldEnableSkipForm) {
      setLoading(false)
      return
    }

    // TODO: verify if we still need to validate the form id
    const formId = resourcePage.fieldSidebarComponents?.[0]?.entity?.fieldFormId
    if (formId !== "1001") {
      setLoading(false)
      return
    }

    // Reads the db_mkto_lead cookie. If the user is a known lead, it will automtically
    // redirect to the resource/ty-page
    getKnownLead().then(async (response) => {
      if (
        typeof response === "undefined" ||
        !response ||
        !response?.known ||
        !response?.subscribed ||
        !currentLanguage.id
      ) {
        setLoading(false)
        return
      }

      const userLocation = Cookies.get("db_country")
      if (typeof userLocation !== "undefined") {
        knownLocation = JSON.parse(userLocation)?.country_name || ""
      }
      const eventDataLoad = {
        event: "Form Loaded",
        formId,
        formValueCountry: knownLocation,
        formSource: "Marketo",
        formRegion: currentLanguage.id,
        formFailReason: "",
        formFailCode: "",
      }
      const eventDataSubmit = {
        event: "Form Submit Success",
        formId,
        formValueCountry: knownLocation,
        formSource: "Marketo",
        formRegion: currentLanguage.id,
        formFailReason: "",
        formFailCode: "",
        submitAction: "automatic",
      }
      eventTracking(eventDataLoad)
      eventTracking(eventDataSubmit)

      let skipUrl =
        resourcePage.fieldSidebarComponents?.[0]?.entity?.fieldThankYouUrl?.url
          ?.path || `${pathname}/thank-you`
      if (trackEnabled) {
        skipUrl = `${pathname}/thank-you`
      }

      setTimeout(
        navigate(`${skipUrl}?form-id=${formId}&language=${currentLanguage.id}`),
        250
      )
    })
    return () => {
      setLoading(false)
    }
  }, [currentLanguage.id])

  const loadingComponent = (
    <div className='fixed z-10 h-[100vh] w-[100vw]'>
      <div
        aria-hidden
        className='inset absolute h-full w-full bg-[#1F272D] opacity-[0.65]'
      />
      <div className='absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2'>
        <div className='flex flex-col items-center'>
          <IconResolver token='databricksLoading' className='text-white' />
          <span className='text-2.5 mt-1 font-medium text-white'>
            {translate("form.error-loading")}
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {loading && loadingComponent}
      <BaseLayout
        customAlert={customAlert}
        hideGlobalAlert={resourcePage.fieldHideGlobalAlert}
        hideCustomAlert={resourcePage.fieldHideCustomAlert}
        className='resources-page'
        variant='simple'
        seo={seo}
        customLogos={customLogos}
        hideLogo={resourcePage.fieldHideDatabricksLogo}
        skipToMain
      >
        <Hero variant='banner' {...hero} />
        <div className='inner-wrapper mx-auto my-5 flex flex-col-reverse gap-10 md:my-10 md:flex-row md:justify-between md:gap-0'>
          <div className='w-full md:w-6/12'>
            <RichText variant='body'>{modifiedBodyValue}</RichText>
            {firstColumn}
            {relatedResources && relatedResources.length > 0 && (
              <h3 className='my-2.5 py-4'>
                {translate("related.resources.section")}
              </h3>
            )}
            {relatedResources?.map((resource) => {
              const image = resolveImage(resource?.fieldCustomerLogo)
              return (
                <section className='border-gray-lines text-navy-800 hover:text-navy-800 pointer-events-none flex w-full flex-col gap-4 border-t pt-3 pb-3 hover:no-underline lg:flex-row'>
                  <Image
                    imageModal={false}
                    imageContainerOptions='w-20 h-16'
                    {...image}
                  />
                  <h3 className='b1'>{resource.title}</h3>
                </section>
              )
            })}
          </div>
          <div className='w-full md:w-5/12'>{!loading && secondColumn}</div>
        </div>
        {resourcePage.fieldLegalDisclaimer && (
          <RichText className='rich-text-body b6 inner-wrapper text-navy-06 my-10 w-full opacity-70'>
            {resourcePage.fieldLegalDisclaimer.processed}
          </RichText>
        )}
      </BaseLayout>
    </>
  )
}

ResourcePage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      resourcePage: PropTypes.shape({
        title: PropTypes.string,
        fieldKicker: PropTypes.string,
        fieldSubtitle: PropTypes.string,
        fieldCategory: PropTypes.shape({
          entity: PropTypes.shape({
            name: PropTypes.string,
          }),
        }),
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldMedia: PropTypes.shape({
          __typename: PropTypes.string,
          entity: PropTypes.shape({
            fieldMediaImage: PropTypes.shape({}),
          }),
        }),
        body: PropTypes.shape({
          processed: PropTypes.string,
        }),
        fieldComponents: PropTypes.arrayOf(PropTypes.shape({})),
        fieldSidebarComponents: PropTypes.arrayOf(PropTypes.shape({})),
        fieldLegalDisclaimer: PropTypes.shape({
          processed: PropTypes.string,
        }),
        fieldHeroBackgroundVariant: PropTypes.string,
        fieldTitleColor: PropTypes.string,
        fieldHeroColorOverride: PropTypes.string,
        fieldSubtitleColor: PropTypes.string,
        fieldKickerColor: PropTypes.string,
        fieldCustomHeaderLogos: PropTypes.arrayOf(PropTypes.shape({})),
        fieldHideDatabricksLogo: PropTypes.bool,
        fieldHideGlobalAlert: PropTypes.bool,
        fieldHideCustomAlert: PropTypes.bool,
        fieldCustomAlert: PropTypes.arrayOf(PropTypes.shape({})),
        fieldEnableSkipForm: PropTypes.bool,
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query resource($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      resourcePage: nodeRevisionById(id: $vid, language: $language) {
        ...NodeResource
      }
    }
  }
`

export default ResourcePage
