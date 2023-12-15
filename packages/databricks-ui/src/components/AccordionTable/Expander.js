import React from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"

const Expander = ({ row }) =>
  row.canExpand ? (
    <button type='button' className='block'>
      <IconResolver
        className='text-orange-04 ml-4 w-2'
        token={row.isExpanded ? "minus" : "plus"}
      />
    </button>
  ) : null

Expander.propTypes = {
  row: PropTypes.shape({
    canExpand: PropTypes.bool,
    isExpanded: PropTypes.bool,
  }).isRequired,
}

export default Expander
