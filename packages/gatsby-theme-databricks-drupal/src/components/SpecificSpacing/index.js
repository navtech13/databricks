import React, { useContext } from "react"
import PropTypes from "prop-types"
import PricingContext from "./SpacingContext"

const SpecificSpacing = ({
  children,
  className,
  topSpacing,
  bottomSpacing,
  topSpacingTablet,
  bottomSpacingTablet,
  topSpacingDesktop,
  bottomSpacingDesktop,
}) => {
  // Use default values from context
  const { defaultSpacings } = useContext(PricingContext)
  const topSpacingValue = topSpacing || defaultSpacings?.topSpacing
  const bottomSpacingValue = bottomSpacing || defaultSpacings?.bottomSpacing
  const topSpacingTabletValue = topSpacingTablet || defaultSpacings?.topSpacingTablet
  const bottomSpacingTabletValue =
    bottomSpacingTablet || defaultSpacings?.bottomSpacingTablet
  const topSpacingDesktopValue =
    topSpacingDesktop || defaultSpacings?.topSpacingDesktop
  const bottomSpacingDesktopValue =
    bottomSpacingDesktop || defaultSpacings?.bottomSpacingDesktop

  // Make option groups for overriding all top and bottom values
  const topSpacings =
    topSpacingValue || topSpacingTabletValue || topSpacingDesktopValue
  const bottomSpacings =
    bottomSpacingValue || bottomSpacingTabletValue || bottomSpacingDesktopValue

  if (!topSpacings && !bottomSpacings) {
    return <>{children}</>
  }

  // Assign Classes
  const topSpacingsClasses = `${topSpacingValue ? `pt-${topSpacingValue}` : ""} ${
    topSpacingTabletValue ? `md:pt-${topSpacingTabletValue}` : ""
  } ${topSpacingDesktopValue ? `lg:pt-${topSpacingDesktopValue}` : ""}`

  const bottomSpacingsClasses = `${
    bottomSpacingValue ? `pb-${bottomSpacingValue}` : ""
  } ${bottomSpacingTabletValue ? `md:pb-${bottomSpacingTabletValue}` : ""} ${
    bottomSpacingDesktopValue ? `lg:pb-${bottomSpacingDesktopValue}` : ""
  }`

  return (
    <div
      className={`${
        topSpacings ? `specific-wrapper-top ${topSpacingsClasses.trim()}` : ""
      } ${
        bottomSpacings
          ? `specific-wrapper-bottom ${bottomSpacingsClasses.trim()}`
          : ""
      } ${className}`}
    >
      {children}
    </div>
  )
}

SpecificSpacing.propTypes = {
  children: PropTypes.node,
  topSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottomSpacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  topSpacingTablet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottomSpacingTablet: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  topSpacingDesktop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottomSpacingDesktop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
}

SpecificSpacing.defaultProps = {
  children: undefined,
  topSpacing: undefined,
  bottomSpacing: undefined,
  topSpacingTablet: undefined,
  bottomSpacingTablet: undefined,
  topSpacingDesktop: undefined,
  bottomSpacingDesktop: undefined,
  className: "",
}

export default SpecificSpacing
