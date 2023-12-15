import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Dropdown from "./Dropdown"
import Input from "./Input"
import Totals from "./Totals"
import { TextLink } from ".."
import getCalculatorProps, { calculateTotal } from "./calculatorMaps"

const PricingCalculator = ({
  cloud,
  plan,
  index,
  removeCalculator,
  computeTypes,
  editCalculator,
}) => {
  const [localTotal, setLocalTotal] = useState(0)
  const [computeOption, setComputeOption] = useState()
  const [instanceOption, setInstanceOption] = useState()
  const [region, setRegion] = useState()
  const [regionTypes, setRegionTypes] = useState([])
  const [instances, setInstances] = useState([])
  const [instancesCount, setInstancesCount] = useState(2)
  const [hoursCount, setHoursCount] = useState(0)
  const [daysCount, setDaysCount] = useState(0)
  const [instanceHours, setInstanceHours] = useState(0)
  const dataPath = "/data/pricing"

  // when compute type dropdown changes, populate the instance type/region dropdown
  useEffect(() => {
    fetch(`${dataPath}/${cloud}.json`)
      .then((res) => res.json())
      .then((result) => {
        if (result.error == null) {
          let options = []
          // populate regions if sql
          if (
            computeOption?.label.includes("SQL Serverless Compute") ||
            computeOption?.label.includes("SQL Pro Compute") ||
            computeOption?.label.includes(
              "Model Serving/Serverless Real-Time Inference"
            )
          ) {
            const computeLabel = computeOption?.label
              ?.toLowerCase()
              ?.replace(/\s\(\$.+?\)/, "")
            let uniqueRegions = result.filter(
              (item) =>
                item.region !== "n/a" &&
                item.region !== null &&
                item.plan?.toLowerCase() === plan.toLowerCase() &&
                item.cloud?.toLowerCase() === cloud.toLowerCase() &&
                item.compute?.toLowerCase() === computeLabel
            )
            uniqueRegions = [
              ...new Map(uniqueRegions.map((item) => [item.region, item])).values(),
            ]
            uniqueRegions = uniqueRegions.map((item) => ({
              label: `${item.region} ($${item.baserate}/DBU)`,
              value: item.region,
            }))
            if (uniqueRegions) {
              const regionOrder = ["US", "Ca", "SA", "Eu", "AP"]
              uniqueRegions.sort((a, b) => {
                const aRegion = a.label.split(" ")[0].substr(0, 2)
                const bRegion = b.label.split(" ")[0].substr(0, 2)
                return regionOrder.indexOf(aRegion) - regionOrder.indexOf(bRegion)
              })
              setRegionTypes(uniqueRegions)
              setRegion(uniqueRegions[0])
            }

            result.forEach((item) => {
              if (
                item.compute === computeOption?.label.split("(")[0].trim() &&
                item.plan?.toLowerCase() === plan.toLowerCase()
              ) {
                options.push({
                  label: item.selector,
                  value: item.dburate,
                })
              }
            })
          } else {
            result.forEach((item) => {
              if (
                item.compute === computeOption?.label.split("(")[0].trim() &&
                item.plan?.toLowerCase() === plan.toLowerCase()
              ) {
                options.push({
                  label: item.selector,
                  value: item.dburate,
                })
              }
            })
          }
          options = sortInstances(options)
          setInstances(options)
        }
      })
  }, [computeOption])

  // when plan or cloud selectors change reset
  useEffect(() => {
    setComputeOption(null)
    setInstanceOption("")
    setInstanceHours(0)
    setInstancesCount(0)
    setInstances([])
    setHoursCount(0)
    setDaysCount(0)
    setLocalTotal(0)
    setRegion(null)
    setRegionTypes([])
  }, [plan, cloud])

  // when region selector changes, update instance types
  useEffect(() => {
    setInstanceOption("")
    setInstanceHours(0)
    if (
      !computeOption?.label?.includes("Model Serving/Serverless Real-Time Inference")
    ) {
      setInstancesCount(instancesCount)
    }
    setInstances([])
    fetch(`${dataPath}/${cloud}.json`)
      .then((res) => res.json())
      .then((result) => {
        if (region) {
          const options = []
          const selector = !computeOption?.label.includes("DBU")
            ? computeOption?.label
            : computeOption?.label.split("(")[0].trim()

          result.forEach((item) => {
            if (
              item.compute === selector &&
              item.plan?.toLowerCase() === plan.toLowerCase() &&
              item.region === region.value
            ) {
              options.push({
                label: item.selector,
                value: item.dburate,
              })
            }
          })
          setInstances(options)
        }
      })
  }, [region])

  // calculate local totals
  useEffect(() => {
    if (computeOption && instanceOption) {
      let dbuValue = computeOption.value
      if (
        computeOption.label.includes("SQL Serverless Compute") ||
        computeOption.label.includes("SQL Pro Compute") ||
        computeOption.label.includes("Model Serving/Serverless Real-Time Inference")
      ) {
        const start = region.label?.indexOf("$")
        const end = region.label?.indexOf("/")
        if (start > 0 && end > 0) {
          dbuValue = region.label?.slice(start + 1, end)
        }
      }

      setLocalTotal(
        calculateTotal({
          type: computeOption?.label,
          dbuValue,
          instanceOption,
          instancesCount,
          hoursCount,
          daysCount,
        })
      )
      setInstanceHours(instancesCount * hoursCount * daysCount)
    }
  }, [computeOption, instanceOption, instancesCount, hoursCount, daysCount, plan])

  // on total change, update parent and set grand totals
  useEffect(() => {
    editCalculator(index, localTotal, computeOption?.label)
  }, [localTotal, computeOption])

  const handleComputeTypeChange = (selected) => {
    setComputeOption(selected)
    setLocalTotal(0)
    setInstanceOption("")
  }

  // get usage (dbus)
  const usage = () => {
    let usageVal = 0
    if (instanceOption) {
      usageVal = instanceOption.value * instanceHours
    }
    if (
      computeOption?.label.includes("Model Serving/Serverless Real-Time Inference")
    ) {
      usageVal =
        Math.ceil((instancesCount * hoursCount) / instanceOption.value) *
        instanceOption.value
    }
    if (Number.isNaN(usageVal)) {
      usageVal = 0
    }
    return usageVal.toFixed(2)
  }

  // sort instance types by type and then vcpu for aws
  const sortInstances = (options) => {
    if (
      cloud === "AWS" &&
      !computeOption?.label.includes("SQL Compute") &&
      !computeOption?.label.includes("SQL Serverless Compute") &&
      !computeOption?.label.includes("SQL Pro Compute")
    ) {
      // parse fields to group and sort by
      const parsedVals = options.reduce((newArr, item) => {
        const type = item.label.split(".")[0]
        const vcpu = item.label.split("|")[1].trim().replace("CPUs", "")
        const groupingOrder = ["m", "c", "r", "i", "d", "g", "p", "z"]
        newArr.push({
          label: item.label,
          value: item.value,
          type,
          vcpu,
          group: groupingOrder.indexOf(type.charAt(0)),
        })
        return newArr
      }, [])
      // sort by grouping, then instance name, and then by vCPU
      parsedVals.sort((a, b) => {
        if (a.group === b.group) {
          if (a.type === b.type) {
            return a.vcpu - b.vcpu
          }
          return a.type > b.type ? 1 : -1
        }
        return a.group > b.group ? 1 : -1
      })
      // format for select list
      options = parsedVals.map((item) => {
        return { label: item.label, value: item.value }
      })
    }
    return options
  }

  const computeType = computeOption?.label?.replace(/\s\(\$.+?\)/, "")
  const rollover = true
  let hours = instanceHours
  if (
    computeOption?.label.includes("Model Serving/Serverless Real-Time Inference")
  ) {
    hours = daysCount
  }

  if (Number.isNaN(hours)) {
    hours = 0
  }

  return (
    <div
      className={`shadow-legacy-card-normal border-gray-warm-lines even:bg-gray-warm-light mb-1 pt-2.5 pl-2.5 pr-3 pb-4 odd:bg-white `}
    >
      <div className='flex flex-col space-y-3 md:flex-row md:space-y-0'>
        <div className='mr-6 w-full md:w-1/3 md:max-w-[332px]'>
          <Dropdown
            name='Compute type'
            options={computeTypes}
            setInput={handleComputeTypeChange}
            selected={computeOption}
          />
        </div>
        <div className='mr-2 w-full md:w-[30%]'>
          <Dropdown
            {...getCalculatorProps({ level: "level2", type: computeType, cloud })}
            options={instances}
            setInput={setInstanceOption}
            selected={instanceOption}
          />
        </div>
        <div className='flex w-full flex-1'>
          <div className='mr-1.5 w-[40%]'>
            <Input
              {...getCalculatorProps({ level: "level3", type: computeType, cloud })}
              rollover={rollover}
              cloud={cloud}
              setInput={setInstancesCount}
              inputValue={instancesCount}
            />
          </div>
          <div className='mr-1.5 w-[40%]'>
            <Input
              {...getCalculatorProps({ level: "level4", type: computeType })}
              setInput={setHoursCount}
              inputValue={hoursCount}
            />
          </div>
          <div className='w-[20%]'>
            <Input
              {...getCalculatorProps({ level: "level5", type: computeType })}
              setInput={setDaysCount}
              inputValue={daysCount}
            />
          </div>
        </div>
      </div>
      <div className='mt-2 flex flex-col items-center md:flex-row'>
        <div className='mr-0 w-full md:mr-6 md:w-1/3 md:max-w-[332px]'>
          {(computeOption?.label.includes("SQL Serverless Compute") ||
            computeOption?.label.includes("SQL Pro Compute") ||
            computeOption?.label.includes(
              "Model Serving/Serverless Real-Time Inference"
            )) && (
            <Dropdown
              name='Select region'
              options={regionTypes}
              setInput={setRegion}
              selected={region}
            />
          )}
        </div>
        <Totals
          type={computeOption?.label}
          total={localTotal}
          usage={usage()}
          instanceHours={hours}
          cloud={cloud}
        />
      </div>
      {index !== 0 && (
        <div className='mt-2'>
          <TextLink
            variant='A'
            onClickCallback={() => removeCalculator(index)}
            label='Remove compute type'
          >
            Remove compute type
          </TextLink>
        </div>
      )}
    </div>
  )
}

PricingCalculator.propTypes = {
  index: PropTypes.number.isRequired,
  cloud: PropTypes.string.isRequired,
  plan: PropTypes.string.isRequired,
  removeCalculator: PropTypes.func.isRequired,
  computeTypes: PropTypes.func.isRequired,
  editCalculator: PropTypes.func.isRequired,
}

export default PricingCalculator
