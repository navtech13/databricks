import React, { lazy, Suspense } from "react"

const PricingFeatureTable = lazy(() => import("./PricingFeatureTable"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[210px]' />}>
    <PricingFeatureTable {...props} />
  </Suspense>
)

export default LazyComponent