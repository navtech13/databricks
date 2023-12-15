import React from "react"
import PropTypes from "prop-types"
import IconResolver from "../../IconResolver"

const NavAccordion = ({ children, isLevel0Open, ...props }) => {
  return (
    <button
      type='button'
      className='inline-flex justify-between xl:inline'
      {...props}
    >
      {children}{" "}
      <IconResolver
        token='arrowDown'
        className={`ml-2 xl:hidden ${isLevel0Open && "rotate-180"}`}
      />
    </button>
  )
}

NavAccordion.propTypes = {
  children: PropTypes.node.isRequired,
  isLevel0Open: PropTypes.bool,
}

NavAccordion.defaultProps = {
  isLevel0Open: false,
}

export default NavAccordion
