/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Checkbox from "../Checkbox"
import IconResolver from "../../IconResolver"
import RichText from "../../RichText"

const MultiSelect = ({
  title,
  items,
  isHidden,
  defaultOpen,
  availableFilters,
  setActiveFilters,
  activeFilters,
}) => {
  const [numTags, setTags] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [isOpen, setOpen] = useState(defaultOpen)

  useEffect(() => {
    let counter = 0
    items.forEach((item) => {
      if (activeFilters.includes(item.value)) {
        counter += 1
      }
    })

    setTags(counter)
  })

  useEffect(() => {
    if (numTags > 0) {
      setOpen(true)
    }
  }, [numTags])

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 992) {
      setHidden(true)
    }
  }, [hidden])

  return (
    !isHidden && (
      <div className='mb-2.5' data-cy='MultiSelect'>
        <div
          className='border-t-navy-02 hover:bg-navy-06/[0.05] flex flex-col border-t py-1 px-1.5'
          onClick={() => setOpen(!isOpen)}
          onKeyDown={() => setOpen(!isOpen)}
          role='checkbox'
          aria-checked={isOpen}
          tabIndex='0'
          aria-labelledby='chk1-label'
        >
          <div className='flex items-center justify-between'>
            <label htmlFor='title'>{title}</label>
            <div className='flex items-center'>
              {numTags > 0 && (
                <div className='flex h-3 w-3 items-center justify-center rounded-[12.5px] bg-white'>
                  <RichText className='text-navy-06 font-mono font-light'>
                    {numTags}
                  </RichText>
                </div>
              )}
              <IconResolver
                className={`ml-1 ${isOpen ? "rotate-180" : ""}`}
                token='arrowDown'
              />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className='flex flex-col pl-0.5'>
            {items.map(
              (item) =>
                availableFilters.includes(item.value) && (
                  <Checkbox
                    key={item.value}
                    item={item}
                    numTags={numTags}
                    setTags={setTags}
                    disabled={!availableFilters.includes(item.value)}
                    activeFilters={activeFilters}
                    setActiveFilters={setActiveFilters}
                  />
                )
            )}
          </div>
        )}
      </div>
    )
  )
}

const MultiSelectItems = PropTypes.shape({
  name: PropTypes.string,
  population: PropTypes.number,
})

MultiSelect.propTypes = {
  items: PropTypes.arrayOf(MultiSelectItems).isRequired,
  title: PropTypes.string.isRequired,
  isHidden: PropTypes.bool,
  setActiveFilters: PropTypes.func,
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  defaultOpen: PropTypes.bool,
}

MultiSelect.defaultProps = {
  isHidden: false,
  setActiveFilters: () => {},
  activeFilters: [],
  defaultOpen: false,
}

export default MultiSelect
