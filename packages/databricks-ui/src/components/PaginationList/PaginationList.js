import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"

const PaginationList = ({
  label,
  items,
  maxItemsShown,
  onClick,
  value,
  ...props
}) => {
  const [paginationItems, setPaginationItems] = useState(
    items.slice(0, maxItemsShown)
  )
  const [activeId, setActiveId] = useState(1)
  const lastItemId = items[items.length - 1].id
  const lastPaginationItemId = paginationItems[paginationItems.length - 1].id
  const showEllipse =
    items.length > maxItemsShown && lastPaginationItemId + 1 !== lastItemId
  const lowerRange = Math.ceil(maxItemsShown / 2)

  const handleClick = (e) => {
    if (activeId !== e.id) {
      const topElement = document
        .querySelector('[data-cy="Pagination"]')
        .closest('div[data-cy="Wrapper"], section')
      topElement?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
    const shouldCenterUp =
      showEllipse && e.id > lowerRange && items[e.id - lowerRange]
    const shouldCenterDown = e.i < lowerRange

    // Logic for handling increment
    if (shouldCenterUp) {
      const showAllRemaining = e.id - lowerRange + maxItemsShown >= items.length
      const upperCut = showAllRemaining
        ? items.length
        : e.id - lowerRange + maxItemsShown
      let lowerCut = showAllRemaining
        ? upperCut - maxItemsShown - 1
        : e.id - lowerRange
      if (lowerCut < 0) {
        lowerCut = 0
      }
      const arr = items.slice(lowerCut, upperCut)

      // Handle last item separately
      if (arr[arr.length - 1].id === lastItemId) {
        arr.pop()
      }

      setPaginationItems(arr)
      setActiveId(e.id)
      return onClick(e)
    }

    // Logic for handling decrement
    if (shouldCenterDown) {
      const lowerCut = e.id - lowerRange >= 0 ? e.id - lowerRange : 0
      const upperCut = lowerCut + maxItemsShown
      const arr = items.slice(lowerCut, upperCut)
      setPaginationItems(arr)
      setActiveId(e.id)
      return onClick(e)
    }

    setActiveId(e.id)
    return onClick(e)
  }

  useEffect(() => {
    setPaginationItems(items.slice(0, maxItemsShown))
    handleClick(items[0])
  }, [items.length])

  useEffect(() => {
    setActiveId(value)
  }, [value])

  return (
    <div className='flex items-center gap-1.5' {...props} data-cy='Pagination'>
      <span className='h6 font-bold'>{label}</span>
      <ul className='flex items-center gap-0.5'>
        {paginationItems.map((item, i) => {
          // Handle Last item separately
          const isLastItem = item.id === lastItemId && items.length > 1
          if (isLastItem) {
            return <></>
          }
          return (
            <li key={item.id}>
              <button
                className={`text-1.5 py-1 px-1.5 font-mono ${
                  item.id === activeId
                    ? "bg-navy-06  text-white"
                    : "hover:bg-navy-06 bg-white hover:text-white"
                }`}
                type='button'
                onClick={() => handleClick({ label: item.label, id: item.id, i })}
              >
                {item.label}
              </button>
            </li>
          )
        })}
        {/* Last Item will always show up if length > 2 and will be handled separately */}
        {items.length >= 2 && (
          <>
            {showEllipse && <IconResolver aria-hidden token='ellipses' />}
            <li>
              <button
                className={`text-1.5 py-1 px-1.5 font-mono ${
                  lastItemId === activeId
                    ? "bg-navy-06  text-white"
                    : "hover:bg-navy-06 bg-white hover:text-white"
                }`}
                type='button'
                onClick={() => {
                  const lowerCut =
                    items.length - maxItemsShown - 1 < 0
                      ? 0
                      : items.length - maxItemsShown - 1
                  setPaginationItems(items.slice(lowerCut, items.length - 1))
                  setActiveId(lastItemId)
                  return onClick({
                    label: items[items.length - 1].label,
                    id: lastItemId,
                    i: maxItemsShown,
                  })
                }}
              >
                {items[items.length - 1].label}
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

PaginationList.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  maxItemsShown: PropTypes.number,
  onClick: PropTypes.func,
  value: PropTypes.number,
}

PaginationList.defaultProps = {
  label: "Page",
  maxItemsShown: 6,
  onClick: () => {},
  value: 1,
}

export default PaginationList
