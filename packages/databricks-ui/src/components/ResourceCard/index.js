import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Image from "../Image"

const ResourceCard = ({
  title,
  blurb,
  type,
  link,
  thumbnail,
  gatsbyData,
  onClick,
}) => {
  return (
    <div
      data-cy='ResourceCard'
      className='shadow-card-normal border-gray-cool hover:shadow-card-hover-accent flex cursor-pointer flex-col bg-white transition-shadow delay-75 duration-75 ease-linear hover:no-underline'
    >
      <a
        className='hover:no-underline'
        href={link}
        target='_blank'
        rel='noreferrer'
        onClick={onClick}
      >
        <div className='h-full'>
          <Image src={thumbnail} gatsbyData={gatsbyData} />
          <div className='flex flex-col p-2'>
            <div className='mt-auto flex'>
              <RichText className='text-gray-text text-1.25 mb-1'>{type}</RichText>
            </div>
            <RichText className='text-navy-06 leading-tight'>
              {blurb || title}
            </RichText>
          </div>
        </div>
      </a>
    </div>
  )
}

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  blurb: PropTypes.string,
  type: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  gatsbyData: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

ResourceCard.defaultProps = {
  blurb: undefined,
  onClick: () => {},
}

export default ResourceCard
