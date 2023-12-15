import React from "react"
import PropTypes from "prop-types"

const Grid = ({ columns, gap, children, className }) => {
  const columnMap = {
    12: "grid grid-cols-12",
    4: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    3.5: "grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3",
    3: "grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3",
    "2:3": "grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-3",
    2: "grid grid-cols-1 md:grid-cols-2",
    1: "grid grid-cols-1",
    "4:4": "grid grid-cols-4 md:grid-cols-4",
    "3:4": "grid grid-cols-3 md:grid-cols-4",
    "2:4": "grid grid-cols-2 md:grid-cols-4",
    "1:4": "grid grid-cols-1 md:grid-cols-4",
    "1:3": "grid grid-cols-1 md:grid-cols-3",
  }

  return (
    <div data-cy='Grid' className={`${columnMap[columns]} gap-${gap} ${className}`}>
      {children}
    </div>
  )
}

Grid.propTypes = {
  columns: PropTypes.oneOf([0, 1, 2, 3, 4, 12, "1:4", "2:4", "3:4", "1:3", "2:3"]),
  gap: PropTypes.oneOf([0, 1, 2, 3, 4, 6]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Grid.defaultProps = {
  columns: 3,
  gap: 2,
  className: "",
}

export default Grid
