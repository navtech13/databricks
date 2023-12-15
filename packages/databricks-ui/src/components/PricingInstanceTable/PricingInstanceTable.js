import React from "react"
import PropTypes from "prop-types"
import AccordionList from "../AccordionList"
import Row from "./Row"
import Header from "./Header"
//width, selector, vcpu, memory, storage, dburate, hourrate, instance
const PricingInstanceTable = ({ cloud, instances, computeOption }) => {
  const accordions = Object.entries(instances).map((header) => {
    if (!computeOption?.label.includes("SQL")) {
      // sort by instance name, and then by vCPU
      header[1].sort((a, b) => {
        const aInstance = a.instance.split(".")[0]
        const bInstance = b.instance.split(".")[0]
        if (aInstance === bInstance) {
          // use secondary sort if same
          return a.vcpu - b.vcpu
        }
        return aInstance > bInstance ? 1 : -1
      })
    }

    return {
      key: header[0],
      description: (
        <Header
          width='w-2/12 md:w-1/2'
          name={header[0]}
          cpu={"vCPUs"}
          memory={"Memory (GB)"}
          storage={cloud.value === "GCP" ? "Local SSD (TB)" : ""}
          dbu={"(DBU/hour)"}
          rate={"Rate ($/hour)"}
        />
      ),
      children: header[1].map((instance) => (
        <Row cloud={cloud} width='md:w-1/2 w-2/12' {...instance} />
      )),
    }
  })

  return (
    <div>
      <AccordionList variant='alternate' accordions={accordions} />
    </div>
  )
}

PricingInstanceTable.propTypes = {
  cloud: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  instances: PropTypes.node.isRequired,
  computeOption: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
  name: PropTypes.string.isRequired,
  cpu: PropTypes.string.isRequired,
  memory: PropTypes.string.isRequired,
  dbu: PropTypes.string.isRequired,
  rate: PropTypes.string.isRequired,
}

export default PricingInstanceTable
