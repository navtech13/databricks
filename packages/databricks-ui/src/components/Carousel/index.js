import React, { lazy, Suspense } from "react"

const Carousel = lazy(() => import("./Carousel"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <Carousel {...props} />
  </Suspense>
)

export default LazyComponent
