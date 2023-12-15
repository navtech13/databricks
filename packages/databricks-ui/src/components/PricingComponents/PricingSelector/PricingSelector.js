import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import Select, { components } from "react-select"
import RadioControls from "./RadioControls"
import PricingContext from "../PricingContext"
import IconResolver from "../../IconResolver"
import dropdownStyles from "./dropdownStyles"
import useTranslate from "../../../../../gatsby-theme-databricks-drupal/src/utils/translate"
import { useLanguageContext } from "../../../../../gatsby-theme-databricks-drupal/src/components/language-provider"

const PricingSelector = ({
  cloudData,
  planData,
  regionData,
  regionList,
  hideCloud,
  hidePlan,
  hideRegion,
  className,
}) => {
  const { currentLanguage } = useLanguageContext()
  const { cloud, setCloud, plan, setPlan, region, setRegion } =
    useContext(PricingContext)

  const { translate } = useTranslate()

  const regionGroupMap = {
    serverless: translate("pricing.region.serverless"),
    sqlproonly: "Regions with SQL Classic and Pro only",
  }

  const listData = regionData?.options[regionList]

  let currentRegion = []
  if (listData?.[cloud] && !Array.isArray(listData?.[cloud])) {
    Object.keys(listData?.[cloud]).forEach((key) => {
      currentRegion.push({
        label: regionGroupMap[key],
        options: listData?.[cloud][key],
      })
    })
  } else {
    currentRegion = listData?.[cloud]
  }

  useEffect(() => {
    if (!hideRegion && !region && currentRegion) {
      if (!Array.isArray(listData?.[cloud])) {
        setRegion(currentRegion[0].options[0])
      } else {
        setRegion(currentRegion[0])
      }
    }
  }, [hideRegion, currentRegion])

  const handleCloudChange = (selectedCloud) => {
    setCloud(selectedCloud)

    if (!hideRegion) {
      const regionOption = regionData?.options?.[selectedCloud]?.[0]
      setRegion(regionOption)
    }
  }

  if (hideCloud && hidePlan && hideRegion) {
    return <></>
  }

  const pricingPlanHelperURL =
    currentLanguage.prefix !== ""
      ? `/${currentLanguage.prefix}/product/pricing/platform-addons`
      : "/product/pricing/platform-addons"

  // Add FAQ description to region title for managed services
  const selectTitle =
    regionList === "managedServices" ? `${regionData.title}*` : regionData.title

  return (
    <div className={`flex flex-wrap gap-y-2 ${className}`}>
      {!hidePlan && (
        <RadioControls
          className='w-full pr-2 lg:w-1/3'
          options={planData.options}
          selected={plan}
          setInput={setPlan}
          title={planData.title}
          rolloverCta={{
            text: translate("pricing.plan.helper"),
            to: pricingPlanHelperURL,
          }}
        />
      )}
      {!hideCloud && (
        <RadioControls
          className='w-full pr-2 lg:w-1/3'
          options={cloudData.options}
          selected={cloud}
          setInput={handleCloudChange}
          title={cloudData.title}
        />
      )}
      {currentRegion && !hideRegion && (
        <div className='flex w-full flex-col lg:w-1/3'>
          <h4 className='mb-0.5'>{regionData.title}</h4>
          <Select
            options={currentRegion}
            onChange={setRegion}
            aria-label={selectTitle}
            placeholder={regionData.placeholder || "Select"}
            styles={dropdownStyles()}
            value={region}
            components={{
              DropdownIndicator: (props) => {
                return (
                  <components.DropdownIndicator {...props}>
                    <IconResolver className='text-navy-06' token='chevronDown' />
                  </components.DropdownIndicator>
                )
              },
            }}
          />
        </div>
      )}
    </div>
  )
}

PricingSelector.propTypes = {
  className: PropTypes.string,
  cloudData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  planData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  regionData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.objectOf(
      PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      )
    ).isRequired,
  }),
  regionList: PropTypes.string,
  hideCloud: PropTypes.bool.isRequired,
  hidePlan: PropTypes.bool.isRequired,
  hideRegion: PropTypes.bool.isRequired,
}

PricingSelector.defaultProps = {
  className: "",
  regionData: {},
  regionList: "",
}

export default PricingSelector
