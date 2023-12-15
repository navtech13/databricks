import React, { useEffect, useState, useRef } from "react"
import AOS from "aos"
import HeroBlock from "../HeroBlock"
import "aos/dist/aos.css"
import Graphic from "./Graphic"
import { transitionData } from "./data"

const MitBlockSix = () => {
  const [transition, setTransition] = useState(false)
  const myRef = useRef()
  useEffect(() => {
    AOS.init({ once: true })
    const handleScroll = () => {
      const { top } = myRef.current.getBoundingClientRect()
      if (top < window.innerHeight) {
        setTransition(true)
      }
    }
    if (myRef) {
      handleScroll()
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [myRef])
  return (
    <HeroBlock
      direction='right'
      title='Enterprises seek cloud-native platforms that support data management, analytics and machine learning'
      body='Organizations’ top data priorities over the next two years fall into three areas, all supported by wider adoption of cloud platforms: improve data management, enhance data analytics and ML, and expand the use of all types of enterprise data.'
      index='04'
      bodyDelay='300'
      titleDelay='200'
    >
      <div
        ref={(el) => {
          myRef.current = el
        }}
      >
        <Graphic transition={transition} cloudElements={transitionData} />
      </div>
    </HeroBlock>
  )
}

export default MitBlockSix
