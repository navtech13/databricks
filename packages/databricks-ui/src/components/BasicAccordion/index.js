import React, { lazy, Suspense } from "react"

const BasicAccordion = lazy(() => import("./BasicAccordion"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[64px]' />}>
    <BasicAccordion {...props} />
  </Suspense>
)

export default LazyComponent
