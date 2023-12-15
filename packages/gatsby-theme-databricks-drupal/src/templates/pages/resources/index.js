/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Cookies from "js-cookie"
import {
  Hero,
  MultiSelect,
  SearchBar,
  FilterToggle,
  ClearFilters,
  ResourceCard,
  Grid,
  Link,
  Button,
  NoResultsCard,
  LoadingSpinner,
} from "databricks-ui"
import BaseLayout from "../../../components/base-layout"
import HeroImage from "../../../../../databricks-ui/static/images/resources-header.png"
import resourcesLocalMetaTags from "../../../data/resourcesLocalMetaTags"
import filterResources from "../../../helpers/filterResources"
import search from "../../../helpers/search"
import getQueryParam from "../../../helpers/getQueryParam"
import { useLanguageContext } from "../../../components/language-provider"
import { useKnownLead } from "../../../utils/known-lead"
import skipFormEvents from "../../../helpers/skipFormEvents"

// eslint-disable-next-line react/prop-types
const Resources = ({ data, location: { pathname } }) => {
  const [isHidden, setHidden] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [activeItems, setActiveItems] = useState([])
  const [filters, setFilters] = useState([])
  const [activeFilters, setActiveFilters] = useState([])
  const [clearUrl, setClearUrl] = useState(false)
  const [searchTerms, setSearchTerms] = useState("")
  const [activeSort, setActiveSort] = useState("")
  const isKnownLead = useKnownLead()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { currentLanguage } = useLanguageContext()

  // eslint-disable-next-line react/prop-types
  const drupalItems = data.drupal.resources.entities.map((item) => {
    const formId = item.fieldSidebarComponents?.[0]?.entity?.fieldFormId
    const skipUrl =
      item.fieldSidebarComponents?.[0]?.entity?.fieldThankYouUrl?.url?.path
    return {
      title: item.title,
      blurb: item.fieldBlurb,
      url: item.path.alias,
      urlOverwrite: item.fieldEventUrl?.url?.path,
      resource_type: item.fieldCategory.entity.name,
      publish_date: item.publish_date,
      thumbnail: item.fieldResourceOverviewImage?.entity.fieldMediaImage.url,
      // TODO: verify if we need formId logic
      enableAuto: item.fieldEnableSkipForm && formId === "1001",
      skipUrl: skipUrl || `${item.path.alias}/thank-you`,
      formId,
    }
  })

  const resourceTypes = drupalItems.map((item) => item.resource_type)
  const activeResourceTypes = [...new Set(resourceTypes)]

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
  }

  const handleReset = () => {
    setSearchTerms("")
    setActiveSort("")
    document.querySelector("input.Search").value = ""
    setActiveFilters([])
    window.history.pushState(
      {},
      "",
      `${`${window.location.origin}${window.location.pathname}`}`
    )
  }

  const updateUrl = () => {
    // eslint-disable-next-line no-restricted-globals
    const filtersExist = getQueryParam("_sft_resource_type", location.search)

    if (
      (items.length > 0 &&
        filters.length > 0 &&
        activeFilters.length === 0 &&
        clearUrl === true) ||
      (items.length > 0 && !filtersExist)
    ) {
      window.history.pushState(
        {},
        "",
        `${`${window.location.origin}${window.location.pathname}`}`
      )
    }
    if (activeFilters.length > 0) {
      // clearTimeout(timeOutId)
      const filteredString = activeFilters.reduce((result, item, index) => {
        return `${result}${index ? "," : ""}${slugify(item)}`
      }, "")
      window.history.pushState(
        {},
        "",
        `${`${window.location.origin}${window.location.pathname}?_sft_resource_type=${filteredString}`}`
      )
    }
  }

  const checkParameters = (filtersObject) => {
    const filtersExist = getQueryParam("_sft_resource_type", location.search)
    if (filtersExist) {
      const filtersArr = filtersExist.split(",")
      const validFilters = []
      filtersArr.map((x) => {
        const result = filtersObject.filter((item) => item.value === slugify(x))
        if (result.length > 0) {
          validFilters.push(x)
        }
        return x
      })
      if (validFilters.length > 0) {
        setActiveFilters(validFilters)
        setHidden(false)
      }
    }
  }
  const resourceCategory = []
  data.drupal.resource_type.entities.forEach(({ entityLabel }) => {
    if (activeResourceTypes.includes(entityLabel)) {
      resourceCategory.push(entityLabel)
    }
  })
  const sortedresourceCategory = resourceCategory.sort((a, b) => a.localeCompare(b))
  useEffect(() => {
    setItems(drupalItems)
    setIsLoaded(true)
    const combinedData = [...drupalItems]
    // Sort resources
    const sortedResources = combinedData
      .sort((a, b) => {
        return (
          new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime()
        )
      })
      .reverse()
    setItems(sortedResources)
    const filtersObject = sortedresourceCategory.map((item) => ({
      value: slugify(item),
      label: item,
    }))
    setFilters(filtersObject)
    checkParameters(filtersObject)
    setTimeout(() => {
      setClearUrl(true)
    }, "3 second")
  }, [])

  useEffect(() => {
    const filteredItems = filterResources(items, activeFilters)
    const filteredBySearch = search(filteredItems, searchTerms)
    setActiveItems(filteredBySearch)
    updateUrl()
  }, [activeFilters, activeSort, items, searchTerms])

  const spinner = (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <LoadingSpinner className='bg-gray-warm-light rounded-md p-1' />
    </div>
  )
  return (
    <BaseLayout
      seo={{
        skipMetaImage: true,
        metaTags: resourcesLocalMetaTags,
        urls: {
          current: pathname,
        },
      }}
    >
      <section className='bg-gray-warm-light'>
        <Hero
          title='Resources'
          variant='twoColumnsGray'
          image={{
            src: HeroImage,
            alt: "Resources Illustration",
          }}
        />
        <section>
          {!isLoaded && <>{spinner}</>}

          <div className='mx-auto flex min-h-[300px] w-11/12 flex-col px-2 py-6 lg:max-w-[1148px]'>
            {isLoaded && (
              <div className='mt-4 flex flex-col lg:flex-row'>
                <div className='mr-4 flex w-full flex-col lg:w-1/3'>
                  <SearchBar className='mb-2.5' setSearchTerms={setSearchTerms} />
                  <div
                    className='mb-2.5 block lg:hidden'
                    onClick={() => setHidden(!isHidden)}
                    onKeyDown={() => setHidden(!isHidden)}
                    role='checkbox'
                    aria-checked='false'
                    tabIndex='0'
                    aria-labelledby='chk1-label'
                  >
                    <FilterToggle />
                  </div>
                  {filters.length > 0 && (
                    <>
                      <MultiSelect
                        items={filters}
                        title='Resource Type'
                        isHidden={isHidden}
                        setHidden={setHidden}
                        activeFilters={activeFilters}
                        setActiveFilters={setActiveFilters}
                        showCounter
                      />
                      {/* <SortSelect
                        key={sortItems.label}
                        items={sortItems.options}
                        title={sortItems.label}
                        isHidden={isHidden}
                        activeSort={activeSort}
                        setActiveSort={setActiveSort}
                      /> */}
                    </>
                  )}
                  {(activeFilters.length > 0 ||
                    searchTerms ||
                    activeSort !== "") && (
                    <ClearFilters handleReset={handleReset}>clear all</ClearFilters>
                  )}
                  <Button
                    variant='tertiary'
                    as={Link}
                    target='_blank'
                    className='mt-2.5 mb-2.5 max-w-fit'
                    to='https://pages.databricks.com/LP-Newsletter-Signup.html?utm_source=databricks&utm_medium=resources_newsletter_link'
                  >
                    Subscribe to Newsletter
                  </Button>
                </div>
                <div className='flex w-full flex-wrap content-start lg:w-2/3'>
                  {activeItems.length > 0 ? (
                    <Grid gap={2} columns={3}>
                      {activeItems.map((item) => {
                        const isSkip = isKnownLead && item.enableAuto
                        const skipLink = isSkip
                          ? `${item.skipUrl}?form-id=${item.formId}&language=${currentLanguage.id}`
                          : item.url
                        return (
                          <ResourceCard
                            attributes={{ "data-date": item.publish_date }}
                            key={item.post_id}
                            title={item.title}
                            blurb={item.blurb}
                            type={item.resource_type}
                            label={item.resource_tag}
                            thumbnail={item.thumbnail.replace(
                              "https://databricks.com",
                              "https://www.databricks.com"
                            )}
                            link={item.urlOverwrite || skipLink}
                            {...(isSkip &&
                              !isSubmitted &&
                              item.formId && {
                                onClick: () => {
                                  setIsSubmitted(true)
                                  skipFormEvents(item?.formId)
                                },
                              })}
                          />
                        )
                      })}
                    </Grid>
                  ) : (
                    <NoResultsCard handleReset={handleReset} />
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      </section>
    </BaseLayout>
  )
}

export const pageQuery = graphql`
  query resources {
    drupal {
      resources: nodeQuery(
        filter: {
          conditions: [
            { operator: EQUAL, field: "type", value: ["resource"] }
            { operator: EQUAL, field: "langcode", value: ["EN"] }
            { operator: EQUAL, field: "status", value: ["1"] }
            { operator: NOT_EQUAL, field: "field_hide_from_resources", value: ["1"] }
          ]
        }
        sort: { field: "created", direction: DESC }
        limit: 1000
      ) {
        entities {
          ... on Drupal_NodeResource {
            nid
            uuid
            title
            fieldBlurb
            fieldEnableSkipForm
            fieldEventUrl {
              url {
                path
              }
            }
            fieldSidebarComponents {
              entity {
                ... on Drupal_ParagraphMarketoForm {
                  fieldFormId
                  fieldThankYouUrl {
                    url {
                      path
                    }
                  }
                }
              }
            }
            path {
              alias
            }
            publish_date: created
            fieldMedia {
              entity {
                ...MediaImage
                thumbnail {
                  derivative(style: WIDE) {
                    height
                    width
                  }
                }
              }
            }
            fieldResourceOverviewImage {
              entity {
                ...MediaImage
              }
            }
            fieldCategory {
              entity {
                name
              }
            }
            fieldHideFromResources
          }
        }
      }
      resource_type: taxonomyTermQuery(
        limit: 300
        offset: 0
        sort: { field: "name", direction: ASC }
        filter: {
          conditions: [
            { operator: EQUAL, field: "vid", value: ["resource_category"] }
          ]
        }
      ) {
        entities {
          entityLabel
          ... on Drupal_TaxonomyTermResourceCategory {
            tid
            uuid
            name
          }
        }
      }
    }
  }
`

Resources.propTypes = {
  location: PropTypes.shape({
    origin: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
}

export default Resources
