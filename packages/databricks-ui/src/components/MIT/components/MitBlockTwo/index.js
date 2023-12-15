import React, { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import mitBlockTwoImageOne from "./assets/lineicon-1.svg"
import mitBlockTwoImagTwo from "./assets/lineicon-2.svg"
import mitBlockTwoImageThree from "./assets/lineicon-3.svg"

const MitBlockTwo = () => {
  useEffect(() => {
    AOS.init({ once: true })
  }, [])
  return (
    <section className='py-5 md:py-10'>
      <div className='text-2 mx-auto w-full max-w-full px-0 md:w-[90%] md:max-w-[704px] lg:max-w-[966px] xl:w-full xl:max-w-[1146px]'>
        <div className=' flex flex-col px-2 md:flex-row-reverse lg:justify-between'>
          <div className='border-t border-[#303030] py-5 md:min-w-[210px] lg:max-w-[264px]'>
            <div
              data-aos='fade-up'
              data-aos-delay='300'
              data-aos-easing='ease'
              data-aos-duration='1200'
              className='flex flex-row gap-4 pb-2.5 md:justify-between'
            >
              <div className='relative'>
                <span className='absolute h-3 w-3 rounded-full bg-[#303030] text-center text-white'>
                  1
                </span>
                <img
                  className='h-auto w-6 md:w-8'
                  src={mitBlockTwoImageOne}
                  alt='Line icon 1'
                />
              </div>
              <div className='relative'>
                <span className='absolute h-3 w-3 rounded-full bg-[#303030] text-center text-white'>
                  2
                </span>
                <img
                  className='h-auto w-6 md:w-8'
                  src={mitBlockTwoImagTwo}
                  alt='Line icon 2'
                />
              </div>
              <div className='relative'>
                <span className='absolute h-3 w-3 rounded-full bg-[#303030] text-center text-white'>
                  3
                </span>
                <img
                  className='h-auto w-6 md:w-8'
                  src={mitBlockTwoImageThree}
                  alt='Line icon 3'
                />
              </div>
            </div>
            <p
              data-aos='fade-up'
              data-aos-easing='ease'
              data-aos-duration='1200'
              data-aos-delay='400'
              className=' leading-[25px]'
            >
              Organizations’ top data priorities over the next two years fall into
              three areas, all supported by wider adoption of cloud platforms: <br />
              <p className='pb-2 font-bold'>
                improve data management, enhance data analytics and ML, and expand
                the use of all types of enterprise data.
              </p>
            </p>
          </div>

          <div className='text-left md:pr-6 lg:max-w-[797px] lg:pr-8'>
            <p
              data-aos='fade-up'
              data-aos-easing='ease'
              data-aos-duration='1200'
              data-aos-delay='100'
              className='text-2.5 mb-3 leading-9'
            >
              CxOs and boards recognize that their organizations’ ability to generate
              actionable insights from data, often in real time, is of the highest
              strategic importance.
            </p>
            <p
              data-aos='fade-up'
              data-aos-delay='200'
              data-aos-easing='ease'
              data-aos-duration='1200'
              className='mb-2 leading-[24px]'
            >
              To become data-driven, companies are deploying increasingly advanced
              cloud-based technologies. What these tools deliver, however, will be of
              limited value without abundant, high-quality and easily accessible
              data. See what CIOs, CDOs and other data and analytics leaders have to
              say in the recent MIT Tech Review Insights report.
            </p>
            <p
              data-aos='fade-up'
              data-aos-delay='200'
              data-aos-easing='ease'
              data-aos-duration='1200'
              className='pb-2 font-bold'
            >
              The key findings include the following:
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MitBlockTwo
