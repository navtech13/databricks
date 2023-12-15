import React, { useState, useEffect } from "react"
import { PricingCalculator, PricingSelector, Button } from "databricks-ui"

const PricingCalculatorLayout = () => {
  const dataPath = "/data/pricing"
  const [plan, setPlan] = useState("premium")
  const [cloud, setCloud] = useState("AWS")
  const [computeTypes, setComputeTypes] = useState([])
  const [activeTypes, setActiveTypes] = useState([])
  const [monthlyTotal, setMonthlyTotal] = useState(0)
  const [totals, setTotals] = useState([])
  const [calculators, setCalculator] = useState([
    {
      key: 0,
      index: 0,
      setTotals,
      totals,
    },
  ])

  const updateGrandTotal = () => {
    let currentTotal = 0
    currentTotal = totals.reduce(
      (partialSum, item) => partialSum + parseFloat(item.total),
      0
    )
    setMonthlyTotal(currentTotal)
  }

  const editCalculator = (index, total, activeType) => {
    totals.splice(index, 1, { id: index, total, activeType })
    setActiveTypes((prev) => {
      const list = [...prev]
      list[index] = activeType
      return list
    })
    updateGrandTotal()
  }

  const addCalculator = () => {
    setCalculator([
      ...calculators,
      {
        key: calculators[calculators.length - 1].index + 1,
        index: calculators[calculators.length - 1].index + 1,
        setTotals,
        totals,
      },
    ])
  }

  const removeCalculator = (id) => {
    const filtered = calculators.filter((item) => item.index !== id)
    setCalculator(filtered)
    setActiveTypes((prev) => {
      const newList = [...prev]
      newList[id] = undefined
      return newList
    })
    setTotals(totals.filter((item) => item.id !== id))
  }

  const resetPage = () => {
    // reset all calculators and monthly total
    setTotals([])
    setCalculator([
      {
        key: 0,
        index: 0,
        setTotals,
        totals,
      },
    ])
    updateGrandTotal()
  }

  // SQL compute types must be in specific order at end of list
  const sortComputeTypes = (options) => {
    if (cloud === "AWS" && plan !== "standard") {
      const filtered = options.filter((item) => {
        return (
          !item.label.includes("SQL Serverless Compute") &&
          !item.label.includes("SQL Pro Compute")
        )
      })
      filtered.push(
        { label: "SQL Pro Compute (Promotional Price)", value: null },
        { label: "SQL Pro Compute", value: null },
        { label: "SQL Serverless Compute (Promotional Price)", value: null },
        { label: "SQL Serverless Compute", value: null }
      )
      options = filtered
    }
    return options
  }

  useEffect(() => {
    if (cloud !== "Azure") {
      fetch(`${dataPath}/${cloud}.json`)
        .then((res) => res.json())
        .then((result) => {
          let types = [
            ...new Map(
              result.map((item) => [`${item.compute}${item.plan}`, item])
            ).values(),
          ]
          types = types.filter((item) => {
            if (item.instance) {
              // if plan is standard then filter out sql products
              if (
                plan !== "standard" &&
                (item.compute.includes("SQL Pro") ||
                  item.compute.includes("SQL Serverless"))
              ) {
                return true
              }
              if (plan.toLocaleUpperCase() === item.plan.toLocaleUpperCase()) {
                return true
              }
            }
          })
          let options = []
          options = types.map(function (item) {
            if (
              item.compute.includes("SQL Serverless Compute") ||
              item.compute.includes("SQL Pro Compute")
            ) {
              return {
                label: `${item.compute}`,
                value: null, // pricing comes from region for sql
              }
            }
            return {
              label: `${item.compute} ($${Number(item.baserate).toFixed(2)}/DBU)`,
              value: item.baserate.replace("$", ""),
            }
          })
          options = sortComputeTypes(options)
          setComputeTypes(options)
        })
    }
  }, [plan, cloud])

  useEffect(() => {
    updateGrandTotal()
  }, [totals])

  const handlePlanChange = (selected) => {
    resetPage()

    setPlan(selected)
  }

  const handleCloudChange = (selected) => {
    resetPage()
    if ((selected === "GCP" || selected === "Azure") && plan == "enterprise") {
      setPlan("premium")
    }
    setCloud(selected)
  }

  return (
    <>
      <div className='mb-2.5'>
        <PricingSelector
          showMonthlyTotal
          handleCloudChange={handleCloudChange}
          handlePlanChange={handlePlanChange}
          plan={plan}
          cloud={cloud}
          monthlyTotal={monthlyTotal}
        />
      </div>
      {cloud !== "Azure" ? (
        <div>
          {calculators.map((calculatorData) => (
            <PricingCalculator
              {...calculatorData}
              plan={plan}
              cloud={cloud}
              computeTypes={computeTypes}
              removeCalculator={removeCalculator}
              editCalculator={editCalculator}
            />
          ))}
          <div className='mt-2.5'>
            <Button onClick={addCalculator}>Add compute type</Button>
          </div>
        </div>
      ) : (
        <div className='shadow-legacy-card-normal border-gray-warm-lines w-full bg-white p-5 text-center'>
          <p className='h4'>
            For Azure Databricks workloads calculation please visit{" "}
            <a
              href='https://azure.microsoft.com/en-us/pricing/details/databricks/'
              target='_blank'
              rel='noreferrer'
            >
              here
            </a>
          </p>
        </div>
      )}
      {cloud === "AWS" && (
        <p className='w-full pt-2.5 md:w-2/3'>
          Note: This Pricing Calculator provides only an estimate of your Databricks
          cost. Your actual cost depends on your actual usage. Serverless estimates
          include compute infrastructure costs. Non-serverless estimates do not
          include cost for any required AWS services (e.g., EC2 instances).
        </p>
      )}
      {cloud === "GCP" && (
        <p className='w-full pt-2.5 md:w-2/3'>
          Note: This Pricing Calculator provides only an estimate of your Databricks
          cost. Your actual cost depends on your actual usage. Serverless estimates
          include compute infrastructure costs. Non-serverless estimates do not
          include cost for any required Google Cloud services.
        </p>
      )}
      {activeTypes.find((item) => item?.includes("Model Serving")) && (
        <p className='w-full pt-2 md:w-2/3'>
          Note that workloads scaling down to zero will incur at most two launch
          charges per hour upon restart, with each consuming 2 DBUs
        </p>
      )}
    </>
  )
}

export default PricingCalculatorLayout
