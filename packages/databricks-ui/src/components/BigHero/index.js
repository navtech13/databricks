import React, { useState, useRef } from "react"
import PropTypes from "prop-types"
import Typewriter from "typewriter-effect"
import heroBg from "databricks-ui/static/images/grid-bg.svg"
import Image from "../Image"
import IconResolver from "../IconResolver"
import LottiePlayer from "../LottiePlayer"
import RichText from "../RichText"
import LinkComponent from "../Link"
import { generateCTAs } from "../../utils/generateCTAs"

import RiveBigHeroVariant from "./RiveBigHeroVariant"

const BigHero = ({
  fallbackImage,
  lottie,
  typeWriterMessages,
  typeWriterTopText,
  typeWriterBottomText,
  typeWriterPlayLabel,
  typeWriterPauseLabel,
  typeWriterPauseTime,
  typeWriterDelayTime,
  ctas,
  description,
  backgroundImage,
  riveSrc,
  showRiveControls,
  ...props
}) => {
  const [playState, setPlayState] = useState(true)
  const lottieRef = useRef()
  const typeWriterRef = useRef()

  // Fallback support for current background Image
  const bgImage = backgroundImage || {
    src: heroBg,
  }

  const handlePlay = (ref, typeRef, setPlay) => {
    if (ref?.animationItem?.isPaused || typeRef.state?.eventLoopPaused) {
      setPlay(true)
      typeRef?.start()
      return ref?.play()
    }
    typeRef?.pause()
    setPlay(false)
    return ref?.pause()
  }

  // all fields are non required
  // add svg hard-coded in the implementation

  return riveSrc ? (
    <RiveBigHeroVariant
      fallbackImage={fallbackImage}
      ctas={ctas}
      description={description}
      backgroundImage={backgroundImage}
      riveSrc={riveSrc}
      showRiveControls={showRiveControls}
      typeWriterTopText={typeWriterTopText}
      typeWriterBottomText={typeWriterBottomText}
    />
  ) : (
    <div className='big-hero relative' {...props}>
      {/* Hero */}
      <div
        data-cy='BigHero'
        className='inner-wrapper flex flex-col justify-between gap-6 overflow-hidden pt-5 lg:min-h-[560px] lg:flex-row lg:gap-0 lg:pb-3 lg:pt-12'
      >
        {/* Text container */}
        <div className='lg:w-5/12'>
          <h1 className='title mb-2'>
            {typeWriterTopText}
            <span className='text-green-05 lg:whitespace-nowrap'>
              {typeWriterMessages?.length > 0 && (
                <>
                  <span className='block md:hidden'>{typeWriterMessages[0]}</span>
                  <span className='hidden md:inline'>
                    <Typewriter
                      // Use custom function to keep the text at the end without a loop https://github.com/tameemsafi/typewriterjs/issues/87
                      onInit={(typewriter) => {
                        typeWriterRef.current = typewriter
                        typeWriterMessages
                          .slice(0, typeWriterMessages.length - 1)
                          .forEach((message) => {
                            typewriter
                              .typeString(message)
                              .pauseFor(typeWriterPauseTime)
                              .deleteAll()
                          })
                        typewriter
                          .typeString(
                            typeWriterMessages[typeWriterMessages.length - 1]
                          )
                          .pauseFor(typeWriterPauseTime)
                          .start()
                      }}
                      options={{
                        autoStart: true,
                        loop: false,
                        delay: typeWriterDelayTime,
                      }}
                    />
                  </span>
                </>
              )}
            </span>
            {typeWriterBottomText}
          </h1>
          {description && <RichText className='subtitle'>{description}</RichText>}
          {ctas?.length > 0 && (
            <div
              className={`no-wrap mt-4 flex flex-wrap items-start gap-2.5 lg:gap-4 `}
            >
              {generateCTAs(ctas, LinkComponent)}
            </div>
          )}
        </div>

        {/* Media Section */}
        <div className='animation w-9/12 self-end lg:w-7/12'>
          {lottie && (
            <LottiePlayer
              className={fallbackImage ? "hidden md:block" : ""}
              lottieRef={lottieRef}
              {...lottie}
            />
          )}

          {fallbackImage && (
            <Image
              className={lottie ? "block md:hidden" : "block"}
              {...fallbackImage}
            />
          )}
        </div>
      </div>

      {/* Play Button */}
      {(typeWriterMessages?.length > 0 || lottie) && (
        <button
          className='absolute bottom-[22px] right-[22px] z-50 hidden rounded-full border p-0.5 md:block'
          onClick={() => {
            handlePlay(lottieRef.current, typeWriterRef.current, setPlayState)
          }}
          aria-label={playState ? typeWriterPauseLabel : typeWriterPlayLabel}
          type='button'
        >
          <IconResolver className='h-1 w-1' token={playState ? "pause" : "play"} />
        </button>
      )}

      {/* Background */}
      {bgImage && (
        <Image
          aria-hidden
          imageOptions={{
            className: "absolute inset-0 object-cover z-[-1] h-full max-w-full",
          }}
          {...bgImage}
        />
      )}
    </div>
  )
}

BigHero.propTypes = {
  typeWriterTopText: PropTypes.string,
  typeWriterBottomText: PropTypes.string,
  lottie: PropTypes.shape({}),
  description: PropTypes.string,
  typeWriterPlayLabel: PropTypes.string,
  typeWriterPauseLabel: PropTypes.string,
  typeWriterPauseTime: PropTypes.number,
  typeWriterDelayTime: PropTypes.number,
  fallbackImage: PropTypes.shape({}),
  backgroundImage: PropTypes.shape({}),
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      to: PropTypes.string,
    })
  ),
  typeWriterMessages: PropTypes.arrayOf(PropTypes.string),
  riveSrc: PropTypes.string,
  showRiveControls: PropTypes.bool,
}

BigHero.defaultProps = {
  typeWriterTopText: undefined,
  typeWriterBottomText: undefined,
  description: undefined,
  lottie: undefined,
  fallbackImage: undefined,
  backgroundImage: undefined,
  ctas: undefined,
  typeWriterMessages: undefined,
  typeWriterPlayLabel: "Play typewriter",
  typeWriterPauseLabel: "Pause typewriter",
  typeWriterPauseTime: 2800,
  typeWriterDelayTime: 90,
  riveSrc: PropTypes.string,
  showRiveControls: PropTypes.bool,
}

export default BigHero
