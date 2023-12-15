import React, { lazy, Suspense } from "react"

const PricingCalculator = lazy(() => import("./PricingCalculator"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <PricingCalculator {...props} />
  </Suspense>
)

export default LazyComponent
