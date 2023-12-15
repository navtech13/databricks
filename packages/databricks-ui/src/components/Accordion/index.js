import React, { lazy, Suspense } from "react"

const Accordion = lazy(() => import("./Accordion"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <Accordion {...props} />
  </Suspense>
)

export default LazyComponent
