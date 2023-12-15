import React, { lazy, Suspense } from "react"

const JobRow = lazy(() => import("./JobRow"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <JobRow {...props} />
  </Suspense>
)

export default LazyComponent
