import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useLocation } from "@reach/router"
import MenuItem from "./MenuItem"
import SkipToMainContentLink from "../SkipToMainContentLink"
import useTranslate from "./../../../../gatsby-theme-databricks-drupal/src/utils/translate"

const InPageNavigationVertical = ({
  className,
  links,
  current,
  skipLink,
  skipToMain,
}) => {
  const location = useLocation()
  const { translate } = useTranslate()
  const [activeLink, setActiveLink] = useState(null)

  const [hideSkipMain, setHideSkipMain] = useState(false)

  const currentActive = current || location?.pathname
  const origin = location?.origin

  const checkLink = (link) => {
    let linkReplaced = link.to
    if (link.to.includes(origin)) {
      linkReplaced = link.to.replace(origin, "")
    }
    const linkPath = linkReplaced?.split("#")[0]
    return linkPath === "" || linkPath === currentActive
  }

  const checkLinksRecursively = (link) => {
    if (link.links) {
      return link.links.map(checkLinksRecursively).every((result) => result === true)
    }
    return checkLink(link)
  }

  const countTotalLinks = (link) => {
    if (link.links) {
      return link.links.reduce(
        (total, childLink) => total + countTotalLinks(childLink),
        0
      )
    }
    return 1
  }

  const totalLinks = countTotalLinks({ links })
  const validateLinks = links
    .map(checkLinksRecursively)
    .every((result) => result === true)

  useEffect(() => {
    if (totalLinks <= 4 || validateLinks) {
      setHideSkipMain(true)
      return
    }
    setHideSkipMain(false)
  }, [totalLinks, validateLinks])

  return (
    <nav className={`min-h-[360px] lg:border-l lg:border-[#CDDAE5] ${className}`}>
      {skipToMain && !hideSkipMain && (
        <SkipToMainContentLink
          href={skipLink}
          label={translate("general.skip-to-main-content")}
        />
      )}
      <ul>
        {links.map(({ to, label, links: childLinks }, index) => {
          return (
            <MenuItem
              key={`${to}${label}`}
              index={index}
              className='text-2.5 text-navy-06 relative mt-1 pr-2 pl-3 first:mt-0'
              to={to}
              label={label}
              links={childLinks}
              current={currentActive?.replace(/\/$/, "")}
              activeLink={activeLink}
              setActiveLink={setActiveLink}
            />
          )
        })}
      </ul>
    </nav>
  )
}

InPageNavigationVertical.propTypes = {
  className: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
      links: PropTypes.arrayOf(PropTypes.shape({})),
    })
  ).isRequired,
  current: PropTypes.string,
  skipLink: PropTypes.string,
  skipToMain: PropTypes.bool,
}

InPageNavigationVertical.defaultProps = {
  className: "",
  current: undefined,
  skipLink: undefined,
  skipToMain: false,
}

export default InPageNavigationVertical
