import React, { lazy, Suspense } from "react"

const SimpleSlider = lazy(() => import("./SimpleSlider"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <SimpleSlider {...props} />
  </Suspense>
)

export default LazyComponent
