import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import Button from "../Button"
import Link from "../Link"
import IconResolver from "../IconResolver"

const IndustryCardItems = ({
  title,
  image,
  ctaLink,
  ctaLabel,
  type,
  relatedLinks,
}) => {
  return (
    <div
      data-cy='IndustryCardItems'
      className='shadow-card-normal mb-2.5 bg-white p-2.5 md:p-4'
    >
      <div className='border-b-gray-lines flex flex-col items-start justify-between border-b pb-2.5 md:flex-row md:items-center md:pb-5'>
        <div className='flex w-full items-center'>
          {image && <Image className='mr-2 w-full max-w-[64px]' {...image} />}
          {type && !image && (
            <IconResolver className='mr-2 max-w-[64px]' token={type} />
          )}
          <div className='text-color-navy-06 h3 ml-2'>{title}</div>
        </div>
        <Button
          className='b4 mt-2.5 py-1 px-4 md:mt-0'
          as={Link}
          to={ctaLink}
          variant='secondary'
        >
          {ctaLabel}
        </Button>
      </div>
      <div className='mt-2.5 flex flex-col md:mt-4 md:flex-row md:flex-wrap'>
        {relatedLinks?.map((info) => (
          <div
            className='mb-4 flex w-full flex-col last:mb-0 md:mb-0 md:w-1/2 lg:w-1/3'
            key={info.entity.uuid}
          >
            <div className='text-navy-04 text-1.5 mb-2 font-bold uppercase'>
              {info.entity.fieldTitle}
            </div>
            <ul>
              {info.entity.fieldLinks?.map((link) => (
                <li key={link.id} className='mb-0.5'>
                  <Link
                    className='text-navy-06 hover:text-navy-03 cursor-pointer'
                    to={link.url.path}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

IndustryCardItems.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({}).isRequired,
  type: PropTypes.shape({}).isRequired,
  cta: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
  }),
  information: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  ctaLink: PropTypes.string,
  ctaLabel: PropTypes.string,
  relatedLinks: PropTypes.arrayOf(PropTypes.shape()),
}

IndustryCardItems.defaultProps = {
  cta: undefined,
  ctaLink: "",
  ctaLabel: "",
  relatedLinks: [],
}

export default IndustryCardItems
