import React, { lazy, Suspense } from "react"

const RowsCarousel = lazy(() => import("./RowsCarousel"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <RowsCarousel {...props} />
  </Suspense>
)

export default LazyComponent
