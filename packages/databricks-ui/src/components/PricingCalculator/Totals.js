import React from "react"
import PropTypes from "prop-types"
import Tippy from "@tippyjs/react"
import IconResolver from "../IconResolver"
import "tippy.js/dist/tippy.css"

const Totals = ({ type, instanceHours, usage, total, cloud }) => {
  let variant = "default"
  if (
    type?.includes("SQL Serverless Compute") ||
    type?.includes("Model Serving/Serverless Real-Time Inference")
  ) {
    variant = "serverless"
  }

  const labelMap = {
    serverless: {
      hourLabel: "Serving hours",
      hourTooltip: (
        <span>
          <strong>Serving Hours Subtotal:</strong>
          <p>The number of Model Serving hours consumed in a month</p>
        </span>
      ),
      priceTooltip: (
        <span>
          <strong>Price Subtotal:</strong>
          <p>This is the total monthly price for Model Serving</p>
        </span>
      ),
      dbuTooltip: (
        <span>
          <strong>Usage DBUs Subtotal:</strong>
          <p>Number of DBUs consumed in an hour at the required concurrency</p>
        </span>
      ),
    },
    default: {
      hourLabel: "Instance hours",
      hourTooltip: (
        <span>
          <strong>Instance Hours Subtotal:</strong>
          <p>
            This is the monthly hours
            {cloud === "AWS" && " for the given instance"}
          </p>
        </span>
      ),
      priceTooltip: (
        <span>
          <strong>Price Subtotal:</strong>
          <p>This is the monthly price for the given cluster and instance</p>
        </span>
      ),
      dbuTooltip: (
        <span>
          <strong>Usage DBUs Subtotal:</strong>
          <p>This is the monthly DBU consumption for given cluster and instance</p>
        </span>
      ),
    },
  }

  const getLabel = (key) => {
    return labelMap[variant]?.[key] ?? labelMap.default?.[key]
  }

  return (
    <div className='bg-gray-warm-medium border-gray-lines md:min-h-inherit mt-2 flex h-5 min-h-[120px] w-full flex-col items-center space-y-1 p-1 md:w-2/3 md:flex-row md:space-y-0 md:pl-4'>
      <div className='flex w-full items-center md:w-1/3'>
        <Tippy content={getLabel("hourTooltip")}>
          <button type='button'>
            <IconResolver token='help' className='text-light-gray mr-1 h-2 w-2' />
          </button>
        </Tippy>
        <p className='font-bold'>
          {getLabel("hourLabel")}: {instanceHours}
        </p>
      </div>
      <div className='flex w-full items-center md:w-1/3'>
        <Tippy content={getLabel("dbuTooltip")}>
          <button type='button'>
            <IconResolver token='help' className='text-light-gray mr-1 h-2 w-2' />
          </button>
        </Tippy>
        <p className='font-bold'>Usage (DBUs): {usage}</p>
      </div>
      <div className='flex w-full items-center md:w-1/3'>
        <Tippy content={getLabel("priceTooltip")}>
          <button type='button'>
            <IconResolver token='help' className='text-light-gray mr-1 h-2 w-2' />
          </button>
        </Tippy>
        <p className='font-bold'>Price/month: ${parseFloat(total).toFixed(2)}</p>
      </div>
    </div>
  )
}

Totals.propTypes = {
  type: PropTypes.string,
  instanceHours: PropTypes.number,
  usage: PropTypes.number,
  total: PropTypes.number,
  cloud: PropTypes.string,
}

Totals.defaultProps = {
  type: "",
  instanceHours: 0,
  usage: 0.0,
  total: 0.0,
  cloud: "AWS",
}

export default Totals
