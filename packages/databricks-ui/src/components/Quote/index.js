import React, { lazy, Suspense } from "react"

const Quote = lazy(() => import("./Quote"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[350px]' />}>
    <Quote {...props} />
  </Suspense>
)

export default LazyComponent
