import React, { useState, useEffect } from "react"
import Dropdown from "databricks-ui/src/components/PricingCalculator/Dropdown"
import { PricingInstanceTable } from "databricks-ui"

const PricingInstanceTableLayout = () => {
  const [plan, setPlan] = useState({ label: "Premium", value: "premium" })
  const [cloud, setCloud] = useState({ label: "AWS", value: "AWS" })
  const [region, setRegion] = useState({})
  const [regions, setRegionTypes] = useState([])
  const [computeTypes, setComputeTypes] = useState()
  const [computeOption, setComputeOption] = useState()
  const [instances, setInstances] = useState({})
  const dataPath = "/data/pricing"

  const planTypes = [
    { label: "Standard", value: "standard" },
    { label: "Premium", value: "premium" },
    { label: "Enterprise", value: "enterprise", isDisabled: cloud.value === "GCP" },
  ]

  const cloudTypes = [
    { label: "AWS", value: "AWS" },
    { label: "Google Cloud", value: "GCP" },
  ]

  // set compute types on plan or cloud change
  useEffect(() => {
    fetch(`${dataPath}/${cloud.value}.json`)
      .then((res) => res.json())
      .then((result) => {
        const types = [...new Set(result.map((x) => x.compute))].filter(Boolean)
        const options = types.map((item) => ({
          label: item,
          value: item,
        }))
        setComputeTypes(options)
        setComputeOption(options[0])
      })
  }, [cloud])
  useEffect(() => {
    fetch(`${dataPath}/${cloud.value}.json`)
      .then((res) => res.json())
      .then((result) => {
        const types = [...new Set(result.map((x) => x.compute))].filter(Boolean)
        const options = types.map((item) => ({
          label: item,
          value: item,
        }))
        setComputeTypes(options)
        if (!computeOption) {
          setComputeOption(options[0])
        }
      })
  }, [plan])

  useEffect(() => {
    fetch(`${dataPath}/${cloud.value}.json`)
      .then((res) => res.json())
      .then((result) => {
        if (
          computeOption?.label.includes("SQL Serverless Compute") ||
          computeOption?.label.includes("SQL Pro Compute") ||
          computeOption?.label.includes(
            "Model Serving/Serverless Real-Time Inference"
          )
        ) {
          let regions = [
            ...new Set(
              result.map((x) => {
                if (x.compute === computeOption?.label && x.plan === plan?.label) {
                  return x.region
                }
                return null
              })
            ),
          ]

          regions = regions.filter(
            (item) => item !== "n/a" && item !== null && item !== undefined
          )
          const options = regions.map((item) => ({
            label: item,
            value: item,
          }))
          if (options) {
            const regionOrder = ["US", "Ca", "SA", "Eu", "AP"]
            options.sort((a, b) => {
              const aRegion = a.label.split(" ")[0].substr(0, 2)
              const bRegion = b.label.split(" ")[0].substr(0, 2)
              return regionOrder.indexOf(aRegion) - regionOrder.indexOf(bRegion)
            })
            setRegionTypes(options)
          }
          if (Object.keys(region).length === 0) {
            setRegion(options[0])
          }
        } else {
          setRegion({})
        }

        const filteredResults = getFilteredResults(result)
        setInstances(filteredResults)
      })
  }, [computeOption, plan, region?.label])

  const getFilteredResults = (result) => {
    const rowHeaders = new Map([
      ["m", "General Purpose Instances - M"],
      ["c", "Compute Optimized Instances - C"],
      ["r", "Memory Optimized Instances - R"],
      ["i", "Storage Optimized Instances - I"],
      ["d", "Storage Optimized Instances - D"],
      ["g", "GPU Instances - G"],
      ["p", "GPU Instances - P"],
      ["z", "Memory Optimized Instances - Z1D"],
    ])

    let parsedResult = []
    let section = []
    let lastItem = {}
    let usingGroupedHeaders = false
    result.forEach((item) => {
      if (region.label) {
        if (
          item.compute === computeOption?.label &&
          item.plan === plan?.label &&
          item.region === region.label
        ) {
          section.push(item)
        }
      } else {
        if (item.compute === computeOption?.label && item.plan === plan?.label) {
          // create new section if first char different for AWS when not SQL or Photon instances
          if (
            cloud.value === "AWS" &&
            !item.compute.includes("SQL") &&
            !item.compute.includes("Photon")
          ) {
            usingGroupedHeaders = true
            if (
              rowHeaders.get(lastItem.instance?.charAt(0)) !=
              rowHeaders.get(item.instance.charAt(0))
            ) {
              if (lastItem.instance) {
                if (parsedResult[rowHeaders.get(lastItem.instance.charAt(0))]) {
                  parsedResult[rowHeaders.get(lastItem.instance.charAt(0))] = [
                    ...parsedResult[rowHeaders.get(lastItem.instance.charAt(0))],
                    ...section,
                  ]
                } else {
                  parsedResult[rowHeaders.get(lastItem.instance.charAt(0))] = section
                }
                section = []
              }
            }
          }
          section.push(item)
          lastItem = item
        }
      }
    })

    if (usingGroupedHeaders) {
      section.forEach((item) => {
        if (!parsedResult[rowHeaders.get(item.instance.charAt(0))]) {
          parsedResult[rowHeaders.get(item.instance.charAt(0))] = []
        }
        if (parsedResult[rowHeaders.get(item.instance.charAt(0))]) {
          parsedResult[rowHeaders.get(item.instance.charAt(0))].push(item)
        }
      })
    } else {
      parsedResult.Instance = section
    }

    // sort broader categories in specific order
    const sortOrder = [
      "General Purpose Instances - M",
      "Memory Optimized Instances - R",
      "Memory Optimized Instances - Z1D",
      "Storage Optimized Instances - I",
      "Storage Optimized Instances - D",
      "Compute Optimized Instances - C",
      "GPU Instances - G",
      "GPU Instances - P",
      "Instance",
    ]
    let sortedResult = []
    sortOrder.forEach((item) => {
      if (parsedResult[item]) {
        sortedResult[item] = parsedResult[item]
      }
    })

    return sortedResult
  }

  const handleCloudChange = (selected) => {
    setCloud(selected)
  }

  const handlePlanChange = (selected) => {
    setPlan(selected)
  }

  const handleComputeTypeChange = (selected) => {
    setComputeOption(selected)
  }

  const handleRegionChange = (selected) => {
    setRegion(selected)
  }

  return (
    <div className='min-h-[400px]'>
      <h2 className='mb-2.5'>Supported Instance Types</h2>
      <div className='mb-3 flex flex-col items-center space-y-1 md:flex-row md:space-y-0'>
        <div className='w-full md:mr-4 md:w-2/12'>
          <Dropdown
            name='Select plan'
            options={planTypes}
            setInput={handlePlanChange}
            selected={plan}
          />
        </div>
        <div className='w-full md:mr-4 md:w-2/12'>
          <Dropdown
            name='Select cloud'
            options={cloudTypes}
            setInput={handleCloudChange}
            selected={cloud}
          />
        </div>
        <div className='w-full md:mr-4 md:w-3/12'>
          <Dropdown
            name='Databricks compute type'
            options={computeTypes}
            setInput={handleComputeTypeChange}
            selected={computeOption}
          />
        </div>
        {(computeOption?.label.includes("SQL Serverless Compute") ||
          computeOption?.label.includes("SQL Pro Compute") ||
          computeOption?.label.includes(
            "Model Serving/Serverless Real-Time Inference"
          )) && (
          <div className='w-full md:mr-4 md:w-3/12'>
            <Dropdown
              name='Select region'
              options={regions}
              setInput={handleRegionChange}
              selected={region}
            />
          </div>
        )}
      </div>

      <PricingInstanceTable
        cloud={cloud}
        instances={instances}
        computeOption={computeOption}
      />
    </div>
  )
}

export default PricingInstanceTableLayout
