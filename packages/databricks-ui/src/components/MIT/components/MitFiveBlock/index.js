import React, { useRef, useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import graphic from "./hex.svg"

import "./styles.css"

const MitFiveBlock = () => {
  const graphics = useRef()
  const animation = useRef()
  const [isVisible, setIsVisible] = useState(false)
  const [count, setCount] = useState(0)
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const element = graphics.current
      const animationElement = animation.current
      if (element) {
        const { top } = element.getBoundingClientRect()
        const windowHeight = window.innerHeight

        if (top < windowHeight) {
          setIsVisible(true)
          animationElement.classList.add("five-block-animation")
        } else {
          setIsVisible(false)
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      animation.current.classList.add("five-block-animation")
    }
  }, [isVisible])

  useEffect(() => {
    let interval

    if (!isFirstRender) {
      interval = setInterval(() => {
        if (isVisible && count < 55) {
          setCount(count + 1)
        }
      }, 100)
    } else {
      setTimeout(() => {
        setIsFirstRender(false)
      }, 0)
    }

    return () => clearInterval(interval)
  }, [count, isFirstRender, isVisible])

  return (
    <div
      className='graph-container absolute'
      data-aos='fade-left'
      data-aos-delay='100'
      ref={graphics}
    >
      <img src={graphic} alt='graphic' />
      <div className='five-block-graphic'>
        <div className='five-block-progress'>
          <div ref={animation} className='five-block-progressiner'>
            <div className='five-block-left'>
              <div className='five-block-cover' />
            </div>
            <div className='five-block-right'>
              <div className='five-block-cover' />
            </div>
            <div className='five-block-display'>
              <div className='five-block-display-progress'>{`${count} %`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MitFiveBlock
