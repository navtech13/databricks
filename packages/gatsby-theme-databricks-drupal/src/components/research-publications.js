import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import {
  ClearFilters,
  FilterToggle,
  Grid,
  MultiSelect,
  NoResultsCard,
  PaginationList,
  RichText,
  SearchBar,
  SortSelect,
} from "databricks-ui"
import PublicationCard from "databricks-ui/src/components/PublicationCard"
import getQueryParam from "../helpers/getQueryParam"
import { useLanguageContext } from "./language-provider"
import useTranslate from "../utils/translate"

const query = graphql`
  query publications {
    drupal {
      publications: nodeQuery(
        filter: {
          conditions: [
            { operator: EQUAL, field: "type", value: ["research_publications"] }
            { operator: EQUAL, field: "langcode", value: ["EN"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
        sort: { field: "created", direction: DESC }
        limit: 1000
      ) {
        listEN: entities(language: EN) {
          ...NodeResearchPublications
        }
        listDE: entities(language: DE) {
          ...NodeResearchPublications
        }
        listFR: entities(language: FR) {
          ...NodeResearchPublications
        }
        listIT: entities(language: IT) {
          ...NodeResearchPublications
        }
        listJA: entities(language: JA) {
          ...NodeResearchPublications
        }
        listKO: entities(language: KO) {
          ...NodeResearchPublications
        }
        listBR: entities(language: BR) {
          ...NodeResearchPublications
        }
      }

      researchDomains: taxonomyTermQuery(
        limit: 50
        offset: 0
        sort: { field: "name", direction: ASC }
        filter: {
          conditions: [{ operator: EQUAL, field: "vid", value: ["research_domain"] }]
        }
      ) {
        listEN: entities(language: EN) {
          ...ResearchDomain
        }
        listDE: entities(language: DE) {
          ...ResearchDomain
        }
        listFR: entities(language: FR) {
          ...ResearchDomain
        }
        listIT: entities(language: IT) {
          ...ResearchDomain
        }
        listJA: entities(language: JA) {
          ...ResearchDomain
        }
        listKO: entities(language: KO) {
          ...ResearchDomain
        }
        listBR: entities(language: BR) {
          ...ResearchDomain
        }
      }
    }
  }

  fragment ResearchDomain on Drupal_TaxonomyTermResearchDomain {
    id: tid
    uuid
    name
  }

  fragment NodeResearchPublications on Drupal_NodeResearchPublications {
    nid
    uuid
    title
    featured: fieldFeatured
    authorsNames: fieldAuthorsNames
    categories: fieldCategories {
      category: entity {
        ...ResearchDomain
      }
    }
    link: fieldUrl {
      title
      url {
        path
      }
    }
  }
`

const DEFAULT_FILTERS = {
  categories: [],
  search: "",
}

const DEFAULT_ORDER = "asc"

const MAX_ITEMS_PER_PAGE = 12

