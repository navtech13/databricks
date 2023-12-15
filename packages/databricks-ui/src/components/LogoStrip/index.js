import React, { lazy, Suspense } from "react"

const LogoStrip = lazy(() => import("./LogoStrip"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[45px]' />}>
    <LogoStrip {...props} />
  </Suspense>
)

export default LazyComponent
