import React from "react"
import PropTypes from "prop-types"
import GreenhouseJobs from "../../../../../starters/careers/src/components/greenhouse-jobs"

const JobOpenings = ({ data }) => {
  return (
    <div className='inner-wrapper'>
      {/* Abstract greenhouse in case we use different vendor in future */}
      <GreenhouseJobs data={data} />
    </div>
  )
}

JobOpenings.propTypes = {
  data: PropTypes.node.isRequired,
}

export default JobOpenings
