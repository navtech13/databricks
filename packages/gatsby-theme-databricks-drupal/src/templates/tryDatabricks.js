import React from "react"
import { graphql } from "gatsby"
import { TwoColumnsContent, Image, FooterSimple, Link } from "databricks-ui"
import BaseLayout from "../components/base-layout"
import { componentResolver } from "../utils/component-resolver"

const TryDatabricksPage = ({
  data: { drupal },
  location: { pathname },
  pageContext,
}) => {
  const { tryDatabricks } = drupal

  const excludeForm = tryDatabricks.fieldComponents.filter(
    (component) => component.entity.__typename !== "Drupal_ParagraphCustomForm"
  )
  const components = componentResolver(excludeForm)

  const includeForm = tryDatabricks.fieldComponents.filter(
    (component) => component.entity.__typename === "Drupal_ParagraphCustomForm"
  )
  const formComponent = componentResolver(includeForm)

  const hasAzureDatabricksPath = /\/try-databricks-azure$/i.test(pathname)
  const hasAwsDatabricksPath = /\/try-databricks-aws$/i.test(pathname)

  const imagesConfig = {
    hasAzureDatabricksPath: {
      image: {
        src: "https://www.databricks.com/sites/default/files/2023-03/databricks-azure-logo.svg",
        alt: "Databricks-Azure",
      },
    },
    hasAwsDatabricksPath: {
      image: {
        src: "https://www.databricks.com/sites/default/files/2023-02/databricks%20_%20aws_0.svg",
        alt: "Databricks-AWS",
      },
    },
    default: {
      image: {
        src: "https://www.databricks.com/sites/default/files/trial-images/sb-databricks.svg",
        alt: "Databricks",
      },
    },
  }

  const configKey = hasAzureDatabricksPath
    ? "hasAzureDatabricksPath"
    : hasAwsDatabricksPath
    ? "hasAwsDatabricksPath"
    : "default"

  const staticData = imagesConfig[configKey]

  const footerSimple = [
    { label: "© Databricks 2023" },
    { label: "Privacy policy", to: "/privacypolicy" },
    { label: "Terms of use", to: "/terms-of-use" },
  ]

  // TODO: implement SEO image
  const seo = {
    metaTags: tryDatabricks.entityMetatags,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }

  const imageStyles =
    pathname !== "/try-databricks" ? "mb-6 max-w-[250px]" : "mb-6 max-w-[150px]"

  return (
    <BaseLayout
      seo={seo}
      variant='minimal'
      className='tryDatabricksPage'
      footerComponent={<FooterSimple items={footerSimple} />}
      skipToMain
    >
      <TwoColumnsContent
        firstColumn={
          <>
            <Link className='block max-w-[150px]' to='/'>
              <Image className={imageStyles} {...staticData.image} />
            </Link>
            <h1 className='h3 mb-2'>{tryDatabricks.title}</h1>
            <p className='mb-6'>{tryDatabricks.fieldSubtitle}</p>
            {components}
          </>
        }
        secondColumn={formComponent}
      />
    </BaseLayout>
  )
}

export const pageQuery = graphql`
  query tryDatabricks($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      tryDatabricks: nodeRevisionById(id: $vid, language: $language) {
        ...NodePages
      }
    }
  }
`

export default TryDatabricksPage
