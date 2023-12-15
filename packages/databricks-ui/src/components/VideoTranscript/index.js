import React, { lazy, Suspense } from "react"

const VideoTranscriptComponent = lazy(() => import("./VideoTranscriptComponent"))

const LazyComponent = (props) => (
  <Suspense fallback={<div className='min-h-[70px]' />}>
    <VideoTranscriptComponent {...props} />
  </Suspense>
)

export default LazyComponent
