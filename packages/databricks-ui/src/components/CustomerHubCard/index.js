import PropTypes from "prop-types"
import React from "react"
import Tippy from "@tippyjs/react/headless"
import Link from "../Link"
import Image from "../Image"
import RichText from "../RichText"
import TextLink from "../TextLink"

const CustomerHubCard = ({
  logoImage,
  cta,
  description = "",
  withTooltip,
  tooltipContent,
  tooltipCta,
  className,
}) => {
  return (
    <>
      {description || cta ? (
        <Link
          data-cy='CustomerHubCard'
          className={`h5 hover:shadow-legacy-card-hover-accent min-h-25 group flex h-full min-h-[216px] w-full min-w-full flex-col items-center justify-between bg-white px-2 py-2.5 leading-5 hover:no-underline ${className}`}
          variant='B'
          to={cta?.to}
          label={cta?.text || description}
        >
          {withTooltip ? (
            <Tippy
              arrow
              interactive
              placement='right'
              render={(attrs) => (
                <div
                  className='tooltip text-1.75 shadow-card-hover text-navy-05 z-50 m-2 hidden max-w-lg break-words rounded-md bg-white  p-2.5 text-left md:block'
                  tabIndex='-1'
                  {...attrs}
                >
                  <div className='arrow' data-popper-arrow />
                  {tooltipContent && (
                    <RichText className='my-2'>{tooltipContent}</RichText>
                  )}
                  {tooltipCta && (
                    <TextLink className=' mt-1' to={tooltipCta.to} variant='A'>
                      {tooltipCta.text}
                    </TextLink>
                  )}
                </div>
              )}
            >
              <div className='divide-gray-lines flex h-full w-full flex-col gap-2.5 divide-y-2 '>
                <div className=' h6 flex items-center justify-center '>
                  <Image
                    className='w-16'
                    imageOptions={{ className: "h-8", objectFit: "contain" }}
                    {...logoImage}
                  />
                </div>
                <div className='text-gray-text flex h-full w-full  flex-col justify-end gap-1 pt-2.5'>
                  {description && (
                    <RichText className='line-clamp-2'>{description}</RichText>
                  )}
                  {cta?.text && (
                    <span className=' group-hover:text-orange-04 text-nav-gray arrow-icon group bottom-0 w-full'>
                      {cta.text}
                    </span>
                  )}
                </div>
              </div>
            </Tippy>
          ) : (
            <div className='divide-gray-lines flex h-full w-full flex-col gap-2.5 divide-y-2 '>
              <div className=' h6 flex items-center justify-center '>
                <Image
                  className='w-16'
                  imageOptions={{ className: "h-8", objectFit: "contain" }}
                  {...logoImage}
                />
              </div>
              <div className='b5 text-gray-text flex h-full w-full  flex-col justify-end gap-1 pt-2.5'>
                {description && (
                  <RichText className='line-clamp-2 md:line-clamp-3 lg:line-clamp-2'>
                    {description}
                  </RichText>
                )}
                {cta?.text && (
                  <span className='b5 group-hover:text-orange-04 text-nav-gray arrow-icon group bottom-0 w-full'>
                    {cta.text}
                  </span>
                )}
              </div>
            </div>
          )}
        </Link>
      ) : (
        <div
          data-cy='CustomerHubCard NoCTA'
          className='h5 group flex h-full min-h-[216px] w-full min-w-full flex-col items-center justify-between leading-5 hover:no-underline'
        >
          {withTooltip ? (
            <Tippy
              arrow
              placement='right'
              render={(attrs) => (
                <div
                  className=' tooltip text-1.75 shadow-card-hover text-navy-05 m-2 hidden max-w-lg break-words rounded-md bg-white  p-2.5 text-left md:block'
                  tabIndex='-1'
                  {...attrs}
                >
                  <div className='arrow' data-popper-arrow />
                  {tooltipContent && (
                    <RichText className='my-2'>{tooltipContent}</RichText>
                  )}

                  {tooltipCta?.text && (
                    <TextLink to={tooltipCta.to} variant='A'>
                      {tooltipCta.text}
                    </TextLink>
                  )}
                </div>
              )}
            >
              <div className='bg-gray-warm-light flex h-full w-full  items-center justify-center p-2.5'>
                <Image
                  className='h-8 w-16'
                  imageOptions={{ className: "h-8", objectFit: "contain" }}
                  {...logoImage}
                />
              </div>
            </Tippy>
          ) : (
            <div
              className={`bg-gray-warm-light flex h-full w-full  items-center justify-center p-2.5 ${className}`}
            >
              <Image
                className='h-8 w-16'
                imageOptions={{ className: "h-8", objectFit: "contain" }}
                {...logoImage}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

CustomerHubCard.propTypes = {
  logoImage: PropTypes.shape({}).isRequired,
  description: PropTypes.node.isRequired,
  cta: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
  }),
  withTooltip: PropTypes.bool,
  tooltipContent: PropTypes.string,
  tooltipCta: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
  }),
  className: PropTypes.string,
}

CustomerHubCard.defaultProps = {
  cta: undefined,
  withTooltip: false,
  tooltipContent: "",
  tooltipCta: {
    to: "",
    text: "",
  },
  className: "",
}
export default CustomerHubCard
