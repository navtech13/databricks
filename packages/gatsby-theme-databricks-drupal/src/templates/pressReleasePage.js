import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Button, PressRelease, NewsroomResources, Wrapper } from "databricks-ui"
import PressReleaseDetail from "../components/press-release-detail"
import BaseLayout from "../components/base-layout"

const PressReleasePage = ({
  data: { drupal },
  location: { pathname },
  pageContext,
}) => {
  const { pressReleasePage } = drupal
  const dateOptions = {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  }

  return (
    <BaseLayout
      className='press-release-page'
      variant='default'
      seo={{
        metaTags: pressReleasePage.entityMetatags,
        translations: pageContext?.pathAliasTranslations,
        skipMetaImage: true,
        image:
          "https://www.databricks.com/wp-content/uploads/2020/04/og-databricks.png",
        urls: {
          current: pathname,
        },
      }}
      skipToMain
    >
      <PressReleaseDetail
        publishDate={pressReleasePage.fieldNewsDate?.value}
        title={pressReleasePage.title}
        tagline={pressReleasePage.fieldTagline?.value}
        content={pressReleasePage.body.value}
        pathname={pathname}
      />
      <Wrapper className='pb-8'>
        <div className='w-full lg:w-2/3'>
          <h2 className='mb-4'>Recent Press Releases</h2>
          {pageContext?.recentPressReleases.slice(0, 5).map((item) => (
            <PressRelease
              key={item.id}
              publishDate={item.fieldNewsDate?.value}
              title={item.title}
              link={item.entityUrl.path}
              dateOptions={dateOptions}
            />
          ))}
          {/** link to PR archive page */}
          <Button variant='secondary' href='/company/newsroom/press-releases/'>
            View All
          </Button>
        </div>
      </Wrapper>
      <Wrapper>
        <NewsroomResources />
      </Wrapper>
    </BaseLayout>
  )
}

PressReleasePage.propTypes = {
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      pressReleasePage: PropTypes.shape({
        title: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        body: PropTypes.shape({
          value: PropTypes.string,
        }),
        created: PropTypes.number,
        entityUrl: PropTypes.shape({
          path: PropTypes.string,
        }),
        entityRendered: PropTypes.string,
      }),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    recentPressReleases: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
}

export const pageQuery = graphql`
  query pressReleasePage($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      pressReleasePage: nodeRevisionById(id: $vid, language: $language) {
        ...NodePressRelease
      }
    }
  }
`

export default PressReleasePage
