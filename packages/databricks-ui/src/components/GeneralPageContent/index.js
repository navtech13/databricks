import React from "react"
import PropTypes from "prop-types"
import { useBreakpoint } from "../../utils/use-breakpoint"
import backgroundImageDefault from "../../../static/images/bg-landing-desktop.png"
import backgroundImageTabletDefault from "../../../static/images/bg-landing-tablet.png"

const GeneralPageContent = ({
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
    <section
      {...(hasBackgroundImage &&
        backgroundImage && { style: { backgroundImage: `url(${image.src})` } })}
      className='relative overflow-hidden bg-cover bg-no-repeat'
    >
      {children}
    </section>
  )
}

GeneralPageContent.propTypes = {
  children: PropTypes.node.isRequired,
  hasBackgroundImage: PropTypes.bool,
  backgroundImage: PropTypes.shape({}),
  backgroundImageTablet: PropTypes.shape({}),
}

GeneralPageContent.defaultProps = {
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

export default GeneralPageContent
