import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Image from "../Image"

const HeroCampaign = ({ title, description, eyebrow, image }) => {
  return (
    <div className='bg-navy-05'>
      <section
        className='xxl:max-w-[1456px] mx-auto flex w-11/12 max-w-[508px] flex-col items-center justify-between text-white md:max-w-[704px] md:flex-row md:pt-0 lg:max-w-[966px] xl:max-w-[1146px] '
        data-cy='HeroCampaign'
      >
        <div className='max-w-[556px] pt-6 pb-4 md:mr-6 md:w-7/12 md:py-4 lg:w-8/12'>
          <RichText className='h5 text-yellow-02 pb-2 font-bold'>{eyebrow}</RichText>
          <RichText className='h2 pb-2'>{title}</RichText>
          <RichText className='h4'>{description}</RichText>
        </div>
        <div className='w-full md:w-5/12 lg:w-4/12'>
          <Image className='w-auto' {...image} />
        </div>
      </section>
    </div>
  )
}

HeroCampaign.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  eyebrow: PropTypes.string,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
}

HeroCampaign.defaultProps = {
  eyebrow: undefined,
  image: undefined,
}

export default HeroCampaign
