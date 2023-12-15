import React, { useContext } from "react"
import SearchContext from "../SearchContext/SearchContext"

function PopularSearch() {
  const { UpdateParentValue } = useContext(SearchContext)
  const DummyData = [
    "Try Databricks for free",
    "The Databricks Lakehouse Platform",
    "Data and AI Summit 2022 - Databricks",
    "World Tour 2022 Homepage - Data + AI Summit 2022",
    "Data and AI Summit 2022 - Databricks",
    "World Tour 2022 Homepage - Data + AI Summit 2022",
  ]
  const PopularSearchMap = DummyData.map((data) => {
    return (
      <div
        key={data}
        role='button'
        className='bg-gray-warm-light order-none mb-1 flex max-w-max flex-none cursor-pointer flex-row items-start gap-2.5 rounded-[4px] py-0.5 px-1'
        data-cy='PopularSearch'
        onClick={() => UpdateParentValue(data)}
        onKeyDown={() => UpdateParentValue(data)}
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        tabIndex={0}
      >
        <li className='order-none flex  items-center text-base font-normal not-italic leading-6 '>
          {data}
        </li>
      </div>
    )
  })
  return (
    <section className='pt-6 md:p-4 md:pt-0'>
      <h1 className='text-2.5 order-none -mt-1 flex h-4 w-40 flex-none items-center text-xl font-normal not-italic leading-7'>
        Popular Searches
      </h1>
      <ul className='mt-2.5'>{PopularSearchMap}</ul>
    </section>
  )
}

export default PopularSearch
