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
  hideTopControls,
  hash,
}) => {
  const memoColumns = React.useMemo(
    () => [
      {
        // Expander column
        id: "expander",
        minWidth: 52,
        Cell: ({ ...props }) => (
          <Expander
            collapseLabel={collapseLabel}
            expandLabel={expandLabel}
            {...props}
          />
        ),
      },
      ...columnsData,
    ],
    [hash]
  )

  const memoData = React.useMemo(() => data, [hash])

  return (
    <Table
      columns={memoColumns}
      data={memoData}
      expandLabel={expandLabel}
      expandAllLabel={expandAllLabel}
      collapseLabel={collapseLabel}
      collapseAllLabel={collapseAllLabel}
      title={title}
      hideTopControls={hideTopControls}
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
  hideTopControls: PropTypes.bool,
  hash: PropTypes.string,
}

AccordionTable.defaultProps = {
  title: undefined,
  expandLabel: "Expand row",
  expandAllLabel: "Expand all",
  collapseLabel: "Collapse row",
  collapseAllLabel: "Collapse all",
  hideTopControls: false,
  hash: undefined,
}

export default AccordionTable
