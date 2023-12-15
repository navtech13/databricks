import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"

const Badge = ({ type }) => {
  const variantMap = {
    featured: {
      wrapper:
        "flex items-center justify-center rounded-[11px] bg-green-01 px-1 py-0.25 mr-1",
      text: "font-mono text-navy-06 text-1.25 font-medium uppercase",
      iconClass: "_❤",
      iconColorClass: "text-navy-06",
    },
    new: {
      wrapper:
        "flex items-center justify-center rounded-[11px] bg-navy-06 px-1 py-0.25 mr-1",
      text: "font-mono text-green-02 text-1 font-medium uppercase",
      iconClass: "_★",
      iconColorClass: "text-green-02",
    },
    hot: {
      wrapper:
        "flex items-center justify-center rounded-[9px] bg-yellow-01 px-0.5 py-0.25 mr-1",
      text: "text-1",
      iconClass: "",
      iconColorClass: "",
    },
  }

  const currentVariant = variantMap[type]
  return (
    <div data-cy='Badge' className={currentVariant?.wrapper}>
      {type === "featured" && (
        <span
          className={`glyphm text-1.25 pr-0.5 after:content-['_❤']  ${currentVariant?.iconColorClass}`}
        />
      )}
      {type === "new" && (
        <span
          className={`glyphm text-1.25 pr-0.5 after:content-['_★']  ${currentVariant?.iconColorClass}`}
        />
      )}
      <RichText className={currentVariant?.text}>
        {type !== "hot" ? (
          type
        ) : (
          <span aria-label='hot' role='img'>
            🔥
          </span>
        )}
      </RichText>
    </div>
  )
}

Badge.propTypes = {
  type: PropTypes.string.isRequired,
}

export default Badge
