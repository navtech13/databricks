import React, { lazy, Suspense } from "react"

const IndustryCards = lazy(() => import("./IndustryCards"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <IndustryCards {...props} />
  </Suspense>
)

export default LazyComponent
