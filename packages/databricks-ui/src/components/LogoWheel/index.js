import React, { useState } from "react"
import PropTypes from "prop-types"
import DBIcon from "../../../../../assets/global/images/databricks-icon.svg"
import Button from "../Button"
import IconResolver from "../IconResolver"
import RichText from "../RichText"
import Image from "../Image"
import Link from "../Link"
import "./styles.css"

const LogoWheel = ({
  title,
  content,
  cta,
  wheelImg,
  playAriaLabel,
  pauseAriaLabel,
}) => {
  const [playAnimation, setPlayAnimation] = useState(true)
  const { label, ...ctaProps } = cta
  return (
    <div className='design-lg:flex-row flex flex-col items-center justify-center'>
      <div className='relative mx-auto my-0 block w-full md:-mx-0 md:w-auto'>
        <div className='bg-navy-800 design-lg:h-[293px] design-lg:w-[556px] design-xxl:h-[310px] design-xxl:w-[587px] relative h-[173px] w-full overflow-hidden rounded-[160px] md:h-[245px] md:w-[464px]'>
          <Image
            className={`design-lg:w-[716px] design-lg:h-[716px] design-lg:top-[-210px] design-lg:left-[-210px] design-xxl:w-[756px] design-xxl:h-[756px] design-xxl:left-[-224px] design-xxl:top-[-224px] rotate absolute top-[-124px] left-[-124px] h-[421px] w-[421px] max-w-[initial] md:top-[-175px] md:left-[-175px] md:h-[598px] md:w-[598px] ${
              playAnimation ? "playing" : "paused"
            }   `}
            src={wheelImg}
            alt=''
          />
          <Image
            className='design-lg:w-[60px] design-lg:h-[67px] design-lg:top-[114px] design-lg:left-[118px] design-xxl:w-[64px] design-xxl:h-[71px] design-xxl:top-[120px] design-xxl:left-[123px] absolute top-[67px] left-[69px] h-[40px] w-[36px] md:top-[95px] md:left-[98px] md:h-[56px] md:w-[51px]'
            src={DBIcon}
            alt=''
          />
        </div>
        <button
          className='p-0.4 absolute bottom-0 left-0 z-10 rounded-full border md:block'
          onClick={() => {
            setPlayAnimation((prevState) => !prevState)
          }}
          aria-label={playAnimation ? pauseAriaLabel : playAriaLabel}
          type='button'
        >
          <IconResolver
            className='h-0.8 w-0.8'
            token={playAnimation ? "pause" : "play"}
          />
        </button>
      </div>
      <div className='bg-navy-800 design-lg:h-[1px] design-lg:w-[128px] design-xxl:w-[281px] h-[48px] w-[1px]' />
      <div className='border-t-navy-800 pt-1.6 md:pt-3.2 design-lg:border-t-0 design-lg:border-l design-lg:border-l-navy-800 design-lg:pl-3.2 design-lg:pt-0 design-lg:max-w-[556px] flex-col border-t'>
        <h1 className='text-[24px] font-medium leading-[30px] md:text-[32px] lg:leading-[40px]'>
          {title}
        </h1>
        {content && <RichText className='pt-2.4 pb-3.2'>{content}</RichText>}
        <Button as={Link} {...ctaProps}>
          {label}
        </Button>
      </div>
    </div>
  )
}

LogoWheel.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  cta: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
    variant: PropTypes.string,
  }),
  wheelImg: PropTypes.string.isRequired,
  pauseAriaLabel: PropTypes.string.isRequired,
  playAriaLabel: PropTypes.string.isRequired,
}

LogoWheel.defaultProps = {
  cta: {
    to: "/",
    label: "Browse",
    variant: "secondary",
  },
}

export default LogoWheel
