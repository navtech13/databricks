import React from "react"
import PropTypes from "prop-types"
import { ArrowRight } from "../IconResolver/CustomIcons"
import Link from "../Link"

const PublicationCard = ({ eyebrow, title, description, linkText, linkUrl }) => {
  return (
    <div className='mx-auto flex max-w-xs flex-col justify-between bg-white p-3 md:mx-0'>
      <div className='pb-3'>
        <span className='text-1.4'>{eyebrow}</span>
        <h4 className='text-navy-800 break-words py-2 font-bold'>{title}</h4>
        <p>{description}</p>
      </div>
      {linkUrl && (
        <Link to={linkUrl} className='flex items-center gap-1 text-blue-700'>
          {linkText}
          <ArrowRight />
        </Link>
      )}
    </div>
  )
}

PublicationCard.propTypes = {
  eyebrow: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  linkUrl: PropTypes.string,
}

PublicationCard.defaultProps = {
  linkText: "Learn more",
  linkUrl: "",
}

export default PublicationCard
