import React, { lazy, Suspense } from "react"

const AnimatedLogoSlider = lazy(() => import("./AnimatedLogoSlider"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[100px]' />}>
    <AnimatedLogoSlider {...props} />
  </Suspense>
)

export default LazyComponent
