import React, { useContext } from "react"
import CollapseChildren from "../CollapseChildren/CollapseChildren"
import SearchContext from "../SearchContext/SearchContext"

function CollapseList() {
  const { MainData } = useContext(SearchContext)

  return (
    <>
      <ul className='search_detail_page_ul' key={MainData}>
        {MainData.aggregationsArray &&
          MainData.aggregationsArray.map((filterObj) => {
            if (
              filterObj.key === "category" ||
              filterObj.key === "_type"
            )
              return <CollapseChildren key={filterObj.key} data={filterObj} />
          })}
      </ul>
      <br />
    </>
  )
}

export default CollapseList
