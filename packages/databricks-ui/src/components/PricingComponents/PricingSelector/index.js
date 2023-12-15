import React, { lazy, Suspense } from "react"

const PricingSelector = lazy(() => import("./PricingSelector"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <PricingSelector {...props} />
  </Suspense>
)

export default LazyComponent
