import React, { lazy, Suspense } from "react"

const JobsSection = lazy(() => import("./JobsSection"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <JobsSection {...props} />
  </Suspense>
)

export default LazyComponent
