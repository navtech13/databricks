import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import Link from "../Link"
import RichText from "../RichText"

const LargeCustomerCard = ({
  logo,
  stat,
  context,
  description,
  headline,
  image,
  cta,
}) => {
  const Component = cta?.to ? Link : "div"
  return (
    <Component
      data-cy='LargeCustomerCard'
      className='bg-oat-light group-arrow-icon-tertiary text-navy-800 hover:text-navy-800 group flex h-full flex-col hover:no-underline lg:flex-row'
      {...(cta?.to && { to: cta.to })}
    >
      <div className='flex flex-col p-4 lg:flex-1'>
        {logo && (
          <Image
            className='h-[48px] max-h-[48px] max-w-[200px] xl:max-w-[300px]'
            imageOptions={{
              className: "h-full object-left object-contain",
            }}
            {...logo}
            placeholderRatio={null}
          />
        )}
        <div className='row-col border-gray-lines flex flex-col justify-end border-b pb-2 pt-4 lg:pb-3 lg:pt-6 xl:flex-row xl:items-end xl:justify-start'>
          {stat && (
            <span className='text-6 pb-1 font-mono leading-none xl:pr-3 xl:pb-0 xl:text-[88px]'>
              {stat?.substr(0, 5)}
            </span>
          )}
          {context && (
            <span className='xl:text-2.5 text-2 max-w-[240px] pb-0.5 font-medium leading-tight xl:max-w-[240px] xl:pb-1 xl:leading-tight'>
              {context}
            </span>
          )}
        </div>
        <div className='max-w-[560px] flex-1'>
          {headline && (
            <RichText className='text-3 xl:text-4 pt-2 font-medium leading-tight lg:pt-3 lg:leading-7 xl:leading-tight'>
              {headline}
            </RichText>
          )}
          {description && (
            <RichText className='rich-text-body text-gray-text text-2 hidden pt-3 leading-normal xl:block'>
              {description}
            </RichText>
          )}
        </div>
        <span className='arrow-icon-tertiary mt-3 block overflow-hidden leading-none text-blue-700 lg:mt-4 xl:mt-6'>
          {cta?.label}
        </span>
      </div>
      <div className='xxl:w-6/12 relative overflow-hidden lg:w-6/12 xl:w-5/12'>
        {image && (
          <Image
            className='duration-250 ease-curve-ease h-[180px] w-full transition-transform group-hover:scale-105 lg:absolute lg:h-full'
            imageOptions={{
              className: "h-full object-cover",
            }}
            {...image}
          />
        )}
      </div>
    </Component>
  )
}

LargeCustomerCard.propTypes = {
  logo: PropTypes.shape({}),
  cta: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
  }),
  stat: PropTypes.string,
  description: PropTypes.node,
  context: PropTypes.string,
  image: PropTypes.shape({}),
  headline: PropTypes.string,
}

LargeCustomerCard.defaultProps = {
  logo: undefined,
  stat: undefined,
  description: undefined,
  context: undefined,
  cta: undefined,
  image: undefined,
  headline: undefined,
}

export default LargeCustomerCard
