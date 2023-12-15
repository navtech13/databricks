import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { PricingContext, PricingSelectorNew } from "databricks-ui"
import { getCloudData, getPlanData, getRegionData } from "../data/pricingFilterData"

const getDefaultFilter = (options, order) => {
  let value = null
  order.every((element) => {
    // Get the value in the options array
    const item = options.filter((option) => option.value === element)
    // If found and not disabled, use that value
    if (item[0]?.disabled === false) {
      value = element
      return false
    }
    return true
  })
  return value
}

const PricingSection = ({
  children,
  filters,
  title,
  regionList,
  availableClouds,
  availablePlans,
  ...props
}) => {
  const [region, setRegion] = useState(null)
  const [availableRadioButtons, setAvailableRadioButtons] = useState(null)

  let filteredPlanData = getPlanData()
  let filteredCloudData = getCloudData()

  if (availableRadioButtons) {
    filteredCloudData = {
      ...getCloudData(),
      options: getCloudData().options.map((cloudItem) => {
        const disabled = !Object.keys(availableRadioButtons).includes(
          cloudItem.value
        )
        return { ...cloudItem, disabled }
      }),
    }
  }

  const [cloud, setCloud] = useState(
    filters.includes("cloud") &&
      getDefaultFilter(filteredCloudData.options, ["aws", "azure", "google"])
  )

  if (availableRadioButtons && availableRadioButtons[cloud]) {
    filteredPlanData = {
      ...getPlanData(),
      options: getPlanData().options.map((planItem) => {
        const disabled = !availableRadioButtons[cloud].includes(planItem.value)
        return { ...planItem, disabled }
      }),
    }
  }

  const [plan, setPlan] = useState(
    filters.includes("plan") &&
      getDefaultFilter(filteredPlanData.options, [
        "premium",
        "standard",
        "enterprise",
      ])
  )

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const cloudParam = urlParams.get("cloud")
    const planParam = urlParams.get("plan")
    const regionParam = urlParams.get("region")

    if (cloudParam) {
      setCloud(cloudParam)
    }
    if (planParam) {
      setPlan(planParam)
    }
    if (regionParam) {
      setRegion({ value: regionParam, label: regionParam })
    }
  }, [])

  useEffect(() => {
    setPlan(
      filters.includes("plan") &&
        getDefaultFilter(filteredPlanData.options, [
          "premium",
          "standard",
          "enterprise",
        ])
    )
  }, [cloud])

  return (
    <PricingContext.Provider
      value={{
        cloud,
        setCloud,
        plan,
        setPlan,
        region,
        setRegion,
        availableRadioButtons,
        setAvailableRadioButtons,
      }}
      {...props}
    >
      <div className='pricing-section mt-8'>
        {title && <h2 className='inner-wrapper mb-4 mt-8'>{title}</h2>}
        <PricingSelectorNew
          className='inner-wrapper my-5 min-h-[80px]'
          cloudData={filteredCloudData}
          planData={filteredPlanData}
          regionData={getRegionData()}
          regionList={regionList}
          hideCloud={!filters.includes("cloud")}
          hidePlan={!filters.includes("plan")}
          hideRegion={!filters.includes("region")}
        />
        {children}
      </div>
    </PricingContext.Provider>
  )
}

PricingSection.propTypes = {
  children: PropTypes.node.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  availableClouds: PropTypes.arrayOf(PropTypes.string).isRequired,
  availablePlans: PropTypes.arrayOf(PropTypes.string).isRequired,
  regionList: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string,
}

PricingSection.defaultProps = {
  title: undefined,
}

export default PricingSection
