import React, { useEffect } from "react"
import PropTypes from "prop-types"
import AOS from "aos"
import "aos/dist/aos.css"
import "./heroblock.css"

const HeroBlock = ({
  direction = "left",
  children,
  title,
  body,
  index,
  titleDelay,
  bodyDelay,
}) => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    })
  }, [])
  const isDirectionLeft = direction === "left"
  const directionStyles = isDirectionLeft
    ? "flex-row pl-6"
    : "flex-row-reverse justify-end"

  return (
    <div
      className={`${
        !isDirectionLeft ? "hero-block-right" : ""
      } hero-block bg-gray-warm-light w-full`}
    >
      <div className='ds-inner'>
        <div className='hero-block-container relative mx-auto px-4'>
          {children}
          <div className='inner-container'>
            <div className={`inner-section pt-12 md:flex ${directionStyles}`}>
              <span className='hex hidden md:block'>
                <span className='hex-text'>{index}</span>
              </span>
              <div className='text-navy-06 md:w-[40%] md:min-w-[40%]'>
                <h2
                  className='mb-2.5 font-bold'
                  data-aos='fade-up'
                  data-aos-delay={titleDelay}
                >
                  {title}
                </h2>
                <p data-aos='fade-up' data-aos-delay={bodyDelay}>
                  {body}
                </p>
              </div>
              <div className='md:w-1/2 md:min-w-[50%]' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBlock

HeroBlock.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["left", "right"]),
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  titleDelay: PropTypes.string,
  bodyDelay: PropTypes.string,
}

HeroBlock.defaultProps = {
  direction: "left",
  titleDelay: "100",
  bodyDelay: "200",
}
