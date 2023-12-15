import React from "react"
import { Wrapper } from "databricks-ui"
import PricingCalculatorLayout from "./pricing-calculator-layout"
import PricingInstanceTableLayout from "./pricing-instance-table-layout"

const PricingCalculatorWrapper = (props) => {
  return (
    <Wrapper>
      <div className='mb-6 pb-6'>
        <PricingCalculatorLayout />
      </div>
      <div className='mb-6 pb-6'>
        <PricingInstanceTableLayout />
      </div>
    </Wrapper>
  )
}

export default PricingCalculatorWrapper
