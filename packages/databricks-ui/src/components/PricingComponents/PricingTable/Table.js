import React from "react"
import PropTypes from "prop-types"
import { useTable, useExpanded } from "react-table"
import RichText from "../../RichText"
import calculateBgColor from "../../AccordionTable/calculateAccordionBgColor"

const Table = ({
  columns: userColumns,
  data,
  title,
  expandLabel,
  expandAllLabel,
  collapseLabel,
  collapseAllLabel,
  hideTopControls,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleAllRowsExpanded,
  } = useTable(
    {
      columns: userColumns,
      data,
      autoResetExpanded: false,
    },
    useExpanded // Use the useExpanded plugin hook
  )

  const cellStyleMap = {
    expander: "min-w-[56px] w-[56px] max-w-[56px]",
    column0: "text-left flex-[2] w-[255px] min-w-[255px]",
  }
  const isAllRowsExpanded = (rowsData) => {
    const canExpandRows = rowsData.filter(
      (row) => row.isExpanded !== true && row.canExpand
    )
    return canExpandRows?.length === 0
  }

  return (
    <div className='flex flex-wrap items-end justify-between gap-y-3 overflow-auto'>
      {title && <h2 className='w-9/12'>{title}</h2>}
      {!hideTopControls && (
        <div className='b5 text-orange-04 ml-auto w-3/12 px-0.5 text-right md:pb-1'>
          <button
            type='button'
            onClick={() => toggleAllRowsExpanded(!isAllRowsExpanded(rows))}
          >
            {isAllRowsExpanded(rows) ? collapseAllLabel : expandAllLabel}
          </button>
        </div>
      )}
      <table className=' w-full' {...getTableProps()}>
        <thead className=''>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                if (column.id === "expander") {
                  return <></>
                }
                return (
                  <RichText
                    as='th'
                    {...column.getHeaderProps()}
                    {...(column.id === "column0" && {
                      colSpan: 2,
                    })}
                    className={
                      column.id === "column0"
                        ? "text-3 text-left font-normal"
                        : "text-3 font-normal"
                    }
                  >
                    {column.render("Header")}
                  </RichText>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody className='border-almost-black border-t' {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            const bgColor = calculateBgColor(row)
            return (
              <tr
                className={`${bgColor} ${row.depth === 0 ? "main-row" : "sub-row"} ${
                  row.canExpand ? "cursor-pointer" : ""
                } h-12`}
                {...(row.canExpand && {
                  onClick: () => row.toggleRowExpanded(),
                  "aria-expanded": row.isExpanded,
                  "aria-label": row.isExpanded ? collapseLabel : expandLabel,
                  tabIndex: 0,
                  role: "button",
                  onKeyDown: ({ key }) =>
                    (key === "Enter" || key === " ") && row.toggleRowExpanded(),
                })}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  const columnId = cell.column.id
                  if (cell?.value?.skip) {
                    return <></>
                  }
                  return (
                    <RichText
                      as='td'
                      colSpan={cell?.value?.colSpan}
                      className={`py-3 ${row.depth === 0 ? "h5" : "b5"} 
                      ${
                        cellStyleMap[columnId] ||
                        "min-w-[275px] max-w-[275px] flex-1 px-0.5"
                      }
                      ${cell?.value?.colSpan > 1 && "text-center"}
                      `}
                      {...cell.getCellProps()}
                    >
                      {columnId === "expander"
                        ? cell.render("Cell")
                        : cell?.value?.text}
                    </RichText>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string,
  expandLabel: PropTypes.string.isRequired,
  collapseLabel: PropTypes.string.isRequired,
  expandAllLabel: PropTypes.string,
  collapseAllLabel: PropTypes.string,
  hideTopControls: PropTypes.bool,
}

Table.defaultProps = {
  title: "",
  expandAllLabel: "Expand all",
  collapseAllLabel: "Collapse all",
  hideTopControls: false,
}

export default Table
