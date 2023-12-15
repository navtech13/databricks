import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import ThumbnailModal from "../ThumbnailModal"
import Wrapper from "../Wrapper"
import Image from "../Image"
import Link from "../Link"
import { generateCTAs } from "../../utils/generateCTAs"

const CtaVideoBlock = ({
  children,
  title,
  image,
  placeholderImage,
  cta,
  variant,
  video,
}) => {
  const variants = {
    imageLeft: {
      wrapper: "flex-col-reverse md:flex-row-reverse",
    },
    imageRight: {
      wrapper: "flex-col-reverse md:flex-row",
    },
  }

  return (
    <Wrapper className='component-ctavideoblock'>
      <div
        data-cy='CtaVideoBlock'
        className={`flex flex-col justify-between md:flex-row ${variants[variant]?.wrapper}`}
      >
        {children && (
          <div className='w-full md:w-6/12'>
            {title && (
              <div className='flex content-center'>
                {image?.src && (
                  <Image
                    alt={image.alt}
                    src={image.src}
                    className='w-25 pr-2.5 pb-2.5'
                  />
                )}
                <h2 className='h2 mb-2'>{title}</h2>
              </div>
            )}
            <RichText>{children}</RichText>
            <div className='mt-5 flex flex-col items-start gap-2.5 md:flex-row md:gap-4'>
              {generateCTAs(cta, Link)}
            </div>
          </div>
        )}
        <div className={`w-full py-3 ${children ? "md:w-5/12 " : " "}md:py-0`}>
          <ThumbnailModal
            alt={video.title}
            {...placeholderImage}
            videoSrc={video.src}
          />
        </div>
      </div>
    </Wrapper>
  )
}

CtaVideoBlock.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  image: PropTypes.shape({}),
  placeholderImage: PropTypes.shape({}).isRequired,
  video: PropTypes.shape({
    title: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  cta: PropTypes.shape({
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  variant: PropTypes.string,
}

CtaVideoBlock.defaultProps = {
  variant: "imageRight",
  cta: undefined,
}

export default CtaVideoBlock
