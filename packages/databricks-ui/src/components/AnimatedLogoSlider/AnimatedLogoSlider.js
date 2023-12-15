import React from "react"
import PropTypes from "prop-types"
import { useBreakpoint } from "../../utils/use-breakpoint"
import Slider from "./Slider"
import Link from "../Link"
import IconResolver from "../IconResolver"
import { theme } from "../../../tailwind.config"

const AnimatedLogoSlider = ({
  logos,
  variant,
  sliderLink,
  footerLink,
  speed,
  bgColor,
  pauseAriaLabel,
  playAriaLabel
}) => {
  const isDesktop = useBreakpoint("lg")

  const component = (
    <div className='relative pb-4'>
      <Slider
        logos={logos}
        variant={variant}
        speed={speed}
        color={theme.colors[bgColor]}
        pauseAriaLabel={pauseAriaLabel}
        playAriaLabel={playAriaLabel}
      />
      {footerLink?.title && footerLink?.url && (
        <Link
          to={footerLink.url.path}
          className={`pt-1.4 text-1.6 group flex items-center justify-center ${
            variant === "dark-default" ? "!text-white" : "!text-navy-800"
          }`}
        >
          {footerLink.title}
          <IconResolver
            token='arrowRight'
            className='ml-0.8 transition-transform group-hover:translate-x-0.5'
          />
        </Link>
      )}
    </div>
  )

  if (isDesktop || !sliderLink) {
    return component
  }

  return <Link to={sliderLink}>{component}</Link>
}

export default AnimatedLogoSlider

AnimatedLogoSlider.propTypes = {
  logos: PropTypes.arrayOf(
    PropTypes.shape({
      alt: PropTypes.string,
      src: PropTypes.string,
      link: PropTypes.string,
      target: PropTypes.string,
    })
  ).isRequired,
  variant: PropTypes.oneOf(["default", "ticker", "dark-default"]),
  sliderLink: PropTypes.string,
  footerLink: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.shape({ path: PropTypes.string }),
  }),
  speed: PropTypes.number,
  bgColor: PropTypes.string,
  pauseAriaLabel: PropTypes.string.isRequired,
  playAriaLabel: PropTypes.string.isRequired
}

AnimatedLogoSlider.defaultProps = {
  variant: "",
  sliderLink: "",
  footerLink: {},
  speed: 6000,
  bgColor: "white",
}
