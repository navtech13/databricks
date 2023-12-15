import React, { lazy, Suspense } from "react"

const AccordionTable = lazy(() => import("./AccordionTable"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[150px]' />}>
    <AccordionTable {...props} />
  </Suspense>
)

export default LazyComponent
