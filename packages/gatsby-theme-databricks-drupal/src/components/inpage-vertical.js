import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from "react"
import PropTypes from "prop-types"
import { InPageNavigationVertical, InPageMobileMenu } from "databricks-ui"
import { useBreakpoint } from "databricks-ui/src/utils/use-breakpoint"
import StickyWrapper from "databricks-ui/src/components/StickyWrapper"
import { componentResolver } from "../utils/component-resolver"
import smoothScrollEffect from "../../../databricks-ui/src/utils/smoothScrollEffect"

const resolveLinks = (items = []) => {
  return items.map(({ entity }) => {
    const link = {
      label: entity.fieldLink.title,
      to: entity.fieldLink.url.path,
    }

    if (entity.fieldItems) {
      link.links = resolveLinks(entity.fieldItems)
    }
    return link
  })
}

const InPageVertical = ({ entity: { fieldItems, fieldItem }, pageContext }) => {
  const [current, setCurrent] = useState(null)
  const isDesktop = useBreakpoint("lg", true)
  const containerRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useLayoutEffect(() => {
    setIsLoaded(true)
  }, [])

  // memoized children elements
  const childrenItems = useMemo(
    () => componentResolver(fieldItems, pageContext),
    [fieldItems]
  )

  // calculate link and ids arrays
  const menu =
    fieldItem?.entity?.fieldReusableParagraph?.entity?.paragraphs?.entity ||
    fieldItem?.entity

  const links = useMemo(() => resolveLinks(menu?.fieldItems), [menu])

  // add autohighlight functionality
  smoothScrollEffect(links, setCurrent, menu)

  const verticalElement = (
    <InPageNavigationVertical
      skipToMain
      skipLink={`#${menu?.uuid}`}
      current={current && `#${current}`}
      links={links}
    />
  )
  if (!menu) {
    return <>{childrenItems}</>
  }

  return (
    <div className='in-page-vertical lg:flex'>
      <div
        ref={containerRef}
        className='w-[262px] flex-shrink-0 lg:relative lg:mr-4'
      >
        <InPageMobileMenu>
          {isDesktop ? (
            <StickyWrapper offsetTop={30} containerRef={containerRef}>
              {isLoaded && verticalElement}
            </StickyWrapper>
          ) : (
            isLoaded && verticalElement
          )}
        </InPageMobileMenu>
      </div>
      <div id={`${menu?.uuid}`} className='flex-1 lg:max-w-[calc(100%-262px)]'>
        {childrenItems}
      </div>
    </div>
  )
}

InPageVertical.propTypes = {
  entity: PropTypes.shape({
    fieldItems: PropTypes.arrayOf(PropTypes.shape({})),
    fieldItem: PropTypes.shape({
      entity: PropTypes.shape({
        fieldReusableParagraph: PropTypes.shape({
          entity: PropTypes.shape({
            paragraphs: PropTypes.shape({
              entity: PropTypes.shape({
                fieldItems: PropTypes.arrayOf(PropTypes.shape({})),
              }),
            }),
          }),
        }),
      }),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({}).isRequired,
}

export default InPageVertical
