import React, { useState } from "react"
import PropTypes from "prop-types"
import SortOption from "../SortOption"
import IconResolver from "../IconResolver"

const SortSelect = ({ items, title, isHidden, activeSort, setActiveSort }) => {
  const [isActive, setActive] = useState(false)

  const handleClick = (value) => {
    setActiveSort(value)
  }

  return (
    !isHidden && (
      <div className='mb-2.5'>
        <div
          className='border-t-navy-02 hover:bg-navy-06/[0.05] flex flex-col border-t py-0.5 px-1.5'
          onClick={() => setActive(!isActive)}
          onKeyDown={() => setActive(!isActive)}
          role='checkbox'
          aria-checked={isActive}
          tabIndex='0'
          aria-labelledby='chk1-label'
        >
          <div className='flex items-center justify-between'>
            <label htmlFor='title'>{title}</label>
            <IconResolver
              className={`ml-1 ${isActive ? "rotate-180" : ""}`}
              token='arrowDown'
            />
          </div>
        </div>
        {isActive && (
          <div className='mt-1 flex flex-col pl-0.5'>
            {items.map((item) => (
              <SortOption
                key={item.value}
                option={item}
                isActive={activeSort === item.value}
                handleClick={() => handleClick(item.value)}
              />
            ))}
          </div>
        )}
      </div>
    )
  )
}

SortSelect.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string })).isRequired,
  title: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  activeSort: PropTypes.string,
  setActiveSort: PropTypes.func.isRequired,
}

SortSelect.defaultProps = {
  isHidden: false,
  activeSort: "ASC",
}

export default SortSelect
