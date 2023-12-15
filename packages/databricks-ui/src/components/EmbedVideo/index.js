import React, { useState, useContext } from "react"
import PropTypes from "prop-types"
import eventTracking from "gatsby-theme-databricks-drupal/src/helpers/eventTracking"
import useTranslate from "gatsby-theme-databricks-drupal/src/utils/translate"
import ReactPlayer from "react-player/lazy"
import {
  VIDEO_PROVIDER_VIMEO,
  VIDEO_PROVIDER_YOUTUBE,
} from "gatsby-theme-databricks-drupal/src/helpers/constants"
import { Image, MediaButton } from "../../components"
import BaseLayoutContext from "../BaseLayout/BaseLayoutContext"

const EmbedVideo = ({ videoSrc, thumbnail, className }) => {
  const { translate } = useTranslate()
  const { cookiesConsent } = useContext(BaseLayoutContext)
  const completionThreshold = 85 // threshold in percentage watched to track as complete
  const [duration, setDuration] = useState(0)
  const [watched, setWatched] = useState(false) // flag to only mark watched one time
  const [videoCurrentPosition, setVideoCurrentPosition] = useState(0)
  const [playing, setPlaying] = useState(false)
  let provider = "none"
  let objPlayer = null

  if (videoSrc?.includes("youtube")) {
    provider = VIDEO_PROVIDER_YOUTUBE
  } else if (videoSrc?.includes("vimeo.com")) {
    provider = VIDEO_PROVIDER_VIMEO
  }

  function openOneTrust() {
    if (typeof window.OneTrust !== "undefined") {
      // eslint-disable-next-line no-undef
      window.OneTrust.ToggleInfoDisplay()
    }
  }

  async function getVideoName(player) {
    let name = null
    if (provider === VIDEO_PROVIDER_YOUTUBE) {
      name = player?.videoTitle
    } else if (provider === VIDEO_PROVIDER_VIMEO) {
      name = await player?.getVideoTitle().then((title) => {
        return title
      })
    }
    return name
  }

  const handleProgress = (state) => {
    if (duration && duration > 0) {
      setVideoCurrentPosition(state.playedSeconds)
      const viewedPercentage = state.playedSeconds / duration
      if (viewedPercentage >= completionThreshold * 0.01 && !watched) {
        setWatched(true)
        getVideoName(objPlayer.getInternalPlayer()).then((name) => {
          const eventData = {
            event: "Video Completed",
            videoUrl: videoSrc,
            videoName: name,
            videoDuration: Math.round(duration),
            videoCurrentPosition: Math.round(state.playedSeconds),
            videoSource: provider,
          }
          eventTracking(eventData)
        })
      }
    }
  }

  const handleDuration = (durationValue) => {
    setDuration(durationValue)
  }

  function getPauseDistance(currentTime, durationValue) {
    let pauseDistance = 0
    if (currentTime > 0 && durationValue > 0) {
      pauseDistance = Math.round((currentTime / durationValue) * 100)
    }
    return pauseDistance
  }

  const handlePause = () => {
    if (duration && duration > 0) {
      const pauseDistance = getPauseDistance(
        Math.round(videoCurrentPosition),
        Math.round(duration)
      )
      getVideoName(objPlayer.getInternalPlayer()).then((name) => {
        const eventData = {
          event: "Video Paused",
          videoUrl: videoSrc,
          videoName: name,
          videoDuration: Math.round(duration),
          videoCurrentPosition: Math.round(videoCurrentPosition),
          videoPauseDistance: pauseDistance,
          videoSource: provider,
        }
        eventTracking(eventData)
      })
    }
  }

  const handlePlay = () => {
    getVideoName(objPlayer.getInternalPlayer()).then((name) => {
      const eventData = {
        event: "Video Played",
        videoUrl: videoSrc,
        videoName: name,
        videoDuration: Math.round(duration),
        videoCurrentPosition: Math.round(videoCurrentPosition),
        videoSource: provider,
      }
      eventTracking(eventData)
    })
  }

  const ref = (player) => {
    objPlayer = player
  }

  if (!videoSrc) {
    return <></>
  }

  return (
    <>
      <div className={`bg-navy-06 relative pt-[56.25%] ${className}`}>
        <ReactPlayer
          url={videoSrc}
          key={videoSrc}
          ref={ref}
          controls
          playing={playing}
          muted={false}
          className='absolute top-0 left-0'
          width='100%'
          height='100%'
          light={!cookiesConsent}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onPause={handlePause}
          onPlay={handlePlay}
          config={{
            vimeo: {
              playerOptions: {
                playsinline: true,
              },
            },
          }}
        />
      </div>
      {!cookiesConsent && (
        <div className='absolute inset-0 h-full w-full'>
          <div className='nocookies-overlay grid h-full w-full place-items-center bg-white bg-opacity-75'>
            <button
              type='button'
              className='btn-secondary cursor-pointer py-1 px-2.5'
              onClick={openOneTrust}
            >
              {translate("general.youtube-privacy-accept")}
            </button>
          </div>
        </div>
      )}
      {thumbnail && (
        <>
          <button
            type='button'
            className={`absolute inset-0 z-10 h-full w-full ${
              playing ? "media-player" : ""
            }`}
            onClick={() => setPlaying(true)}
          >
            <Image
              className='h-full w-full'
              imageOptions={{ className: "h-full" }}
              {...thumbnail}
            />
          </button>
          <MediaButton
            handleClick={() => setPlaying(true)}
            play={false}
            className={`shadow-card-normal absolute inset-0 top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform ${
              playing ? "media-player" : ""
            }`}
          />
        </>
      )}
    </>
  )
}

EmbedVideo.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  className: PropTypes.string,
  thumbnail: PropTypes.objectOf(PropTypes.shape({})),
}

EmbedVideo.defaultProps = {
  className: "",
  thumbnail: undefined,
}

export default EmbedVideo
