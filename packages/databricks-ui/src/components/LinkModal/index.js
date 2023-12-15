import React, { useState } from "react"
import PropTypes from "prop-types"
import TextLink from "../TextLink"
import Modal from "../Modal"
import EmbedVideo from "../EmbedVideo"

export default function LinkModal({ to, children, videoSource }) {
  const [isOpen, setIsOpen] = useState(false)

  return videoSource ? (
    <>
      <button
        className='b4 swiper-no-swiping text-orange-04 my-4 text-left md:my-2 '
        type='button'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='arrow-icon hover:underline'>{children}</span>
      </button>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        <EmbedVideo videoSrc={videoSource} />
      </Modal>
    </>
  ) : (
    <TextLink
      variant='A'
      className='my-4 after:ml-0.5 md:my-2'
      to={to}
      label={children}
    >
      <span className='arrow-icon b4'>{children}</span>
    </TextLink>
  )
}

LinkModal.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
  videoSource: PropTypes.string,
}
LinkModal.defaultProps = {
  to: null,
  videoSource: null,
}
