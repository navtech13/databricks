import React, { lazy, Suspense } from "react"

const PricingCard = lazy(() => import("./PricingCard"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <PricingCard {...props} />
  </Suspense>
)

export default LazyComponent
