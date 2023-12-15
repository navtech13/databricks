import React, { useState } from "react"
import PropTypes from "prop-types"
import { GatsbyImage } from "gatsby-plugin-image"
import { Modal } from ".."

const Image = ({
  caption,
  src,
  alt: preferredAlt,
  gatsbyData,
  imageOptions,
  imageContainerOptions,
  onClick,
  imageModal,
  imageModalOptions,
  placeholderRatio,
  variant,
  activeRole,	 
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  let alt = preferredAlt

  const altSetter = (urlpath) => {
    try {
      const filename = urlpath.split("/").pop().split(".").shift()
      alt = filename
    } catch (e) {
      console.log(e)
    }
  }
  if (gatsbyData && !alt) {
    if (gatsbyData.images?.fallback?.src) {
      altSetter(gatsbyData.images.fallback.src)
    }
  }

  if (src && !alt) {
    altSetter(src)
  }

  return (
    <>
      <figure {...props}>
        <div
          className={`h-full ${
            placeholderRatio ? "relative" : ""
          } ${imageContainerOptions}`}
          {...(onClick && {
            onClick,
            onKeyDown: (e) => {
              if (e.key === "Enter") {
                onClick(e)
              }
            },
            role: "button",
            tabIndex: 0,
          })}
        >
          {gatsbyData ? (
		    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <div
              className={`h-full ${imageModal ? "cursor-pointer" : ""}`}
              onClick={() => setIsOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsOpen(true)
                }
              }}
              {...(imageModal && {
                role: "button",
                tabIndex: 0,
              })}
			  {...(activeRole && {
                role: "button",
              })}
              tabIndex={-1}
				  
            >
              <GatsbyImage
                image={gatsbyData}
                alt={alt}
                data-ot-ignore='1'
                {...imageOptions}
              />
            </div>
          ) : (
            <>
              {placeholderRatio &&
                (variant === "icon" ? (
                  ""
                ) : (
                  <div style={{ paddingTop: `${placeholderRatio}%` }} />
                ))}
              <img
                alt={alt}
                src={src}
                data-ot-ignore='1'
                {...imageOptions}
                {...(variant === "icon"
                  ? ""
                  : placeholderRatio && {
                      className: "absolute top-0 w-full left-0",
                    })}
              />
            </>
          )}
        </div>
        {caption && (
          <figcaption className='b5 text-gray-dark mt-2 cursor-default'>
            {caption}
          </figcaption>
        )}
      </figure>
      {imageModal && (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
          {gatsbyData ? (
            <GatsbyImage
              image={gatsbyData}
              alt={alt}
              data-ot-ignore='1'
              {...imageModalOptions}
            />
          ) : (
            <img alt={alt} src={src} data-ot-ignore='1' {...imageOptions} />
          )}
        </Modal>
      )}
    </>
  )
}

Image.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  caption: PropTypes.string,
  imageOptions: PropTypes.shape({}),
  imageContainerOptions: PropTypes.string,
  gatsbyData: PropTypes.shape({
    images: PropTypes.shape({
      fallback: PropTypes.shape({
        src: PropTypes.string,
      }),
    }),
  }),
  onClick: PropTypes.func,
  placeholderRatio: PropTypes.number,
  imageModal: PropTypes.bool,
  imageModalOptions: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
  variant: PropTypes.string,
  activeRole: PropTypes.bool,
}

Image.defaultProps = {
  alt: "",
  imageOptions: {},
  imageContainerOptions: "",
  caption: undefined,
  src: undefined,
  gatsbyData: undefined,
  onClick: undefined,
  placeholderRatio: undefined,
  imageModal: undefined,
  imageModalOptions: undefined,
  variant: "",
  activeRole: false,
}

export default Image
