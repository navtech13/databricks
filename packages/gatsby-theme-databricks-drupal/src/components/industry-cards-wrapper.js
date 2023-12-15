import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  SearchBar,
  FilterToggle,
  MultiSelect,
  IndustryCards,
  ClearFilters,
} from "databricks-ui"
import generateTags from "../helpers/generateTags"

const IndustryCardsWrapper = ({ cards }) => {
  const [isHidden, setHidden] = useState()
  const [activeFilters, setActiveFilters] = useState([])
  const [searchTerms, setSearchTerms] = useState("")
  const industryTags = generateTags(cards)

  const handleReset = () => {
    setSearchTerms("")
    document.querySelector("input.Search").value = ""
    setActiveFilters([])
  }

  return (
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
        <MultiSelect
          items={industryTags}
          title='Industry'
          isHidden={isHidden}
          setHidden={setHidden}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        {activeFilters.length > 0 && (
          <ClearFilters handleReset={handleReset}>clear all</ClearFilters>
        )}
      </div>
      <div className='flex w-full flex-wrap content-start lg:w-2/3'>
        <IndustryCards
          items={cards}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          searchTerms={searchTerms}
          activeSort=''
          handleReset={handleReset}
        />
      </div>
    </div>
  )
}

IndustryCardsWrapper.propTypes = {
  cards: PropTypes.array.isRequired,
}

export default IndustryCardsWrapper
