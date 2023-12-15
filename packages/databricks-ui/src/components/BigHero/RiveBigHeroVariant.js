import React, { useState } from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import IconResolver from "../IconResolver"
import RichText from "../RichText"
import LinkComponent from "../Link"
import Button from "../Button"

import RiveAnimation from "../RiveAnimation"

const RiveBigHeroVariant = ({
  fallbackImage,
  ctas,
  description,
  riveSrc,
  showRiveControls,
  typeWriterTopText,
  typeWriterBottomText,
  ...props
}) => {
  const [playState, setPlayState] = useState(true)

  return (
    <div className='big-hero relative' {...props}>
      {/* Hero */}
      <div
        data-cy='BigHero'
        className='inner-wrapper relative flex flex-col justify-between overflow-hidden lg:min-h-[48px] lg:flex-row lg:gap-0'
      >
        {/* Text container */}
        <div className='lg:w-8/12'>
          <h1 className='xxl:text-[112px] mb-3 font-medium leading-[100%] md:text-[64px] lg:text-[88px]'>
            {typeWriterTopText}
            <br />
            {typeWriterBottomText}
          </h1>
          {description && (
            <RichText className='text-4 font-normal md:max-w-[424px] lg:max-w-none'>
              {description}
            </RichText>
          )}
          {ctas?.length === 1 && (
            <div
              className={`no-wrap mt-4 flex flex-wrap items-start gap-2.5 lg:gap-4 `}
            >
              <Button
                className='font-medium'
                as={LinkComponent}
                variant='secondary'
                to={ctas[0].to}
              >
                {ctas[0].label}
              </Button>
            </div>
          )}
          {ctas?.length > 1 && (
            <div
              className={`no-wrap mt-4 flex flex-wrap items-start gap-2.5 lg:gap-4 `}
            >
              <Button
                className='font-medium'
                as={LinkComponent}
                variant='secondary'
                to={ctas[0].to}
              >
                {ctas[0].label}
              </Button>
              {ctas[1] && (
                <Button
                  className='border-navy-800-primary border font-medium'
                  as={LinkComponent}
                  variant='white'
                  to={ctas[1].to}
                >
                  {ctas[1].label}
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Media Section */}
        <div className='right-0 bottom-0 md:absolute lg:relative lg:self-end'>
          {riveSrc && (
            <div className='hidden h-[255px] w-[280px] md:block lg:h-[370px] lg:w-[376px]'>
              <RiveAnimation
                src={riveSrc}
                showRiveControls
                isPlaying={playState}
                alignment='centerLeft'
              />
            </div>
          )}

          {fallbackImage && (
            <Image
              className={riveSrc ? "mt-[64px] block md:hidden" : "block"}
              {...fallbackImage}
            />
          )}
        </div>
      </div>

      {showRiveControls && (
        <button
          className='absolute bottom-[22px] right-[22px] z-50 hidden rounded-full border p-0.5 md:block'
          onClick={() => setPlayState(!playState)}
          type='button'
        >
          <IconResolver className='h-1 w-1' token={playState ? "pause" : "play"} />
        </button>
      )}
    </div>
  )
}

RiveBigHeroVariant.propTypes = {
  typeWriterTopText: PropTypes.string,
  typeWriterBottomText: PropTypes.string,
  description: PropTypes.string,
  fallbackImage: PropTypes.shape({}),
  backgroundImage: PropTypes.shape({}),
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      to: PropTypes.string,
    })
  ),
  riveSrc: PropTypes.string,
  showRiveControls: PropTypes.bool,
}

RiveBigHeroVariant.defaultProps = {
  typeWriterTopText: undefined,
  typeWriterBottomText: undefined,
  description: undefined,
  fallbackImage: undefined,
  backgroundImage: undefined,
  ctas: undefined,
  riveSrc: null,
  showRiveControls: false,
}

export default RiveBigHeroVariant
