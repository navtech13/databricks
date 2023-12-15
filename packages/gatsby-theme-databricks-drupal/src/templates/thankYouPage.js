/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Wrapper, Grid, Card, TYPageContent } from "databricks-ui"
import BaseLayout from "../components/base-layout"
import resolveImage from "../utils/resolve-image"
import { componentResolver } from "../utils/component-resolver"
import getKnownLead, {
  identifyUser,
  refreshLeadCookie,
  submitLeadForm,
} from "../helpers/mktoLead"

const identifyEvent = async (counter = 0) => {
  if (counter > 5) {
    console.log("Lead information not found after 5 tries")
    return
  }
  const success = await identifyUser()
  if (!success) {
    return setTimeout(() => identifyEvent(counter + 1), 2000)
  }
}

const ThankYouPage = ({
  data: { drupal },
  location: { pathname, search },
  pageContext,
}) => {
  const { thankYouPage } = drupal
  const location = thankYouPage?.entityUrl?.path
  const origin = typeof window !== "undefined" ? window?.location?.origin : ""
  const formReferrer = `${origin}${location}`

  useEffect(() => {
    const searchParams = new URLSearchParams(search)
    const formId = searchParams.get("form-id")
    const language = searchParams.get("language")

    identifyEvent()

    if (!formId || !language) {
      return
    }

    const submitForm = async (counter = 0) => {
      if (counter > 5) {
        console.log("Lead information not found after 5 tries")
        return
      }
      const success = await submitLeadForm(
        formId,
        formReferrer,
        language,
        true,
        null,
        "automatic"
      )
      if (!success) {
        return setTimeout(() => submitForm(counter + 1), 2000)
      }
      getKnownLead()
        .then(async (response) => {
          // Tracks the redirect as a "Fill out form" activity
          // once the use lands on the resource ty page, the cookie will be refreshed if
          // there was an existing cookie and the user was an unknown lead
          if (response && !response?.newCookie && !response?.known) {
            refreshLeadCookie()
          }
        })
        .catch((e) => console.log(e))
    }

    submitForm()
  })

  const relatedTitle =
    thankYouPage.fieldRelatedContent && thankYouPage.fieldRelatedContent.length > 0
      ? thankYouPage?.fieldRelatedContent[0]?.entity.fieldTitle
      : "Here’s more to explore"

  const relatedPosts =
    thankYouPage.fieldRelatedContent && thankYouPage.fieldRelatedContent.length > 0
      ? thankYouPage.fieldRelatedContent[0].entity.fieldRelatedPosts.map(
          ({ entity: post }) => ({
            key: post.uuid,
            cta: {
              to: post.entityUrl.path,
              text: "Read more",
            },
            image: post.fieldResourceOverviewImage
              ? resolveImage(post.fieldResourceOverviewImage)
              : false,
            description: `<div class="h6 mb-2">${post.fieldCategory.entity.name}</div>
            <div class="h4 mb-2 font-bold">${post.title}</div>
            <div class="b3 mb-2.5 md:mb-5 lg:mb-8">${post.fieldBlurb}</div>`,
          })
        )
      : []

  const relatedInternalContent =
    thankYouPage.fieldRelatedContent &&
    thankYouPage.fieldRelatedContent.length > 0 &&
    thankYouPage.fieldRelatedContent[0].entity.fieldResources.length > 0
      ? thankYouPage.fieldRelatedContent[0].entity.fieldResources.map(
          ({ entity: post }) => ({
            key: post.id,
            cta: {
              to: post.fieldLink.uri,
              text: post.fieldLink.title ? post.fieldLink.title : "Read more",
            },
            image: resolveImage(post.fieldRelatedImage),
            description: `<div class="h6 mb-2"></div>
    <div class="h4 mb-2 font-bold">${post.fieldTitle}</div>
    <div class="b3">${post.fieldBody.value}</div>`,
          })
        )
      : []

  const combinedData = [...relatedPosts, ...relatedInternalContent]

  const mainContent = componentResolver(thankYouPage.fieldTopContent)
  const secondaryContent = componentResolver(thankYouPage.fieldBottomContent)

  const seo = {
    metaTags: thankYouPage.entityMetatags,
    image: thankYouPage?.fieldMedia?.entity?.fieldMediaImage,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
    forceNoRobots: true,
  }
  return (
    <BaseLayout className='thank-you-page' variant='simple' seo={seo} skipToMain>
      <TYPageContent
        mainContent={mainContent}
        secondaryContent={
          <>
            {combinedData && combinedData.length > 0 && (
              <Wrapper title={relatedTitle}>
                <Grid className='bg-gray-warm-medium pb-16' columns={3} gap={3}>
                  {combinedData.map((item) => (
                    <Card variant='resource' class {...item} />
                  ))}
                </Grid>
              </Wrapper>
            )}
            {secondaryContent.length > 0 && secondaryContent}
          </>
        }
      />
    </BaseLayout>
  )
}

ThankYouPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      thankYouPage: PropTypes.shape({
        title: PropTypes.string,
        fieldMedia: PropTypes.shape({
          entity: PropTypes.shape({
            fieldMediaImage: PropTypes.shape({}),
          }),
        }),
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldRelatedPosts: PropTypes.arrayOf(
          PropTypes.shape({
            entity: PropTypes.shape({
              uuid: PropTypes.string,
              entityUrl: PropTypes.shape({
                path: PropTypes.string,
              }),
              fieldCategory: PropTypes.shape({
                entity: PropTypes.shape({
                  name: PropTypes.string,
                }),
              }),
              title: PropTypes.string,
              body: PropTypes.shape({
                summary: PropTypes.string,
              }),
            }),
          })
        ),
        fieldTopContent: PropTypes.arrayOf(PropTypes.shape({})),
        fieldBottomContent: PropTypes.arrayOf(PropTypes.shape({})),
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query thankYou($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      thankYouPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodeThankYou
      }
    }
  }
`

export default ThankYouPage
