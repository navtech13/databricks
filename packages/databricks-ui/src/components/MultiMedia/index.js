import React, { useContext, useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import GlobalContext from "../../../../gatsby-theme-databricks-drupal/src/components/global-context"
import Image from "../Image"
import EmbedVideo from "../EmbedVideo"
import IconResolver from "../IconResolver"
import LottiePlayer from "../LottiePlayer"
import Wrapper from "../Wrapper"
import { theme } from "../../../tailwind.config"

const MultiMedia = ({
  alignment,
  alignmentMotionControl,
  animationSrc,
  animationStart,
  backgroundToken,
  columns,
  dropShadow,
  image,
  motionControl,
  paddingBottom,
  paddingTop,
  videoSrc,
  fullWidth,
}) => {
  const lottieRef = useRef()
  const [isPlaying, setIsPlaying] = useState(true)
  const globalContext = useContext(GlobalContext)
  const isVideoBlocked = globalContext?.context?.multimediaSlideUp

  const columnsMap = {
    1: "w-1/12",
    2: "w-2/12",
    3: "w-3/12",
    4: "w-4/12",
    5: "w-5/12",
    6: "w-6/12",
    7: "w-7/12",
    8: "w-8/12",
    9: "w-9/12",
    10: "w-10/12",
    11: "w-11/12",
    12: "w-full",
  }

  const slideUpEvent = () => {
    const eventHandler = new CustomEvent("slide-up")
    document.dispatchEvent(eventHandler)
  }

  const widthColumns = columnsMap[columns]
  const isDropShadow = dropShadow ? "shadow-card-normal" : ""

  const handleMouseEnter = () => {
    if (animationStart !== "hover") return
    lottieRef.current.play()
  }

  const handleMouseLeave = () => {
    if (animationStart !== "hover") return
    lottieRef.current.pause()
  }

  useEffect(() => {
    if (animationStart === "hover" || animationStart === "click") {
      setIsPlaying(false)
    }
  }, [])

  const alignmentMap = {
    left: {
      left: "0",
    },
    right: {
      right: "0",
    },
    center: {
      left: "50%",
      marginLeft: "-11px",
    },
  }

  const MotionControl = () => (
    <button
      type='button'
      onClick={() => {
        setIsPlaying(!isPlaying)
        if (isPlaying) {
          lottieRef.current.pause()
        } else {
          lottieRef.current.play()
        }
      }}
      className='absolute bottom-0 z-50 m-1'
      style={{
        ...alignmentMap[alignmentMotionControl],
      }}
    >
      {isPlaying ? (
        <IconResolver token='pauseMotion' />
      ) : (
        <IconResolver token='playMotion' />
      )}
    </button>
  )

  const wrapperStyles = {
    backgroundColor: theme.colors[backgroundToken],
    paddingTop,
    paddingBottom,
  }

  const ImageWrapperStyles = {
    ...wrapperStyles,
    display: "flex",
    justifyContent: alignment,
  }

  const MultiMediaWrapperStyles = {
    ...wrapperStyles,
    textAlign: alignment,
  }

  const ContentWrapper = fullWidth ? "div" : Wrapper

  const blockedVideoProperties = {
    role: "button",
    className: "block",
    tabIndex: 0,
    onClick: slideUpEvent,
    onKeyDown: (e) => {
      if (e.key === "Space" || e.key === "Enter") {
        slideUpEvent()
      }
    },
  }

  return (
    <>
      {image && (
        <ContentWrapper
          style={{
            backgroundColor: theme.colors[backgroundToken],
          }}
        >
          <div style={ImageWrapperStyles}>
            <Image
              className={`${widthColumns} ${isDropShadow}`}
              imageOptions={{ className: "h-full", objectFit: "contain" }}
              {...image}
            />
          </div>
        </ContentWrapper>
      )}
      {animationSrc && (
        <ContentWrapper
          style={{
            backgroundColor: theme.colors[backgroundToken],
            position: "relative",
          }}
        >
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={MultiMediaWrapperStyles}
          >
            <LottiePlayer
              className={`inline-block ${widthColumns} ${isDropShadow}`}
              animationSrc={animationSrc}
              autoplay={isPlaying}
              lottieRef={lottieRef}
            />
            {motionControl && <MotionControl />}
          </div>
        </ContentWrapper>
      )}
      {videoSrc && (
        <ContentWrapper
          style={{
            backgroundColor: theme.colors[backgroundToken],
          }}
        >
          <div
            className='relative'
            style={MultiMediaWrapperStyles}
            {...(isVideoBlocked && blockedVideoProperties)}
          >
            {/* Inert support is limited in react, so we need to add this way  */}
            <div
              inert={isVideoBlocked ? "" : undefined}
              className={`relative inline-block ${widthColumns} ${isDropShadow}`}
            >
              <EmbedVideo videoSrc={videoSrc.src} thumbnail={videoSrc.thumbnail} />
            </div>
          </div>
        </ContentWrapper>
      )}
    </>
  )
}

MultiMedia.propTypes = {
  alignment: PropTypes.oneOf(["left", "right", "center"]),
  alignmentMotionControl: PropTypes.oneOf(["left", "right", "center"]),
  animationSrc: PropTypes.string,
  animationStart: PropTypes.oneOf(["automatic", "hover, click"]),
  backgroundToken: PropTypes.string,
  columns: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  dropShadow: PropTypes.bool,
  image: PropTypes.string,
  motionControl: PropTypes.bool,
  paddingBottom: PropTypes.string,
  paddingTop: PropTypes.string,
  videoSrc: PropTypes.string,
  fullWidth: PropTypes.bool,
}

MultiMedia.defaultProps = {
  alignment: "left",
  alignmentMotionControl: "right",
  animationSrc: undefined,
  animationStart: "automatic",
  backgroundToken: "white",
  columns: 12,
  dropShadow: false,
  image: undefined,
  motionControl: false,
  paddingBottom: "64px",
  paddingTop: "64px",
  videoSrc: undefined,
  fullWidth: false,
}

export default MultiMedia
