import React from "react"
import PropTypes from "prop-types"
import { Image } from "../../components"
import { useBreakpoint } from "../../utils/use-breakpoint"
import backgroundImageDefault from "../../../static/images/bg-landing-desktop.png"
import backgroundImageTabletDefault from "../../../static/images/bg-landing-tablet.png"

const LandingPageContent = ({
  children,
  backgroundImage,
  backgroundImageTablet,
  hasBackgroundImage,
}) => {
  const isDesktop = useBreakpoint("lg")

  const image = isDesktop
    ? backgroundImage
    : backgroundImageTablet || backgroundImage

  return (
    <div className='relative'>
      {hasBackgroundImage && backgroundImage && (
        <>
          {/* Workaround to prevent margin of the first component to affect the image position. Once we update this template to use
            the background component it will not be necessary */}
          <div className='h-[0.1px]' />
          <div className='page-background-image absolute top-0 bottom-0 z-[-1] w-full overflow-hidden'>
            <Image
              className='w-[768px] md:w-[1023px] lg:w-full'
              aria-hidden
              {...image}
            />
          </div>
        </>
      )}
      {children}
    </div>
  )
}

LandingPageContent.propTypes = {
  children: PropTypes.node.isRequired,
  hasBackgroundImage: PropTypes.bool,
  backgroundImage: PropTypes.shape({}),
  backgroundImageTablet: PropTypes.shape({}),
}

LandingPageContent.defaultProps = {
  backgroundImage: {
    src: backgroundImageDefault,
    alt: "",
  },
  backgroundImageTablet: {
    src: backgroundImageTabletDefault,
    alt: "",
  },
  hasBackgroundImage: true,
}

export default LandingPageContent
