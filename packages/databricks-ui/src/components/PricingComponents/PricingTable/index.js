import React, { lazy, Suspense } from "react"

const PricingTable = lazy(() => import("./PricingTable"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <PricingTable {...props} />
  </Suspense>
)

export default LazyComponent
