import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Link from "../Link"
import { generateCTAs } from "../../utils/generateCTAs"

const BigCombo = ({ title, description, ctas, items }) => {
  return (
    <section data-cy='BigCombo'>
      <RichText className='h2'>{title}</RichText>
      <RichText className='b1 rich-text-body mt-2.5 mb-5'>{description}</RichText>
      <div className='grid-cols grid gap-x-4 gap-y-5 md:grid-cols-2'>
        {items.map((item) => (
          <div key={item.id}>
            <RichText className='h4 mb-1 font-bold'>{item.title}</RichText>
            <RichText className='b2 rich-text-body'>{item.description}</RichText>
          </div>
        ))}
      </div>
      {ctas?.length > 0 && (
        <div className='mt-5 flex flex-col items-start gap-2.5 md:flex-row md:gap-4'>
          {generateCTAs(ctas, Link)}
        </div>
      )}
    </section>
  )
}

BigCombo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      text: PropTypes.string,
    })
  ),
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

BigCombo.defaultProps = {
  ctas: undefined,
}

export default BigCombo
