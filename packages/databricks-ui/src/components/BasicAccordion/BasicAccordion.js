import React, { useState } from "react"
import PropTypes from "prop-types"
import AccordionItem from "./AccordionItem"

const BasicAccordion = ({
  accordions,
  variant,
  allowAllOpen,
  showExpandAll,
  expandAllLabel,
  closeAllLabel,
  itemsDisplay,
  parseToHtml,
}) => {
  let initialIndex = []
  if (itemsDisplay === "all") {
    initialIndex = accordions?.map((_, i) => i) || []
  }
  if (itemsDisplay === "first") {
    initialIndex = accordions?.length ? [0] : []
  }
  const [index, setIndex] = useState(initialIndex)
  const [canExpandAll, setCanExpandAll] = useState(itemsDisplay !== "all")
  const accordionIndexes = accordions?.map((item, i) => i)

  const checkCanExpand = (arr) => {
    if (arr.sort().join(",") === accordionIndexes.sort().join(",")) {
      return setCanExpandAll(false)
    }
    return setCanExpandAll(true)
  }

  const handleClick = (value, allowAllOpenVar) => {
    if (value === "closeAll") {
      setCanExpandAll(true)
      return setIndex([])
    }

    if (value === "expandAll") {
      setCanExpandAll(false)
      return setIndex(accordionIndexes)
    }

    if (index.includes(value)) {
      if (!allowAllOpenVar) {
        return setIndex([])
      }
      const arr = index.filter((item) => item !== value)
      checkCanExpand(arr)
      return setIndex(arr)
    }

    if (!allowAllOpenVar) {
      return setIndex([value])
    }
    const arr = [...index, value]
    checkCanExpand(arr)
    return setIndex(arr)
  }
  return (
    <div>
      {showExpandAll && allowAllOpen && (
        <div className='w-full text-right'>
          <button
            type='button'
            className='b5 py-2 text-blue-700'
            onClick={() => {
              handleClick(canExpandAll ? "expandAll" : "closeAll", allowAllOpen)
            }}
          >
            {canExpandAll ? expandAllLabel : closeAllLabel}
          </button>
        </div>
      )}

      {accordions?.length &&
        accordions.map((accordion, i) => {
          return (
            <div
              data-cy='BasicAccordion'
              key={accordion.key || accordion.description}
              className='mb-0.5 last:mb-0'
            >
              <AccordionItem
                variant={variant}
                isOpen={index?.includes(i)}
                handleClick={() => handleClick(i, allowAllOpen)}
                parseToHtml={parseToHtml}
                {...accordion}
              />
            </div>
          )
        })}
    </div>
  )
}

BasicAccordion.propTypes = {
  accordions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  variant: PropTypes.oneOf(["default", "large"]),
  allowAllOpen: PropTypes.bool,
  showExpandAll: PropTypes.bool,
  expandAllLabel: PropTypes.string,
  closeAllLabel: PropTypes.string,
  itemsDisplay: PropTypes.string,
  parseToHtml: PropTypes.bool,
}

BasicAccordion.defaultProps = {
  variant: "default",
  allowAllOpen: false,
  showExpandAll: false,
  expandAllLabel: "Expand All",
  closeAllLabel: "Close All",
  itemsDisplay: null,
  parseToHtml: false,
}

export default BasicAccordion
