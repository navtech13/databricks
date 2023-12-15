import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"

const getColumn = (width, prefix = "") => {
  if (!width) {
    return ""
  }

  if (width === "12") {
    return `${prefix}w-full`
  }

  return `${prefix}w-${width}/12`
}

const HeaderSection = ({
  title,
  variant,
  mobileColumn,
  tabletColumn,
  desktopColumn,
  subtitle,
  eyebrow,
}) => {
  const variantMap = {
    light: {
      baseText: "text-oat-light",
      accentText: "text-orange-400",
    },
    default: {
      baseText: "text-navy-800",
      accentText: "text-orange-700",
    },
  }
  const currentVariant = variantMap[variant] || variantMap.default

  return (
    <section
      className={`${
        currentVariant.baseText
      } mx-auto space-y-3 text-center ${getColumn(mobileColumn)} ${getColumn(
        tabletColumn,
        "md:"
      )} ${getColumn(desktopColumn, "lg:")}`}
    >
      {eyebrow && (
        <span
          className={`text-2 block font-mono uppercase leading-none ${currentVariant.accentText}`}
        >
          {eyebrow}
        </span>
      )}
      {title && (
        <RichText as='h2' className='text-4 lg:text-7 font-medium'>
          {title.replace("\\n", "<br />")}
        </RichText>
      )}
      {subtitle && <span className='text-3 block'>{subtitle}</span>}
    </section>
  )
}

const cols = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

HeaderSection.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.oneOf(["default", "light"]),
  mobileColumn: PropTypes.oneOf(cols),
  tabletColumn: PropTypes.oneOf(cols),
  desktopColumn: PropTypes.oneOf(cols),
  subtitle: PropTypes.string,
}

HeaderSection.defaultProps = {
  eyebrow: undefined,
  variant: "default",
  mobileColumn: undefined,
  tabletColumn: undefined,
  desktopColumn: undefined,
  title: undefined,
  subtitle: undefined,
}

export default HeaderSection
