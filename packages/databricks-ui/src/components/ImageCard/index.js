import React from "react"
import PropTypes from "prop-types"
import TextLink from "../TextLink"
import RichText from "../RichText"
import Image from "../Image"

const ImageCard = ({ thumbnail, subtitle, title, content, cta }) => {
  return (
    <div
      data-cy='ImageCard'
      className='shadow-card-normal hover:shadow-card-hover-accent md:w-30 flex h-full w-full flex-col bg-white lg:w-full'
    >
      <div className='flex'>
        <Image className='w-full' src={thumbnail.url} {...thumbnail} />
      </div>
      <div className='flex h-full flex-col p-4'>
        <h6 className='mb-2.5'>{subtitle}</h6>
        <h4 className='mb-2.5 font-bold'>{title}</h4>
        {content !== "" && <RichText className='mb-2.5'>{content}</RichText>}
        <div className='mt-auto'>
          <TextLink className='arrow-icon' variant='A' to={cta.uri}>
            Read
          </TextLink>
        </div>
      </div>
    </div>
  )
}

ImageCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.string,
  thumbnail: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
  cta: PropTypes.shape({
    uri: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
}

ImageCard.defaultProps = {
  content: "",
}

export default ImageCard
