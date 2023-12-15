import React from "react"
import PropTypes from "prop-types"
import { LandingPageContent, SecondaryNavigation } from "../../components"
import { menuMapper } from "../../../../gatsby-theme-databricks-drupal/src/utils/menu-mapper"

const LegalPageContent = ({ children, legalNavigation }) => {
  let menuLinks
  if (legalNavigation?.links) {
    menuLinks = menuMapper(legalNavigation.links, true)
  }
  const hasSidebar = legalNavigation ? `flex flex-col lg:flex-row` : ``
  return (
    <LandingPageContent hasBackgroundImage={false}>
      <div className={hasSidebar}>
        {legalNavigation && menuLinks && (
          <SecondaryNavigation
            className='lg:w-2/12 lg:max-w-[200px]'
            title={legalNavigation.title}
            links={menuLinks}
          />
        )}
        <div>
          <div className='flex flex-col'>{children}</div>
        </div>
      </div>

      {/* <div className='inner-wrapper' /> */}
    </LandingPageContent>
  )
}

LegalPageContent.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  legalNavigation: PropTypes.shape({
    title: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    links: PropTypes.array.isRequired,
  }).isRequired,
}

export default LegalPageContent
