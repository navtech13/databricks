import React, { useState } from "react"
import PropTypes from "prop-types"
import SearchBar from "../Child/SearchBar/SearchBar"
import SearchResults from "../Child/SearchResults/SearchResults"
import Closeimg from "../../../../../../../assets/global/images/Close btn.svg"
import Image from "../../../Image"

function SearchParent({ CloseSearch }) {
  const [SearchResultsArr, setSearchResultsArr] = useState(null)
  const [SearchInput, setSearchInput] = useState("")
  const [ToggleSearch, setToggleSearch] = useState(false)

  return (
    <section>
      <section
        className='xxl:max-w-[1456px] fixed top-[20%] left-1/2 z-[100] flex w-11/12 max-w-[508px] -translate-x-1/2 flex-col items-start bg-white p-2 lg:top-1/2 lg:ml-[5%] lg:max-w-[966px] lg:-translate-y-full lg:p-3 xl:max-w-[1146px]'
        data-cy='SearchParent'
      >
        <Image
          className='absolute right-0 -mt-6 h-4 w-4 cursor-pointer'
          src={Closeimg}
          alt=''
          onClick={CloseSearch}
        />
        <SearchBar
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
      <div className='bg-almost-black fixed z-50 h-full w-full opacity-60' />
      <style>{`
      body{
        overflow-x:hidden;
        overflow-y:hidden;
      }
      `}</style>
    </section>
  )
}

SearchParent.propTypes = {
  CloseSearch: PropTypes.func.isRequired,
}

export default SearchParent
