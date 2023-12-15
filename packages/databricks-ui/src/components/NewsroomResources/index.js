import React, { lazy, Suspense } from "react"

const NewsroomResources = lazy(() => import("./NewsroomResources"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[420px]' />}>
    <NewsroomResources {...props} />
  </Suspense>
)

export default LazyComponent
