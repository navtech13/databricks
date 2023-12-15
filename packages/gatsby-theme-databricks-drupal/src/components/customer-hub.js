import React, { useState, useEffect, useMemo } from "react"
import { navigate } from "@reach/router"
import {
  CustomerHubCard,
  Grid,
  SortSelect,
  ClearFilters,
  GeneralSearchBar,
  LoadingSpinner,
  PaginationList,
} from "databricks-ui"
import { useLanguageContext } from "./language-provider"
import resolveImage from "../utils/resolve-image"
import useTranslate from "../utils/translate"
import MultiSelect, { filterCards } from "./customer-multiselect"

const CARDS_PER_PAGE = 24
const SHOWN_PAGE_COUNT = 6

const filterMap = {
  industry: "fieldIndustries",
  cloud: "fieldCloud",
  region: "fieldRegions",
  platform: "fieldPlatform",
  solution: "fieldUseCase",
  techPartner: "fieldTags",
}

const cardSorter = (a, b) => {
  return a.title.localeCompare(b.title)
}

const sortCards = (cards, direction) => {
  if (!cards) {
    return []
  }

  const featuredCards = []
  const regularCards = []

  cards.forEach((card) => {
    // if (card.fieldFeatured) {
    //   return featuredCards.push(card)
    // }
    regularCards.push(card)
  })

  if (direction === "desc") {
    return [...featuredCards?.sort(cardSorter), ...regularCards?.sort(cardSorter)]
  }
  return [
    ...featuredCards?.sort(cardSorter).reverse(),
    ...regularCards?.sort(cardSorter).reverse(),
  ]
}

const getENLogo = (enCards, localizedId) => {
  let logo = null
  enCards.forEach((card) => {
    if (card.id === localizedId) {
      logo = card.fieldCustomerLogo
    }
  })
  return logo
}

