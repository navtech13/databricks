import React, { useRef, useState, useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import HeroBlock from "../HeroBlock"
import "./styles.css"

const HeroComponentThree = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    })
  }, [])

  const hero = useRef()
  const [currentPercentage, setCurrentPercentage] = useState(1)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let interval
    const targetPercentage = 13
    const animationDuration = 1200

    const animateProgress = () => {
      interval = setInterval(() => {
        setCurrentPercentage((prevPercentage) => {
          if (prevPercentage < targetPercentage) {
            return prevPercentage + 1
          }
          clearInterval(interval)
          return prevPercentage
        })
      }, animationDuration / (targetPercentage - 1))
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          animateProgress()
          observer.unobserve(hero.current)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(hero.current)

    return () => {
      clearInterval(interval)
      observer.unobserve(hero.current)
    }
  }, [])

  return (
    <HeroBlock
      title='Just 13% of organizations excel at delivering on their data
                  strategy'
      body=' They are succeeding thanks to their focus on the foundations of
                  data management and architecture, which enable them to
                  “democratize” data and derive value from ML.'
      index='01'
    >
      <div
        className='graph-container absolute'
        data-aos='fade-left'
        data-aos-delay='100'
        ref={hero}
      >
        <img
          loading='lazy'
          alt=''
          width='609'
          height='558'
          src='https://www.databricks.com/wp-content/uploads/2021/12/circle-pie.png'
          sizes='(max-width: 609px) 100vw, 609px'
          data-ll-status='loading'
        />
        <p />
        <div className='absolute top-[27%] w-[65%] sm:top-[23%] md:left-0 md:top-[18%] md:w-[68%] lg:!left-0'>
          <div className='text-1.5 relative flex h-2 overflow-hidden rounded pb-[100%]'>
            <div className='bg-navy-06 absolute left-0 top-0 box-border h-full w-full overflow-hidden rounded-full'>
              <div className='absolute left-[-0.5%] top-[-0.5%] h-full w-[50.5%] overflow-hidden'>
                <div className='bg-orange-04 absolute left-full top-[-5%] h-[110%] w-full origin-left translate-y-1/2 transform' />
              </div>
              <div className='absolute left-[49.5%] top-[-0.5%] h-full w-[50.5%] overflow-hidden'>
                <div
                  className={`${
                    isVisible ? "load-progressiner" : ""
                  } bg-orange-04 absolute left-auto right-[100%] top-[-5%] h-[110%] w-full origin-right translate-y-1/2 transform`}
                />
              </div>
              <div className='absolute right-[30%] top-[5%] box-border flex translate-x-[30%] transform items-center justify-center rounded-full '>
                <div className='lg:!text-5 design-sm:text-3.5 text-3 z-10 font-bold text-white '>
                  {currentPercentage}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeroBlock>
  )
}

export default HeroComponentThree
