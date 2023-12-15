import React, { lazy, Suspense } from "react"

const FeaturedIndustryCardList = lazy(() => import("./FeaturedIndustryCardList"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <FeaturedIndustryCardList {...props} />
  </Suspense>
)

export default LazyComponent
