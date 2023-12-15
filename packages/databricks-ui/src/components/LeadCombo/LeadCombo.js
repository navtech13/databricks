import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import TextLink from "../TextLink"
import Link from "../Link"
import { generateCTAs } from "../../utils/generateCTAs"

const LeadCombo = ({ title, description, ctas, textLink }) => {
  return (
    <section data-cy='LeadCombo'>
      <RichText className='h2'>{title}</RichText>
      <RichText className='b1 mt-2.5'>{description}</RichText>
      {ctas?.length > 0 ? (
        <div className='mt-4 flex flex-col items-start gap-2.5 md:flex-row md:gap-4'>
          {generateCTAs(ctas, Link)}
        </div>
      ) : (
        <TextLink
          variant='A'
          className='arrow-icon inline-block pt-4'
          to={textLink.to}
        >
          {textLink.label}
        </TextLink>
      )}
    </section>
  )
}

LeadCombo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  textLink: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
  }),
}

LeadCombo.defaultProps = {
  ctas: undefined,
  textLink: undefined,
}

export default LeadCombo
