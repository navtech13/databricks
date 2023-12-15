import React, { lazy, Suspense } from "react"

const AcceleratorCards = lazy(() => import("./AcceleratorCards"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[160px]' />}>
    <AcceleratorCards {...props} />
  </Suspense>
)

export default LazyComponent
