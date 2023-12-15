import React, { useState } from "react"
import PropTypes from "prop-types"
import Accordion from "../Accordion"

const AccordionList = ({ accordions, variant }) => {
  const variantMap = {
    "gray": "bg-gray-warm-light",
    "white": "bg-white",
    "alternate": "odd:bg-white even:bg-navy-03/[0.09]"
  }

  const style = variantMap[variant]

  return (
    <div>
      {accordions?.length &&
        accordions.map((accordion, i) => {
          return (
            <div
              key={accordion.key || accordion.description}
              className={`${style} last:mb-0`}
            >
              <Accordion
                variant={variant}
                index={i}
                {...accordion}
              />
            </div>
          )
        })}
    </div>
  )
}
AccordionList.propTypes = {
  accordions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  variant: PropTypes.oneOf(["gray", "white", "alternate"]),
}

AccordionList.defaultProps = {
  variant: "gray",
}

export default AccordionList