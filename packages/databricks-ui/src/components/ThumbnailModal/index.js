/* eslint-disable jsx-a11y/media-has-caption */
import React, { useState } from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import Modal from "../Modal"
import { useBreakpoint } from "../../utils/use-breakpoint"
import EmbedVideo from "../EmbedVideo"

const ThumbnailModal = ({
  alt,
  videoSrc,
  className,
  imageOptions,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const isTablet = useBreakpoint("md")

  if (!videoSrc && !isTablet && isOpen) {
    setIsOpen(false)
  }

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <>
      {children ? (
        <div
          className={`${
            videoSrc ? "cursor-pointer" : "md:cursor-zoom-in"
          } ${className}`}
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick()
            }
          }}
          role='button'
          tabIndex='0'
          {...props}
        >
          {children}
        </div>
      ) : (
        <Image
          className={`${
            videoSrc ? "cursor-pointer" : "md:cursor-zoom-in"
          } ${className}`}
          alt={alt}
          onClick={handleClick}
          imageOptions={imageOptions}
          {...props}
        />
      )}
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        {videoSrc ? (
          <EmbedVideo videoSrc={videoSrc} alt={alt} />
        ) : (
          <Image
            onClick={() => setIsOpen(false)}
            alt={alt}
            className={`h-full w-full bg-white p-4 lg:px-8 lg:py-6 ${className}`}
            imageOptions={{
              ...imageOptions,
              className: `object-contain h-full ${imageOptions?.className || ""}`,
              imgStyle: { objectFit: "contain" },
            }}
            {...props}
          />
        )}
      </Modal>
    </>
  )
}

ThumbnailModal.propTypes = {
  alt: PropTypes.string,
  videoSrc: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  imageOptions: PropTypes.shape({ className: PropTypes.string }),
}

ThumbnailModal.defaultProps = {
  alt: "",
  imageOptions: undefined,
  videoSrc: undefined,
  className: "",
  children: null,
}

export default ThumbnailModal
