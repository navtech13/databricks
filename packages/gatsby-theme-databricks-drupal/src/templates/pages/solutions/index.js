import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Hero,
  MultiSelect,
  SearchBar,
  FeaturedIndustryCard,
  IndustryCards,
  FilterToggle,
  RichText,
  ClearFilters,
  CtaImageBlock,
  Grid,
  CalloutRow,
} from "databricks-ui"
import BaseLayout from "../../../components/base-layout"
import featuredIndustryCardData from "../../../data/featuredIndustryCardData"
import solutionLocalMetaTags from "../../../data/solutionLocalMetaTags"
import industryCardData from "../../../data/industryCardData"
import generateTags from "../../../helpers/generateTags"
import getQueryParam from "../../../helpers/getQueryParam"
import heroImage from "../../../../../databricks-ui/static/images/HH-Industry-solutions.svg"
import SectionIllustration1 from "../../../../../databricks-ui/static/images/illustration-solutions.png"
import CallOutGraphic from "../../../../../databricks-ui/static/images/graphic-footer-pattern-green.png"
import CallOutImage from "../../../../../databricks-ui/static/images/image-footer-green-2.png"

const Solutions = ({ location }) => {
  const [isHidden, setHidden] = useState()
  const [activeFilters, setActiveFilters] = useState([])
  const [searchTerms, setSearchTerms] = useState("")
  const industryTags = generateTags(industryCardData)

  const checkParameters = () => {
    const filtersExist = getQueryParam("filters", location.search)
    if (filtersExist) {
      const filtersArr = filtersExist.split(",")
      const validFilters = []
      filtersArr.map((x) => {
        const result = industryCardData.filter(
          (industryItem) => industryItem.type === x
        )
        if (result.length > 0) {
          validFilters.push(x)
        }
        if (validFilters.length > 0) {
          setActiveFilters(validFilters)
        }
        return x
      })
    }
  }

  const handleReset = () => {
    setSearchTerms("")
    document.querySelector("input.Search").value = ""
    setActiveFilters([])
  }

  useEffect(() => {
    checkParameters()
  }, [])

  return (
    <BaseLayout
      seo={{
        skipMetaImage: true,
        metaTags: solutionLocalMetaTags,
        urls: {
          base: location.origin,
          current: location.pathname,
          qs: location.search,
        },
      }}
    >
      <main>
        <Hero
          title='Databricks for Industry'
          variant='twoColumnsNavy'
          ctas={[
            { label: "Get started", to: "/try-databricks" },
            { label: "Schedule a demo", to: "/p/databricks-weekly-demo" },
          ]}
          image={{
            src: heroImage,
            alt: "Solutions Illustration",
          }}
        >
          No compromise data analytics and AI solutions purpose-built for your
          industry
        </Hero>
        <section className='bg-gray-warm-light pb-20 lg:pb-16'>
          <div className='mx-auto flex w-11/12 flex-col md:max-w-[704px] lg:max-w-[1148px]'>
            <h2 className='mt-10 mb-4 lg:mt-16'>
              Discover the Lakehouse for your industry
            </h2>
            <Grid columns={2} gap={3}>
              {featuredIndustryCardData.map((card) => (
                <FeaturedIndustryCard
                  key={card.title}
                  title={card.title}
                  content={card.content}
                  type={card.type}
                  cta={card.cta}
                  logos={card.logos}
                />
              ))}
            </Grid>
          </div>
          <div className='mx-auto flex w-11/12 flex-col md:max-w-[704px] lg:max-w-[1148px]'>
            <h2 className='mt-10 mb-2.5 lg:mt-16 lg:mb-8'>Browse all industries</h2>
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
                  items={industryTags}
                  title='Industry'
                  isHidden={isHidden}
                  setHidden={setHidden}
                  activeFilters={activeFilters}
                  setActiveFilters={setActiveFilters}
                />
                {activeFilters.length > 0 && (
                  <ClearFilters handleReset={handleReset}>clear all</ClearFilters>
                )}{" "}
              </div>
              <div className='flex w-full flex-wrap content-start lg:w-2/3'>
                <IndustryCards
                  items={industryCardData}
                  activeFilters={activeFilters}
                  setActiveFilters={setActiveFilters}
                  searchTerms={searchTerms}
                  activeSort=''
                  handleReset={handleReset}
                />
            </div>
          </div>
        </section>
        <section className='bg-gray-warm-medium'>
          <div className='mx-auto flex w-11/12 flex-col px-2 py-6 md:max-w-[704px] lg:max-w-[1148px]'>
            <CtaImageBlock
              variant='imageRight'
              title='Industry Solutions'
              image={{
                src: SectionIllustration1,
                alt: "Solutions Illustration",
              }}
            >
              <div>
                <h2 className='mt-2.5'>Industry Solutions</h2>
                <h3 className='h4 mt-2.5'>
                  From idea to proof of concept in as little as two weeks
                </h3>
                <RichText className='mt-2.5'>
                  Databricks Solution Accelerators are purpose-built guides — fully
                  functional notebooks and best practices — that speed up results.
                  Databricks customers are saving hours of discovery, design,
                  development and testing, with many going from idea to proof of
                  concept (PoC) in as little as two weeks.
                </RichText>
                <Button
                  className='w-25 mt-2.5'
                  href='/solutions/accelerators'
                  variant='primary'
                >
                  Explore Accelerators
                </Button>
              </div>
            </CtaImageBlock>
          </div>
        </section>
        <section>
          <CalloutRow
            variant='green'
            title='Ready to start?'
            description='Explore what Databricks can do for you by starting of with a free trial.'
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
              to: "/try-databricks",
              label: "Start your trial",
            },
          ]}
        >
          <div>
            <h3>Ready to start?</h3>
            <RichText>
              Explore what Databricks can do for you by starting off with a free
              trial.
            </RichText>
          </div>
        </CalloutRow>
      </section>
    </BaseLayout>
  )
}

Solutions.propTypes = {
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

Solutions.defaultProps = {
  filtersData: [],
}

export default Solutions
