import React, { useState } from "react"
import PropTypes from "prop-types"
import Link from "../Link"
import Image from "../Image"
import MediaButton from "../ButtonGroups/MediaButton"
import EmbedVideo from "../EmbedVideo"

const PlaylistVideo = ({ items, rightVideo, ratio, ...props }) => {
  const [videoItem, setVideoItem] = useState(items[0])
  const mediaButtonWrapper = (
    <div aria-hidden className='absolute inset-2/4 -ml-4 -mt-4'>
      <MediaButton play={false} />
    </div>
  )
  return (
    <section
      data-cy='PlaylistVideo'
      className={`relative flex w-full flex-col items-stretch ${
        rightVideo ? "md:flex-row-reverse" : "md:flex-row"
      }`}
      {...props}
    >
      <div className='group h-full w-full md:w-8/12'>
        {videoItem.image ? (
          <Link className='relative' to={videoItem.video.to}>
            <Image {...videoItem.image} />
            {videoItem.mediaButton && mediaButtonWrapper}
          </Link>
        ) : (
          <div className='relative'>
            <EmbedVideo videoSrc={videoItem.video.to} />
          </div>
        )}
      </div>
      <div className='relative h-[324px] w-full md:h-auto md:w-4/12'>
        <div
          data-cy='tablist'
          role='tablist'
          className='scroll-bar drop-shadow-card-normal h-full w-full overflow-scroll overflow-x-hidden md:absolute md:w-11/12'
        >
          {items.map((item, i) => {
            const active = item.id === videoItem.id
            const nextIsActive = items[i + 1]?.id === videoItem.id
            return (
              <div
                key={item.id}
                className={`w-full px-2.5 pt-2.5 text-left transition-all ${
                  active
                    ? "bg-navy-06 text-white"
                    : "text-navy-06 hover:bg-gray-lines hover:text-navy-06 bg-white"
                }`}
              >
                <button
                  id={`tab-${item.id}`}
                  role='tab'
                  aria-controls={`panel-${item.id}`}
                  aria-selected={active}
                  type='button'
                  className={`w-full pb-2.5 text-left ${
                    !active && !nextIsActive ? "border-gray-lines border-b" : ""
                  }`}
                  onClick={() => setVideoItem(item)}
                >
                  {item.subtitle && (
                    <span className='b7 block'>{item.subtitle}</span>
                  )}
                  {item.title && <span className='h4 block'>{item.title}</span>}
                  {(item.description || item.footer) && (
                    <span
                      className={`mt-1 block ${!active ? "text-gray-text" : ""}`}
                    >
                      {item.description && (
                        <span className='h5 block'>{item.description}</span>
                      )}
                      {item.description && (
                        <span className='b7 block'>{item.footer}</span>
                      )}
                    </span>
                  )}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

PlaylistVideo.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      subtitle: PropTypes.string,
      description: PropTypes.string,
      footer: PropTypes.string,
      video: PropTypes.shape({
        label: PropTypes.string,
        to: PropTypes.string,
      }),
    })
  ).isRequired,
  rightVideo: PropTypes.bool,
  ratio: PropTypes.oneOf(["16:9", "4:3", "16:10"]),
}

PlaylistVideo.defaultProps = {
  rightVideo: false,
  ratio: "16:9",
}

export default PlaylistVideo
