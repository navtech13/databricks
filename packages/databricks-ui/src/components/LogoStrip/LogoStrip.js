import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"

const LogoStrip = ({ logos, variant }) => {
  const variantMap = {
    standard: "grid gap-5 px-2 pt-2 pb-8 md:grid-cols-2 lg:grid-cols-7",
    featuredIndustryCard:
      "flex flex-row gap-5 justify-center min-h-[30px] h-4 max-h-[300px] items-center mt-2.5 h-full lg:mx-2.5 pr-2.5 w-full",
  }
  const style = variantMap[variant]
  return (
    <div data-cy='LogoStrip' className={style}>
      {logos.map((logo) => (
        <div
          className={variant === "featuredIndustryCard" ? "w-full" : ""}
          key={logo.alt}
        >
          <Image {...logo} key={logo.alt} />
        </div>
      ))}
    </div>
  )
}

LogoStrip.propTypes = {
  logos: PropTypes.arrayOf(Image.propTypes).isRequired,
  variant: PropTypes.oneOf(["standard", "featuredIndustryCard"]),
}

LogoStrip.defaultProps = {
  variant: "standard",
}

export default LogoStrip
