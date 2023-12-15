/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from "react"
import { navigate } from "@reach/router"
import {
  GeneralSearchBar,
  Grid,
  Card,
  Wrapper,
  ClearFilters,
  Link,
  MarketoForm,
  Image,
} from "databricks-ui"
import useTranslate from "gatsby-theme-databricks-drupal/src/utils/translate"
import { MultiSelect } from "../../components"
import { filterCards } from "../../components/MultiSelect/MultiSelect"
import cards from "../../data/EventCities/daiwtEvents"
import updatedCards from "../../data/EventCities/daiwtEvents"
import hubFormImage from "../../../../../packages/databricks-ui/static/images/wt/world-tour-hub-form-image.svg"

const filters = {
  region: [
    {
      value: "Americas",
      label: "Americas",
    },
    {
      value: "Europe, Middle East & Africa",
      label: "Europe, Middle East & Africa",
    },
    {
      value: "Asia-Pacific",
      label: "Asia-Pacific",
    },
  ],
  city: [
    {
      value: "Tokyo, Japan",
      label: "Tokyo, Japan",
    },
    {
      value: "Sydney, Australia",
      label: "Sydney, Australia",
    },
    {
      value: "London, England",
      label: "London, England",
    },
    {
      value: "New York City, USA",
      label: "New York City, USA",
    },
    {
      value: "Paris, France",
      label: "Paris, France",
    },
    {
      value: "Kuala Lumpur, Malaysia",
      label: "Kuala Lumpur, Malaysia",
    },
    {
      value: "São Paulo, Brazil",
      label: "São Paulo, Brazil",
    },
    {
      value: "Melbourne, Australia",
      label: "Melbourne, Australia",
    },
    {
      value: "Mumbai, India",
      label: "Mumbai, India",
    },
    {
      value: "Singapore, Republic of Singapore",
      label: "Singapore, Republic of Singapore",
    },
    {
      value: "Toronto, Canada",
      label: "Toronto, Canada",
    },
    {
      value: "Chicago, United States",
      label: "Chicago, United States",
    },
    {
      value: "Stockholm, Sweden",
      label: "Stockholm, Sweden",
    },
    {
      value: "Auckland, New Zealand",
      label: "Auckland, New Zealand",
    },
    {
      value: "Munich, Germany",
      label: "Munich, Germany",
    },
    {
      value: "Tel Aviv, Israel",
      label: "Tel Aviv, Israel",
    },
    {
      value: "Zurich, Switzerland",
      label: "Zurich, Switzerland",
    },
    {
      value: "Amsterdam, Netherlands",
      label: "Amsterdam, Netherlands",
    },
    {
      value: "Madrid, Spain",
      label: "Madrid, Spain",
    },
    {
      value: "Milan, Italy",
      label: "Milan, Italy",
    },
    {
      value: "Brisbane, Australia",
      label: "Brisbane, Australia",
    },
    {
      value: "New Delhi, India",
      label: "New Delhi, India",
    },
  ],
  month: [
    {
      value: "August 2023",
      label: "August 2023",
    },
    {
      value: "September 2023",
      label: "September 2023",
    },
    {
      value: "October 2023",
      label: "October 2023",
    },
    {
      value: "November 2023",
      label: "November 2023",
    },
    {
      value: "December 2023",
      label: "December 2023",
    },
    {
      value: "January 2024",
      label: "January 2024",
    },
    {
      value: "February 2024",
      label: "February 2024",
    },
    {
      value: "March 2024",
      label: "March 2024",
    },
    {
      value: "April 2024",
      label: "April 2024",
    },
    {
      value: "May 2024",
      label: "May 2024",
    },
  ],
  language: [
    {
      value: "English",
      label: "English",
    },
    {
      value: "Japanese",
      label: "Japanese",
    },
    {
      value: "Spanish",
      label: "Spanish",
    },
    {
      value: "Italian",
      label: "Italian",
    },
    {
      value: "Portuguese",
      label: "Portuguese",
    },
  ],
  type: [
    {
      value: "In-Person",
      label: "In-Person",
    },
    {
      value: "Virtual",
      label: "Virtual",
    },
    {
      value: "Hybrid",
      label: "Hybrid",
    },
  ],
}