const ResearchPublications = ({ title, description }) => {
  const {
    drupal: { publications, researchDomains },
  } = useStaticQuery(query)
  const { currentLanguage } = useLanguageContext()
  const searchRef = useRef()
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [order, setOrder] = useState(DEFAULT_ORDER)
  const [showFilters, setShowFilters] = useState(false)
  const [page, setPage] = useState(1)
  const { translate } = useTranslate()

  const publicationList = publications[`list${currentLanguage.id}`]
  const researchDomainList = researchDomains[`list${currentLanguage.id}`]

  const validateCategories = (categoryList) => {
    const filteredCategories = categoryList
      .filter(Boolean)
      .map((categoryId) => +categoryId)

    if (!filteredCategories?.length) return []

    return researchDomainList.filter(({ id }) => categoryList.includes(id))
  }

  const handleReset = () => {
    searchRef.current.value = ""
    setFilters(DEFAULT_FILTERS)
    setOrder(DEFAULT_ORDER)
    setShowFilters(false)
    setPage(1)
    window.history.pushState(
      {},
      "",
      `${`${window.location.origin}${window.location.pathname}`}`
    )
  }

  useEffect(() => {
    const queryCategories = getQueryParam("research_domains", window.location.search)
    const querySearch = getQueryParam("search", window.location.search)
    const queryOrder = getQueryParam("order", window.location.search)
    const queryPageNum = getQueryParam("page", window.location.search)

    const categories = validateCategories(queryCategories.split(","))

    setFilters({ categories, search: querySearch })
    if (querySearch) searchRef.current.value = querySearch
    if (queryOrder) setOrder(queryOrder)
    if (queryPageNum) {
      // Wait for the pagination to load.
      setTimeout(() => {
        setPage(+queryPageNum)
      }, 100)
    }
  }, [])

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev)
  }, [])

  useEffect(() => {
    const updateQueryParams = () => {
      const url = new URL(window.location.href)

      if (filters.categories.length) {
        url.searchParams.set("research_domains", filters.categories.join(","))
      } else {
        url.searchParams.delete("research_domains")
      }

      if (filters.search) {
        url.searchParams.set("search", filters.search)
      } else {
        url.searchParams.delete("search")
      }

      if (order === "desc") {
        url.searchParams.set("order", "desc")
      } else {
        url.searchParams.delete("order")
      }
      if (page && page !== 1 && !Number.isNaN(page)) {
        url.searchParams.set("page", page)
      } else {
        url.searchParams.delete("page")
      }

      window.history.pushState({}, "", url.toString())
    }

    updateQueryParams()
  }, [page, filters, order])

  const updateFilters = useCallback(
    (name) => (value) => {
      const formattedValue = name === "categories" ? value.map(Number) : value

      const newFilters = { ...filters, [name]: formattedValue }
      setPage(1)
      setFilters(newFilters)
    },
    [filters]
  )

  const toggleSort = useCallback(
    (value) => {
      setOrder(value)
    },
    [filters]
  )

  const filteredPublications = useMemo(() => {
    const list = []

    publicationList.forEach((item) => {
      let isVisible = true

      if (filters.categories.length) {
        isVisible = item.categories.some(({ category }) =>
          filters.categories.includes(category.id)
        )
      }

      const matchesSearch = item.title.toLowerCase().includes(filters.search)

      if (isVisible && matchesSearch) list.push(item)
    })

    if (!list?.length) {
      return []
    }

    const sortedPublications = list.sort((a, b) => {
      // Move featured publications to be always first
      if (a.featured && !b.featured) {
        return -1
      }
      if (!a.featured && b.featured) {
        return 1
      }

      // Sort by name
      const titleA = a.title.toUpperCase()
      const titleB = b.title.toUpperCase()

      const comparison = titleA < titleB ? -1 : titleA > titleB ? 1 : 0

      return order === DEFAULT_ORDER ? comparison : -comparison
    })

    return sortedPublications
  }, [filters, order])

  const pages = useMemo(() => {
    const output = []
    let i = 0
    const maxPages = Math.ceil(filteredPublications.length / MAX_ITEMS_PER_PAGE)

    while (i < maxPages) {
      output.push({ id: i + 1, label: i + 1 })
      i += 1
    }

    return output
  }, [filteredPublications.length])

  const currentPageCards = useMemo(() => {
    const startIndex = (page - 1) * MAX_ITEMS_PER_PAGE
    const endIndex = startIndex + MAX_ITEMS_PER_PAGE
    const cards = filteredPublications.slice(startIndex, endIndex)
    const featured = []
    const list = []

    cards.forEach((card) => {
      if (card.featured) featured.push(card)
      else list.push(card)
    })

    return {
      length: cards.length,
      list,
      featured,
    }
  }, [filteredPublications, page])

  const content = useMemo(() => {
    const renderCard = (item) => (
      <PublicationCard
        eyebrow={item.categories.map(({ category }) => category.name).join(", ")}
        title={item.title}
        description={item.authorsNames.join(", ")}
        linkText={item.link.title}
        linkUrl={item.link.url.path}
        key={item.nid}
      />
    )
    const featuredLen = currentPageCards.featured?.length > 0
    const listLen = currentPageCards.list?.length > 0

    return (
      <>
        {featuredLen > 0 && (
          <>
            <p className='text-navy-800 text-1.5 mb-3 uppercase'>
              {translate("card.featured")}
            </p>
            <Grid columns='3.5' gap={1}>
              {currentPageCards.featured.map(renderCard)}
            </Grid>
          </>
        )}
        {featuredLen > 0 && listLen > 0 && <hr className='my-3 text-white' />}
        {listLen > 0 && (
          <Grid columns='3.5' gap={1}>
            {currentPageCards.list.map(renderCard)}
          </Grid>
        )}
      </>
    )
  }, [currentPageCards])

  const categoriesSelectOptions = useMemo(() => {
    return researchDomainList.map(({ id, name }) => ({
      label: name,
      value: id,
    }))
  }, [researchDomainList])

  const itemsShowingText = (
    <p className='text-navy-600 text-1.75 text-right'>
      {translate("general.showing-results", {
        results: `${(page - 1) * MAX_ITEMS_PER_PAGE + 1} - ${Math.min(
          (page - 1) * MAX_ITEMS_PER_PAGE + MAX_ITEMS_PER_PAGE,
          publicationList.length
        )}`,
        total: publicationList.length,
      })}
    </p>
  )

  return (
    <div className='bg-gray-warm-medium'>
      <div className='inner-wrapper pb-12 pt-12'>
        {title && <h2 className='mb-2'>{title}</h2>}
        {description && (
          <RichText className='text-gray-text max-w-xl' variant='body' as='p'>
            {description}
          </RichText>
        )}
        <div className='flex flex-col pt-6 xl:flex-row'>
          <div className='mr-4 flex w-full flex-col xl:w-1/3'>
            <SearchBar
              className='mb-2.5'
              setSearchTerms={updateFilters("search")}
              ref={searchRef}
            />
            <div
              className='mb-2.5 block lg:hidden'
              onClick={toggleFilters}
              onKeyDown={toggleFilters}
              role='checkbox'
              aria-checked='false'
              tabIndex='0'
              aria-labelledby='chk1-label'
            >
              <FilterToggle />
            </div>
            {categoriesSelectOptions?.length && (
              <MultiSelect
                items={categoriesSelectOptions}
                title={translate("research.filter.research-domain")}
                isHidden={showFilters}
                setHidden={setShowFilters}
                activeFilters={filters.categories}
                setActiveFilters={updateFilters("categories")}
                showCounter
              />
            )}
            <SortSelect
              items={[
                { label: "A-Z", value: "asc" },
                { label: "Z-A", value: "desc" },
              ]}
              title={`${translate("general.sort")}: ${
                order === DEFAULT_ORDER ? "A-Z" : "Z-A"
              }`}
              activeSort={order}
              setActiveSort={toggleSort}
            />
            {(filters.categories.length ||
              filters.search ||
              order !== DEFAULT_ORDER) && (
              <ClearFilters handleReset={handleReset}>
                {translate("general.clear-all")}
              </ClearFilters>
            )}
          </div>

          <div className='flex w-full flex-col pt-5 xl:pt-0'>
            {currentPageCards?.length ? (
              <>
                <div className='mb-3'>{itemsShowingText}</div>
                {content}
              </>
            ) : (
              <NoResultsCard handleReset={handleReset} />
            )}
            {pages.length > 1 && (
              <div className='flex flex-col justify-between gap-2.5 pt-3 lg:flex-row lg:items-center'>
                <PaginationList
                  maxItemsShown={MAX_ITEMS_PER_PAGE}
                  label={translate("general.page")}
                  items={pages}
                  value={page}
                  onClick={(e) => setPage(e.id)}
                />
                {itemsShowingText}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

ResearchPublications.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}

ResearchPublications.defaultProps = {
  description: "",
}

export default ResearchPublications
