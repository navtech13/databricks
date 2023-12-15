/* eslint-disable no-restricted-globals */
// TODO - refactor
// set variables for dates, // .replace(/-/g, "/") fixes safari
import React, { useState, useEffect, useMemo, useContext } from "react"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import advanced from "dayjs/plugin/advancedFormat"
import PropTypes from "prop-types"
import {
  MultiSelect,
  SearchBar,
  FilterToggle,
  ClearFilters,
  Grid,
  NoResultsCard,
  PaginationList,
  LoadingSpinner,
  Card,
} from "databricks-ui"
import { useLanguageContext } from "./language-provider"
import useTranslate from "../utils/translate"
import filterEvents from "../helpers/filterEvents"
import search from "../helpers/search"
import getQueryParam from "../helpers/getQueryParam"
import GlobalContext from "./global-context"

const defaultRegion = {
  JA: "アジア太平洋日本",
  KO: "아시아-태평양",
  IT: "europa",
  FR: "europe",
  DE: "europa",
  BR: "amrica-latina",
}

const Events = () => {
  const { currentLanguage } = useLanguageContext()
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(advanced)
  let region = []
  if (defaultRegion[currentLanguage.id]) {
    region = [defaultRegion[currentLanguage.id]]
  }
  const CARDS_PER_PAGE = 6
  const SHOWN_PAGE_COUNT = 6

  const context = useContext(GlobalContext)
  if (!context) {
    return <></>
  }
  const eventsData = context?.eventsData
  const [page, setPage] = useState(1)
  const { translate } = useTranslate()
  const [isHidden, setHidden] = useState()
  const [isLoaded, setIsLoaded] = useState(false)
  const [items, setItems] = useState([])
  const [activeItems, setActiveItems] = useState([])
  const [filters, setFilters] = useState([])
  const [activeFilters, setActiveFilters] = useState([])
  const [clearUrl, setClearUrl] = useState(false)
  const [searchTerms, setSearchTerms] = useState("")
  const [activeSort, setActiveSort] = useState("desc")
  const [regionFilters, setRegionFilters] = useState([])
  const [activeRFilters, setActiveRFilters] = useState(region)

  const today = dayjs()

  const drupalItems = eventsData[`events${currentLanguage.id}`]
    ?.map((item, i) => {						
      // Drupal is serving the URL of untranslated nodes with their node id
      // TODO: review the cause of this issue, most likely has to do with using a static query
      let url = item.fieldEventUrl?.url?.path
      if (url && /\/\w{2}\/node\/\d+/.test(url)) {
        url = eventsData.eventsEN[i]?.fieldEventUrl?.url?.path
      }
      return {
        id: item.nid,
        title: item.title,
        blurb: item.title,
        url,
        ctaLabel:
          item.fieldEventUrl?.title || translate("events-overview.cards.cta-label"),
        description: item.body?.value,
        event_type: item.fieldEventType?.entity?.name,
        event_regions: item?.fieldEventRegions?.entity.name,
        event_location: item?.fieldEventLocation,
        publish_date: item.fieldDateTimeTimezone?.date,
        dates: item?.fieldDateTimeTimezone
          .sort((a, b) => {
            return (
              new Date(b.startDate.replace(/-/g, "/")).getTime() -
              new Date(a.startDate.replace(/-/g, "/")).getTime()
            )
          })
          .filter((date) => dayjs(date.endDate.slice(0, -4)) >= today)
          .reverse(),
        thumbnail: item?.fieldThumbnail?.entity?.fieldMediaImage?.url,
        // gatsbyData: item.fieldMedia.entity.gatsbyImageFile.childImageSharp.gatsbyData,
      }
    })
    .filter(({ dates }) => {
      // Filter based on all event dates
      const found = dates.reduce((result, current) => {
        const relDate = new Date(current.endDate.replace(/-/g, "/"))
        if (relDate >= today) {
          result.push(current)
        }
        return result
      }, [])
      if (found.length > 0) return true
      return false
    })

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
    setActiveRFilters([])
    window.history.pushState(
      {},
      "",
      `${`${window.location.origin}${window.location.pathname}`}`
    )
  }

  const updateUrl = () => {
    const filtersExist = getQueryParam("event_type", location.search)

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
    if (activeFilters.length > 0 || activeRFilters.length > 0) {
      // clearTimeout(timeOutId)
      const filteredString = activeFilters.reduce((result, item, index) => {
        return `${result}${index ? "," : ""}${slugify(item)}`
      }, "")
      const filteredRegionString = activeRFilters.reduce((result, item, index) => {
        return `${result}${index ? "," : ""}${slugify(item)}`
      }, "")
      window.history.pushState(
        {},
        "",
        `${`${window.location.origin}${window.location.pathname}?event_type=${
          filteredString || "all"
        }&region=${filteredRegionString || "all"}`}`
      )
    }
  }

  const checkParameters = (filtersObject, regionfiltersObject) => {
    const eventExist = getQueryParam("event_type", location.search)
    const regionExist = getQueryParam("region", location.search)

    const pushFilters = (filtersExist, filterObject, setfilter) => {
      if (filtersExist) {
        const filtersArr = filtersExist.split(",")
        const validFilters = []
        filtersArr.map((x) => {
          const result = filterObject.filter((item) => item.value === slugify(x))
          if (result.length > 0) {
            validFilters.push(x)
          }
          return x
        })
        if (validFilters.length > 0) {
          setfilter(validFilters)

          setHidden(false)
        }
      }
    }
    pushFilters(eventExist, filtersObject, setActiveFilters)
    pushFilters(regionExist, regionfiltersObject, setActiveRFilters)
  }

  const eventRegionTaxonomies = []
  const eventTypeTaxonomies = []
  eventsData[`regions${currentLanguage.id}`]?.forEach(({ name }) => {
    eventRegionTaxonomies.push(name)
  })
  eventsData[`types${currentLanguage.id}`]?.forEach(({ name }) => {
    eventTypeTaxonomies.push(name)
  })
  useEffect(() => {
    const filterEventTypes = eventTypeTaxonomies.map((item) => ({
      value: slugify(item),
      label: item,
    }))
    const filterEventRegions = eventRegionTaxonomies.map((item) => ({
      value: slugify(item),
      label: item,
    }))
    setItems(drupalItems)
    setIsLoaded(true)
    const combinedData = [...drupalItems]
    // Sort Events
    const sortedEvents = combinedData
      .sort((a, b) => {
        return (
          new Date(b.dates[0].startDate.replace(/-/g, "/")).getTime() -
          new Date(a.dates[0].startDate.replace(/-/g, "/")).getTime()
        )
      })
      .reverse()
    setItems(sortedEvents)
    setFilters(filterEventTypes)

    setRegionFilters(filterEventRegions)

    checkParameters(filterEventTypes, filterEventRegions)
    setTimeout(() => {
      setClearUrl(true)
    }, "3 second")
  }, [])

  useEffect(() => {
    let filteredItems = []
    const filteredRegion = filterEvents(
      filteredItems?.length > 0
        ? filteredItems
        : activeFilters.length > 0
        ? filteredItems
        : items,
      activeRFilters,
      "event_regions"
    )
    filteredItems = filterEvents(
      filteredRegion?.length > 0 ? filteredRegion : items,
      activeFilters,
      "event_type"
    )
    const filteredBySearch = search(
      filteredRegion?.length > 0
        ? filteredRegion
        : activeRFilters.length > 0
        ? filteredRegion
        : filteredItems,
      searchTerms
    )
    setActiveItems(filteredBySearch)
    updateUrl()
  }, [activeFilters, activeRFilters, activeSort, items, searchTerms])

  const spinner = (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <LoadingSpinner className='bg-gray-warm-light rounded-md p-1' />
    </div>
  )

  const numberOfPages = useMemo(() => {
    return Array.from({
      length: Math.ceil(activeItems?.length / CARDS_PER_PAGE),
    }).map((_, i) => ({ id: i + 1, label: String(i + 1) }))
  }, [activeItems])

  const shownCards = activeItems?.slice(
    (page - 1) * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE
  )

  const shownCardInfo = (
    <div className='text-navy-04'>
      {translate("general.showing-events", {
        results: `${(page - 1) * CARDS_PER_PAGE + 1}-${Math.min(
          (page - 1) * CARDS_PER_PAGE + CARDS_PER_PAGE,
          activeItems?.length
        )}`,
        total: activeItems?.length,
      })}
    </div>
  )

  const formatDate = (date, timeZone) => {
    return dayjs(date.replace(/-/g, "/"), "YYYY-MM-DD hh:mm:ss")
      .tz(timeZone)
      .format("MMMM DD [|] hh[:]mm A\n")
  }

  const isValidEndDate = (endDate, todayDate) => {
    const formattedEndDate = new Date(endDate.replace(/-/g, "/"))
    return formattedEndDate > todayDate
  }

  return (
    <>
      <section className='bg-gray-warm-medium'>
        {!isLoaded && <>{spinner}</>}

        <div className='mx-auto flex min-h-[300px] w-11/12 flex-col px-2 py-6 lg:max-w-[1148px]'>
          <h2 className='mb-4'>
            {translate("events-overview.cards.section-title")}
          </h2>

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
                      title={translate("events-overview.cards.event-type")}
                      isHidden={isHidden}
                      setHidden={setHidden}
                      activeFilters={activeFilters}
                      setActiveFilters={setActiveFilters}
                      showCounter
                    />
                    <MultiSelect
                      items={regionFilters}
                      title={translate("partners.filters.region")}
                      isHidden={isHidden}
                      setHidden={setHidden}
                      activeFilters={activeRFilters}
                      setActiveFilters={setActiveRFilters}
                      showCounter
                    />
                  </>
                )}
                {(activeFilters.length > 0 ||
                  activeRFilters.length > 0 ||
                  searchTerms) && (
                  <div className='mb-2.5'>
                    <ClearFilters handleReset={handleReset}>
                      {translate("general.clear-all")}
                    </ClearFilters>
                  </div>
                )}
              </div>
              <div className='flex w-full flex-wrap content-start lg:w-2/3'>
                {shownCards.length > 0 ? (
                  <Grid gap={2} columns={2}>
                    {shownCards.map((item) => {
                      const eventTypeElement = item?.event_type
                        ? `<p class='h6 text-navy-06'>${item.event_type}</p>`
                        : ""
                      const eventLocation = item.event_location
                        ? `<span class='text-navy-06 leading-tight'>
                               ${item.event_location}
                              </span>`
                        : ""
                      const eventDates = item.dates
                        .map((date) => {
                          const isEndDateValid = isValidEndDate(date.endDate, today)
                          if (isEndDateValid) {
                            const dateHour = formatDate(
                              date.startDate,
                              date.timezone
                            )
                            return `<div class='text-1.75 m-0 p-0'>${dateHour} </div>`
                          }
                          return null
                        })
                        .filter(Boolean)
                        .join("")

                      const eventDescription = item.description
                        ? item.description
                        : ""

                      const template = `${eventTypeElement}<p class='h4 md:mt-1.5 mt-2 text-navy-06 font-bold'>${item.title}</p> <p class='flex region flex-col'>${eventLocation} <span class='text-navy-06 text-1.75'>${eventDates}</span></p> <div class='text-navy-06 line-clamp-2 mb-2 max-h-[48px] text-ellipsis description'>${eventDescription}</div>`

                      return (
                        <div
                          data-date={item.publish_date}
                          key={item.post_id}
                          data-cy='EventCard'
                          className='event-card shadow-card-normal border-gray-cool hover:shadow-card-hover-accent relative flex cursor-pointer flex-col bg-white transition-shadow delay-75 duration-75 ease-linear hover:no-underline'
                        >
                          <Card
                            cta={{
                              to: item.url,
                              text: item.ctaLabel,
                            }}
                            description={template}
                            variant='resource'
                            image={{
                              src: item.thumbnail,
                              alt: item.title,
                            }}
                          />
                        </div>
                      )
                    })}
                  </Grid>
                ) : (
                  <NoResultsCard handleReset={handleReset} />
                )}
                {numberOfPages.length > 0 && activeItems.length > CARDS_PER_PAGE && (
                  <div className='mt-3 flex w-full flex-col items-center justify-between md:flex-row'>
                    <PaginationList
                      maxItemsShown={SHOWN_PAGE_COUNT}
                      label='Page'
                      items={numberOfPages}
                      onClick={(e) => setPage(e.id)}
                    />
                    <div className='mt-2.5 ml-2.5 md:mt-0'>{shownCardInfo}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

Events.propTypes = {
  location: PropTypes.shape({
    origin: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
}

export default Events
