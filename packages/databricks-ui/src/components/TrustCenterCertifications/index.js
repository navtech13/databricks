import React, { lazy, Suspense } from "react"

const TrustCenterCertifications = lazy(() => import("./TrustCenterCertifications"))
const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[340px]' />}>
    <TrustCenterCertifications {...props} />
  </Suspense>
)
export default LazyComponent
