import React, { useState } from "react"
import PropTypes from "prop-types"
import Link from "../Link"
import Button from "../Button"
import TextLink from "../TextLink"
import Modal from "../Modal"
import EmbedVideo from "../EmbedVideo"

const CtaImageBlockCta = ({ cta, textLink }) => {
  const [isOpen, setIsOpen] = useState(false)
  const url = cta?.to || textLink?.to
  const isVideo = url?.includes("youtube.com") || url?.includes("vimeo.com")

  const preventDefault = (e) => {
    e.preventDefault()
    setIsOpen(true)
  }

  return (
    <>
      {cta && (
        <Button
          as={Link}
          variant='primary'
          className='mt-3 mr-auto inline-block'
          to={cta.to}
          {...(isVideo && { onClick: preventDefault })}
        >
          {cta.label}
        </Button>
      )}
      {textLink && (
        <TextLink
          variant='A'
          className='arrow-icon mt-3 block cursor-pointer'
          to={textLink.to}
          label={textLink.label}
          {...(isVideo && { onClick: preventDefault })}
        >
          {textLink.label}
        </TextLink>
      )}
      {isVideo && (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          <EmbedVideo videoSrc={url} />
        </Modal>
      )}
    </>
  )
}

CtaImageBlockCta.propTypes = {
  cta: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({ to: PropTypes.string, label: PropTypes.string }),
  ]),
  textLink: PropTypes.shape({ to: PropTypes.string, label: PropTypes.string }),
}

CtaImageBlockCta.defaultProps = {
  cta: undefined,
  textLink: undefined,
}

export default CtaImageBlockCta
