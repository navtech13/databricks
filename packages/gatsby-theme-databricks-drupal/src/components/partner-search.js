import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import {
  CardLogoGrid,
  SelectCheckbox,
  GeneralSearchBar,
  LoadingSpinner,
  ClearFilters,
} from "databricks-ui"
import { useLanguageContext } from "./language-provider"
import useTranslate from "../utils/translate"
import resolveImage from "../utils/resolve-image"

const ITEMS_PER_LOAD = 36

const PartnerSearch = ({ title, partnerType, filterField }) => {
  const { translate } = useTranslate()
  const ALLOWED_FILTERS = [
    { value: "fieldRegions", label: translate("partners.filters.region") },
    { value: "fieldUseCase", label: translate("partners.filters.use-cases") },
  ]
  const { currentLanguage } = useLanguageContext()
  const [partnersAmount, setPartnersAmount] = useState(ITEMS_PER_LOAD)
  const [partners, setPartners] = useState([])
  const [filterType, setFilterType] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [searchInput, setSearchInput] = useState("")
  const partnersRef = useRef()
  const filterTypeRef = useRef({})

  const filterCards = (cards, filters, searchValue) => {
    const filteredCards = cards?.filter((item) => {
      if (filters.length) {
        const containsTitle = item.title.toLowerCase().includes(searchValue)
        let containsFilter = false
        item[filterField]?.forEach((filterItem) => {
          if (filters?.includes(filterItem.entity?.name)) {
            containsFilter = true
          }
        })
        return containsTitle && containsFilter
      }
      return item.title.toLowerCase().includes(searchValue)
    })
    return filteredCards
  }

  const handleSubmit = (event, filterTypeData = filterType) => {
    const formattedFilter = filterTypeData.map((item) => item.value)
    const search = searchInput.toLowerCase()
    const filteredCards = filterCards(partnersRef?.current, formattedFilter, search)
    setPartners(filteredCards)
  }

  const handleFilterChange = (value) => {
    setFilterType(value)
    handleSubmit(null, value)
  }

  const handleLoadMore = () => {
    const itemsAmount = partnersAmount + ITEMS_PER_LOAD
    setPartnersAmount(itemsAmount)
  }

  const handleReset = () => {
    setPartners(partnersRef.current)
    setFilterType([])
    setSearchInput("")
  }

  const partnerTypeName = partnerType.length
    ? partnerType[0].entity.name
        .split("/")
        .join("slash")
        .split(" ")
        .join("-")
        .toLowerCase()
    : false

  useEffect(() => {
    if (currentLanguage?.id) {
      const fetchUrl = `/data/partner/${partnerTypeName}/${currentLanguage.id.toLowerCase()}.json`
      fetch(fetchUrl)
        .then((response) => response.json())
        .then((data) => {
          const filterData = []
          const regularPartners = []
          const featuredPartners = []
          // Sort Alpha
          data.sort((a, b) =>
            a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
          )
          let selectLabel = translate("form.select")
          const addTaxonomyToFilter = (item) => {
            if (!filterData.includes(item.entity?.name)) {
              filterData.push(item.entity?.name)
            }
          }
          if (data && typeof data.forEach !== "undefined") {
            data.forEach((item) => {
              ALLOWED_FILTERS.forEach((filterItem) => {
                if (filterField !== filterItem.value) {
                  return false
                }
                selectLabel = filterItem.label
                item[filterField]?.forEach((itemValue) => {
                  addTaxonomyToFilter(itemValue)
                })
                return true
              })

              const itemData = {
                id: item.id,
                image: item.fieldMedia?.entity && resolveImage(item.fieldMedia),
                cta: {
                  text: item.fieldUrl?.title,
                  to: item.fieldUrl?.url?.path,
                },
                fieldRegions: item.fieldRegions,
                fieldUseCase: item.fieldUseCase,
                title: item.title,
                tooltipContent: item.body?.viewModeFieldFormatter,
                tooltipCta: {
                  text: item.fieldUrl?.title,
                  to: item.fieldUrl?.url?.path,
                },
              }
              if (item.fieldFeatured) {
                return featuredPartners.push(itemData)
              }
              return regularPartners.push(itemData)
            })
          }

          partnersRef.current = [...featuredPartners, ...regularPartners]
          const formatterFilterData = filterData.map((item) => {
            return {
              value: item,
              label: item?.split("&amp;").join("&"),
            }
          })
          filterTypeRef.current.data = formatterFilterData
          filterTypeRef.current.label = selectLabel
          setLoaded(true)
          setPartners(partnersRef.current)
        })
    }
  }, [currentLanguage])

  if (!partnersRef?.current?.length && !loaded) {
    return (
      <div className='h-[1000px]'>
        <LoadingSpinner className='rounded-md p-1' />
      </div>
    )
  }

  return (
    <div className='flex flex-col'>
      {title && <h2 className='mb-8'>{title}</h2>}
      <div className='mb-10 flex flex-col-reverse gap-1 md:flex-row md:gap-4'>
        <div className='md:w-6/12'>
          <SelectCheckbox
            options={filterTypeRef.current.data}
            label={filterTypeRef.current.label}
            onChange={handleFilterChange}
            value={filterType}
          />
        </div>
        <div className='md:w-6/12'>
          <GeneralSearchBar
            onEnter={handleSubmit}
            setSearchTerms={setSearchInput}
            value={searchInput}
            inputClassName='border-b'
          />
        </div>
      </div>
      {partners.length > 0 ? (
        <CardLogoGrid
          buttonOnClick={handleLoadMore}
          items={partners.slice(0, partnersAmount)}
          buttonLabel={
            partnersRef?.current?.length > partnersAmount &&
            translate("partners.load-more")
          }
        />
      ) : (
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
    </div>
  )
}

PartnerSearch.propTypes = {
  partnerType: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string,
  filterField: PropTypes.oneOf(["fieldRegions", "fieldUseCase"]),
}

PartnerSearch.defaultProps = {
  title: undefined,
  filterField: "fieldRegions",
}

export default PartnerSearch
