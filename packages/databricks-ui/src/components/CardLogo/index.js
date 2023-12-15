import React from "react"
import PropTypes from "prop-types"
import Tippy from "@tippyjs/react/headless"
import Link from "../TextLink"
import Image from "../Image"
import IconResolver from "../IconResolver"
import RichText from "../RichText"

const CardLogo = ({ image, cta, tooltipContent, tooltipCta }) => {
  const hasTooltip = tooltipContent || tooltipCta?.text
  const Wrapper = hasTooltip ? Tippy : React.Fragment
  const variant = {
    cardLogo: {
      imageOptions: { className: "h-full object-contain", objectFit: "contain" },
    },
  }

  const tooltipProps = hasTooltip
    ? {
        arrow: true,
        interactive: true,
        placement: "right",
        render: (attrs) => (
          <div
            className=' tooltip b5 shadow-card-hover text-navy-05 z-50 m-2 hidden max-w-lg break-words bg-white p-2.5 text-left md:block'
            tabIndex='-1'
            {...attrs}
          >
            <div className='arrow' data-popper-arrow />
            {tooltipContent && (
              <RichText className='my-2'>{tooltipContent}</RichText>
            )}
            {tooltipCta?.text && (
              <Link className=' mt-1' to={tooltipCta.to} variant='A'>
                {tooltipCta.text}
              </Link>
            )}
          </div>
        ),
      }
    : {}

  return (
    <Wrapper {...tooltipProps}>
      <div className='h-full w-full'>
        <Link
          data-cy='CardLogo'
          className={`shadow-card-normal relative flex h-full w-full items-center justify-center 
      border-b-2 border-b-white bg-white p-1 transition-all duration-200 ease-in-out hover:no-underline md:p-1.5 lg:p-1
      ${cta?.to ? "hover:border-b-orange-04 hover:shadow-card-hover" : ""}`}
          to={cta?.to}
          label={cta?.text}
          variant='c'
          disabled={!cta?.to}
        >
          {cta?.to && (
            <IconResolver
              className='text-orange-04 absolute top-1 right-1 max-w-[14px] md:top-1.5 md:right-1.5 lg:top-1 lg:right-1'
              token='linkArrow'
            />
          )}
          <Image
            className='h-full w-full p-2'
            imageOptions={variant.cardLogo.imageOptions}
            {...image}
          />
        </Link>
      </div>
    </Wrapper>
  )
}

CardLogo.propTypes = {
  image: PropTypes.shape({}).isRequired,
  cta: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
  }),
  tooltipContent: PropTypes.node,
  tooltipCta: PropTypes.shape({
    text: PropTypes.string,
    to: PropTypes.string,
  }),
}

CardLogo.defaultProps = {
  cta: undefined,
  tooltipContent: undefined,
  tooltipCta: undefined,
}

export default CardLogo
