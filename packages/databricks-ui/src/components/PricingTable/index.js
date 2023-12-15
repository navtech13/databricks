import React, { lazy, Suspense } from "react"

const PricingTable = lazy(() => import("./PricingTable"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[190px]' />}>
    <PricingTable {...props} />
  </Suspense>
)

export default LazyComponent
