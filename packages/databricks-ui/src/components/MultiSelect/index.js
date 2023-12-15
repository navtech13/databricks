/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Checkbox from "../Checkbox"
import IconResolver from "../IconResolver"
import RichText from "../RichText"

const MultiSelect = ({
  title,
  items,
  isHidden,
  setHidden,
  activeFilters,
  setActiveFilters,
}) => {
  const [numTags, setTags] = useState(0)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    let counter = 0
    // eslint-disable-next-line array-callback-return
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
  }, [])

  return (
    !isHidden && (
      <div className='mb-2.5'>
        <div
          className='border-t-navy-02 hover:bg-navy-06/[0.05] flex flex-col border-t py-0.5 px-1.5'
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
            {items.map((item) => (
              <Checkbox
                key={item.value}
                item={item}
                numTags={numTags}
                setTags={setTags}
                activeFilters={activeFilters}
                setActiveFilters={setActiveFilters}
              />
            ))}
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
  setHidden: PropTypes.func,
  activeFilters: PropTypes.arrayOf(PropTypes.string),
  setActiveFilters: PropTypes.func,
}

MultiSelect.defaultProps = {
  isHidden: false,
  activeFilters: [],
  setActiveFilters: "",
  setHidden: "",
}

export default MultiSelect
