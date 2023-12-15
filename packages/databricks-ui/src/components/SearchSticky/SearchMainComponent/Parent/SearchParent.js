import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import SearchBar from "../Child/SearchBar/SearchBar"
import SearchResults from "../Child/SearchResults/SearchResults"

function SearchParent({ variant, CloseSearch }) {
  const [SearchResultsArr, setSearchResultsArr] = useState(null)
  const [SearchInput, setSearchInput] = useState("")
  const [ToggleSearch, setToggleSearch] = useState(false)
  const navbarRef = useRef()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        CloseSearch()
      }
    }
    if (typeof window !== "undefined") {
      window.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [])

  const variantMap = {
    default: {
      wrapperStyles: "",
      innerWrapperStyles: "",
      background: true,
    },
    top: {
      wrapperStyles: "",
      innerWrapperStyles: "",
      background: false,
    },
  }
  const currentVariant = variantMap[variant] || variantMap.default
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <section
      ref={navbarRef}
      className='shadow-shadow-2-no-top fixed z-[1] hidden w-full bg-white xl:block'
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          navbarRef.current.previousElementSibling.focus()
          CloseSearch()
        }
      }}
      style={{ top: 62, left: 0 }}
    >
      <section
        className={`lg:inner-wrapper pl-3.2 border-grey-500 relative my-5 flex flex-col items-start border bg-white py-2 pr-2 ${currentVariant.innerWrapperStyles}`}
        data-cy='SearchParent'
      >
        <SearchBar
          CloseSearch={CloseSearch}
          ModifyResults={(results) => {
            setSearchResultsArr(results)
            if (results.length !== 0) setToggleSearch(true)
            else setToggleSearch(false)
          }}
          ModifySearch={(string) => setSearchInput(string)}
        />
        {ToggleSearch && (
          <SearchResults
            key={SearchResultsArr}
            searchResults={SearchResultsArr}
            Search={SearchInput}
          />
        )}
      </section>
      {currentVariant.showbackground && (
        <div className='bg-almost-black fixed z-50 h-full w-full opacity-60' />
      )}
    </section>
  )
}

SearchParent.propTypes = {
  variant: PropTypes.string,
  CloseSearch: PropTypes.func,
}
SearchParent.defaultProps = {
  variant: undefined,
  CloseSearch: undefined,
}

export default SearchParent
