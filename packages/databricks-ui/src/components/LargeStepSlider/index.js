import React, { lazy, Suspense } from "react"

const LargeStepSlider = lazy(() => import("./LargeStepSlider"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[100px]' />}>
    <LargeStepSlider {...props} />
  </Suspense>
)

export default LazyComponent
