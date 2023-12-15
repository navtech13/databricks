import React from "react"
import { graphql } from "gatsby"

import GeneralPage from "./generalPage"

const NewsroomPage = ({ pageContext, data, ...props }) => {
  const featuredStories = data?.drupal?.featuredStories
  const pressReleases = data?.drupal?.pressReleases
  const headlines = data?.drupal?.headlines

  const context = {
    globalContext: {
      featuredStories,
      pressReleases,
      headlines
    },
    ...pageContext
  }

  return <GeneralPage data={data} pageContext={context} {...props} />
}

export const pageQuery = graphql`
  query newsroomPage($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      generalPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodePages
      }
      featuredStories: nodeQuery(
        filter: {
          conditions: [
            { field: "type", value: "news", operator: EQUAL }
            { field: "field_news_featured_story", value: "1", operator: EQUAL }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
        sort: { field: "field_weight", direction: ASC }
        limit: 10000
      ) {
        entities(language: $language) {
          ...NodeNews
        }
      }
      pressReleases: nodeQuery(
        filter: {
          conditions: [
            { field: "type", value: "press_release", operator: EQUAL }
            { field: "status", value: "1", operator: EQUAL }
          ]
        }
        sort: { field: "field_news_date", direction: DESC }
        limit: 10000
      ) {
        entities(language: $language) {
          ...NodePressRelease
        }
      }
      headlines: nodeQuery(
        filter: {
          conditions: [
            { field: "type", value: "news", operator: EQUAL }
            { field: "status", value: "1", operator: EQUAL }
          ]
        }
        sort: { field: "field_news_date", direction: DESC }
        limit: 10000
      ) {
        entities(language: $language) {
          ...NodeNews
        }
      }
    }
  }
`

export default NewsroomPage
