import React, { lazy, Suspense } from "react"

const PaginationList = lazy(() => import("./PaginationList"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[100px]' />}>
    <PaginationList {...props} />
  </Suspense>
)

export default LazyComponent
