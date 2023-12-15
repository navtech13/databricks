import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import getJobPostPathname from "../../../../gatsby-theme-databricks-drupal/src/helpers/getJobPostPathname"
import JobRow from "../JobRow/JobRow"
import filterJobs from "../../../../gatsby-theme-databricks-drupal/src/helpers/filterJobs"
import sorting from "../../../../gatsby-theme-databricks-drupal/src/helpers/sorting"

let filteredItemsArray = []

const JobsSection = ({
  title,
  items,
  locationFilter,
  departmentFilter,
  activeSort,
  filterBoolean,
  deptBoolean,
  updateMessage,
}) => {
  const [activeItems, setActiveItems] = useState()

  const emptyArray = () => {
    filteredItemsArray = []
  }
  useEffect(() => {
    const filteredItems = filterJobs(items, locationFilter, departmentFilter)
    const sortedFilteredItems = sorting(filteredItems, activeSort)
    updateMessage(false)

    filteredItemsArray.push(Object.keys(filteredItems).length)

    const checkEmptyFilter = filteredItemsArray.every((item) => item === 0)
    if (filteredItemsArray.length === departmentFilter.length) {
      emptyArray()
    }

    if (checkEmptyFilter === true) {
      updateMessage(true)
    } else {
      updateMessage(false)
    }

    setActiveItems(sortedFilteredItems)
  }, [items, activeSort])

  useEffect(() => {
    if (deptBoolean || filterBoolean) {
      emptyArray()
    }
  }, [departmentFilter, locationFilter, items])
  if (activeItems?.length > 0) {
    const localJobs = activeItems.map((jobNode, index) => {
      const className = index % 2 !== 0 ? "bg-navy-07" : "bg-white"
      const href = getJobPostPathname(jobNode)
      const officeLocations = jobNode.location?.name
      return (
        <JobRow
          to={href}
          key={jobNode.id}
          title={jobNode.title}
          office={officeLocations}
          className={className}
        />
      )
    })
    return (
      title !== "tags" && (
        <div>
          <h2 className='my-4'>{title}</h2>
          <div className='border-gray-lines border'>{localJobs}</div>
        </div>
      )
    )
  }
  return <></>
}

JobsSection.propTypes = {
  items: PropTypes.shape().isRequired,
  departmentFilter: PropTypes.shape(),
  locationFilter: PropTypes.shape(),
  activeSort: PropTypes.string,
  searchTerms: PropTypes.string,
  title: PropTypes.string.isRequired,
  filterBoolean: PropTypes.bool.isRequired,
  deptBoolean: PropTypes.bool.isRequired,
  updateMessage: PropTypes.func.isRequired,
}

JobsSection.defaultProps = {
  activeSort: "",
  departmentFilter: [],
  locationFilter: [],
}

export default JobsSection
