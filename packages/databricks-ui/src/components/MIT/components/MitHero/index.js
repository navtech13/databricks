import React, { useEffect } from "react"
import AOS from "aos"
import TextLink from "../../../TextLink"
import MITTRinsights from "./assets/MITTR-Insights.svg"
import logoLight from "./assets/logo-databricks-light.png"
import "./styles.css"

import "aos/dist/aos.css"

const MitHero = () => {
  useEffect(() => {
    AOS.init({ once: true })
  }, [])
  return (
    <div
      id='main'
      className='w-full bg-[#113239] pb-1 pt-5 text-white md:pb-6 md:pt-10'
    >
      <div className='mx-auto w-full max-w-full px-0 md:w-[90%] md:max-w-[704px] lg:max-w-[966px] xl:w-full xl:max-w-[1146px]'>
        <div className='grid grid-cols-2 md:grid-cols-3'>
          <div
            className='px-2'
            data-aos-delay='100'
            data-aos-easing='ease'
            data-aos-duration='1200'
            data-aos='fade-up'
          >
            <div className='border-t border-white'>
              <img
                className='h-auto w-20 pt-2.5'
                src={MITTRinsights}
                alt='Mit Insights'
              />
              <div className='lg:text-2.5 mb-2.5 mt-5 font-[600] md:mt-8'>
                <TextLink
                  to='https://www.databricks.com/explore/data-leaders-experience/mit-technology-report?itm_data=top-promo-mitreport'
                  variant='A'
                >
                  <span className='arrow-up'> Download the full report</span>
                </TextLink>
              </div>
            </div>
          </div>
          <div
            data-aos='fade-up'
            data-aos-delay='200'
            data-aos-easing='ease'
            data-aos-duration='1200'
            className='text-2 md:text-4 px-2'
          >
            <div className='text-1.75 lg:text-2 border-t border-white pt-2.5 font-normal'>
              <p className='w-full pb-2'>Produced in partnership with</p>
              <img
                className=' lg:w-25 mb-2.5 mt-4 h-auto w-16 md:mb-2 md:w-20'
                src={logoLight}
                alt=''
              />
            </div>
          </div>
          <div className='text-2 lg:text-3 hidden px-2 leading-tight md:block'>
            <div
              data-aos='fade-up'
              data-aos-delay='300'
              data-aos-easing='ease'
              data-aos-duration='1200'
              className='border-t border-white pt-2.5 leading-[1.2]'
            >
              How data and analytics leaders are delivering business results with
              cloud data and AI platforms
            </div>
          </div>
        </div>
        <div className='px-2 pb-2.5 md:hidden'>
          <div
            data-aos='fade-up'
            data-aos-delay='300'
            data-aos-easing='ease'
            data-aos-duration='1200'
            className='text-2 border-t border-white pt-2.5'
          >
            <span>
              How data and analytics leaders are delivering business results with
              cloud data and AI platforms
            </span>
          </div>
        </div>
        <div className='px-2 text-left font-bold '>
          <div className='border-t border-white pt-2.5'>
            <h1
              data-aos-delay='400'
              data-aos='fade-up'
              data-aos-easing='ease'
              data-aos-duration='1200'
              className='text-4 mb-2.5 leading-tight md:max-w-[700px] md:text-[60px] md:leading-none lg:max-w-[900px] lg:text-[90px]'
              style={{ letterSpacing: "2px" }}
            >
              Building a high-performance data and AI organization
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MitHero
