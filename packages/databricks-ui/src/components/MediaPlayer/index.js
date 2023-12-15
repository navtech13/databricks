import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import Wrapper from "../ContentWrapper"

import "./styles.css"

const MediaPlayer = ({ autoplay, controls, fullWidth, image, muted, videoSrc }) => {
  const [videoType, setVideoType] = useState("")
  const [startVideo, setStartVideo] = useState(autoplay)
  const videoRef = useRef()

  let { vimeoUrl, vimeoThumbnail, youtubeUrl, youtubeThumbnal, maxRedYoutubeThumbnail } = ""

  useEffect(() => {
    if (startVideo && videoRef.current) {
      videoRef.current.play()
    }
  }, [videoRef, startVideo])

  useEffect(() => {
    const getVideoType = () => {
      if (videoSrc.includes("vimeo")) {
        setVideoType("vimeo")
      }

      if (videoSrc.includes("youtube") || videoSrc.includes("youtu.be")) {
        setVideoType("youtube")
      }

      if (
        !videoSrc.includes("vimeo") &&
        !videoSrc.includes("youtube") &&
        !videoSrc.includes("youtu.be")
      ) {
        setVideoType("cmsVideo")
      }
    }
    getVideoType()
  }, [])

  if (videoType === "vimeo") {
    const vimeoRegEx = /(videos|video|channels|\.com)\/([\d]+)/
    const vimeoId = videoSrc.match(vimeoRegEx)[2]
    vimeoUrl = `https://player.vimeo.com/video/${vimeoId}?autoplay=${
      autoplay || startVideo ? 1 : 0
    }&muted=${muted ? 1 : 0}&controls=${controls ? 1 : 0}`
    vimeoThumbnail = `https://vumbnail.com/${vimeoId}.jpg`
  }

  if (videoType === "youtube") {
    const youtubeRegEx =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?(.+)/
    const youtubeId = videoSrc.match(youtubeRegEx)[1]
    youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=${
      autoplay || startVideo ? 1 : 0
    }&mute=${muted ? 1 : 0}&controls=${controls ? 1 : 0}&rel=0`
    youtubeThumbnal = `https://img.youtube.com/vi/${youtubeId}/0.jpg`
    maxRedYoutubeThumbnail = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`
  }

  const ContentWrapper = fullWidth ? "div" : Wrapper

  const ImageComponent = ({ ...props }) => {
    // the component is hidden if no custom image is provided
    // if the autoplay is enabled, the image will be shown
    // and fade out
    const imgStyles = `absolute top-0 left-0 h-full w-full object-cover ${
      (!autoplay && startVideo) || !image ? "hidden" : ""
    } ${autoplay ? "multimedia media-player" : ""}`

    if (image) {
      return (
        <Image
          className={imgStyles}
          {...image}
          {...props}
          imageOptions={{ className: imgStyles }}
        />
      )
    }

    if (!image) {
      return (
        <img
          className={imgStyles}
          alt={videoType === "vimeo" ? "vimeo-thumbnail" : "youtube-thumbnail"}
          src={videoType === "vimeo" ? vimeoThumbnail : youtubeThumbnal}
        />
      )
    }
    return null
  }

  const videoStyles = "relative pt-[56.25%] top-0 left-0 h-full w-full"

  return (
    <ContentWrapper>
      <div className='multimedia relative w-full overflow-hidden'>
        {videoType === "cmsVideo" ? (
          <div className={videoStyles}>
            <video
              ref={videoRef}
              className='absolute inset-0 h-full w-full'
              autoPlay={autoplay}
              controls={controls}
              muted={muted}
              width='100%'
              height='100%'
            >
              <source src={videoSrc} type='video/mp4' />
            </video>
          </div>
        ) : (
          <div className={videoStyles}>
            <iframe
              className='absolute inset-0 h-full w-full'
              src={vimeoUrl || youtubeUrl}
              width='100%'
              height='100%'
              title='video player'
            />
          </div>
        )}
        <button
          type='button'
          onClick={() => {
            setStartVideo(true)
          }}
        >
          <ImageComponent />
        </button>
      </div>
    </ContentWrapper>
  )
}

MediaPlayer.propTypes = {
  autoplay: PropTypes.bool,
  controls: PropTypes.bool,
  fullWidth: PropTypes.bool,
  image: PropTypes.shape({}),
  muted: PropTypes.bool,
  videoSrc: PropTypes.string.isRequired,
}

MediaPlayer.defaultProps = {
  autoplay: false,
  controls: true,
  fullWidth: false,
  image: undefined,
  muted: true,
}

export default MediaPlayer
