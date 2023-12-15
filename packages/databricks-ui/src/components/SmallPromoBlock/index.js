import React from "react"
import PropTypes from "prop-types"
import Link from "../Link"
import Image from "../Image"
import RichText from "../RichText"
import "./style.css"

const SmallPromoBlock = ({ title, image, cta, description }) => {
  return (
    <div className='bg-orange-200'>
      <div className='small-promo lg:inner-wrapper flex w-full flex-col items-center justify-center gap-3 py-3 align-middle md:py-4 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:py-0'>
        <div className='lg:inner-wrapper inner-wrapper flex h-full flex-col justify-end gap-1 text-left sm:gap-0 md:m-0 md:w-full md:p-0 lg:m-0 lg:w-[140%] xl:w-full'>
          <h4 className=' text-2.5 lg:text-3 font-medium md:hidden'>{title}</h4>
          <div className='flex flex-row items-end gap-3 md:justify-between lg:items-center lg:gap-4'>
            <div>
              <h4 className='text-2.5 lg:text-3 hidden font-medium md:block'>
                {title}
              </h4>
              <RichText className='text-2 font-normal'>{description}</RichText>
            </div>
            <Link
              className='bg-navy-800 border-navy-800 hover:border-navy-500 p-1.6 text-1.6 hover:btn-tertiary inline-block border font-medium leading-none text-white transition-colors duration-200 hover:no-underline'
              to={cta.to}
            >
              {cta.label}
            </Link>
          </div>
        </div>
        <div className='inner-wrapper h-[112px] w-full rounded-[56px] md:block lg:m-0  '>
          <Image
            imageContainerOptions='rounded-[56px]'
            imageOptions={{
              className: "h-full rounded-[56px]",
            }}
            {...image}
          />
        </div>
      </div>
    </div>
  )
}
SmallPromoBlock.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  cta: PropTypes.shape({
    label: PropTypes.string,
    to: PropTypes.string,
  }),
}

SmallPromoBlock.defaultProps = {
  title: "Small Promo Block",
  description: "Your short subtext goes here and is limited to 64 characters.",
  cta: {
    label: "Learn More",
    to: "/",
  },
}

export default SmallPromoBlock
