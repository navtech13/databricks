import React, { useState } from "react"
import BottomAlignedSubParent from "../Child/BottomAlignedSubParent/BottomAlignedSubParent"
import LeftAlignedSubParent from "../Child/LeftAlignedSubParent/LeftAlignedSubParent"
import RightAlignedSubParent from "../Child/RightAlignedSubParent/RightAlignedSubParent"
import TopSubParent from "../Child/TopSubParent/TopSubParent"
import SearchContext from "../Child/SearchContext/SearchContext"
import SearchAlgo from "../Functions/SearchAlgorithm/SearchAlgo"

function ResultParent() {
  const [Searched, setSearched] = useState(false)
  const [NoResults, setNoResults] = useState(false)
  const [Results, setResults] = useState(false)
  const [MainSearchResultData, setMainSearchResultData] = useState({
    result: { hits: [] },
  })
  const [SearchString, setSearchString] = useState("")
  const [Filters, setFilters] = useState([])

  const EnableFilters = (filter, status) => {
    let arr = Filters
    class FilterObj {
      constructor(key, values) {
        ;(this.type = key), (this.filter = values)
      }
    }
    const obj_filter = Filters.filter((data) => data.type == filter.key.key)
    if (obj_filter.length == 0) {
      const new_obj = new FilterObj(filter.key.key, [filter.Contentname])
      arr.push(new_obj)
    } else {
      const new_obj = obj_filter[0]
      const key_filtered = new_obj.filter.filter((e) => e == filter.Contentname)
      if (key_filtered.length == 0)
        new_obj.filter = [filter.Contentname, ...new_obj.filter]
      else if (new_obj.filter.length == 1)
        arr = arr.filter((data) => data.type != filter.key.key)
      else new_obj.filter = new_obj.filter.filter((e) => e != filter.Contentname)
    }
    SearchAlgo(SearchString, 1, 15, arr)
      .then((results) => {
        setMainSearchResultData(results)
      })
      .catch((err) => {
        console.log(err)
      })
    setFilters(arr)
  }

  const UpdateParentValue = (search) => {
    SearchAlgo(search, 1, 15)
      .then((results) => {
        setMainSearchResultData(results)
        setResults(true)
        setSearched(true)
      })
      .then(() => {
        setSearchString(search)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const ContextProperty = {
    UpdateMainNavigation: (data) => setMainSearchResultData(data),
    MainData: MainSearchResultData,
    AddFilters: EnableFilters,
    search_string: SearchString,
    UpdateParentValue,
    Filters,
  }

  return (
    <SearchContext.Provider value={ContextProperty}>
      <section className='bg-gray-warm-medium' data-cy='ResultParent'>
        <div className='xxl:max-w-[1456px] mx-auto w-11/12 py-8 sm:px-4 lg:max-w-[966px] lg:px-0 lg:pb-10 lg:pt-8 xl:max-w-[1146px]'>
          <TopSubParent
            key={MainSearchResultData}
            searchedBool={Searched}
            ResLen={MainSearchResultData.result.total}
            UpdateSearchString={(string) => setSearchString(string)}
            UpdateSearchResults={(results) => {
              setMainSearchResultData(results)
              setResults(true)
              setSearched(true)
              setNoResults(false)
            }}
            SearchResultNull={(result) => {
              setNoResults(true)
              setSearched(true)
              setResults(false)
              setMainSearchResultData(result)
            }}
            SearchBlank={() => {
              setSearched(false)
              setNoResults(false)
              setResults(false)
              setMainSearchResultData({ result: { hits: [] } })
            }}
          />
          <div className='flex flex-col md:flex-row'>
            <LeftAlignedSubParent searchedBool={Searched} />
            <RightAlignedSubParent
              searchedBool={Searched}
              stringSearched={SearchString}
              Filter={Filters}
              UpdateSearchResults={(results) => {
                setMainSearchResultData(results)
                setResults(true)
                setSearched(true)
                setNoResults(false)
              }}
              resultsBool={Results}
              NilResultsBool={NoResults}
              ResultsData={MainSearchResultData}
            />
          </div>
          {!Searched && <BottomAlignedSubParent />}
          {Searched && NoResults && <BottomAlignedSubParent />}
        </div>
      </section>
    </SearchContext.Provider>
  )
}

export default ResultParent
