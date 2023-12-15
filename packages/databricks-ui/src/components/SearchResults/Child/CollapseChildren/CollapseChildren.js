import PropTypes from "prop-types"
import React, { useState, useContext, useEffect } from "react"
import CollapseImage from "../../../../../../../assets/global/images/carot container.svg"
import SearchContext from "../SearchContext/SearchContext"

function CollapseChildren({ data }) {
  const { AddFilters, search_string, Filters } = useContext(SearchContext)
  const [Collapsed, setCollapsed] = useState(false)
  const ToggleCollapse = () => setCollapsed((e) => !e)

  useEffect(() => {
    setCollapsed(false)
  }, [search_string])

  // Hide dropdown and label if we don't have any facets
  if (data.label !== "" && data.values.length > 0) {
    return (
      <li key={data.label}>
        <div className='border-navy-01 flex border-t border-solid pb-2'>
          <h4 className='text-2 order-none flex w-56 flex-shrink-0 flex-grow items-center p-1 pt-1 font-normal leading-6'>
            {data.label}
          </h4>
          <img
            src={CollapseImage}
            alt=''
            onClick={ToggleCollapse}
            className='mr-1.5 w-1.5 cursor-pointer'
            style={{ transform: `rotate(${Collapsed ? "0" : "180"}deg)` }}
          />
        </div>
        {Collapsed && (
          <>
            {data.values.map((obj) => (
              <div
                key={obj.displayName ? obj.displayName : obj.Contentname}
                className='filter_checkbox_child relative flex w-full cursor-pointer px-2.5 pt-0 pb-2.5'
              >
                <input
                  type='checkbox'
                  className='cursor-pointer'
                  name='aggregation_checkbox'
                  id=''
                  onClick={(e) => AddFilters({ ...obj, ...{ key: data } })}
                  style={{ accentColor: "#00a972" }}
                  // checked={
                  //   !!(
                  //     Filters.length > 0 &&
                  //     Filters.filter(
                  //       ({ type, filter }) =>
                  //         type === obj.immediateParent &&
                  //         filter.includes(obj.Contentname)
                  //     ).length !== 0
                  //   )
                  // }
                />
                <label
                  htmlFor='aggregation_checkbox'
                  className=' text-1.5 cursor-pointer pl-1 text-xs'
                >
                  {obj.displayName ? obj.displayName : obj.Contentname}
                </label>
                <p className='text-1.5 absolute  right-1.5 cursor-pointer text-xs'>
                  {obj.value}
                </p>
              </div>
            ))}
          </>
        )}
      </li>
    )
  }
  return null
}

CollapseChildren.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
    values: PropTypes.shape({
      length: PropTypes.number,
    }),
  }).isRequired,
}

export default CollapseChildren
