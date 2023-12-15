import React from "react"
import PropTypes from "prop-types"

const PersonalizationWrapper = ({ entity, children, key }) => {
  return entity?.fieldBoolean ? (
    <div
      data-key={key}
      id={entity?.fieldKey}
      className={`${entity?.fieldBoolean ? "hidden" : ""}`}
    >
      {children}
    </div>
  ) : (
    children
  )
}

PersonalizationWrapper.propTypes = {
  entity: PropTypes.shape({
    fieldKey: PropTypes.string,
    fieldBoolean: PropTypes.bool,
  }),
  children: PropTypes.node.isRequired,
  key: PropTypes.string,
}

PersonalizationWrapper.defaultProps = {
  entity: undefined,
  key: undefined,
}
export default PersonalizationWrapper
