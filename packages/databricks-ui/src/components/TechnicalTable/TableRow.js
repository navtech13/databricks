import React, { useState } from "react"
import PropTypes from "prop-types"
import { getVerticalAlignValue } from "."
import RichText from "../RichText"
import IconResolver from "../IconResolver"

const TableRow = ({ row, rowIndex, tableType }) => {
  const [isExpanded, setExpanded] = useState(false)

  const toggleSubRows = () => {
    setExpanded(!isExpanded)
  }

  const calculateBgColor = () => {
    if (tableType !== "pricingSecondary") return null
    return rowIndex % 2 === 0 ? "#F2F5F7" : "#FFFF"
  }

  const iconMap = {
    success: {
      icon: "circleCheckmark",
      color: "text-[#3CAA60]",
    },
    warning: {
      icon: "circledHyphen",
      color: "text-[#FACB66]",
    },
    error: {
      icon: "circle",
      color: "text-orange-600",
    },
    failed: {
      icon: "circleFailed",
      color: "text-orange-500",
    },
    empty: {
      icon: "emptyCircle",
      color: "",
    },
  }

  return (
    <>
      <tr
        className={`border border-[#CDDAE5] bg-${row?.bgColor}`}
        onClick={toggleSubRows}
        style={{ backgroundColor: calculateBgColor() }}
      >
        {row?.row.map((cell, index) => {
          if (cell?.isHidden) {
            return <td className='hidden' />
          }

          return (
            <td
              key={`cell-${cell?.id}`}
              className={`pr-1.8 w-25 border border-[#CDDAE5] p-2 ${
                cell.align === "center" ? "align-middle" : "align-top"
              }
              bg-${cell?.bgColor}
              ${index === 0 && row?.subRows?.length > 0 && "cursor-pointer"}
              `}
              style={{
                verticalAlign: getVerticalAlignValue(
                  cell.verticalAlign,
                  row?.verticalAlign,
                  cell?.columnVerticalAlign
                ),
                textAlign:
                  cell?.horizontalAlign ||
                  row?.horizontalAlign ||
                  cell?.columnHorizontalAlign,
              }}
              rowSpan={cell?.rowspan}
              colSpan={cell?.colspan}
            >
              <div
                className={`gap-1 text-${cell?.align}
                ${cell.icon && `flex justify-${cell?.align} items-center`}
                ${cell?.iconPosition === "top" && "flex-col justify-center"} ${
                  cell?.iconPosition === "right" && "flex-row-reverse"
                }
                ${index === 0 && row?.subRows && "flex items-center"}
                `}
              >
                <div
                  className={`${
                    index === 0 && tableType === "pricingSecondary"
                      ? "w-2 flex-shrink-0"
                      : "hidden"
                  }`}
                >
                  {index === 0 && row?.subRows && (
                    <IconResolver
                      role='button'
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Space" || e.key === "Enter") {
                          toggleSubRows()
                        }
                      }}
                      className='text-orange-04 h-2 w-2'
                      token={isExpanded ? "minus" : "plus"}
                    />
                  )}
                </div>
                {cell?.icon && (
                  <IconResolver
                    token={iconMap[cell.icon]?.icon}
                    className={`h-2.5 w-2.5 ${iconMap[cell.icon]?.color}`}
                  />
                )}
                <RichText
                  className={`rich-text-body ${
                    index === 0 && row?.subRows && "table-collapsible-title"
                  }`}
                >
                  {cell.children}
                </RichText>
              </div>
            </td>
          )
        })}
      </tr>
      {isExpanded &&
        tableType === "pricingSecondary" &&
        row?.subRows &&
        row?.subRows.map((subRow) => (
          <tr
            key={`subrow-${subRow?.id}`}
            className='border border-[#CDDAE5]'
            style={{ backgroundColor: calculateBgColor() }}
          >
            {subRow.map((subCell, index) => (
              <td
                key={`subcell-${subCell?.id}`}
                className={`pr-1.8 w-25 border border-[#CDDAE5] p-2 align-${
                  subCell.align || "top"
                }
                bg-${subCell?.bgColor}
                `}
                rowSpan={subCell?.rowspan}
                colSpan={subCell?.colspan}
              >
                <div
                  className={`flex items-center gap-1 justify-${
                    subCell?.align
                  } text-${subCell?.align} ${
                    subCell?.iconPosition === "top" && "flex-col justify-center"
                  } ${subCell?.iconPosition === "left" && "flex-row"}
                  ${index === 0 && tableType === "pricingSecondary" && "pl-3"}
                  `}
                >
                  {subCell?.icon && (
                    <IconResolver
                      token={iconMap[subCell.icon]?.icon}
                      className={`h-2.5 w-2.5 ${iconMap[subCell.icon]?.color}`}
                    />
                  )}
                  <RichText>{subCell.children}</RichText>
                </div>
              </td>
            ))}
          </tr>
        ))}
    </>
  )
}

export default TableRow

TableRow.propTypes = {
  row: PropTypes.shape({
    row: PropTypes.shape([]),
    subRows: PropTypes.shape([]),
    bgColor: PropTypes.string,
    verticalAlign: PropTypes.string,
    columnVerticalAlign: PropTypes.string,
    horizontalAlign: PropTypes.string,
    columnHorizontalAlign: PropTypes.string,
  }).isRequired,
  rowIndex: PropTypes.number.isRequired,
  tableType: PropTypes.string,
  bgColor: PropTypes.string,
}

TableRow.defaultProps = {
  tableType: "guidance",
  bgColor: "",
}
