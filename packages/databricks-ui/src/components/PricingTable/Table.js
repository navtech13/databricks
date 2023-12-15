import React from "react"
import PropTypes from "prop-types"
import { useTable, useExpanded } from "react-table"
import PriceCell from "./PriceCell"
import RichText from "../RichText"
import IconResolver from "../IconResolver"
import calculateAccordionBgColor from "../AccordionTable/calculateAccordionBgColor"
import { useBreakpoint } from "../../utils/use-breakpoint"

const calculateBgColor = (row) => {
  if (row.original.type === "price") {
    return "bg-navy-03 bg-opacity-10"
  }
  if (row.original.type === "features") {
    return calculateAccordionBgColor(row)
  }
  return "bg-white"
}

const Table = ({ columns: userColumns, data, expandLabel, collapseLabel }) => {
  const isTablet = useBreakpoint("md")
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: userColumns,
        data,
        autoResetExpanded: false,
      },
      useExpanded // Use the useExpanded plugin hook
    )

  return (
    <div className='flex flex-wrap items-end justify-between gap-y-3'>
      <table className='h-full w-full ' {...getTableProps()}>
        <thead className='bg-navy-01 bg-opacity-10 text-center'>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    key={column.id}
                    className={`w-${column.columnWidth}/12 border-gray-lines group h-full p-0 font-normal`}
                    style={{ minWidth: column.minWidth }}
                    {...column.getHeaderProps()}
                  >
                    <div className='flex h-full flex-col'>
                      {column.header && (
                        <div className='bg-navy-04 h4 py-1 text-white'>
                          {column.header}
                        </div>
                      )}
                      {column.description && (
                        <RichText className='border-gray-lines flex-1 py-2 px-2.5 md:border-x md:pt-3 md:pb-4 group-last:md:border-r-0'>
                          {column.description}
                        </RichText>
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr
                key={row.id}
                className={`${calculateBgColor(row)} ${
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
                  if (!cell.value) {
                    return <td className='w-1/12' />
                  }

                  if (row.original.type === "price") {
                    return (
                      <PriceCell
                        key={`${cell.column.header}-${cell.row.id}`}
                        cell={cell}
                        row={row}
                      />
                    )
                  }

                  if (row.original.type === "features" || row.depth === 1) {
                    const expander = row.canExpand && (
                      <IconResolver
                        className='text-orange-04 w-2 flex-shrink-0'
                        token={row.isExpanded ? "minus" : "plus"}
                      />
                    )
                    return (
                      <td
                        key={cell.value}
                        className={`py-3 w-${cell.column.columnWidth}/12 border-x-gray-lines group border-y-0 px-4 md:border-r md:last-of-type:border-r-0`}
                        {...cell.getCellProps()}
                      >
                        <div
                          className={`flex flex-wrap gap-0.5 md:gap-1.5 ${
                            cell.column.id === "column1"
                              ? "h5"
                              : "b5 justify-center text-center"
                          } md:flex-nowrap md:items-center`}
                        >
                          {cell.column.id === "column1" && expander}
                          {!isTablet && (
                            <h5 className='flex w-full items-center justify-center gap-1.5'>
                              {expander}
                              <RichText>{row.original.column1}</RichText>
                            </h5>
                          )}
                          <RichText>{cell.value}</RichText>
                        </div>
                      </td>
                    )
                  }
                  return <></>
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
  collapseLabel: PropTypes.string,
}

Table.defaultProps = {
  title: "",
  expandLabel: "Expand",
  collapseLabel: "Collapse",
}

export default Table
