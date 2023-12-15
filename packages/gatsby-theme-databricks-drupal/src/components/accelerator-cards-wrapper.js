/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  MultiSelect,
  SearchBar,
  SortSelect,
  AcceleratorCards,
  FilterToggle,
  ClearFilters,
} from "databricks-ui"
import { graphql, useStaticQuery } from "gatsby"
import getQueryParam from "../helpers/getQueryParam"
import { useLanguageContext } from "./language-provider"
import useTranslate from "../utils/translate"

const AcceleratorsWrapper = ({ cards }) => {
  const { currentLanguage } = useLanguageContext()
  const { translate } = useTranslate()
  const [isHidden, setHidden] = useState()
  const [activeIndustries, setActiveIndustries] = useState([])
  const [searchTerms, setSearchTerms] = useState("")
  const [activeSort, setActiveSort] = useState("")
  const [clearUrl, setClearUrl] = useState(false)

  const industries = useStaticQuery(graphql`
    query SolutionsCardsQuery {
      industries: drupal {
        industry: taxonomyTermQuery(
          limit: 100
          offset: 0
          sort: { field: "name", direction: ASC }
          filter: {
            conditions: [{ operator: EQUAL, field: "vid", value: ["industry"] }]
          }
        ) {
          industriesEN: entities(language: EN) {
            ...Industries
          }
          industriesDE: entities(language: DE) {
            ...Industries
          }
          industriesFR: entities(language: FR) {
            ...Industries
          }
          industriesIT: entities(language: IT) {
            ...Industries
          }
          industriesJA: entities(language: JA) {
            ...Industries
          }
          industriesKO: entities(language: KO) {
            ...Industries
          }
          industriesBR: entities(language: BR) {
            ...Industries
          }
        }
      }
    }

    fragment Industries on Drupal_TaxonomyTermIndustry {
      entityLabel
      ... on Drupal_TaxonomyTermIndustry {
        tid
        uuid
        name
      }
    }
  `)

  let industryFilters = industries.industries.industry[
    `industries${currentLanguage.id}`
  ].map((item) => ({
    type: "option",
    label: item.entityLabel,
    value: item.entityLabel,
  }))

  const checkParameters = () => {
    // set active filters based on filters param
    const industryFiltersExist = getQueryParam("industry", window?.location.search)

    if (industryFiltersExist) {
      const filtersArr = industryFiltersExist.split(",").map((filter) => {
        return filter.toLocaleLowerCase()
      })
      const validFilters = []

      cards.filter(({ entity: card }) =>
        card?.fieldIndustry?.forEach(({ entity }) => {
          if (
            filtersArr.includes(entity?.name?.toLocaleLowerCase()) &&
            !validFilters.includes(entity?.name)
          ) {
            validFilters.push(entity?.name)
          }
        })
      )
      if (validFilters.length > 0) {
        setActiveIndustries(validFilters)
      }
    }
  }

  const handleReset = () => {
    setSearchTerms("")
    setActiveIndustries([])
    setActiveSort("")
    document.querySelector("input.Search").value = ""
    setClearUrl(true)
  }

  useEffect(() => {
    checkParameters()
  }, [])

  const sortOptions = [
    {
      type: "option",
      value: "alphabetical",
      label: translate("solutions-accelerators.sort.alphabetical"),
    },
    {
      type: "option",
      value: "newest",
      label: translate("solutions-accelerators.sort.newest"),
    },
    {
      type: "option",
      value: "popular",
      label: translate("solutions-accelerators.sort.popular"),
    },
  ]

  const validFilters = []

  cards.forEach(({ entity: card }) =>
    card?.fieldIndustry?.forEach(({ entity }) => {
      validFilters.push(entity?.name)
    })
  )

  industryFilters = industryFilters.filter(({ value }) =>
    validFilters.find((valid) => valid === value)
  )

  return (
    <div className='mt-4 flex flex-col lg:flex-row'>
      <div className='mr-4 mb-2.5 flex w-full flex-col lg:w-1/3'>
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
        <MultiSelect
          key='industry'
          items={industryFilters}
          title={translate("general.industry")}
          isHidden={isHidden}
          setHidden={setHidden}
          activeFilters={activeIndustries}
          setActiveFilters={setActiveIndustries}
        />
        <SortSelect
          key='sort'
          items={sortOptions}
          title={translate("general.sort")}
          isHidden={isHidden}
          activeSort={activeSort}
          setActiveSort={setActiveSort}
        />
        {(activeIndustries.length > 0 || activeSort !== "") && (
          <ClearFilters handleReset={handleReset}>
            {translate("general.clear-all")}
          </ClearFilters>
        )}
      </div>
      <div className='w-full lg:w-2/3'>
        <AcceleratorCards
          items={cards}
          activeIndustries={activeIndustries}
          setActiveIndustries={setActiveIndustries}
          searchTerms={searchTerms}
          activeSort={activeSort}
          handleReset={handleReset}
          clearUrl={clearUrl}
        />
      </div>
    </div>
  )
}

AcceleratorsWrapper.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  location: PropTypes.shape({
    origin: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
}

export default AcceleratorsWrapper
