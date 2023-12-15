import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useLocation } from "@reach/router"
import TextLink from "../TextLink"

const SubNavigationMenu = ({ links, level, className, ...props }) => {
  const location = useLocation()
  const [currentPath, setCurrentPath] = useState()

  useEffect(() => setCurrentPath(location.pathname), [location])
  return (
    <ul
      role='menu'
      className={`${level === 0 ? "pt-2.5 lg:pt-0 " : ""}${className}`}
      data-cy={`${level === 0 ? "SecondaryNavigation-list" : "sub-list"}`}
      {...props}
    >
      {links.map(({ to, label, links: submenu }) => {
        const current =
          to?.replace(/\/$/, "") ===
          currentPath?.replace(/\/page\/\d+/, "").replace(/\/$/, "")
        const slug = label
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")

        return (
          <li
            className={level === 0 ? "mb-4" : ""}
            key={`${label}${current}`}
            role='none'
            data-cy={slug}
          >
            <TextLink
              role='menuitem'
              label={label}
              className={`text-1.75 block py-0.5 px-2 duration-200 hover:no-underline ${
                // eslint-disable-next-line no-nested-ternary
                current
                  ? "bg-gray-warm-medium border-orange-04 border-r-2"
                  : to !== "" && to !== undefined
                  ? "hover:bg-gray-warm-medium"
                  : ""
              } ${
                level === 1
                  ? "text-nav-gray hover:text-nav-gray"
                  : "hover:text-orange-04"
              } ${
                level === 2
                  ? "text-nav-gray hover:text-nav-gray pl-5"
                  : "hover:text-orange-04"
              } ${
                level === 3
                  ? "text-nav-gray hover:text-nav-gray"
                  : "hover:text-orange-04"
              }`}
              variant='A'
              to={to}
            >
              {label}
            </TextLink>
            {submenu && <SubNavigationMenu level={level + 1} links={submenu} />}
          </li>
        )
      })}
    </ul>
  )
}

SubNavigationMenu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      submenu: PropTypes.arrayOf(PropTypes.shape({})),
      current: PropTypes.bool,
    })
  ).isRequired,
  level: PropTypes.number,
  className: PropTypes.string,
}

SubNavigationMenu.defaultProps = {
  level: 0,
  className: "",
}

export default SubNavigationMenu
