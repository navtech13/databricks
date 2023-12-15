import React, { useEffect, useMemo, useRef, useState } from "react"
import PropTypes from "prop-types"
import useTranslate from "../../../../gatsby-theme-databricks-drupal/src/utils/translate"
import observeElements from "../../utils/observeElements"
import StickyWrapper from "../StickyWrapper"
import TabItem from "./TabItem"

const VerticalTabs = ({ items, prefix }) => {
  const { translate } = useTranslate()
  const [currentIndicator, setCurrentIndicator] = useState(0)
  const containerRef = useRef()

  const indicators = useMemo(() => {
    return Array.from({ length: items?.length }, (_, index) => {
      return (
        <a
          aria-label={`${translate("index")} ${index}`}
          key={`${index}`}
          href={`#${prefix}-${index}`}
          className={`${
            currentIndicator === index ? "bg-green-600" : "bg-oat-medium"
          } mb-0.25 block h-8 w-1.5 transition-all duration-200`}
        >
          <span className='sr-only'>{`${translate("index")} ${index}`}</span>
        </a>
      )
    })
  }, [currentIndicator, prefix, items?.length])

  useEffect(() => {
    const ids = Array.from({ length: items?.length }, (_, i) => `#${prefix}-${i}`)
    const cleanup = observeElements(
      ids,
      (elementId) => {
        setCurrentIndicator(Number.parseInt(elementId.split("-")[1], 10))
      },
      { threshold: [0, 1], rootMargin: "-0px", topGap: 200 }
    )
    return cleanup
  }, [setCurrentIndicator, prefix, items?.length])

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => document.documentElement.style.removeProperty("scrollBehavior")
  })

  return (
    <div ref={containerRef} className='relative flex'>
      <StickyWrapper containerRef={containerRef}>{indicators}</StickyWrapper>
      <div className='flex-1 pl-5'>
        {items?.map(({ title, subtitle, mediaWidth, ...item }, i) => {
          return (
            <>
              {i !== 0 && (
                <hr className='text-gray-lines mt-6 pt-6 md:mt-8 md:pt-8' />
              )}
              <TabItem
                key={`${title}${subtitle}`}
                id={`${prefix}-${i}`}
                title={title}
                subtitle={subtitle}
                mediaWidth={mediaWidth || "12"}
                {...item}
              />
            </>
          )
        })}
      </div>
    </div>
  )
}

VerticalTabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  prefix: PropTypes.string,
}

VerticalTabs.defaultProps = {
  prefix: "",
}

export default VerticalTabs
