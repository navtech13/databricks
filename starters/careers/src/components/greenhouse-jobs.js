/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { useLocation } from "@reach/router"
import PropTypes from "prop-types"
import Select from "react-select"
import JobsSection from "databricks-ui/src/components/JobsSection/JobsSection"
import selectStyles from "databricks-ui/src/components/Form/Select/selectStyles"
import getQueryParam from "../../../../packages/gatsby-theme-databricks-drupal/src/helpers/getQueryParam.js"

const GreenhouseJobsList = ({ data }) => {
  const [locationFilter, setLocationFilter] = useState([])
  const [departmentFilter, setDepartmentFilter] = useState([])
  const miscDept = "See More Jobs" // label when job has no dept assigned in metadata
  const locations = []
  const departments = []
  const urlPath = useLocation()
  const [displayMessage, setDisplayMessage] = useState()

  useEffect(() => {
    // set filters based on querystring params
    const qsDepartment = getQueryParam("department", urlPath?.search)
    const filterdDepartment = qsDepartment.replace("all", "").split(",")
    const selectedDepArr = []
    filterdDepartment.filter((departmentItem) => {
      if (departmentItem && departmentFilter.length === 0) {
        let upperCasedDept = departmentItem.replace(
          /(^\w{1})|(\s+\w{1})/g,
          (letter) => letter.toUpperCase()
        )

        switch (upperCasedDept) {
          case "People And Hr":
            upperCasedDept = "People and HR"
            break
          case "It":
            upperCasedDept = "IT"
            break
        }
        selectedDepArr.push({ label: upperCasedDept, value: upperCasedDept })
      }
    })
    setDepartmentFilter(selectedDepArr)
    const qsLocation = getQueryParam("location", urlPath?.search)
    const filterdLocation = qsLocation.replace("all", "").split("|")
    const selectedLocArr = []
    filterdLocation.filter((locationItem) => {
      if (locationItem && locationFilter.length === 0) {
        let upperCasedLocation = locationItem.replace(
          /(^\w{1})|(\s+\w{1})/g,
          (letter) => letter.toUpperCase()
        )
        // top level regions are uppercased, fix for comparison
        switch (upperCasedLocation) {
          case "Amer":
            upperCasedLocation = "AMER"
            break
          case "Apac":
            upperCasedLocation = "APAC"
            break
          case "Emea":
            upperCasedLocation = "EMEA"
            break
        }
        // get list of tags, and then filter
        const selectedLocation = locations.filter(
          (item) => item.value === upperCasedLocation
        )
        if (selectedLocation && selectedLocation.length) {
          selectedLocArr.push({
            label: upperCasedLocation,
            value: upperCasedLocation,
            tags: selectedLocation[0]?.tags,
          })
        }
      }
    })
    setLocationFilter(selectedLocArr)
  }, [])

  const updateUrl = (pushDepArr, pushLocArr) => {
    if (pushDepArr.length === 0 && pushLocArr.length === 0) {
      window.history.pushState(
        {},
        "",
        `${`${window.location.origin}${window.location.pathname}`}`
      )
    }

    if (pushDepArr.length > 0 || pushLocArr.length > 0) {
      const filteredString = pushDepArr.reduce((result, item, index) => {
        return `${result}${index ? "," : ""}${item}`
      }, "")
      const filteredLocationString = pushLocArr.reduce((result, item, index) => {
        return `${result}${index ? "|" : ""}${item}`
      }, "")
      window.history.pushState(
        {},
        "",
        `${`${window.location.origin}${window.location.pathname}?department=${
          filteredString || "all"
        }&location=${filteredLocationString || "all"}`}`
      )
    }
  }

  useEffect(() => {
    const pushDepArr = []
    const pushLocArr = []

    departmentFilter.forEach(({ value }) => {
      pushDepArr.push(value)
    })
    locationFilter.forEach(({ value }) => {
      pushLocArr.push(value)
    })

    updateUrl(pushDepArr, pushLocArr)
  }, [departmentFilter, locationFilter])
  const items = []
  let deptMeta = null
  // Loop through departments
  data?.allGreenhouseDepartment?.nodes.map((ghDepartments) => {
    ghDepartments?.jobs?.forEach((job, index) => {
      // Get the custom field for the department override value
      // Set the default to misc department
      const deptLabels = job.metadata[0].value || [miscDept]
      deptLabels.forEach((deptLabel) => {
        deptMeta = deptLabel
        // Create an array with the new department
        if (!items[deptMeta]) {
          items[deptMeta] = []
          items[deptMeta].tags = []
          items.tags = []
          departments.push({ label: deptMeta, value: deptMeta })
        }
        // Override default department
        job.filterDept = deptMeta
        // Add the job to the department
        items[deptMeta].push(job)
      })
    })
  })

  const deptSort = (a, b) => {
    // Sorts alphabetically with 'see more jobs' as last in list
    if (a === b) return 0
    if (a === "See More Jobs") return 1
    if (b === "See More Jobs") return -1
    if (a < b) return -1
    if (a > b) return 1
    return 0
  }

  // sorting and remove duplicates
  departments.sort((a, b) => (a.label > b.label ? 1 : -1))
  locations.sort((a, b) => (a.label > b.label ? 1 : -1))
  Object.keys(items).forEach((key) => {
    items[key].sort((a, b) => (a.title?.trim() > b.title?.trim() ? 1 : -1))
  })

  // populate locations dropdown
  const ignoredOffices = [
    "DO NOT USE: Scottsdale, Arizona",
    "Australian Capital Territory, Australia",
    "",
  ]
  const getChildrenOffices = (children) => {
    const childrenOffices = []
    children.forEach((item) => {
      childrenOffices.push(item?.name)
      if (item.childrenGreenhouseOffice?.length > 0) {
        childrenOffices.push(getChildrenOffices(item.childrenGreenhouseOffice))
      }
    })
    return childrenOffices.join(";")
  }
  const getAllChildrenOffices = (parent) => {
    let allChildrenLocations
    const parentLocation = data.allGreenhouseOffice.nodes.filter((item) => {
      return item.name === parent
    })
    if (parentLocation[0].children?.length > 0) {
      allChildrenLocations = getChildrenOffices(parentLocation[0].children)
    } else {
      allChildrenLocations = parent
    }
    return allChildrenLocations
  }
  const getChildrenSelectors = (children, parentId, depth) => {
    children?.forEach((child) => {
      if (child.parent_id === parentId) {
        let prefix = ""
        for (let i = 0; i < depth; i++) {
          prefix += "-"
        }
        if (!ignoredOffices.includes(child.name)) {
          const officeTags = getAllChildrenOffices(child.name)
          locations.push({
            label: `${prefix} ${child.name}`,
            value: child.name,
            tags: officeTags,
          })
        }
        if (child.childrenGreenhouseOffice?.length > 0) {
          getChildrenSelectors(
            child.childrenGreenhouseOffice,
            child.gh_Id,
            depth + 1
          )
        }
      }
    })
  }
  data?.allGreenhouseOffice.nodes.forEach((node) => {
    if (!node.parent_id) {
      const officeTags = getAllChildrenOffices(node.name)
      locations.push({ label: node.name, value: node.name, tags: officeTags })
      getChildrenSelectors(node.children, node.gh_Id, 1)
    }
  })

  const updateMessage = (data) => {
    setDisplayMessage(data)
  }
  return (
    <div className='mb-10'>
      <div className='my-4 grid grid-cols-1 gap-1 lg:grid-cols-3 lg:gap-4'>
        <Select
          isMulti
          styles={selectStyles(false, "secondary")}
          name='departments'
          options={departments}
          placeholder='Department'
          onChange={setDepartmentFilter}
          value={departmentFilter}
        />
        <Select
          isMulti
          styles={selectStyles(false, "secondary")}
          name='locations'
          options={locations}
          placeholder='Location'
          onChange={setLocationFilter}
          value={locationFilter}
        />
      </div>
      <div id='jobWrap'>
        {departmentFilter &&
          departmentFilter.sort(deptSort).map((node, i, row) => {
            if (i + 1 === row.length || row.length === 1) {
              return (
                items[node.label]?.length > 0 &&
                typeof items[node.label] === "object" && (
                  <JobsSection
                    title={node.label}
                    items={items[node.label]}
                    locationFilter={locationFilter}
                    departmentFilter={departmentFilter}
                    deptBoolean
                    updateMessage={updateMessage}
                  />
                )
              )
            }
            return (
              items[node.label]?.length > 0 &&
              typeof items[node.label] === "object" && (
                <JobsSection
                  title={node.label}
                  items={items[node.label]}
                  locationFilter={locationFilter}
                  departmentFilter={departmentFilter}
                  updateMessage={updateMessage}
                />
              )
            )
          })}
        {departmentFilter.length === 0 &&
          Object.keys(items)
            .sort(deptSort)
            .map((node, i, row) => {
              if (i + 1 === row.length) {
                return (
                  items[node].length > 0 &&
                  typeof items[node][0] === "object" && (
                    <JobsSection
                      title={node}
                      items={items[node]}
                      locationFilter={locationFilter}
                      departmentFilter={departmentFilter}
                      filterBoolean
                      updateMessage={updateMessage}
                    />
                  )
                )
                // Last one.
              }
              return (
                items[node].length > 0 &&
                typeof items[node][0] === "object" && (
                  <JobsSection
                    title={node}
                    items={items[node]}
                    locationFilter={locationFilter}
                    departmentFilter={departmentFilter}
                    updateMessage={updateMessage}
                  />
                )
              )
            })}
      </div>
      {displayMessage && (
        <>
          <div className='text-center'>
            <h3>No Jobs found.</h3>
            <h4>Please change your search criteria and try again.</h4>
          </div>
        </>
      )}
    </div>
  )
}

export default function GreenhouseJobs({ data }) {
  if (
    typeof process.env.GATSBY_GREENHOUSE_ENABLED !== "undefined" &&
    process.env.GATSBY_GREENHOUSE_ENABLED
  ) {
    return <GreenhouseJobsList data={data} />
  }

  return <></>
}

GreenhouseJobsList.propTypes = {
  jobNode: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    location: PropTypes.string,
  }).isRequired,
}
