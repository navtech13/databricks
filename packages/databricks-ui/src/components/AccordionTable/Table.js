import React from "react"
import PropTypes from "prop-types"
import { useTable, useExpanded } from "react-table"
import RichText from "../RichText"
import calculateBgColor from "./calculateAccordionBgColor"

const Table = ({
  columns: userColumns,
  data,
  title,
  expandLabel,
  expandAllLabel,
  collapseLabel,
  collapseAllLabel,
  expandedBehavior,
}) => {
  const expandedBehaviorMap = {
    all: data.map((item, i) => {
      return { [i]: true }
    }),
    first: [{ 0: true }],
    none: [],
  }
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
      initialState: {
        expanded: expandedBehavior ? expandedBehaviorMap[expandedBehavior] : [],
      },
    },
    useExpanded // Use the useExpanded plugin hook
  )

  const cellStyleMap = {
    expander: "min-w-[56px]",
    column1: "border-gray-lines-new border-r pr-3",
  }

  return (
    <div className='flex flex-wrap items-end justify-between gap-y-3'>
      {title && <h2 className='w-9/12'>{title}</h2>}
      <div className='b5 text-orange-04 ml-auto w-3/12 px-0.5 text-center md:pb-1'>
        <button type='button' onClick={() => toggleAllRowsExpanded(true)}>
          {expandAllLabel}
        </button>{" "}
        <span className='text-navy-06 hidden md:inline'>|</span>{" "}
        <button type='button' onClick={() => toggleAllRowsExpanded(false)}>
          {collapseAllLabel}
        </button>
      </div>
      <table
        className='border-gray-lines-new accordion-table w-full border'
        {...getTableProps()}
      >
        <thead className='sr-only'>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    className={`w-${column.columnWidth}/12`}
                    style={{ minWidth: column.minWidth }}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            const bgColor = calculateBgColor(row)
            return (
              <tr
                className={`${bgColor} ${row.depth === 0 ? "main-row" : "sub-row"} ${
                  row.canExpand ? "cursor-pointer" : ""
                }`}
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
                  return (
                    <RichText
                      as='td'
                      className={`py-3 w-${cell.column.columnWidth}/12 ${
                        row.depth === 0 ? "h5 font-bold" : "b5"
                      } ${cellStyleMap[columnId] || "px-1 text-center"}`}
                      {...cell.getCellProps()}
                    >
                      {columnId === "expander" ? cell.render("Cell") : cell.value}
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
  expandLabel: PropTypes.string,
  expandAllLabel: PropTypes.string,
  collapseLabel: PropTypes.string,
  collapseAllLabel: PropTypes.string,
  expandedBehavior: PropTypes.oneOf(["all", "none", "first"]),
}

Table.defaultProps = {
  title: "",
  expandLabel: "Expand",
  expandAllLabel: "Expand all",
  collapseLabel: "Collapse",
  collapseAllLabel: "Collapse all",
  expandedBehavior: "none",
}

export default Table
