import React from "react"
import PropTypes from "prop-types"
import PressRelease from "../PressRelease"
import Image from "../Image"

const Headline = ({ thumbnail, company, publishDate, title, link }) => {
  const dateOptions = {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  }
  return (
    <div
      data-cy='Headline'
      className='mb-2.5 flex max-w-[754px] flex-col lg:flex-row'
    >
      <div className='shadow-card-normal mr-4 mb-2.5 h-20 w-20 lg:mb-0'>
        <div className='flex h-20 w-20 bg-white p-2.5'>
          <Image
            src={thumbnail.url}
            alt={thumbnail.alt}
            imageContainerOptions='flex items-center'
          />
        </div>
      </div>
      <PressRelease
        className='ml-4'
        company={company}
        publishDate={publishDate}
        dateOptions={dateOptions}
        title={title}
        link={link}
        dateFormat='drupal'
      />
    </div>
  )
}

Headline.propTypes = {
  thumbnail: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
  company: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
}

export default Headline
