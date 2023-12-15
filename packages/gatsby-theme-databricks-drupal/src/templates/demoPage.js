import React, { useEffect, useMemo, useState } from "react"
import PropTypes from "prop-types"
import Cookies from "js-cookie"
import { graphql } from "gatsby"
import {
  Button,
  Wrapper,
  RichText,
  SmallTileCard,
  BreadcrumbNavigation,
  Link,
} from "databricks-ui"

import BaseLayout from "../components/base-layout"
import { componentResolver } from "../utils/component-resolver"
import splitComponentsByHero from "../helpers/splitComponentsByHero"
import SpacingContext from "../components/SpecificSpacing/SpacingContext"
import useTranslate from "../utils/translate"
import resolveImage from "../utils/resolve-image"
import convertToRelativeURL from "../helpers/convertToRelativeURL"
import HtmlParser from "../helpers/htmlParser"
import SlideUp from "../components/slide-up"
import GlobalContext from "../components/global-context"
import { useKnownLead } from "../utils/known-lead"

const DemoPage = ({ data: { drupal }, location: { pathname }, pageContext }) => {
  const { translate } = useTranslate()
  const { demoPage } = drupal
  const { breadcrumb } = demoPage.entityUrl
  const [context, setContext] = useState({})
  const breadcrumbItems = breadcrumb?.map((item) => ({
    to: convertToRelativeURL(item?.url.path),
    ...item,
  }))

  const isKnownLead = useKnownLead()

  const slideUp = useMemo(() => {
    const cookie = demoPage.fieldGatedAssetForm?.entity?.fieldItem?.entity?.fieldKey
    if (!cookie) {
      return !isKnownLead && demoPage.fieldGatedAssetForm?.entity
    }
    const isCookieSet = Cookies.get(cookie)

    return !isKnownLead && !isCookieSet && demoPage.fieldGatedAssetForm?.entity
  }, [demoPage.fieldGatedAssetForm?.entity, isKnownLead])

  const eventInfo = slideUp && {
    overlayId: demoPage.nid,
    overlayName: slideUp?.fieldLink?.url?.path,
    overlayContentType: "form",
    overlayContentName: slideUp.__typename,
    overlayTriggerAction: "manual",
  }

  const getComponents = splitComponentsByHero(demoPage.fieldComponents)

  const componentsBeforeHeroResolved = componentResolver(
    getComponents.componentsBeforeHero,
    pageContext
  )
  const components = componentResolver(
    getComponents.componentsAfterHero,
    pageContext
  )
  const bottomComponents = componentResolver(
    demoPage.fieldBottomContent,
    pageContext
  )
  const seo = {
    metaTags: demoPage.entityMetatags,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }

  const source =
    demoPage.fieldRelatedContent?.length > 0
      ? "fieldRelatedContent"
      : "fieldRelatedPosts"

  const relatedContentMap = {
    fieldRelatedContent: demoPage.fieldRelatedContent,
    fieldRelatedPosts: demoPage.fieldRelatedPosts,
  }
  const currentRelatedContent = relatedContentMap[source]

  useEffect(() => {
    if (!setContext) {
      return
    }
    if (!slideUp) {
      setContext((prev) => ({ ...prev, multimediaSlideUp: false }))
      return
    }
    setContext((prev) => ({ ...prev, multimediaSlideUp: true }))
  }, [slideUp, setContext])

  return (
    <BaseLayout seo={seo}>
      <GlobalContext.Provider value={{ context, setContext }}>
        <SpacingContext.Provider
          value={{
            defaultSpacings: null,
          }}
        >
          <BreadcrumbNavigation items={breadcrumbItems} />
          <Wrapper>
            <h2 className='py-0.5 lg:w-7/12'>{demoPage.title}</h2>
            {slideUp && (
              <SlideUp
                entity={slideUp}
                isKnownLead={isKnownLead}
                url='#'
                enableListener
                closeOnSubmit
                eventInfo={eventInfo}
                onSubmit={() => {
                  setContext((prev) => ({ ...prev, multimediaSlideUp: false }))
                  const videoElement =
                    document.getElementById("embedVideoYT") ||
                    document.querySelector(".embedVideoVimeo")
                  if (videoElement) {
                    const url = new URL(videoElement.src)
                    url.searchParams.append("autoplay", 1)
                    videoElement.src = url.toString()
                  }
                }}
              />
            )}
          </Wrapper>
          {componentsBeforeHeroResolved}
          {/* TMP fix to swap content for product tour pages */}
          {pathname.indexOf("resources/demos/tours/") < 0 && components}
          {(demoPage.body?.processed ||
            demoPage.fieldSubtitle ||
            currentRelatedContent?.length > 0) && (
            <Wrapper>
              <div className='flex flex-col justify-between lg:flex-row'>
                {/* Body section */}
                <div className='mb-8 w-full lg:mb-0 lg:w-7/12'>
                  {demoPage.fieldSubtitle && (
                    <h2 className='h3 mb-2'>{demoPage.fieldSubtitle}</h2>
                  )}
                  {demoPage.body.processed && (
                    <RichText className='text-gray-text rich-text-body'>
                      <HtmlParser content={demoPage.body.processed} />
                    </RichText>
                  )}
                  {demoPage.fieldUrl && (
                    <Button
                      as={Link}
                      className='mt-2 text-center'
                      to={demoPage.fieldUrl?.uri}
                      event={slideUp && demoPage.fieldUrl?.attribute}
                    >
                      {demoPage.fieldUrl?.title}
                    </Button>
                  )}
                </div>
                {/* Cards section */}
                <div className='w-full lg:w-4/12'>
                  {demoPage.fieldKicker && currentRelatedContent?.length > 0 && (
                    <>
                      {demoPage.fieldKicker && (
                        <h2 className='h3 mb-2'>{demoPage.fieldKicker}</h2>
                      )}
                      <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-1'>
                        {currentRelatedContent?.map((relatedItem) => {
                          if (!relatedItem) {
                            return <></>
                          }
                          const { fieldKey, fieldSolutionsIndustryPage } =
                            relatedItem.entity
                          const relatedItemMap = {
                            fieldRelatedContent: {
                              item: fieldSolutionsIndustryPage?.entity?.demoInfo
                                .entity,
                              image:
                                fieldSolutionsIndustryPage?.entity.fieldThumbnail,
                              toPath: `${
                                fieldSolutionsIndustryPage?.entity.entityUrl.path
                              }${fieldKey || ""}`,
                              ariaLabel: fieldSolutionsIndustryPage?.entity.title,
                              eyebrow:
                                fieldSolutionsIndustryPage?.entity.fieldCategories
                                  .length > 0 &&
                                fieldSolutionsIndustryPage?.entity.fieldCategories[0]
                                  .entity?.entityLabel,
                            },
                            fieldRelatedPosts: {
                              item: relatedItem.entity?.demoInfo?.entity,
                              image: relatedItem.entity.fieldThumbnail,
                              toPath: `${relatedItem.entity.entityUrl?.path}?itm_data=demo_center`,
                              ariaLabel: relatedItem.entity.title,
                              eyebrow:
                                relatedItem.entity.fieldCategories?.length > 0 &&
                                relatedItem.entity.fieldCategories[0].entity
                                  ?.entityLabel,
                            },
                          }
                          const currentRelatedItem = relatedItemMap[source]
                          const { item } = currentRelatedItem
                          if (!item) {
                            return <></>
                          }
                          const image = resolveImage(currentRelatedItem.image)
                          const { eyebrow } = currentRelatedItem
                          const { toPath } = currentRelatedItem
                          const { ariaLabel } = currentRelatedItem
                          return (
                            <SmallTileCard
                              eyebrow={eyebrow}
                              to={toPath}
                              img={image}
                              title={item.fieldDescription?.processed}
                              aria-label={ariaLabel}
                              stroke
                            />
                          )
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Wrapper>
          )}
          {/* TMP fix to swap content for product tour pages */}
          {pathname.indexOf("resources/demos/tours/") > 0 && components}
          {bottomComponents}
        </SpacingContext.Provider>
      </GlobalContext.Provider>
    </BaseLayout>
  )
}

DemoPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  pageContext: PropTypes.shape({
    pathAliasTranslations: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      demoPage: PropTypes.shape({
        nid: PropTypes.string,
        title: PropTypes.string,
        fieldGatedAssetForm: PropTypes.shape({
          entity: PropTypes.shape({
            fieldItem: PropTypes.shape({
              entity: PropTypes.shape({ fieldKey: PropTypes.string }),
            }),
          }),
        }),
        fieldSubtitle: PropTypes.string,
        fieldKicker: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldComponents: PropTypes.arrayOf(PropTypes.shape({})),
        fieldBottomContent: PropTypes.arrayOf(PropTypes.shape({})),
        fieldRelatedPosts: PropTypes.arrayOf(PropTypes.shape({})),
        fieldRelatedContent: PropTypes.arrayOf(PropTypes.shape({})),
        entityUrl: PropTypes.shape({
          path: PropTypes.string,
          breadcrumb: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        fieldUrl: PropTypes.shape({
          attribute: PropTypes.string,
          uri: PropTypes.string,
          title: PropTypes.string,
        }),
        body: PropTypes.shape({
          processed: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query demoPage($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      demoPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodeDemoPage
      }
    }
  }
`

export default DemoPage
