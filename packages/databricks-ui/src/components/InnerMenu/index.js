import React, { lazy, Suspense } from "react"

const InnerMenu = lazy(() => import("./InnerMenu"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[60px]' />}>
    <InnerMenu {...props} />
  </Suspense>
)

export default LazyComponent