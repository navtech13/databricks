import React from "react"
import PropTypes from "prop-types"

const SmallTitleCardGroup = ({ children, columns }) => {
  return (
    <div className={`grid md:grid-cols-2 lg:grid-cols-${columns} gap-4`}>
      {children}
    </div>
  )
}

export default SmallTitleCardGroup

SmallTitleCardGroup.propTypes = {
  children: PropTypes.node,
  columns: PropTypes.oneOf([2, 3]),
}

SmallTitleCardGroup.defaultProps = {
  children: [],
  columns: 3,
}
