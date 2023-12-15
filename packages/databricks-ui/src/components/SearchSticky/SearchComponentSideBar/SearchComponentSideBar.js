import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import IconResolver from "../../IconResolver"
import useTranslate from "../../../../../gatsby-theme-databricks-drupal/src/utils/translate"

const SearchComponentSideBar = ({
  activateSearchPopup,
  isMobile,
  searchActivationStatus,
}) => {
  const { translate } = useTranslate()
  return (
    <div
      role='button'
      className='flex items-center'
      aria-label={translate("general.site-search")}
      onClick={() => (isMobile ? navigate("/search") : activateSearchPopup())}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === "Spacebar") {
          return isMobile ? navigate("/search") : activateSearchPopup()
        }
      }}
      tabIndex={0}
    >
      <IconResolver
        className={`${
          searchActivationStatus ? "text-orange-600" : "text-navy-600"
        } hover:text-orange-600`}
        token='searchNav'
      />
    </div>
  )
}

SearchComponentSideBar.propTypes = {
  activateSearchPopup: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  searchActivationStatus: PropTypes.bool,
}
SearchComponentSideBar.defaultProps = {
  isMobile: undefined,
  searchActivationStatus: undefined,
}

export default SearchComponentSideBar
