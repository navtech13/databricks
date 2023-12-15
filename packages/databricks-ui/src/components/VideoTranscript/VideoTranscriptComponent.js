/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import RichText from "../RichText"
import VideoTranscript from "./VideoTranscript"

const VideoTranscriptSection = ({
  transcripts,
  title,
  description,
  subTitle,
  hideLine,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <section
      data-cy='VideoTranscriptSection'
      className={`video-transcript ${!hideLine && "border-navy-01 border-t pt-4"}`}
    >
      <div className='flex flex-col items-start gap-y-3 lg:w-8/12'>
        {title && <h2>{title}</h2>}
        {subTitle && <h3>{subTitle}</h3>}
        {description && (
          <RichText className='b4 rich-text-body'>{description}</RichText>
        )}
        {isOpen &&
          transcripts.map((transcript) => (
            <VideoTranscript
              key={transcript?.startTime}
              title={transcript?.title}
              startTime={transcript?.startTime}
              transcript={transcript?.transcript}
              timeSeconds={transcript?.timeSeconds}
              header={transcript?.header}
              timestamps={transcript?.timestamps}
            />
          ))}
        <button
          onClick={handleClick}
          className={`${
            !isOpen && "hidden"
          } text-orange-04 b4 flex flex-row items-center gap-x-1 font-medium leading-6`}
          type='button'
        >
          <IconResolver token='minusCircle' />
          <span>Collapse full transcript</span>
        </button>
        <button
          onClick={handleClick}
          className={`${
            isOpen && "hidden"
          } text-orange-04 b4 flex flex-row items-center gap-x-1 font-medium leading-6`}
          type='button'
        >
          <IconResolver token='plusCircle' />
          <span>Expand full transcript</span>
        </button>
      </div>
    </section>
  )
}

VideoTranscriptSection.propTypes = {
  transcripts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      startTime: PropTypes.number,
      transcript: PropTypes.string,
      timeSeconds: PropTypes.number,
      timestamps: PropTypes.bool,
      header: PropTypes.bool,
    })
  ),
  title: PropTypes.string,
  subTitle: PropTypes.string,
  description: PropTypes.string,
  hideLine: PropTypes.bool,
}

VideoTranscriptSection.defaultProps = {
  title: "",
  subTitle: "",
  transcripts: [],
  description: "",
  hideLine: false,
}

export default VideoTranscriptSection