const CustomerHub = () => {
  const { currentLanguage } = useLanguageContext()
  const { translate } = useTranslate()

  const [page, setPage] = useState(1)
  const [activeSort, setActiveSort] = useState("desc")
  const [searchValue, setSearchValue] = useState("")
  const [filters, setFilters] = useState(null)
  const [hasEmptyFilters, setHasEmptyFilters] = useState(false)
  const [cards, setCards] = useState(null)
  const [superFeaturedCards, setSuperFeaturedCards] = useState(null)
  const [activeFilters, setActiveFilters] = useState({
    industry: [],
    region: [],
    platform: [],
    cloud: [],
    solution: [],
    techPartner: [],
  })

  const handleReset = () => {
    setActiveSort("desc")
    setSearchValue("")
    setActiveFilters({
      industry: [],
      region: [],
      platform: [],
      cloud: [],
    })
  }

  useEffect(() => {
    if (currentLanguage?.id) {
      fetch(`/data/customerHub/${currentLanguage.id.toLowerCase()}.json`)
        .then((response) => response.json())
        .then((data) => {
          const formattedFilters = {}
          const terms = data?.terms || {}
          Object.keys(terms).forEach((key) => {
            formattedFilters[key] = terms[key].map(({ entityLabel, entityId }) => ({
              value: entityId,
              label: entityLabel,
            }))
          })
          setFilters(formattedFilters)
          if (currentLanguage?.id === "EN") {
            setCards(data?.customers)
          }
          setSuperFeaturedCards(
            data?.customers
              .filter((customer) => customer.fieldFeatured === true)
              .reverse()
              .slice(0, 15)
          )

          if (currentLanguage?.id !== "EN") {
            fetch(`/data/customerHub/en.json`)
              .then((response) => response.json())
              .then((usData) => {
                data?.customers.forEach((localizedCustomer) => {
                  const newLogo = getENLogo(usData?.customers, localizedCustomer.id)
                  if (newLogo !== null) {
                    localizedCustomer.fieldCustomerLogo = newLogo
                  }
                })
                setCards(data?.customers)
              })
          }
        })
    }

    const hashListener = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash === "") {
        handleReset()
      }
      const searchParams = new URLSearchParams(hash)
      if (searchParams.has("q")) {
        setSearchValue(searchParams.get("q"))
      }
      if (searchParams.has("sort")) {
        setActiveSort(searchParams.get("sort"))
      }
      setActiveFilters((previousFilters) => {
        const newFilters = {}
        Object.keys(previousFilters).forEach((filter) => {
          if (searchParams.has(filter)) {
            newFilters[filter] = searchParams.getAll(filter)
          }
        })
        return { ...previousFilters, ...newFilters }
      })
    }

    if (window.location.hash) {
      hashListener()
    }
    window.addEventListener("hashchange", hashListener, { passive: true })

    return () => {
      window.removeEventListener("hashchange", hashListener, { passive: true })
    }
  }, [currentLanguage, setSearchValue, setActiveFilters, setActiveSort])

  useEffect(() => {
    const searchParams = new URLSearchParams("")

    searchParams.set("q", searchValue)

    if (!searchValue || searchValue === "") {
      searchParams.delete("q")
    }

    Object.keys(activeFilters).forEach((filter) => {
      if (activeFilters[filter]?.length > 0) {
        return activeFilters[filter].forEach((term) => {
          searchParams.append(filter, term)
        })
      }
      setHasEmptyFilters(false)
      searchParams.delete(filter)
    })

    setHasEmptyFilters(Object.values(activeFilters).every((x) => !x.length))
    searchParams.set("sort", activeSort)

    if (activeSort === "desc") {
      searchParams.delete("sort")
    }

    const searchString = searchParams.toString()

    if (searchString !== "") {
      navigate(`#${searchParams.toString()}`, { replace: true })
      return
    }

    window.history.replaceState("", document.title, window.location.pathname)
  }, [searchValue, activeFilters, activeSort])
  const filteredCards = filterCards(cards, activeFilters, null, filterMap)
  const searchCards = searchValue
    ? filteredCards?.filter((card) => {
        const search = searchValue.toLowerCase()
        return card.title.toLowerCase().includes(search)
      })
    : filteredCards
  const sortedCards = sortCards(searchCards, activeSort)

  const numberOfPages = useMemo(() => {
    return Array.from({
      length: Math.ceil(sortedCards?.length / CARDS_PER_PAGE),
    }).map((_, i) => ({ id: i + 1, label: i + 1 }))
  }, [sortedCards])

  const shownCards = sortedCards?.slice(
    (page - 1) * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE
  )

  const shownCardInfo = (
    <div className='text-navy-04'>
      {translate("general.showing-customers", {
        results: `${(page - 1) * CARDS_PER_PAGE + 1}-${Math.min(
          (page - 1) * CARDS_PER_PAGE + CARDS_PER_PAGE,
          sortedCards?.length
        )}`,
        total: sortedCards?.length,
      })}
    </div>
  )

  if (!cards) {
    return (
      <div className='h-[1000px]'>
        <LoadingSpinner className='bg-gray-warm-light rounded-md p-1' />
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-4 md:flex-row'>
      <div className='w-full md:w-1/4'>
        {filters && (
          <>
            <div className='mb-2.5'>
              <GeneralSearchBar
                value={searchValue}
                setSearchTerms={setSearchValue}
              />
            </div>
            <MultiSelect
              title={translate("general.industry")}
              items={filters}
              cards={cards}
              activeFilters={activeFilters}
              filterMap={filterMap}
              setActiveFilters={setActiveFilters}
              property='industry'
            />
            <MultiSelect
              title={translate("general.region")}
              items={filters}
              cards={cards}
              activeFilters={activeFilters}
              filterMap={filterMap}
              setActiveFilters={setActiveFilters}
              property='region'
            />
            <MultiSelect
              title={translate("general.product")}
              items={filters}
              cards={cards}
              activeFilters={activeFilters}
              filterMap={filterMap}
              setActiveFilters={setActiveFilters}
              property='platform'
            />
            <MultiSelect
              title={translate("general.cloud")}
              items={filters}
              cards={cards}
              activeFilters={activeFilters}
              filterMap={filterMap}
              setActiveFilters={setActiveFilters}
              property='cloud'
            />
            <SortSelect
              title={translate("general.sort")}
              items={[
                {
                  value: "desc",
                  label: "A–Z",
                },
                {
                  value: "asc",
                  label: "Z-A",
                },
              ]}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
            />
            <div className='mt-2.5'>
              <ClearFilters handleReset={handleReset}>
                {translate("general.clear-all")}
              </ClearFilters>
            </div>
          </>
        )}
      </div>
      <div className='w-full md:w-3/4'>
        {numberOfPages.length > 0 && (
          <div className='text-1.75 mb-3 text-right'>{shownCardInfo}</div>
        )}
        {numberOfPages.length === 0 && (
          <section className='bg-gray-warm-light flex w-full flex-col items-center py-3 px-5'>
            <div className='mb-2'>🤔</div>
            <h5 className='w-30 mb-1.5 text-center md:w-[340px] lg:w-[329px]'>
              {translate("general.no-results-filters")}
            </h5>
            <ClearFilters handleReset={handleReset}>
              {translate("general.reset-list")}
            </ClearFilters>
          </section>
        )}
        {superFeaturedCards?.length > 0 &&
          hasEmptyFilters === true &&
          searchValue.length === 0 &&
          page === 1 && (
            <>
              <p className='text-navy-04 text-1.5 mb-1 font-mono uppercase'>
                Featured
              </p>
              <Grid gap='1' columns='1:3'>
                {superFeaturedCards?.map((card) => {
                  const hasJourney =
                    card.fieldTopContent[0]?.entity?.fieldTitle?.length > 0
                  let cta = card.fieldTopContent[0]?.entity?.fieldCtas[0]?.title && {
                    to: card.fieldTopContent[0]?.entity?.fieldCtas[0]?.url.path,
                    text: card.fieldTopContent[0]?.entity?.fieldCtas[0]?.title,
                  }
                  if (hasJourney) {
                    cta = {
                      to: card.entityUrl.path,
                      text: translate("general.explore-the-case-study"),
                    }
                  }
                  if (!hasJourney && !cta?.to) {
                    let ctaTitle = card.fieldUrl?.title
                    if (!ctaTitle) {
                      if (card.fieldUrl?.url?.path.indexOf("/customers") > -1)
                        ctaTitle = "Explore the case study"
                      else if (card.fieldUrl?.url?.path.indexOf("youtu") > -1)
                        ctaTitle = "Watch the video"
                      else if (card.fieldUrl?.url?.path.indexOf("/blog/") > -1)
                        ctaTitle = "Read the blog"
                      else if (card.fieldUrl?.url?.path.indexOf("/session/") > -1)
                        ctaTitle = "Watch the presentation"
                      else {
                        ctaTitle = "Learn more"
                      }
                    }
                    cta = card.fieldUrl && {
                      to: card.fieldUrl?.url?.path,
                      text: ctaTitle,
                    }
                  }
                  // TODO, fix images or add a placeholder
                  const customerLogo = card.fieldCustomerLogo
                    ? card.fieldCustomerLogo
                    : {}
                  return (
                    <CustomerHubCard
                      key={card.id}
                      description={cta && card?.body?.viewModeFieldFormatter}
                      cta={cta}
                      logoImage={resolveImage(customerLogo)}
                    />
                  )
                })}
              </Grid>
              <hr className='mt-3 mb-3 border-white' />
            </>
          )}
        <Grid gap='1' columns='1:3'>
          {shownCards?.map((card) => {
            const hasJourney =
              card.fieldTopContent[0]?.entity?.fieldTitle?.length > 0
            let cta = card.fieldTopContent[0]?.entity?.fieldCtas[0]?.title && {
              to: card.fieldTopContent[0]?.entity?.fieldCtas[0]?.url.path,
              text: card.fieldTopContent[0]?.entity?.fieldCtas[0]?.title,
            }
            if (hasJourney) {
              cta = {
                to: card.entityUrl.path,
                text: translate("general.explore-the-case-study"),
              }
            }
            if (!hasJourney && !cta?.to) {
              let ctaTitle = card.fieldUrl?.title
              if (!ctaTitle) {
                if (card.fieldUrl?.url?.path.indexOf("/customers") > -1)
                  ctaTitle = "Explore the case study"
                else if (card.fieldUrl?.url?.path.indexOf("youtu") > -1)
                  ctaTitle = "Watch the video"
                else if (card.fieldUrl?.url?.path.indexOf("/blog/") > -1)
                  ctaTitle = "Read the blog"
                else if (card.fieldUrl?.url?.path.indexOf("/session/") > -1)
                  ctaTitle = "Watch the presentation"
                else {
                  ctaTitle = "Learn more"
                }
              }
              cta = card.fieldUrl && {
                to: card.fieldUrl?.url?.path,
                text: ctaTitle,
              }
            }
            // TODO, fix images or add a placeholder
            const customerLogo = card.fieldCustomerLogo ? card.fieldCustomerLogo : {}
            const hideCard = card.fieldDisplayBackgroundImage
            return hideCard ? null : (
              <CustomerHubCard
                key={card.id}
                description={cta && card?.body?.viewModeFieldFormatter}
                cta={cta}
                logoImage={resolveImage(customerLogo)}
              />
            )
          })}
        </Grid>
        {numberOfPages.length > 0 && (
          <div className='mt-3 flex flex-col items-center justify-between md:flex-row'>
            <PaginationList
              maxItemsShown={SHOWN_PAGE_COUNT}
              label='Page'
              items={numberOfPages}
              onClick={(e) => setPage(e.id)}
            />
            <div className='text-1.75 mt-2.5 ml-2.5 md:mt-0'>{shownCardInfo}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerHub
