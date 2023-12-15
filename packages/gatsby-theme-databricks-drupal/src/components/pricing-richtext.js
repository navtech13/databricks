import React from "react"
import PropTypes from "prop-types"
import { RichText, Wrapper } from "databricks-ui"
import filterPricing from "../helpers/filterPricing"

const PricingRichtext = ({ title, body, filter }) => {
  const isShown = filterPricing([{ entity: { fieldItem: filter } }]).length > 0

  if (!isShown) {
    return <></>
  }
  return (
    <Wrapper title={title}>
      <RichText variant='body'>{body}</RichText>
    </Wrapper>
  )
}

PricingRichtext.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  filter: PropTypes.shape({}).isRequired,
}

PricingRichtext.defaultProps = {
  title: undefined,
  body: undefined,
}

export default PricingRichtext
