/* eslint-disable no-restricted-globals */
import React, { useState, useEffect, useContext } from "react"
import PropTypes from "prop-types"
import Cookies from "js-cookie"
import {
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
import filterResources from "../helpers/filterResources"
import search from "../helpers/search"
import eventTracking from "../helpers/eventTracking"
import getQueryParam from "../helpers/getQueryParam"
import getKnownLead from "../helpers/mktoLead"
import { useLanguageContext } from "./language-provider"
import useTranslate from "../utils/translate"
import GlobalContext from "./global-context"

// eslint-disable-next-line react/prop-types
const Resourcesoverview = () => {
  const context = useContext(GlobalContext)
  if (!context) {
    return <></>
  }
  const { resourcesInfo, resourcesTypeInfo } = context
  const [isHidden, setHidden] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [activeItems, setActiveItems] = useState([])
  const [filters, setFilters] = useState([])
  const [activeFilters, setActiveFilters] = useState([])
  const [clearUrl, setClearUrl] = useState(false)
  const [searchTerms, setSearchTerms] = useState("")
  const [activeSort, setActiveSort] = useState("")
  const [isKnownLead, setIsKnownLead] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { translate } = useTranslate()
  const { currentLanguage, defaultLanguage } = useLanguageContext()
  let selectedResources = resourcesInfo[`resources${defaultLanguage.id}`] || []
  if (currentLanguage && resourcesInfo[`resources${currentLanguage.id}`]) {
    selectedResources = resourcesInfo[`resources${currentLanguage.id}`]
  }

  if (!selectedResources?.entities) {
    return <></>
  }

  // eslint-disable-next-line react/prop-types
  const drupalItems = selectedResources?.entities.map((item) => {
    const formId = item.fieldSidebarComponents?.[0]?.entity?.fieldFormId
    const skipUrl =
      item.fieldSidebarComponents?.[0]?.entity?.fieldThankYouUrl?.url?.path
    return {
      title: item.title,
      blurb: item.fieldBlurb,
      language: item.entityLanguage.id,
      url: item.entityUrl.path,
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
  const resourcetypes = drupalItems?.map((item) => item.resource_type)
  const activeresourcetypes = [...new Set(resourcetypes)]

  const slugify = (str) => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^一-龠ぁ-ゔァ-ヴーa-zA-Z0-9ａ-ｚＡ-Ｚ０-９가-힣々〆〤\s\w-]/g, "")
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

  let selectedResourceType = resourcesTypeInfo[`resourcetype${defaultLanguage.id}`]
  if (currentLanguage && resourcesTypeInfo[`resourcetype${currentLanguage.id}`]) {
    selectedResourceType = resourcesTypeInfo[`resourcetype${currentLanguage.id}`]
  }

  selectedResourceType.entities.forEach(({ entityLabel }) => {
    if (activeresourcetypes.includes(entityLabel)) {
      resourceCategory.push(entityLabel)
    }
  })
  const sortedresourceCategory = resourceCategory.sort((a, b) => a.localeCompare(b))
  useEffect(() => {
    setItems(drupalItems)
    setIsLoaded(true)
    getKnownLead().then(
      (response) => response?.known && response?.subscribed && setIsKnownLead(true)
    )
    const localLangCards = drupalItems
      .filter((element) => {
        return element.language === currentLanguage.id.toLowerCase()
      })
      .sort((a, b) => {
        return (
          new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime()
        )
      })
      .reverse()

    const fallbackCards = drupalItems
      .filter((element) => {
        return element.language === "en"
      })
      .sort((a, b) => {
        return (
          new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime()
        )
      })
      .reverse()
    // Sort resources
    const sortedResources =
      currentLanguage.id.toLowerCase() === "en"
        ? [...localLangCards]
        : [...localLangCards, ...fallbackCards]
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

  const resourceCardEventTrack = (item) => {
    setIsSubmitted(true)
    let knownLocation = ""
    const userLocation = Cookies.get("db_country")
    if (typeof userLocation !== "undefined") {
      knownLocation = JSON.parse(userLocation)?.country_name || ""
    }
    const eventDataLoad = {
      event: "Form Loaded",
      formId: item.formId,
      formValueCountry: knownLocation,
      formSource: "Marketo",
      formRegion: currentLanguage.id,
      formFailReason: "",
      formFailCode: "",
    }
    const eventDataSubmit = {
      event: "Form Submit Success",
      formId: item.formId,
      formValueCountry: knownLocation,
      formSource: "Marketo",
      formRegion: currentLanguage.id,
      formFailReason: "",
      formFailCode: "",
    }
    eventTracking(eventDataLoad)
    eventTracking(eventDataSubmit)
  }

  const spinner = (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <LoadingSpinner className='bg-gray-warm-light rounded-md p-1' />
    </div>
  )
  return (
    <main className='bg-gray-warm-light'>
      <section>
        {!isLoaded && <>{spinner}</>}

        <div className='mx-auto flex min-h-[300px] w-11/12 flex-col px-1.5 py-5 lg:max-w-[1148px]'>
          {isLoaded && (
            <div className='mt-3 flex flex-col lg:flex-row'>
              <div className='mr-3 flex w-full flex-col lg:w-1/3'>
                <SearchBar className='mb-2' setSearchTerms={setSearchTerms} />
                <div
                  className='mb-2 block lg:hidden'
                  onClick={() => setHidden((prev) => !prev)}
                  onKeyDown={() => setHidden((prev) => !prev)}
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
                      title={translate("resources-overview.resource-type")}
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
                {(activeFilters.length > 0 || searchTerms || activeSort !== "") && (
                  <ClearFilters handleReset={handleReset}>
                    {translate("general.clear-all")}
                  </ClearFilters>
                )}
                <Button
                  variant='tertiary'
                  as={Link}
                  target='_blank'
                  className='mt-2 mb-2 max-w-fit'
                  to='https://pages.databricks.com/LP-Newsletter-Signup.html?utm_source=databricks&utm_medium=resources_newsletter_link'
                >
                  {translate("general.subscribe-to-newsletter")}
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
                                resourceCardEventTrack(item)
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
    </main>
  )
}

Resourcesoverview.propTypes = {
  location: PropTypes.shape({
    origin: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
}

export default Resourcesoverview
