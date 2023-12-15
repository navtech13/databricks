import React, { useEffect } from "react"
import "./styles.css"
import AOS from "aos"
import lineIconQuote from "./assets/lineicon-quote.svg"
import background from "./assets/grid.png"
import downloadLink from "./assets/svgexport-13.svg"
import "aos/dist/aos.css"

const Block9 = () => {
  useEffect(() => {
    AOS.init({ once: true })
  }, [])

  return (
    <section className='mit-quote-section relative overflow-hidden bg-[#f9f7f4] pt-20'>
      <div
        aria-hidden
        className='absolute bottom-0 left-0 top-0 z-0 w-full translate-x-0 translate-y-0 bg-[#f9f7f4] text-center'
      >
        <img
          className='mx-auto h-auto w-full max-w-[2880px]'
          src={background}
          alt=''
        />
      </div>
      <div className='relative z-10 px-2 sm:px-4'>
        <div
          data-aos='fade-up'
          data-aos-delay='100'
          data-aos-easing='ease'
          data-aos-duration='1200'
          className='intro-content mt-0 border border-[#dce0e2] bg-[#f9f7f4] px-1 py-2.5 text-center md:mx-[9%] md:p-8 lg:mx-auto lg:max-w-[700px]'
        >
          <p className='mb-2'>
            Effective data management is one of the foundations of a data-driven
            organization. But managing data in an enterprise is highly complex. As
            new data technologies come onstream, the burden of legacy systems and
            data silos grows, unless they can be integrated or ring-fenced.
            Fragmentation of architecture is a headache for many CIOs and CDOs, due
            not just to silos but also to the variety of on-premises and cloud-based
            tools organizations use. Along with poor data quality, these issues
            combine to deprive organizations’ data platforms — and the machine
            learning and analytics models they support — of the speed and scale
            needed to deliver business results.
          </p>
        </div>
        <div
          data-aos='fade-up'
          data-aos-delay='200'
          data-aos-easing='ease'
          data-aos-duration='1200'
          className='w-ful m-auto h-[680px] rounded-[200px] bg-[#1b3139] text-center text-white md:max-w-[680px] md:rounded-[50%]'
        >
          <img className='m-auto w-12 pt-6' src={lineIconQuote} alt='icon quote' />
          <p className='text-2.5 mb-3 px-2.5 pt-2.5 font-normal md:px-12 md:pt-6'>
            “The issue of multiple deployments and error-prone handoffs between data
            science and production is a huge issue. There’s often a gap between the
            data science output and the results we get after operationalizing it.”
          </p>
          <p className=' text-[#90a5b1]'>
            <b>Naveen Jayaraman</b>
            <br />
            VICE PRESIDENT — DATA, CRM, ANALYTICS
            <br />
            L’Oréal
          </p>
        </div>
        <div
          data-aos='fade-up'
          data-aos-delay='300'
          data-aos-easing='ease'
          data-aos-duration='1200'
          className='-mt-25 relative m-auto table h-[300px] w-full max-w-[300px] rounded-[50%] bg-[#ff5f46] text-center text-[#1b3139]'
        >
          <div className=' table-cell align-middle'>
            <a
              className='font-medium text-white hover:text-white hover:no-underline'
              target='_blank'
              href='https://www.databricks.com/explore/data-leaders-experience/mit-technology-report?itm_data=bottom-promo-mitreport'
              rel='noreferrer'
            >
              Download the full report
              <img
                className='ml-0.5 inline-block w-1.5'
                alt=''
                aria-hidden
                src={downloadLink}
              />
            </a>
            <p className='text-1.75 mb-0 px-6 pt-2.5'>
              Get your copy for detailed analysis, interview spotlights and top
              recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Block9
