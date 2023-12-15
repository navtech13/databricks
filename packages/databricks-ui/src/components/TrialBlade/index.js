import React, { lazy, Suspense } from "react"

const TrialBlade = lazy(() => import("./TrialBlade"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[830px]' />}>
    <TrialBlade {...props} />
  </Suspense>
)

export default LazyComponent
