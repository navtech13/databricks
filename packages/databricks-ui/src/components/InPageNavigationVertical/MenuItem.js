import React, { useEffect } from "react"
import PropTypes from "prop-types"
import sameTab from "../../utils/sameTab"
import LinkComponent from "../Link"

const MenuItem = ({
  label,
  to,
  links,
  className,
  current,
  level,
  activeLink,
  setActiveLink,
  index,
}) => {
  const isInternal = sameTab(to)

  const currentFinder = ({ to: childTo, links: childLinks }) => {
    if (childTo?.replace(/\/$/, "") === current) {
      return true
    }
    if (childLinks) {
      return childLinks.findIndex(currentFinder) !== -1
    }
  }

  const isExpanded = links && links?.findIndex(currentFinder) !== -1

  useEffect(() => {
    if (setActiveLink && isExpanded) {
      setActiveLink(index)
    }
  }, [])

  const isCurrent = to && to?.replace(/\/$/, "") === current
  const activeItem = activeLink === index
  const activeStatus = activeItem && links

  return (
    <li className={className}>
      <div
        className={`bg-orange-04 absolute left-0 h-4 w-1 ${
          activeStatus && level === 0 ? "selected" : "opacity-0"
        }`}
      />
      {to ? (
        <LinkComponent
          className={`${
            isCurrent && level !== 0
              ? "text-orange-04 hover:text-orange-04"
              : "arrow-icon arrow-icon-hover text-navy-06 hover:text-navy-06 after:text-gray-secondary"
          } py-0.25 block hover:no-underline ${
            isInternal ? "" : "arrow-icon-rotate-45"
          }`}
          to={to}
        >
          {label}
        </LinkComponent>
      ) : (
        <button
          type="button"
          onClick={() => {
            setActiveLink(index)
          }}
          className={`${
            isCurrent && level !== 0
              ? "text-orange-04 hover:text-orange-04"
              : "arrow-icon arrow-icon-hover text-navy-06 hover:text-navy-06 after:text-gray-secondary"
          } py-0.25 block text-left hover:no-underline`}
        >
          {label}
        </button>
      )}
      <ul className={activeStatus ? "block" : "hidden"}>
        {links?.map(({ to: childTo, label: childLabel, links: childLinks }) => {
          return (
            <MenuItem
              key={`${childTo}${childLabel}`}
              className='text-2 ml-2 mt-0.5'
              to={childTo}
              label={childLabel}
              links={childLinks}
              current={current}
              level={level + 1}
            />
          )
        })}
      </ul>
    </li>
  )
}

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
  current: PropTypes.string,
  level: PropTypes.number,
}

MenuItem.defaultProps = {
  className: "",
  current: undefined,
  links: undefined,
  level: 0,
}

export default MenuItem
