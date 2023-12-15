import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import AOS from "aos"
import "aos/dist/aos.css"

import "./styles.css"

const GraphicRow = ({ description, graphicA, graphicB, graphicC, graphicD }) => {
  const graphics = useRef()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const element = graphics.current
      if (element) {
        const { top } = element.getBoundingClientRect()
        const windowHeight = window.innerHeight

        if (top < windowHeight) {
          setIsVisible(true)
          element.classList.add("animateme")
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
      graphics.current.classList.add("animateme")
    }
  }, [isVisible])

  const tailwindClasses = "flex h-4 items-center pl-1 text-1.25 md:text-2"
  return (
    <div className='border-graphic-items mb-[1em] flex flex-col pb-[1em] lg:flex-row'>
      <div className='col-start-1 lg:w-5/12'>
        <span className='text-1.75 font-bold'>{description}</span>
      </div>
      <div
        ref={graphics}
        className='chart col-start-1 mt-1 w-full lg:col-start-2 lg:mt-0 lg:w-6/12'
      >
        <div className='flex'>
          <span
            className={`graphic-total ${tailwindClasses}`}
            style={{ width: `${graphicA.width}` }}
          >
            {graphicA.percent}
          </span>
          <span
            className={`graphic-america ${tailwindClasses}`}
            style={{ width: `${graphicB.width}` }}
          >
            {graphicB.percent}
          </span>
          <span
            className={`graphic-europe  ${tailwindClasses}`}
            style={{ width: `${graphicC.width}` }}
          >
            {graphicC.percent}
          </span>
          <span
            className={`graphic-asia  ${tailwindClasses}`}
            style={{ width: `${graphicD.width}` }}
          >
            {graphicD.percent}
          </span>
        </div>
      </div>
    </div>
  )
}

const MitBlockEight = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    })
  }, [])
  const legendItemsStyles = "py-[0.25em] px-[1em] text-1.75 md:inline-block"

  return (
    <section className='bg-gray-warm-light mb-0'>
      <div className='mx-auto w-full max-w-full px-0 md:w-[90%] md:max-w-[704px] md:px-2 lg:max-w-[966px] xl:w-full xl:max-w-[1146px]'>
        <div className='h-10 w-1/2' style={{ borderRight: "1px dashed #ff3621" }} />
        <div
          style={{ border: "1px dashed #ff3621" }}
          className='mx-2 p-2.5 md:mx-0 md:py-6 md:px-8'
        >
          <h2
            className='text-2.5 md:text-3.5 mb-2.5 text-center font-bold leading-[1.625rem] md:leading-[2.5rem]'
            data-aos='fade-up'
            data-aos-delay='100'
          >
            Companies’ most important business objectives for enterprise data
            strategy over the next two years
          </h2>
          <p
            className='text-2 mb-[1.5em] text-center leading-[1.5rem] text-[#7F7F7F]'
            data-aos='fade-up'
            data-aos-delay='200'
          >
            (top responses, % of respondents)
          </p>

          <div className='mt-4'>
            <GraphicRow
              description='Expand sales and services channels'
              graphicA={{ percent: "45%", width: "25%" }}
              graphicB={{ percent: "43%", width: "23%" }}
              graphicC={{ percent: "45%", width: "25%" }}
              graphicD={{ percent: "46%", width: "26%" }}
            />
            <GraphicRow
              description='Improve operational efficiency'
              graphicA={{ percent: "43%", width: "23%" }}
              graphicB={{ percent: "46%", width: "26%" }}
              graphicC={{ percent: "44%", width: "24%" }}
              graphicD={{ percent: "38%", width: "18%" }}
            />
            <GraphicRow
              description='Improve innovation and reduce time to market'
              graphicA={{ percent: "42%", width: "22%" }}
              graphicB={{ percent: "42%", width: "22%" }}
              graphicC={{ percent: "43%", width: "23%" }}
              graphicD={{ percent: "43%", width: "23%" }}
            />
            <GraphicRow
              description='Improve maintenance of physical assets'
              graphicA={{ percent: "34%", width: "14%" }}
              graphicB={{ percent: "32%", width: "12%" }}
              graphicC={{ percent: "35%", width: "15%" }}
              graphicD={{ percent: "34%", width: "14%" }}
            />
            <GraphicRow
              description='Enter new product or service markets'
              graphicA={{ percent: "33%", width: "13%" }}
              graphicB={{ percent: "32%", width: "12%" }}
              graphicC={{ percent: "28%", width: "11%" }}
              graphicD={{ percent: "39%", width: "17%" }}
            />
            <GraphicRow
              description='Improve ESG'
              graphicA={{ percent: "33%", width: "13%" }}
              graphicB={{ percent: "31%", width: "11%" }}
              graphicC={{ percent: "37%", width: "17%" }}
              graphicD={{ percent: "31%", width: "11%" }}
            />
          </div>

          <div className='pt-[1.5rem] pb-[2em] md:text-center'>
            <ul className='legend'>
              <li className={legendItemsStyles}>Total</li>
              <li className={legendItemsStyles}>North America</li>
              <li className={legendItemsStyles}>Europe</li>
              <li className={legendItemsStyles}>Asia-Pacific</li>
            </ul>
          </div>
          <p className='text-1.5 text-center text-[#7F7F7F]'>
            MIT Technology Review Insights survey, 2021
          </p>
        </div>
      </div>
    </section>
  )
}

GraphicRow.propTypes = {
  description: PropTypes.string,
  graphicA: PropTypes.shape({
    percent: PropTypes.string,
    width: PropTypes.string,
  }),
  graphicB: PropTypes.shape({
    percent: PropTypes.string,
    width: PropTypes.string,
  }),
  graphicC: PropTypes.shape({
    percent: PropTypes.string,
    width: PropTypes.string,
  }),
  graphicD: PropTypes.shape({
    percent: PropTypes.string,
    width: PropTypes.string,
  }),
}

GraphicRow.defaultProps = {
  description: "",
  graphicA: undefined,
  graphicB: undefined,
  graphicC: undefined,
  graphicD: undefined,
}

export default MitBlockEight
