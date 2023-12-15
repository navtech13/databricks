import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import RichText from "../RichText"
import Button from "../Button"
import Link from "../Link"

const IndustryCard = ({ title, description, image, cta, logos }) => {
  return (
    <div
      data-cy='IndustryCard'
      className='shadow-card-normal mr-1 mb-2.5 flex flex-col bg-white p-2.5 lg:flex-row'
    >
      <div className='lg:border-gray-lines mb-2.5 lg:mb-0 lg:border-r lg:pr-2.5'>
        <Image className='max-w-[64px]' {...image} />
      </div>
      <div className='h-full w-full'>
        <div className='border-b-gray-lines border-b pb-2.5 lg:pl-2.5  lg:pr-2.5'>
          <div className='h4 mb-2.5'>{title}</div>
          <RichText className='mb-2.5'>{description}</RichText>
          <Button as={Link} to={cta.to} variant='primary'>
            {cta.label}
          </Button>
        </div>
        <div className='mt-2.5 flex items-center'>
          {logos?.map((logo) => (
            <div className='w-1/4' key={logo.id}>
              <Image imageOptions={{ className: "max-h-4 p-0.5" }} {...logo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

IndustryCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.shape({}).isRequired,
  cta: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
  }),
  logos: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

IndustryCard.defaultProps = {
  cta: undefined,
}

export default IndustryCard
