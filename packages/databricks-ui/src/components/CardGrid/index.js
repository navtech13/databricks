import React from "react"
import PropTypes from "prop-types"

const CardGrid = ({
  children,
  columnsMobile,
  columnsTablet,
  columnsDesktop,
  gapMobile,
  gapTablet,
  gapDesktop,
}) => {
  const colClasses = {
    mobile: columnsMobile ? `grid-cols-${columnsMobile}` : "",
    tablet: columnsTablet ? `md:grid-cols-${columnsTablet}` : "",
    desktop: columnsDesktop ? `lg:grid-cols-${columnsDesktop}` : "",
  }
  const gapClasses = {
    mobile: gapMobile ? `gap-${gapMobile}` : "",
    tablet: gapTablet ? `md:gap-${gapTablet}` : "",
    desktop: gapDesktop ? `lg:gap-${gapDesktop}` : "",
  }
  const colClassNames = Object.values(colClasses).join(" ")
  const gapClassNames = Object.values(gapClasses).join(" ")
  return <div className={`grid ${colClassNames} ${gapClassNames}`}>{children}</div>
}

CardGrid.propTypes = {
  children: PropTypes.node.isRequired,
  columnsMobile: PropTypes.string,
  columnsTablet: PropTypes.string,
  columnsDesktop: PropTypes.string,
  gapMobile: PropTypes.string,
  gapTablet: PropTypes.string,
  gapDesktop: PropTypes.string,
}

CardGrid.defaultProps = {
  columnsMobile: 1,
  columnsTablet: 2,
  columnsDesktop: 4,
  gapMobile: null,
  gapTablet: null,
  gapDesktop: null,
}

export default CardGrid
