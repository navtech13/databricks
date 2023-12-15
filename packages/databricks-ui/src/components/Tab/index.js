import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import { useBreakpoint } from "../../utils/use-breakpoint"

const Tab = ({ content, tabPosition }) => {
  const [selectedOption, setSelectedOption] = useState(content[0])
  const [maxHeight, setMaxHeight] = useState("unset")
  const tablistRef = useRef(null)
  const isDesktop = useBreakpoint("lg")

  useEffect(() => {
    // limit the tablist to 6 items
    if (isDesktop && content.length > 6 && tablistRef?.current) {
      setMaxHeight(
        Array.from(tablistRef.current.children)
          .slice(0, 6)
          .reduce((acc, child) => {
            return acc + child.offsetHeight
          }, 0)
      )
    }
    setMaxHeight("unset")
  }, [isDesktop, tablistRef, content])

  useEffect(() => {
    if (isDesktop && !selectedOption) {
      setSelectedOption(content[0])
    }
  }, [isDesktop, selectedOption])

  const position = tabPosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse"

  const shownElement = selectedOption && (
    <div
      data-cy='Tab'
      role='tabpanel'
      id={`panel-${selectedOption.label}`}
      aria-labelledby={`tab-${selectedOption.label}`}
      className='lg:shadow-card-normal tab-content-section bg-white lg:block lg:w-9/12'
    >
      {selectedOption?.value}
    </div>
  )

  return (
    <div className={`flex flex-col gap-2.5 ${position} lg:items-start lg:gap-4`}>
      {/* Tablist for higher viewports */}
      <div
        data-cy='tablist'
        role='tablist'
        ref={tablistRef}
        className='drop-shadow-card-normal scroll-bar flex flex-col gap-[1px] lg:w-3/12 lg:overflow-auto'
        style={{ maxHeight }}
      >
        {content.map((item) => {
          const active = item.label === selectedOption?.label
          return (
            <div key={item.label}>
              <button
                id={`tab-${item.label}`}
                role='tab'
                aria-controls={`panel-${item.label}`}
                aria-selected={active}
                type='button'
                className={`active:bg-navy-06 h4 flex w-full items-center justify-between p-2 text-left transition-all  active:text-white sm:p-3 ${
                  active
                    ? "bg-navy-06 text-white"
                    : "text-navy-06 hover:bg-gray-lines hover:text-navy-06 bg-white"
                }`}
                onClick={() => {
                  if (isDesktop) {
                    return setSelectedOption(item)
                  }
                  if (active) {
                    return setSelectedOption(null)
                  }
                  window.location.href = `#tab-${item.label}`
                  return setSelectedOption(item)
                }}
              >
                {item.label}
                <IconResolver
                  token={active ? "minus" : "plus"}
                  className='lg:hidden'
                />
              </button>
              {!isDesktop && active && shownElement}
            </div>
          )
        })}
      </div>
      {/* Selected Content */}
      {isDesktop && shownElement}
    </div>
  )
}

Tab.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.node,
    })
  ),
  tabPosition: PropTypes.oneOf(["left", "right"]),
}

Tab.defaultProps = {
  tabPosition: "left",
  content: [],
}

export default Tab
