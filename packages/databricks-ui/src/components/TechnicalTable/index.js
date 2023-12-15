import React from "react"
import PropTypes from "prop-types"
import TableRow from "./TableRow"
import "./technicalTable.css"
import RichText from "../RichText"

export const getVerticalAlignValue = (
  cellVerticalAlign,
  rowVerticalAlign,
  columnVerticalAlign
) => {
  if (cellVerticalAlign === "center") {
    return "middle"
  }
  if (cellVerticalAlign !== null) {
    return cellVerticalAlign
  }
  if (rowVerticalAlign === "center") {
    return "middle"
  }
  if (rowVerticalAlign !== null) {
    return rowVerticalAlign
  }
  if (columnVerticalAlign === "center") {
    return "middle"
  }
  return columnVerticalAlign
}

const TechnicalTable = ({ tableData, tableType = "guidance", caption }) => {
  const headerStyles =
    "text-2 font-bold border-[1px] text-left min-w-[208px] border-[#CDDAE5]"

  const tableMap = {
    guidance: {
      header: `bg-navy-700 text-white`,
    },
    supportPolicy: {
      header: `bg-[#E4ECF1] text-[#1F272D] h-12`,
    },
    blog: {
      header: `bg-[#44535F] text-white`,
    },
    pricing: {
      header: `bg-[#BDCDDB] text-[#1F272D] h-12`,
    },
    pricingSecondary: {
      header: `bg-white text-[#1F272D] h-12`,
    },
  }

  return (
    <div className='overflow-x-auto overflow-y-hidden'>
      <table className={`${tableType}-table w-full border-[#CDDAE5] text-[#1F272D]`}>
        <thead className={`${tableMap[tableType].header} ${headerStyles}`}>
          {tableData?.headerRows?.map((row) => (
            <tr>
              {row.rows.map((cell) => (
                <th
                  rowSpan={cell?.rowspan}
                  colSpan={cell?.colspan}
                  className={`${tableMap[tableType].header} ${headerStyles} w-${cell?.columnWidth}`}
                  style={{
                    textAlign: cell?.horizontalAlign || row?.horizontalAlign,
                    verticalAlign: getVerticalAlignValue(
                      cell?.verticalAlign,
                      row?.verticalAlign
                    ),
                  }}
                >
                  <div className='p-2'>
                    <RichText>{cell?.content}</RichText>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableData?.bodyRows?.map((row, rowIndex) => (
            <TableRow
              key={`row-${row?.id}`}
              row={row}
              rowIndex={rowIndex}
              tableType={tableType}
            />
          ))}
        </tbody>
      </table>
      {caption && <div className='text-2 mt-2 text-[#1F272D]'>{caption}</div>}
    </div>
  )
}

export default TechnicalTable

TechnicalTable.propTypes = {
  tableData: PropTypes.shape({
    headerRows: PropTypes.shape([]),
    bodyRows: PropTypes.shape([]),
  }).isRequired,
  tableType: PropTypes.string,
  caption: PropTypes.string,
}

TechnicalTable.defaultProps = {
  tableType: "guidance",
  caption: "",
}
