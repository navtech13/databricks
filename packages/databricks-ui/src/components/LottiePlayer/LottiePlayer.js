import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Lottie from "lottie-react"

const LottiePlayer = ({
  animationData,
  animationSrc,
  placeholderRatio,
  ariaLabel,
  loop,
  ...props
}) => {
  const [lottieData, setLottieData] = useState(animationData)

  useEffect(() => {
    if (!animationSrc) {
      return
    }
    fetch(animationSrc)
      .then((response) => response.json())
      .then((data) => {
        setLottieData(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <>
      {placeholderRatio && !lottieData && (
        <div style={{ paddingTop: `${placeholderRatio}%` }} />
      )}
      {lottieData && (
        <Lottie
          aria-label={ariaLabel}
          animationData={lottieData}
          loop={loop}
          {...props}
        />
      )}
    </>
  )
}

LottiePlayer.propTypes = {
  animationData: PropTypes.string,
  animationSrc: PropTypes.string,
  placeholderRatio: PropTypes.number,
  ariaLabel: PropTypes.string,
  loop: PropTypes.bool,
}

LottiePlayer.defaultProps = {
  animationData: undefined,
  animationSrc: undefined,
  placeholderRatio: undefined,
  ariaLabel: undefined,
  loop: undefined,
}

export default LottiePlayer
