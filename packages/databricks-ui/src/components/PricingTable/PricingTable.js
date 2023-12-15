import React from "react"
import PropTypes from "prop-types"
import Table from "./Table"
import { useBreakpoint } from "../../utils/use-breakpoint"

const PricingTable = ({ columnsData, data, expandLabel, collapseLabel }) => {
  const isTablet = useBreakpoint("md")

  const memoColumns = React.useMemo(() => columnsData, [columnsData.length])

  const memoData = React.useMemo(() => data, [data.length])

  if (isTablet) {
    return (
      <Table
        columns={memoColumns}
        data={memoData}
        expandLabel={expandLabel}
        collapseLabel={collapseLabel}
      />
    )
  }

  return (
    <div className='flex flex-col gap-5'>
      {memoColumns
        .filter((column) => column.accessor !== "column1")
        .map((column) => {
          return <Table key={column.id} columns={[column]} data={memoData} />
        })}
    </div>
  )
}

PricingTable.propTypes = {
  columnsData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  expandLabel: PropTypes.string,
  collapseLabel: PropTypes.string,
}

PricingTable.defaultProps = {
  expandLabel: "Expand row",
  collapseLabel: "Collapse row",
}

export default PricingTable
