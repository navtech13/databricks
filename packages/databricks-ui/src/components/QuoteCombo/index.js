import React, { lazy, Suspense } from "react"

const QuoteCombo = lazy(() => import("./QuoteCombo"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[300px]' />}>
    <QuoteCombo {...props} />
  </Suspense>
)

export default LazyComponent