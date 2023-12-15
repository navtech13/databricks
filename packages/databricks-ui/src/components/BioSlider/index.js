import React, { lazy, Suspense } from "react"

const BioSlider = lazy(() => import("./BioSlider"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[220px]' />}>
    <BioSlider {...props} />
  </Suspense>
)

export default LazyComponent
