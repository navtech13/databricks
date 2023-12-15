import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import PropTypes from "prop-types"
import Image from "../../Image"
import { checkCookieConsent } from "gatsby-theme-databricks-drupal/src/helpers/eventTracking"
import getQueryParam from "gatsby-theme-databricks-drupal/src/helpers/getQueryParam"
import useTranslate from "gatsby-theme-databricks-drupal/src/utils/translate"

// This component is a workaround until we solve the issue of the EmbedVideo component
// not working if more than one are added to a single page. It has the required logic
// for user's consent

const VideoTabsPlayer = ({ videoSrc, image }) => {
  const [showThumbnail, setShowThumbnail] = useState(true)
  const [showCookieOverlay, setShowCookieOverlay] = useState(true)
  const [videoUrl, setVideoUrl] = useState(videoSrc)
  const { translate } = useTranslate()

  const playVideo = () => {
    setShowThumbnail(false)

    if (
      videoSrc.includes("vimeo") ||
      videoSrc.includes("youtube") ||
      videoSrc.includes("youtu.be")
    ) {
      const newUrl = new URL(videoUrl)
      newUrl.searchParams.append("autoplay", 1)
      setVideoUrl(newUrl.toString())
    }
  }

  useEffect(() => {
    const loadVideo = () => {
      const oneTrustCookie = Cookies.get("OptanonConsent")
      if (
        (typeof oneTrustCookie !== "undefined" &&
          getQueryParam("groups", oneTrustCookie)) ||
        !window.location.hostname.includes("databricks.com")
      ) {
        if (
          (checkCookieConsent("C0002") && checkCookieConsent("C0004")) ||
          !window.location.hostname.includes("databricks.com")
        ) {
          // load youtube if cookie consented
          setShowCookieOverlay(false)
        } else {
          // rejected cookies, add prompt to accept
          setShowCookieOverlay(true)
        }
      } else {
        setTimeout(loadVideo, 300)
      }
    }
    const addOneTrustConsentChangedEvent = () => {
      if (typeof OneTrust !== "undefined") {
        window.OneTrust.OnConsentChanged(() => {
          loadVideo()
        })
      } else {
        setTimeout(addOneTrustConsentChangedEvent, 300)
      }
    }
    loadVideo()
    addOneTrustConsentChangedEvent()
  }, [])

  const isYoutube = videoUrl
  const url = new URL(videoUrl)
  if (isYoutube) {
    url.hostname = url.hostname.replace("youtube", "youtube-nocookie")
  }

  const openOneTrust = () => {
    if (typeof OneTrust !== "undefined") {
      // eslint-disable-next-line no-undef
      OneTrust.ToggleInfoDisplay()
    }
  }

  if (showCookieOverlay) {
    return (
      <div className='bg-navy-06 relative pt-[56.25%]'>
        <div className='absolute inset-0 h-full w-full'>
          {showCookieOverlay && (
            <div className='nocookies-overlay grid h-full w-full place-items-center bg-white bg-opacity-75'>
              <button
                type='button'
                className='btn-secondary cursor-pointer py-1 px-2'
                onClick={openOneTrust}
              >
                {translate("general.youtube-privacy-accept")}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {showThumbnail && (
        <button type='button' onClick={() => playVideo()}>
          <Image {...image} />
        </button>
      )}
      {!showThumbnail && (
        <iframe
          width='100%'
          className={`bg-gray-text aspect-video ${
            showThumbnail ? "hidden" : "block"
          } `}
          src={url.toString()}
          title='Video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        />
      )}
    </div>
  )
}

VideoTabsPlayer.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  image: PropTypes.shape.isRequired,
}

VideoTabsPlayer.defaultProps = {}

export default VideoTabsPlayer
