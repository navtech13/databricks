import React, { useState, useEffect, useMemo } from "react"
import { navigate } from "@reach/router"
import {
  AcceleratorCard,
  Grid,
  SortSelect,
  ClearFilters,
  GeneralSearchBar,
  LoadingSpinner,
  PaginationList,
  FilterToggle,
} from "databricks-ui"
import { useBreakpoint } from "databricks-ui/src/utils/use-breakpoint"
import ogImage from "../../../databricks-ui/static/images/og-databricks.png"
import { useLanguageContext } from "./language-provider"
import resolveImage from "../utils/resolve-image"
import useTranslate from "../utils/translate"
import MultiSelect, { filterCards } from "./customer-multiselect"
import { SlideUpWrapper } from "./slide-up"
import { useKnownLead } from "../utils/known-lead"

// Variables
const CARDS_PER_PAGE = 24
const SHOWN_PAGE_COUNT = 6

const filterMap = {
  type: "types",
  // industry: "industries",
  // difficulty: "difficulty",
  // product: "product",
  platform: "platform",
}

const cardSorter = (a, b) => {
  return a.title.localeCompare(b.title)
}

const sortCards = (cards, direction) => {
  if (!cards) {
    return []
  }

  const translatedFeaturedCards = []
  const translatedRegularCards = []
  const fallbackFeaturedCards = []
  const fallbackRegularCards = []

  cards.forEach((card) => {
    if (card.featured) {
      if (card.language) {
        translatedFeaturedCards.push(card)
      } else {
        fallbackFeaturedCards.push(card)
      }
    } else if (card.language) {
      translatedRegularCards.push(card)
    } else {
      fallbackRegularCards.push(card)
    }
  })

  if (direction === "desc") {
    return [
      ...translatedFeaturedCards?.sort(cardSorter),
      ...fallbackFeaturedCards?.sort(cardSorter),
      ...translatedRegularCards?.sort(cardSorter),
      ...fallbackRegularCards?.sort(cardSorter),
    ]
  }
  if (direction === "newest") {
    return cards.sort((a, b) => {
      return new Date(b.created) - new Date(a.created)
    })
  }
  return [
    ...translatedFeaturedCards?.sort(cardSorter).reverse(),
    ...translatedRegularCards?.sort(cardSorter).reverse(),
    ...fallbackFeaturedCards?.sort(cardSorter).reverse(),
    ...fallbackRegularCards?.sort(cardSorter).reverse(),
  ]
}

const getENLogo = (enCards, localizedId) => {
  let logo = null
  enCards.forEach((card) => {
    if (card.id === localizedId) {
      logo = card.image
    }
  })
  return logo
}

