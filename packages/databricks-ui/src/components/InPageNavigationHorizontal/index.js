import React, { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import { useLocation } from "@reach/router"
import TextButton from "../TextButton"
import StickyWrapper from "../StickyWrapper"
import sameTab from "../../utils/sameTab"
import smoothScrollEffect from "../../utils/smoothScrollEffect"

const InPageNavigationHorizontal = ({ links }) => {
  const location = useLocation()

  const [currentElement, setCurrent] = useState(null)
  const [currentPath, setCurrentPath] = useState()
  useEffect(() => setCurrentPath(location.pathname), [location])

  const extractAnchor = (url) => {
    if (!url) {
      return null
    }

    const anchorIndex = url.indexOf("#")
    const { origin } = window.location
    const newPath = url.replace(origin, "").replace(currentPath, "")

    if (url.startsWith("#")) {
      return url
    }
    if (url.includes(currentPath) && newPath.startsWith("#")) {
      return url.slice(anchorIndex)
    }

    return null
  }

  const memoizedLinks = useMemo(() => links, [links])

  // add autohighlight functionality
  smoothScrollEffect(memoizedLinks, setCurrent, null)

  const handleScrollClick = (event, path) => {
    const anchor = extractAnchor(path)
    const element = document.querySelector(anchor)
    if (element) {
      event.preventDefault()
      const offset = 100
      const y = element.getBoundingClientRect().top + window.scrollY - offset
      window.location.hash = anchor.split("-").pop()
      setTimeout(() => {
        window.scrollTo({ top: y, behavior: "smooth" })
      }, 50)
    }
  }

  return (
    <StickyWrapper
      as='nav'
      className='shadow-horizontal-inline-menu z-20 mb-2 w-full bg-white'
    >
      <ul className='inner-wrapper flex h-12'>
        {links.map(({ to, label }) => {
          const current =
            to?.replace(/\/$/, "") ===
            currentPath?.replace(/\/page\/\d+/, "").replace(/\/$/, "")

          const isInternal = sameTab(to)
          const isCurrentElement = currentElement === to?.replace(/#/, "")
          return (
            <li
              key={`${to}${label}`}
              className={`b3 relative ml-6 flex items-center border-y-[5px] border-white first:ml-0
              ${(current || isCurrentElement) && "border-b-orange-600"}
              `}
            >
              {current ? (
                <>
                  {label}
                  <div className='absolute bottom-0 h-0.5 w-full' />
                </>
              ) : (
                <TextButton
                  variant='A'
                  className={`text-navy-06 arrow-icon arrow-icon-hover after:text-gray-secondary hover:text-navy-06 py-1.5 hover:no-underline -mr-2.5${
                    isInternal ? "" : " arrow-icon-rotate-45"
                  }`}
                  onClick={(event) => handleScrollClick(event, to)}
                  to={to}
                >
                  {label}
                </TextButton>
              )}
            </li>
          )
        })}
      </ul>
    </StickyWrapper>
  )
}

InPageNavigationHorizontal.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
}

export default InPageNavigationHorizontal
