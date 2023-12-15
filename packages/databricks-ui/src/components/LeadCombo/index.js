import React, { lazy, Suspense } from "react"

const LeadCombo = lazy(() => import("./LeadCombo"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[200px]' />}>
    <LeadCombo {...props} />
  </Suspense>
)

export default LazyComponent