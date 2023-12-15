import React from "react"
import PropTypes from "prop-types"
import { Button, Hero } from "databricks-ui"
import BaseLayout from "../../components/base-layout"
import GreenhouseJobs from "../../components/greenhouse-jobs"

const OpenPositions = ({ location, data }) => {
  return (
    <BaseLayout
      seo={{
        urls: {
          base: location.origin,
          current: location.pathname,
        },
      }}
    >
      <Hero title='Job Openings at Databricks' variant='twoColumnsWhite'>
        We’re on a mission. Join us to help data teams solve the world’s toughest
        problems.
        <div className='mt-4 flex'>
          <Button>Open Positions</Button>
        </div>
      </Hero>
      <main>
        <section className='bg-gray-warm-medium'>
          <div className='xxl:max-w-[1456px] mx-auto flex w-11/12 flex-col px-2 py-6 lg:max-w-[1146px]'>
            <GreenhouseJobs data={data} />
          </div>
          <div />
        </section>
      </main>
    </BaseLayout>
  )
}

OpenPositions.propTypes = {
  location: PropTypes.shape({
    origin: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
  filtersData: PropTypes.shape({
    options: PropTypes.number,
    type: PropTypes.string,
  }).isRequired,
}

export default OpenPositions
