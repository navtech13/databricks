import React, { lazy, Suspense } from "react"

const FeaturedIndustryCard = lazy(() => import("./FeaturedIndustryCard"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <FeaturedIndustryCard {...props} />
  </Suspense>
)

export default LazyComponent
