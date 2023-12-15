import React, { lazy, Suspense } from "react"

const JobOpenings = lazy(() => import("./JobOpenings"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <JobOpenings {...props} />
  </Suspense>
)

export default LazyComponent
