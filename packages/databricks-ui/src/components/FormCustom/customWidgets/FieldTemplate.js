import React from "react"
import PropTypes from "prop-types"

const FieldTemplate = ({ classNames, children }) => (
  <div className={classNames}>{children}</div>
)

FieldTemplate.propTypes = {
  classNames: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default FieldTemplate
