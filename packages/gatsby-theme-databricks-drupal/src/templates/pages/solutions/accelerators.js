/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Hero,
  MultiSelect,
  SearchBar,
  SortSelect,
  AcceleratorCards,
  FilterToggle,
  AccordionList,
  TextLink,
  CalloutRow,
  ClearFilters,
} from "databricks-ui"
import BaseLayout from "../../../components/base-layout"
import filtersData from "../../../data/filtersData"
import solutionAcceleratorData from "../../../data/solutionAcceleratorData"
import solutionAcceleratorLocalMetaTags from "../../../data/solutionAcceleratorLocalMetaTags"
import faqData from "../../../data/faqData"
import getQueryParam from "../../../helpers/getQueryParam"
import HeroImage from "../../../../../databricks-ui/static/images/illustration-solutions.png"
import CallOutGraphic from "../../../../../databricks-ui/static/images/graphic-footer-pattern-blue.png"
import CallOutImage from "../../../../../databricks-ui/static/images/image-footer-blue-1.png"

const Accelerator = ({ location }) => {
  const [isHidden, setHidden] = useState()
  const [activeIndustries, setActiveIndustries] = useState([])
  const [activePartners, setActivePartners] = useState([])
  const [searchTerms, setSearchTerms] = useState("")
  const [activeSort, setActiveSort] = useState("")

  const checkParameters = () => {
    // set active filters based on filters param
    const partnerFiltersExist = getQueryParam("partner", location.search)
    const industryFiltersExist = getQueryParam("industry", location.search)
    if (partnerFiltersExist) {
      const filtersArr = partnerFiltersExist.split(",")
      const validFilters = []

      // set filters if using all developers preset
      if (filtersArr.includes("all_developers")) {
        filtersData.developer.options.map((option) => {
          // do not include databricks
          if (option.value !== "databricks") {
            validFilters.push(option.value)
          }
        })
      }

      filtersArr.map((x) => {
        const result = solutionAcceleratorData.filter(
          (item) => item.categories.partner === x
        )
        if (result.length > 0) {
          validFilters.push(x)
        }
      })

      if (validFilters.length > 0) {
        setActivePartners(validFilters)
      }
    }

    if (industryFiltersExist) {
      const filtersArr = industryFiltersExist.split(",")
      const validFilters = []

      filtersArr.map((x) => {
        const result = solutionAcceleratorData.filter((item) =>
          item.categories.industry.includes(x)
        )
        if (result.length > 0) {
          validFilters.push(x)
        }
      })

      if (validFilters.length > 0) {
        setActiveIndustries(validFilters)
      }
    }
  }

  const handleReset = () => {
    setSearchTerms("")
    setActiveIndustries([])
    setActivePartners([])
    setActiveSort("")
    document.querySelector("input.Search").value = ""
  }

  useEffect(() => {
    checkParameters()
  }, [])

  return (
    <BaseLayout
      seo={{
        skipMetaImage: true,
        metaTags: solutionAcceleratorLocalMetaTags,
        urls: {
          base: location.origin,
          current: location.pathname,
          qs: location.search,
        },
      }}
    >
      <Hero
        title='Industry Solutions'
        variant='twoColumnsWhite'
        image={{
          src: HeroImage,
          alt: "Solutions Accelerator Illustration",
        }}
        ctas={[{ label: "Start your free trial", to: "/try-databricks" }]}
      >
        Deliver the data and AI-driven outcomes that matter most — faster
      </Hero>
      <section className='bg-gray-warm-light'>
        <div className='mx-auto flex w-11/12 flex-col px-2 py-6 lg:max-w-[1148px]'>
          <div className='flex flex-col justify-between md:flex-row'>
            <div className='flex w-full flex-col md:w-1/3'>
              <h3>Databricks Solution Accelerators</h3>
            </div>
            <div className='flex w-full flex-col md:w-7/12'>
              <h4 className='mt-2.5 md:mt-0'>
                Save hours of discovery, design, development and testing with
                Databricks Solution Accelerators. Our purpose-built guides — fully
                functional notebooks and best practices — speed up results across
                your most common and high-impact use cases. Go from idea to proof of
                concept (PoC) in as little as two weeks.
              </h4>
              <h4 className='mt-2.5'>
                Start using Solution Accelerators with your free Databricks trial or
                your existing account.
              </h4>
              <TextLink
                variant='A'
                label='Start your free trial today'
                className='arrow-icon mt-2.5'
                to='/try-databricks'
              >
                Start your free trial today
              </TextLink>
            </div>
          </div>
          <div className='mt-10 flex flex-col justify-between md:flex-row'>
            <div className='flex w-full flex-col md:w-1/3'>
              <h3>Brickbuilder Solutions</h3>
            </div>
            <div className='flex w-full flex-col md:w-7/12'>
              <h4 className='mt-2.5 md:mt-0'>
                We’ve partnered with leading consulting firms to deliver innovative,
                industry-specific solutions. Databricks Brickbuilder Solutions help
                you cut costs and increase value from your data. Backed by decades of
                industry expertise — and built for the Databricks Lakehouse Platform
                — Brickbuilder Solutions are tailored to your exact needs.
              </h4>
            </div>
          </div>
        </div>
      </section>
      <section className='bg-gray-warm-medium'>
        <div className='mx-auto flex w-11/12 flex-col py-6 lg:max-w-[1148px]'>
          <h2>Browse Accelerators</h2>
          <div className='mt-4 flex flex-col lg:flex-row'>
            <div className='mr-4 flex w-full flex-col lg:w-1/3'>
              <SearchBar className='mb-2.5' setSearchTerms={setSearchTerms} />
              <div
                className='mb-2.5 block lg:hidden'
                onClick={() => setHidden(!isHidden)}
                onKeyDown={() => setHidden(!isHidden)}
                role='checkbox'
                aria-checked='false'
                tabIndex='0'
                aria-labelledby='chk1-label'
              >
                <FilterToggle />
              </div>
              <MultiSelect
                key={filtersData.industry.label}
                items={filtersData.industry.options}
                title={filtersData.industry.label}
                isHidden={isHidden}
                setHidden={setHidden}
                activeFilters={activeIndustries}
                setActiveFilters={setActiveIndustries}
              />
              <MultiSelect
                key={filtersData.developer.label}
                items={filtersData.developer.options}
                title={filtersData.developer.label}
                isHidden={isHidden}
                setHidden={setHidden}
                activeFilters={activePartners}
                setActiveFilters={setActivePartners}
              />
              <SortSelect
                key={filtersData.sort.label}
                items={filtersData.sort.options}
                title={filtersData.sort.label}
                isHidden={isHidden}
                activeSort={activeSort}
                setActiveSort={setActiveSort}
              />
              {(activeIndustries.length > 0 ||
                activePartners.length > 0 ||
                activeSort !== "") && (
                <ClearFilters handleReset={handleReset}>clear all</ClearFilters>
              )}
            </div>
            <div className='w-full lg:w-2/3'>
              <AcceleratorCards
                items={solutionAcceleratorData}
                activeIndustries={activeIndustries}
                setActiveIndustries={setActiveIndustries}
                activePartners={activePartners}
                setActivePartners={setActivePartners}
                searchTerms={searchTerms}
                activeSort={activeSort}
                handleReset={handleReset}
              />
            </div>
          </div>
        </div>
        <div />
      </section>
      <section className='bg-gray-warm-medium'>
        <div className='mx-auto w-11/12 px-2 py-6 lg:max-w-[1148px]'>
          <h3 className='mb-5'>FAQ</h3>
          <AccordionList accordions={faqData} />
        </div>
      </section>
      <section>
        <CalloutRow
          title='See how actual customers use Databricks'
          variant='blue'
          image={{
            src: CallOutImage,
            alt: "Solutions Accelerator Callout Image",
          }}
          graphic={{
            src: CallOutGraphic,
            alt: "Solutions Accelerator Callout Graphic",
          }}
          ctas={[
            {
              to: "/customers",
              label: "Explore Customer Stories",
            },
          ]}
        />
      </section>
    </BaseLayout>
  )
}

Accelerator.propTypes = {
  location: PropTypes.shape({
    origin: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  filtersData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.number.isRequired,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ),
}

Accelerator.defaultProps = {
  filtersData: [],
}

export default Accelerator
