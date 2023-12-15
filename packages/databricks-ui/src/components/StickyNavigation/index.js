import React, { useEffect, useState, useRef, useContext } from "react"
import PropTypes from "prop-types"
import { useLocation } from "@reach/router"
import BaseLayoutContext from "../BaseLayout/BaseLayoutContext"
import Link from "../Link"

const StickyNavigation = ({
  items,
  colorVariant,
  cta,
  showBorder,
  sticky,
  className,
}) => {
  const { addNavTop, delNavTop, navHeight } = useContext(BaseLayoutContext)
  const location = useLocation()
  const [currentPath, setCurrentPath] = useState()
  const [isSticky, setIsSticky] = useState(false)

  const stickyRef = useRef(null)

  useEffect(() => setCurrentPath(location.pathname), [location])

  useEffect(() => {
    if (!addNavTop) {
      return false
    }
    addNavTop(stickyRef)
    return () => {
      delNavTop(stickyRef)
    }
  }, [stickyRef, addNavTop, delNavTop])

  useEffect(() => {
    if (!sticky) {
      return () => {}
    }
    // Make navigation sticky when it reaches the top of the viewport
    const handleScroll = () => {
      if (stickyRef.current.getBoundingClientRect().top < navHeight || 0) {
        return setIsSticky(true)
      }
      return setIsSticky(false)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sticky, navHeight])

  const colorMap = {
    white: {
      background: "bg-white",
      gradient: "from-white",
    },
    warmMedium: {
      background: "bg-gray-warm-medium",
      gradient: "from-gray-warm-medium",
    },
    warmLight: {
      background: "bg-gray-warm-light",
      gradient: "from-gray-warm-light",
    },
  }

  const currentVariant = colorMap[colorVariant] || colorMap.warmMedium
  return (
    <div className={className}>
      <div
        ref={stickyRef}
        {...(isSticky && {
          style: { height: stickyRef.current.nextElementSibling.offsetHeight },
        })}
      />
      <div
        data-cy='StickyNavigation'
        className={`${currentVariant.background} ${
          showBorder ? "border-gray-lines z-20 border-b duration-200" : ""
        } ${isSticky ? "fixed top-0" : ""}`}
        {...(isSticky && {
          style: {
            width: stickyRef.current.offsetWidth,
            top: navHeight > 0 ? navHeight : 0,
          },
        })}
      >
        <div className='md:inner-wrapper flex justify-between'>
          <div className='relative flex-1 overflow-hidden whitespace-nowrap'>
            <div
              className={`w-2 ${currentVariant.gradient} absolute right-0 h-full bg-gradient-to-l`}
            />
            <div
              className={`w-2 ${currentVariant.gradient} absolute left-0 h-full bg-gradient-to-r`}
            />
            <div className='scroll-bar-transparent flex gap-2 px-2 lg:gap-3'>
              {items?.map((item) => {
                const current =
                  item.to?.replace(/\/$/, "") ===
                  currentPath?.replace(/\/page\/\d+/, "").replace(/\/$/, "")
                return (
                  <Link
                    key={`${item.label}-${item.to}-${current}`}
                    className={
                      current
                        ? "text-navy-06 hover:text-navy-06 b4 border-orange-04 border-b-2 pt-1.5 pb-1 hover:no-underline"
                        : "b4 text-gray-text hover:text-orange-04 py-1.5 hover:no-underline"
                    }
                    to={item.to}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
          {cta?.label && (
            <Link
              className='btn-secondary-navy text-1.75 mr-2 self-center py-1 px-1 leading-[14px] hover:no-underline lg:px-1.5'
              to={cta.to}
            >
              {cta.label}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

StickyNavigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  cta: PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  colorVariant: PropTypes.oneOf(["white", "warmMedium", "warmLight"]),
  sticky: PropTypes.bool,
  showBorder: PropTypes.bool,
  className: PropTypes.string,
}

StickyNavigation.defaultProps = {
  className: "",
  colorVariant: "warmMedium",
  sticky: true,
  cta: undefined,
  showBorder: false,
}

export default StickyNavigation
