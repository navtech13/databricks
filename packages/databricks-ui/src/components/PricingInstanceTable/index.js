import React, { lazy, Suspense } from "react"

const PricingInstanceTable = lazy(() => import("./PricingInstanceTable"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <PricingInstanceTable {...props} />
  </Suspense>
)

export default LazyComponent
