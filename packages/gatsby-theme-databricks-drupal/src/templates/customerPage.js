import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { LandingPageContent, Wrapper } from "databricks-ui"
import BaseLayout from "../components/base-layout"
import { componentResolver } from "../utils/component-resolver"
import GlobalCustomerPrefooter from "../components/customer-prefooter"
import useTranslate from "../utils/translate"

const CustomerPage = ({ data: { drupal }, location: { pathname }, pageContext }) => {
  const { translate } = useTranslate()
  const { customerPage } = drupal
  const seo = {
    metaTags: customerPage.entityMetatags,
    urls: {
      current: pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }
  const bottomComponents = componentResolver(customerPage.fieldBottomContent)
  const hasLabelAndLinks =
    customerPage.fieldBottomContent[0]?.entity.__typename ===
    "Drupal_ParagraphLabelAndLinks"
  const topComponents = componentResolver(customerPage.fieldTopContent)
  const customerPrefooterOverride =
    customerPage.fieldCustomPrefooterCta &&
    componentResolver([customerPage.fieldCustomPrefooterCta])

  const getCustomerTaxonomyItem = (field, prefix = "") => {
    if (!field || field?.length === 0) {
      return null
    }
    const items = field.map((item) => {
      return item.entity?.entityLabel
    })
    if (!items.length) {
      return null
    }
    return (
      <p className='b2'>
        {prefix} <span className='text-orange-04'>{items.join(", ")}</span>
      </p>
    )
  }

  const industries = getCustomerTaxonomyItem(
    customerPage.fieldIndustries,
    translate("customer.taxonomy.industry")
  )
  const platform = getCustomerTaxonomyItem(
    customerPage.fieldPlatform,
    translate("customer.taxonomy.platform")
  )
  const cloud = getCustomerTaxonomyItem(
    customerPage.fieldCloud,
    translate("customer.taxonomy.cloud")
  )
  const solution =
    customerPage.fieldUseCase?.length > 0
      ? getCustomerTaxonomyItem(
          customerPage.fieldUseCase,
          translate("customer.taxonomy.solution")
        )
      : ""

  return (
    <BaseLayout className='customer-page' variant='default' seo={seo} skipToMain>
      <LandingPageContent>
        {topComponents}
        {(industries || platform || cloud) && !hasLabelAndLinks && (
          <Wrapper>
            <div className='lg:w-9/12'>
              {industries}
              {solution}
              {platform}
              {cloud}
            </div>
          </Wrapper>
        )}
        {bottomComponents}
        {!customerPage.fieldHideCustomerPrefooter &&
          (customerPrefooterOverride || <GlobalCustomerPrefooter />)}

        {customerPage.fieldHideCustomerPrefooter && customerPrefooterOverride}
      </LandingPageContent>
    </BaseLayout>
  )
}

CustomerPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      customerPage: PropTypes.shape({
        title: PropTypes.string,
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        fieldBottomContent: PropTypes.arrayOf(PropTypes.shape({})),
        fieldTopContent: PropTypes.arrayOf(PropTypes.shape({})),
        fieldCustomPrefooterCta: PropTypes.arrayOf(PropTypes.shape({})),
        fieldIndustries: PropTypes.arrayOf(PropTypes.shape({})),
        fieldPlatform: PropTypes.arrayOf(PropTypes.shape({})),
        fieldCloud: PropTypes.arrayOf(PropTypes.shape({})),
        fieldHideCustomerPrefooter: PropTypes.bool,
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query customerPage($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      customerPage: nodeRevisionById(id: $vid, language: $language) {
        ...NodeCustomer
      }
    }
  }
`

export default CustomerPage
