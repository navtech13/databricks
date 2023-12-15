import React from "react"
import PropTypes from "prop-types"
import Link from "../Link"
import RichText from "../RichText"

const variantMap = {
  light: {
    headlineColor: "text-navy-800",
    descriptionColor: "text-gray-text",
    linkcolor: "text-blue-700 hover:text-blue-700",
    hoverState: "lg:hover:shadow-shadow-2 transition-shadow",
  },
  dark: {
    headlineColor: "text-white",
    descriptionColor: "text-navy-300",
    linkcolor: "text-blue-400 hover:text-blue-400",
    hoverState: "hover:bg-navy-700",
  },
}

const TransparentTextCard = ({ variant, textLink, description, headline }) => {
  const currentVariant = variantMap[variant]
  return (
    <Link
      to={textLink.to}
      className={`${currentVariant.hoverState} group-arrow-icon-tertiary min-h-10 flex cursor-pointer flex-col justify-between pl-2 duration-150 hover:no-underline hover:ease-in lg:p-2`}
    >
      <div>
        <h4 className={`${currentVariant.headlineColor}`}>{headline}</h4>
        <RichText className={`${currentVariant.descriptionColor} b5 mt-1 mb-2`}>
          {description}
        </RichText>
      </div>
      <span
        className={`${currentVariant.linkcolor} arrow-icon arrow-icon-tertiary block max-w-max`}
        to={textLink.to}
      >
        {textLink.label}
      </span>
    </Link>
  )
}

TransparentTextCard.propTypes = {
  textLink: PropTypes.shape({ to: PropTypes.string, label: PropTypes.string }),
  variant: PropTypes.oneOf(["light", "dark"]),
  description: PropTypes.string,
  headline: PropTypes.string,
}

TransparentTextCard.defaultProps = {
  variant: "light",
  textLink: undefined,
  description: undefined,
  headline: undefined,
}

export default TransparentTextCard