const filterMap = {
  region: "region",
  city: "city",
  month: "month",
  language: "language",
  type: "type",
}
const DataAiworldtour = () => {
  const [searchValue, setSearchValue] = useState("")
  const { translate } = useTranslate()
  const [activeFilters, setActiveFilters] = useState({
    region: [],
    city: [],
    month: [],
    language: [],
    type: [],
  })

  const handleReset = () => {
    setSearchValue("")
    setActiveFilters({
      region: [],
      city: [],
      month: [],
      language: [],
      type: [],
    })
  }

  useEffect(() => {
    let hasActiveFilter = false
    Object.keys(activeFilters).forEach((filter) => {
      if (activeFilters[filter]?.length > 0) {
        hasActiveFilter = true
      }
    })
    if (searchValue === "" && !hasActiveFilter) {
      handleReset()
    }
  }, [])

  const filteredCards = filterCards(cards, activeFilters, null, filterMap)
  const searchCards = searchValue
    ? filteredCards?.filter((card) => {
        const search = searchValue.toLowerCase()
        return card.city[0].toLowerCase().includes(search)
      })
    : filteredCards

  const currentCards = searchValue ? searchCards : filteredCards

  useEffect(() => {
    if (window.location.hash) {
      const searchParams = new URLSearchParams(window.location.hash.replace("#", ""))
      if (searchParams.has("q")) {
        setSearchValue(searchParams.get("q"))
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
  }, [setSearchValue, setActiveFilters])

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
      searchParams.delete(filter)
    })

    const searchString = searchParams.toString()

    // get current page URL without hash (if exists)
    let currentURI = window.location.toString()
    if (currentURI.indexOf("#") > 0) {
      currentURI = currentURI.substring(0, currentURI.indexOf("#"))
    }
    if (searchString !== "") {
      navigate(`${currentURI}#${searchParams.toString()}`, { replace: true })
    }
  }, [searchValue, activeFilters])

  const sortedCards = currentCards.sort((a, b) => {
    // TODO review if we need to sort by tier
    // if (a.tier !== b.tier) {
    //   return a.tier - b.tier
    // }
    if (a.hasPassed === null || b.hasPassed === null) {
      return a.hasPassed === null ? 1 : -1
    }
    if (a.hasPassed !== b.hasPassed) {
      return a.hasPassed ? 1 : -1
    }
    if (a.eventDate === null || b.eventDate === null) {
      return a.eventDate === null ? 1 : -1
    }
    return a.eventDate - b.eventDate
  })

  const sortFutureCards = sortedCards.filter((b) => {
    return new Date(b.eventDate) >= new Date()
  })

  const sortPastCards = sortedCards
    .filter((b) => {
      return new Date(b.eventDate) < new Date()
    })
    .sort((a, b) => {
      if (a.eventDate === null || b.eventDate === null) {
        return b.eventDate === null ? 1 : -1
      }
      return b.eventDate - a.eventDate
    })

  for (const cards of sortPastCards) {
    if (cards.eventDate !== null) {
      cards.cta.text = "This event has ended"
      if (cards.WatchOnDemand === true) {
        cards.cta.text = "Watch On Demand"
      }
    }
  }

  const allSortedCards = [...sortFutureCards, ...sortPastCards]
  return (
    <>
      <Wrapper id='locations' className='bg-oat-medium pb-6 lg:pb-12'>
        <h2 className='mb-2.5 pt-2.5 md:mb-6 lg:pt-12'>World Tour Cities</h2>
        <div className=' flex flex-col gap-4 lg:flex-row'>
          <div className='w-full lg:w-1/4'>
            <div className='mb-2.5'>
              <GeneralSearchBar
                value={searchValue}
                setSearchTerms={setSearchValue}
              />
            </div>
            <MultiSelect
              title='Region'
              items={filters}
              cards={cards}
              activeFilters={activeFilters}
              filterMap={filterMap}
              setActiveFilters={setActiveFilters}
              property='region'
            />
            <MultiSelect
              title='City'
              items={filters}
              cards={cards}
              activeFilters={activeFilters}
              filterMap={filterMap}
              setActiveFilters={setActiveFilters}
              property='city'
            />
            <MultiSelect
              title='Month/Year'
              items={filters}
              cards={sortFutureCards}
              activeFilters={activeFilters}
              filterMap={filterMap}
              setActiveFilters={setActiveFilters}
              property='month'
            />
            <MultiSelect
              title='Language'
              items={filters}
              cards={cards}
              activeFilters={activeFilters}
              filterMap={filterMap}
              setActiveFilters={setActiveFilters}
              property='language'
            />
            <MultiSelect
              title='Type'
              items={filters}
              cards={cards}
              activeFilters={activeFilters}
              filterMap={filterMap}
              setActiveFilters={setActiveFilters}
              property='type'
            />
          </div>
          <div className='w-full lg:w-3/4'>
            {allSortedCards.length === 0 && (
              <section className='bg-gray-warm-light flex w-full flex-col items-center py-3 px-6'>
                <div className='mb-2'>🤔</div>
                <h5 className='mb-1.5 w-[240px] text-center md:w-[340px] lg:w-[329px]'>
                  {translate("general.no-results-filters")}
                </h5>
                <ClearFilters handleReset={handleReset}>
                  {translate("general.reset-list")}
                </ClearFilters>
              </section>
            )}
            <Grid gap='1' columns='1:3'>
              {allSortedCards
                .map((card, keyIndex) => {
                  const { hasPassed, WatchOnDemand } = card
                  return (
                    <>
                      {hasPassed ? (
                        WatchOnDemand ? (
                          <div key={keyIndex} className='card flex flex-col'>
                            <Card
                              variant='wt'
                              image={card.image}
                              description={card.description}
                              cta={card.cta}
                            />
                          </div>
                        ) : (
                          <div
                            key={keyIndex}
                            className='card card-disable pointer-events-none flex flex-col'
                          >
                            <Card
                              variant='wt'
                              image={card.disableImage}
                              description={card.description}
                              cta={card.cta}
                              className='min-height-[700px]'
                            />
                          </div>
                        )
                      ) : (
                        <div key={keyIndex} className='card flex flex-col'>
                          <Card
                            variant='wt'
                            image={card.image}
                            description={card.description}
                            cta={card.cta}
                          />
                        </div>
                      )}
                    </>
                  )
                })
                .sort((a, b) => a.tier - b.tier)}
            </Grid>
          </div>
        </div>
      </Wrapper>
    </>
  )
}

export default DataAiworldtour
