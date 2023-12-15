import React from "react"
import PropTypes from "prop-types"
import Tippy from "@tippyjs/react"
import RadioOptions from "./RadioOptions"
import IconResolver from "../IconResolver"
import "tippy.js/dist/tippy.css"

const PricingSelector = ({
  showMonthlyTotal,
  monthlyTotal,
  handlePlanChange,
  handleCloudChange,
  plan,
  cloud,
  rollover,
}) => {
  const planTypes = [
    { label: "Standard", value: "standard" },
    { label: "Premium", value: "premium" },
    { label: "Enterprise", value: "enterprise" },
  ]

  const cloudTypes = [
    { label: "AWS", value: "AWS" },
    { label: "Azure", value: "Azure" },
    { label: "Google Cloud", value: "GCP" },
  ]

  return (
    <div className='flex flex-col items-center space-y-4 md:flex-row md:space-y-0'>
      <RadioOptions
        title='Select plan'
        options={planTypes}
        rollover={rollover}
        name='plan'
        setInput={handlePlanChange}
        selected={plan}
        cloud={cloud}
      />
      <RadioOptions
        title='Select cloud'
        options={cloudTypes}
        name='cloud'
        setInput={handleCloudChange}
        selected={cloud}
      />
      {showMonthlyTotal && (
        <div className='bg-gray-warm-light border-gray-lines mt-2.5 ml-auto flex h-5 w-full items-center border py-1 pl-2 md:w-1/3 '>
          <Tippy
            content={
              <span>
                <strong>Grand total:</strong>
                <p>This is the total monthly consumption rate.</p>
              </span>
            }
          >
            <button>
              <IconResolver token='help' className='text-light-gray mr-1 h-2 w-2' />
            </button>
          </Tippy>
          <p className='h5 flex items-center font-bold'>
            Monthly total:{" "}
            <span className='text-3 ml-2.5'>
              ${parseFloat(monthlyTotal).toFixed(2)}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

PricingSelector.propTypes = {
  showMonthlyTotal: PropTypes.bool,
  monthlyTotal: PropTypes.number,
  handlePlanChange: PropTypes.func.isRequired,
  handleCloudChange: PropTypes.func.isRequired,
  plan: PropTypes.string.isRequired,
  cloud: PropTypes.string.isRequired,
  rollover: PropTypes.bool,
}

PricingSelector.defaultProps = {
  showMonthlyTotal: false,
  monthlyTotal: 0,
  rollover: false,
}

export default PricingSelector
