import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Image from "../Image"

const Quote = ({ children, variant, source, logoPosition, image, ...props }) => {
  const variantMap = {
    default: {
      content: "b1 mb-3",
      source: "b4 text-gray-text",
    },
  }

  const isCustomers =
    typeof window !== "undefined" && window.location.href.indexOf("customers/") > 0
  const currentVariant = variantMap[variant] || variantMap.default

  return (
    <div data-cy='Quote' className={currentVariant?.wrapper || ""} {...props}>
      {(logoPosition === "top" || logoPosition === null) && image && (
        <Image className='mt-4 w-full max-w-[360px]' {...image} />
      )}
      <RichText
        className={`${currentVariant?.content || ""} ${
          isCustomers ? ` text-navy-03` : ""
        } rich-text-body`}
      >
        {children}
      </RichText>
      <RichText className={currentVariant?.source || ""}>{source}</RichText>
      {logoPosition === "bottom" && image && (
        <Image className='mt-4 w-full max-w-[360px]' {...image} />
      )}
    </div>
  )
}

Quote.propTypes = {
  variant: PropTypes.oneOf(["default"]),
  children: PropTypes.node.isRequired,
  source: PropTypes.string.isRequired,
  image: PropTypes.shape({}),
  logoPosition: PropTypes.string,
}

Quote.defaultProps = {
  variant: "default",
  logoPosition: null,
  image: undefined,
}

export default Quote
