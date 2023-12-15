import React, { lazy, Suspense } from "react"

const Slider = lazy(() => import("./Slider"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <Slider {...props} />
  </Suspense>
)

export default LazyComponent