const DemoCenter = () => {
  const { currentLanguage } = useLanguageContext()
  const { translate } = useTranslate()
  const isDesktop = useBreakpoint("lg")

  const isKnownLead = useKnownLead()
  const [page, setPage] = useState(1)
  const [activeSort, setActiveSort] = useState("desc")
  const [searchValue, setSearchValue] = useState("")
  const [filters, setFilters] = useState(null)
  const [hasEmptyFilters, setHasEmptyFilters] = useState(true)
  const [cards, setCards] = useState(null)
  const [activeFilters, setActiveFilters] = useState({
    // industry: [],
    type: [],
    // product: [],
    platform: [],
    // difficulty: [],
  })
  const [isHidden, setHidden] = useState(true)

  useEffect(() => {
    const importFile = async (locale) => {
      const res = await fetch(`/data/demoCenter/${locale}.json`)

      return res.json()
    }

    const getCards = async () => {
      if (currentLanguage?.id) {
        const locale = currentLanguage.id.toLowerCase()
        const data = await importFile(locale)

        const formattedFilters = {}
        Object.keys(data.terms).forEach((key) => {
          formattedFilters[key] = data.terms[key].map(
            ({ entityLabel, entityId }) => ({
              value: entityId,
              label: entityLabel,
            })
          )
        })
        setFilters(formattedFilters)

        if (currentLanguage?.id !== "EN") {
          const usData = await importFile("en")
          usData?.demos.forEach((localizedDemo) => {
            const newLogo = getENLogo(usData?.demos, localizedDemo.id)
            if (newLogo !== null) {
              // eslint-disable-next-line no-param-reassign
              localizedDemo.image = newLogo
            }
          })
          // business rule - if no translated demos then show english demos rather than no results found
          setCards(data?.demos?.length > 0 ? data?.demos : usData?.demos)
        } else {
          setCards(data?.demos)
        }
      }
    }

    getCards()

    if (window.location.hash) {
      const searchParams = new URLSearchParams(window.location.hash.replace("#", ""))
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
  }, [currentLanguage, setSearchValue, setActiveFilters, setActiveSort])

  useEffect(() => {
    const searchParams = new URLSearchParams("")

    searchParams.set("q", searchValue)

    if (!searchValue || searchValue === "") {
      searchParams.delete("q")
    }

    Object.keys(activeFilters).forEach((filter) => {
      if (activeFilters[filter]?.length > 0) {
        activeFilters[filter].forEach((term) => {
          searchParams.append(filter, term)
        })
      } else {
        searchParams.delete(filter)
      }
    })

    setHasEmptyFilters(
      !searchValue && Object.values(activeFilters).every((filter) => !filter.length)
    )
    searchParams.set("sort", activeSort)

    if (activeSort === "desc") {
      searchParams.delete("sort")
    }

    const searchString = searchParams.toString()

    if (searchString !== "") {
      navigate(`#${searchParams.toString()}`, { replace: true })
      return
    }
    window.history.replaceState(
      "",
      document.title,
      `${window.location.pathname}${window.location.search}`
    )
  }, [searchValue, activeFilters, activeSort])
  const filteredCards = filterCards(cards, activeFilters, null, filterMap)
  const searchCards = searchValue
    ? filteredCards?.filter((card) => {
        const search = searchValue.toLowerCase()
        return (
          card.title.toLowerCase().includes(search) ||
          card.product?.some((product) =>
            product.entity?.entityLabel?.toLowerCase().includes(search)
          )
        )
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
    <div className='text-navy-600'>
      {translate("general.showing-demos", {
        results: `${(page - 1) * CARDS_PER_PAGE + 1}-${Math.min(
          (page - 1) * CARDS_PER_PAGE + CARDS_PER_PAGE,
          sortedCards?.length
        )}`,
        total: sortedCards?.length,
      })}
    </div>
  )

  const handleReset = () => {
    setActiveSort("desc")
    setSearchValue("")
    setActiveFilters({
      type: [],
      product: [],
      platform: [],
    })
  }

  if (!cards) {
    return (
      <div className='h-[1000px]'>
        <LoadingSpinner className='bg-oat-light rounded-md p-1' />
      </div>
    )
  }
  return (
    <div className='flex flex-col gap-4 lg:flex-row'>
      <div className='w-full lg:w-1/4'>
        {filters && (
          <>
            <div className='mb-2.5'>
              <GeneralSearchBar
                value={searchValue}
                setSearchTerms={setSearchValue}
                enterLabel={translate("general.search")}
              />
            </div>
            <div className={`${isHidden && "hidden"} lg:!block`}>
              <MultiSelect
                title={translate("demo.filters.demo-type")}
                items={filters}
                cards={cards}
                activeFilters={activeFilters}
                filterMap={filterMap}
                setActiveFilters={setActiveFilters}
                property='type'
                defaultOpen
              />
              {/* <MultiSelect
                title={translate("general.industry")}
                items={filters}
                cards={cards}
                activeFilters={activeFilters}
                filterMap={filterMap}
                setActiveFilters={setActiveFilters}
                property='industry'
              /> */}
              {/* <MultiSelect
                title={translate("general.product")}
                items={filters}
                cards={cards}
                activeFilters={activeFilters}
                filterMap={filterMap}
                setActiveFilters={setActiveFilters}
                property='product'
              /> */}
              {/* <MultiSelect
                title={translate("general.difficulty")}
                items={filters}
                cards={cards}
                activeFilters={activeFilters}
                filterMap={filterMap}
                setActiveFilters={setActiveFilters}
                property='difficulty'
              /> */}
              <MultiSelect
                title={translate("demo.filters.product")}
                items={filters}
                cards={cards}
                activeFilters={activeFilters}
                filterMap={filterMap}
                setActiveFilters={setActiveFilters}
                property='platform'
              />
              <SortSelect
                title={translate("general.sort")}
                items={[
                  {
                    value: "desc",
                    label: "A-Z",
                  },
                  {
                    value: "asc",
                    label: "Z-A",
                  },
                  {
                    value: "newest",
                    label: translate("general.newest"),
                  },
                ]}
                activeSort={activeSort}
                setActiveSort={setActiveSort}
              />
              {!hasEmptyFilters && (
                <div className='mt-2.5'>
                  <ClearFilters handleReset={handleReset}>
                    {translate("general.clear-all")}
                  </ClearFilters>
                </div>
              )}
            </div>
            {!isDesktop && (
              <div
                className='mt-2.5 block lg:hidden'
                onClick={() => setHidden(!isHidden)}
                onKeyDown={() => setHidden(!isHidden)}
                role='checkbox'
                aria-checked='false'
                tabIndex='0'
                aria-labelledby='chk1-label'
              >
                <FilterToggle />
              </div>
            )}
          </>
        )}
      </div>
      <div className='w-full lg:w-3/4'>
        {numberOfPages.length > 0 && (
          <div className='text-1.75 mb-3 hidden text-right lg:block'>
            {shownCardInfo}
          </div>
        )}
        {numberOfPages.length === 0 && (
          <section className='bg-oat-light flex w-full flex-col items-center py-3 px-5'>
            <div className='mb-2'>🤔</div>
            <h5 className='mb-1.5 w-[240px] text-center md:w-[340px] lg:w-[329px]'>
              {translate("general.no-results-filters")}
            </h5>
            <ClearFilters handleReset={handleReset}>
              {translate("general.reset-list")}
            </ClearFilters>
          </section>
        )}
        <Grid gap='1' columns='1:3' className='md:gap-2 lg:gap-4'>
          {shownCards?.map((card) => {
            const formElement = card?.slideUp?.entity
            const canSkipForm =
              isKnownLead && formElement?.fieldItem?.entity?.fieldFormId === "1001"
            const form = !canSkipForm && formElement
            const eventInfo = {
              overlayId: card.id,
              overlayName: formElement?.fieldLink?.url?.path,
              overlayContentType: "form",
              overlayContentName: formElement?.__typename,
              overlayTriggerAction: "manual",
            }
            const image = card.image
              ? resolveImage(card.image)
              : { src: ogImage, alt: card.title }
            const marketo = card?.gated && {
              title: card.gated.fieldTitle,
              description: card.gated.fieldDescription?.processed,
              cookieName: card.gated.fieldEnabled?.[0] && card.gated.fieldKey,
              legalCopy: card.gated.fieldBody?.processed,
              formId: card.gated.fieldFormId,
              cta: card.fieldFormCta,
              disableFormPrefill: card.fieldDisableFormPrefill,
              campaignId: card.gated.fieldCampaignId,
            }
            return (
              <SlideUpWrapper
                isSkipForm={formElement && canSkipForm}
                key={`${isKnownLead}${card.id}`}
                form={form}
                urlOverwrite={`${card.url}?itm_data=demo_center`}
                eventInfo={eventInfo}
              >
                <AcceleratorCard
                  href={!form && `${card.url}?itm_data=demo_center`}
                  badges={card.badges}
                  lock={card.lock || card.gated || form}
                  content={card.description || card.title}
                  partner={card.types?.[0]?.entity?.entityLabel}
                  image={image}
                  marketo={marketo}
                />
              </SlideUpWrapper>
            )
          })}
        </Grid>
        {numberOfPages.length > 0 && (
          <div className='mt-2.5 flex flex-col justify-between md:flex-row-reverse md:items-center'>
            <div className='text-1.75 mb-1.5 md:ml-2.5'>{shownCardInfo}</div>
            <PaginationList
              maxItemsShown={SHOWN_PAGE_COUNT}
              label='Page'
              items={numberOfPages}
              onClick={(e) => setPage(e.id)}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default DemoCenter
