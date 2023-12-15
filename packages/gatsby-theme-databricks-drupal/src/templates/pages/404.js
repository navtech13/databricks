import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import BaseLayout from "../../components/base-layout"

// TODO: get this from Drupal
const title = "Page not found"

const NotFoundPage = ({ location }) => {
  const data = useStaticQuery(graphql`
    query NotFoundPageQuery {
      drupal {
        settings: siteSettingEntityQuery(
          filter: {
            conditions: [
              { operator: EQUAL, field: "type", value: ["not_found"] }
              { operator: EQUAL, field: "status", value: ["1"] }
            ]
          }
        ) {
          entities {
            ... on Drupal_SiteSettingEntityNotFound {
              entityBundle
              fieldIntro
              fieldTitle
              fieldSubtitle
            }
          }
        }
      }
    }
  `)

  return (
    <BaseLayout
      seo={{
        title,
        urls: {
          base: location.origin,
          current: location.pathname,
          qs: location.search,
        },
        metaTags: [
          {
            type: "Value",
            key: "robots",
            value: "noindex, nofollow",
          },
          {
            type: "Property",
            key: "og:title",
            value: title,
          },
        ],
      }}
    >
      <div className='py-8 px-2 text-center'>
        <div className='font-barlow text-[#212529]'>
          <div className='text-[11rem] font-bold'>
            {data.drupal?.settings?.entities[0]?.fieldIntro}
          </div>
          <h1 className='font-barlow mt-5 mb-1 font-medium'>
            {data.drupal?.settings?.entities[0]?.fieldTitle}
          </h1>
          <p className='font-barlow text-3 mb-3 font-[200]'>
            {data.drupal?.settings?.entities[0]?.fieldSubtitle}
          </p>
        </div>
      </div>
    </BaseLayout>
  )
}

NotFoundPage.propTypes = {
  location: PropTypes.shape({
    origin: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      settings: PropTypes.shape({
        entities: PropTypes.arrayOf(
          PropTypes.shape({
            fieldIntro: PropTypes.string,
            fieldTitle: PropTypes.string,
            fieldSubtitle: PropTypes.string,
          })
        ),
      }),
    }),
  }).isRequired,
}

export default NotFoundPage
