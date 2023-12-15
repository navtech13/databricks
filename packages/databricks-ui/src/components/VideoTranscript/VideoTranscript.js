/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import { publishCustomEvent } from "./events"
import RichText from "../RichText"

const VideoTranscript = ({
  title,
  startTime,
  timeSeconds,
  transcript,
  timestamps,
  header,
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const handleMouseOver = () => {
    setIsHovering(true)
  }
  const handleMouseOut = () => {
    setIsHovering(false)
  }

  const setTime = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    publishCustomEvent("setTime", timeSeconds)
  }

  return (
    <section className='jus flex flex-col items-start gap-y-3'>
      <div className='flex flex-col gap-y-1' key={startTime}>
        <div className='flex flex-row items-center gap-x-1 '>
          {header && <h4 className='font-bold'>{title}</h4>}
          {timestamps && (
            <button
              type='button'
              onClick={setTime}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              className='bg-gray-warm-medium text-orange-04 text-1.75 flex flex-row rounded-2xl py-0.5 px-1 font-medium'
            >
              <IconResolver
                token={`${isHovering ? "transcriptPlayActive" : "transcriptPlay"}`}
              />
              <span className='text-navy-04 ml-0.5'>{startTime}</span>
            </button>
          )}
        </div>
        <RichText>{transcript}</RichText>
      </div>
    </section>
  )
}

VideoTranscript.propTypes = {
  title: PropTypes.string,
  startTime: PropTypes.string,
  transcript: PropTypes.string,
  timeSeconds: PropTypes.number,
  timestamps: PropTypes.bool,
  header: PropTypes.bool,
}

VideoTranscript.defaultProps = {
  title: "",
  startTime: "",
  transcript: "",
  timeSeconds: 0,
  timestamps: undefined,
  header: true,
}

export default VideoTranscript
