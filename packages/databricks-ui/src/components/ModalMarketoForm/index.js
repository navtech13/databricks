import React, { lazy, Suspense } from "react"

const ModalMarketoForm = lazy(() => import("./ModalMarketoForm"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[450px]' />}>
    <ModalMarketoForm {...props} />
  </Suspense>
)

export default LazyComponent
