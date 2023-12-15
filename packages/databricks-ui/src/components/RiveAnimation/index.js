import React from "react"
import PropTypes from "prop-types"

// eslint-disable-next-line import/no-extraneous-dependencies
import { useRive, Layout, Fit } from "@rive-app/react-canvas"

const RiveAnimation = ({ src, autoplay, isPlaying, alignment }) => {
  const params = {
    src,
    autoplay,
    layout: new Layout({
      fit: Fit.Contain,
      alignment,
    }),
  }

  const { rive, RiveComponent } = useRive(params)

  if (rive) {
    if (isPlaying) rive.play()
    if (!isPlaying) rive.pause()
  }

  return <RiveComponent />
}

RiveAnimation.propTypes = {
  src: PropTypes.string.isRequired,
  autoplay: PropTypes.bool,
  isPlaying: PropTypes.bool,
  alignment: PropTypes.string,
}

RiveAnimation.defaultProps = {
  autoplay: true,
  isPlaying: true,
  alignment: "center",
}

export default RiveAnimation
