import React from "react"
import PropTypes from "prop-types"
import Expander from "./Expander"
import Table from "./Table"

const AccordionTable = ({
  columnsData,
  data,
  title,
  expandLabel,
  expandAllLabel,
  collapseLabel,
  collapseAllLabel,
  expandedBehavior,
}) => {
  const memoColumns = React.useMemo(
    () => [
      {
        // Expander column
        id: "expander",
        minWidth: 52,
        Cell: ({ ...props }) => <Expander {...props} />,
      },
      ...columnsData,
    ],
    []
  )

  const memoData = React.useMemo(() => data, [])

  return (
    <Table
      columns={memoColumns}
      data={memoData}
      expandLabel={expandLabel}
      expandAllLabel={expandAllLabel}
      collapseLabel={collapseLabel}
      collapseAllLabel={collapseAllLabel}
      title={title}
      expandedBehavior={expandedBehavior}
    />
  )
}

AccordionTable.propTypes = {
  columnsData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string,
  expandLabel: PropTypes.string,
  expandAllLabel: PropTypes.string,
  collapseLabel: PropTypes.string,
  collapseAllLabel: PropTypes.string,
  expandedBehavior: PropTypes.oneOf(["all", "none", "first"]),
}

AccordionTable.defaultProps = {
  title: undefined,
  expandLabel: "Expand row",
  expandAllLabel: "Expand all",
  collapseLabel: "Collapse row",
  collapseAllLabel: "Collapse all",
  expandedBehavior: "none",
}

export default AccordionTable
