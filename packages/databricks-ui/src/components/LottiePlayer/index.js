import React, { lazy, Suspense } from "react"

const LottiePlayer = lazy(() => import("./LottiePlayer"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[240px]' />}>
    <LottiePlayer {...props} />
  </Suspense>
)

export default LazyComponent
