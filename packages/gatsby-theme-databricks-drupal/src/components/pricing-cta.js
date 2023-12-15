import React from "react"
import PropTypes from "prop-types"
import { Cta, Grid, RichText, Wrapper } from "databricks-ui"
import filterPricing from "../helpers/filterPricing"

const PricingCta = ({ ctas, title, children, filter, bottomText }) => {
  const isShown = filterPricing([{ entity: { fieldItem: filter } }]).length > 0

  if (!isShown) {
    return <></>
  }

  return (
    <Wrapper>
      <Cta ctas={ctas} title={title} className="h4 w-9/12">
        {children}
      </Cta>
      {bottomText && (
        <Grid columns="3">
          {bottomText.map(({ entity }) => {
            if (!entity.fieldBody?.processed) {
              return <></>
            }
            const text = `${
              entity.fieldTitle
                ? `<p class='h5 w-full'>${entity?.fieldTitle}</p>`
                : ""
            }${entity?.fieldBody?.processed}`
            return <RichText key={entity.uuid}>{text}</RichText>
          })}
        </Grid>
      )}
    </Wrapper>
  )
}

PricingCta.propTypes = {
  ctas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  filter: PropTypes.shape({}).isRequired,
  bottomText: PropTypes.arrayOf(PropTypes.shape({})),
}

PricingCta.defaultProps = {
  title: undefined,
  children: undefined,
  bottomText: undefined,
}

export default PricingCta
