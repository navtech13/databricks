import React, { lazy, Suspense } from "react"

const IndustryCard = lazy(() => import("./IndustryCard"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <IndustryCard {...props} />
  </Suspense>
)

export default LazyComponent
