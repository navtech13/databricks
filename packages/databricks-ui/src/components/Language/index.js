/* eslint-disable no-param-reassign */
import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import Icon from "../IconResolver"
import Link from "../Link"

const Language = ({ text, className, items, onClick, ...props }) => {
  const wrapperRef = useRef(null)
  const [active, setActive] = useState(false)

  const handleClick = (event) => {
    if (!wrapperRef.current || wrapperRef.current.contains(event.target)) {
      return
    }
    setActive(false)
  }

  useEffect(() => {
    document.addEventListener("mouseup", handleClick)
    return () => {
      document.removeEventListener("mouseup", handleClick)
    }
  }, [wrapperRef])

  return (
    <div ref={wrapperRef} className={`relative ${className}`} {...props}>
      <button
        onClick={() => setActive(!active)}
        className='text-1.75 flex w-20 items-center justify-around border border-white py-1 px-2 text-white'
        type='button'
        aria-haspopup
        aria-controls={text}
        aria-expanded={active}
      >
        <Icon aria-hidden token='geospatial' />
        {text}
        <Icon aria-hidden token='arrowUp' />
      </button>
      <ul
        data-cy='Language'
        ref={wrapperRef}
        id={text}
        className={`bg-gray-warm-light shadow-card-normal w-25 absolute bottom-8 left-1/2 z-[25] -translate-x-1/2 flex-col p-2.5 after:absolute after:top-full after:left-1/2 after:-ml-2 after:h-0 after:w-0 after:content-[""] after:[border-top:solid_9px_#F9F7F4] after:[border-right:solid_15px_transparent] after:[border-left:solid_15px_transparent] ${
          active ? "block" : "hidden"
        }`}
      >
        {items?.map(({ label, to, id }) => {
          // Skip these languages for now
          if (to === "pt-br") return false
          if (to === "zh-cn") return false
          if (to === "zh-hk") return false
          if (to === "zh-tw") return false
          if (to === "es-es") return false
          if (to === "es-mx") return false
          // map drupal language selector to DB preferred names for languages
          switch (label) {
            case "English":
              label = "English (United States)"
              break
            case "German":
              label = "Deutsch (Germany)"
              break
            case "French":
              label = "Français (France)"
              break
            case "Italian":
              label = "Italiano (Italy)"
              break
            case "Japanese":
              label = "日本語 (Japan)"
              break
            case "Korean":
              label = "한국어 (South Korea)"
              break
            case "Portuguese (Brazil)":
              label = "Português (Brazil)"
              break
            default:
              label = "English (United States)"
              break
          }

          return (
            <li key={to} className='text-1.75 mb-1' data-cy='Language-item'>
              <Link
                target='_blank'
                className='hover:text-nav-gray sl_norewrite hover:no-underline'
                label={label}
                onClick={() => onClick(id)}
                to={`/${to}`}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

Language.propTypes = {
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      to: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
  onClick: PropTypes.func,
}

Language.defaultProps = {
  className: "",
  onClick: () => {},
}

export default Language
