import React, { lazy, Suspense } from "react"

const BinarySelector = lazy(() => import("./BinarySelector"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[360px]' />}>
    <BinarySelector {...props} />
  </Suspense>
)

export default LazyComponent
