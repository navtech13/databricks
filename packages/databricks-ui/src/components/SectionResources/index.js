import React from "react"
import proptypes from "prop-types"
import Link from "../Link"

const SectionResources = ({ eyebrow, title, cards, backgroundColor }) => {
  const isBackgroundNavy = backgroundColor === "navy-800"
  const textColor = isBackgroundNavy ? "text-white" : "text-navy-800"
  const hoverColor = isBackgroundNavy ? "hover:text-orange-500" : ""
  const cardDescriptionColor = isBackgroundNavy ? "text-navy-300" : "text-gray-text"

  return (
    <section>
      {eyebrow && (
        <span className='text-2 block pb-3 text-center uppercase text-orange-700'>
          {eyebrow}
        </span>
      )}
      {title && <h2 className='text-4 lg:text-6 pb-6 text-center'>{title}</h2>}
      <div className='grid gap-2 md:grid-cols-2 lg:gap-4'>
        {cards?.map((card) => (
          <div className={`bg-${backgroundColor} p-3 lg:p-6`}>
            <div className='pb-6'>
              <h3
                className={`text-3 pb-2 md:pb-3 ${textColor} lg:text-4 font-medium`}
              >
                {card.title}
              </h3>
              <p className={cardDescriptionColor}>{card.description}</p>
            </div>
            {card.ctas?.map((cta) => (
              <Link
                className={`${textColor} ${hoverColor} transition-ease-in-ease line-clamp-1 arrow-icon arrow-icon-rotate-45 text-2 relative !block truncate border-b border-orange-500 py-2 pr-4 leading-none transition-all duration-200 ease-linear after:absolute after:right-0 hover:pl-1 hover:no-underline`}
                to={cta.to}
              >
                {cta.text}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default SectionResources

SectionResources.propTypes = {
  eyebrow: proptypes.string,
  title: proptypes.string,
  backgroundColor: proptypes.oneOf(["navy-800", "white", "oat-light", "oat-medium"]),
  cards: proptypes.arrayOf(proptypes.shape({})),
}

SectionResources.defaultProps = {
  eyebrow: "",
  title: "",
  cards: [],
  backgroundColor: "navy-800",
}
