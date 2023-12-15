import React, { lazy, Suspense } from "react"

const PlaySlider = lazy(() => import("./PlaySlider"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <PlaySlider {...props} />
  </Suspense>
)

export default LazyComponent
