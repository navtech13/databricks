import React, { lazy, Suspense } from "react"

const PricingTiles = lazy(() => import("./PricingTiles"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <PricingTiles {...props} />
  </Suspense>
)

export default LazyComponent
