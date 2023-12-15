import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Button from "../Button"
import Image from "../Image"
import LogoStrip from "../LogoStrip"

const FeaturedIndustryCard = ({ title, content, cta, logos, icon }) => {
  return (
    <div
      data-cy='FeaturedIndustryCard'
      className='shadow-card-normal mr-1 mb-2.5 flex w-full flex-col bg-white p-2.5 lg:flex-row'
    >
      <div className='lg:border-gray-lines mb-2.5 lg:mb-0 lg:border-r lg:pr-2.5'>
        <Image className='h-8 w-8' {...icon} />
      </div>
      <div className='flex h-full w-full flex-col'>
        <div className='border-b-gray-lines flex h-full flex-col items-start border-b pb-2.5 lg:pl-2.5 lg:pr-2.5'>
          <RichText className='text-2.5 mb-2.5'>{title}</RichText>
          <RichText className='mb-2.5'>{content}</RichText>
          <Button className='mt-auto' href={cta.link}>
            {cta.label}
          </Button>
        </div>
        {logos.length > 0 && (
          <LogoStrip logos={logos} variant='featuredIndustryCard' />
        )}
      </div>
    </div>
  )
}

FeaturedIndustryCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  content: PropTypes.string,
  cta: PropTypes.shape({
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
  logos: PropTypes.arrayOf(PropTypes.shape()),
  icon: PropTypes.node.isRequired,
}

FeaturedIndustryCard.defaultProps = {
  content: ``,
  cta: PropTypes.shape({
    label: "Learn how",
    link: ``,
  }),
  logos: [
    {
      company: "",
      name: "Deloitte",
    },
  ],
}

export default FeaturedIndustryCard
