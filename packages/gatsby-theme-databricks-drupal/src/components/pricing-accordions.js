import React from "react"
import PropTypes from "prop-types"
import { AccordionList, RichText, Wrapper } from "databricks-ui"
import filterPricing from "../helpers/filterPricing"

const PricingAccordions = ({ items, title }) => {
  const filteredItems = filterPricing(items)
  if (!filteredItems.length) {
    return <></>
  }

  const accordions = filteredItems?.map((item) => {
    return {
      children: <RichText className="w-5/6">{item.entity.fieldDescription?.processed}</RichText>,
      description: item.entity.fieldTitle,
      key: item.entity.uuid,
    }
  })
  return (
    <Wrapper className='component-accordionlist' title={title}>
      <AccordionList accordions={accordions} />
    </Wrapper>
  )
}

PricingAccordions.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

PricingAccordions.defaultProps = {
  title: undefined,
}

export default PricingAccordions
