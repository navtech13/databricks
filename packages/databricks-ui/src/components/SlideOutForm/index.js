import React, { lazy, Suspense } from "react"

const SlideOutForm = lazy(() => import("./SlideOutForm"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[36px]' />}>
    <SlideOutForm {...props} />
  </Suspense>
)

export default LazyComponent
