import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { TwoColumnsContent, Link, Image } from "databricks-ui"
import BaseLayout from "../components/base-layout"
import { componentResolver } from "../utils/component-resolver"
import useTranslate from "../utils/translate"

//  TODO: Get the image from the Drupal
import logo from "../../../databricks-ui/static/images/top-header.svg"

const TwoColumnsPage = ({ data: { drupal }, location: { pathname } }) => {
  const { twoColumnsPage } = drupal

  const components = componentResolver(twoColumnsPage.fieldComponents)
  const sidebarComponents = componentResolver(twoColumnsPage.fieldSidebarComponents)

  // TODO: implement SEO image
  const seo = {
    metaTags: twoColumnsPage.entityMetatags,
    urls: {
      current: pathname,
    },
  }

  const { translate } = useTranslate()
  const image = {
    src: logo,
    alt: "Databricks Logo",
  }

  return (
    <BaseLayout className='two-columns' variant='minimal' seo={seo} skipToMain>
      <TwoColumnsContent
        firstColumn={
          <>
            <Link to='/' label={translate("general.home")}>
              <Image className='mb-6 max-w-[150px]' {...image} />
            </Link>
            <h1 className='h3 mb-2'>{twoColumnsPage.title}</h1>
            {twoColumnsPage.fieldSubtitle && (
              <p className='mb-6'>{twoColumnsPage.fieldSubtitle}</p>
            )}
            {components}
          </>
        }
        secondColumn={sidebarComponents}
      />
    </BaseLayout>
  )
}

TwoColumnsPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      twoColumnsPage: PropTypes.shape({
        title: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldSubtitle: PropTypes.string,
        fieldComponents: PropTypes.arrayOf(PropTypes.shape({})),
        fieldSidebarComponents: PropTypes.arrayOf(PropTypes.shape({})),
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query twoColumnsPage($id: String!, $language: Drupal_LanguageId!) {
    drupal {
      twoColumnsPage: nodeById(id: $id, language: $language) {
        ...NodeTwoColumns
      }
    }
  }
`

export default TwoColumnsPage
