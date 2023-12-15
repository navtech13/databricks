import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import { Link } from ".."
import { useBreakpoint } from "../../utils/use-breakpoint"

const PriceCell = ({ cell, row }) => {
  const colId = cell.column.id
  const isTablet = useBreakpoint("md")
  const { title: cellTitle, price, description, cta } = cell.value

  const rowHasDescription = row.cells.find((c) => {
    if (c.column.id === "column1") {
      return false
    }
    return c?.value?.description
  })

  return (
    <td
      className={`border-gray-lines relative border-y py-4 md:border-r md:py-3 md:last-of-type:border-r-0 ${
        cta ? "md:pb-8" : ""
      } px-4 w-${cell.column.columnWidth}/12 ${
        colId === "column1" ? "text-left" : "text-center"
      }`}
      {...cell.getCellProps()}
    >
      {cellTitle && (
        <RichText as='h4' className='mb-1.5'>
          {cellTitle}
        </RichText>
      )}
      {price && <h4 className='mb-0.5 md:mb-3'>{price}</h4>}
      {description && (
        <RichText className='b5 pricing-table-price-body mb-2 md:mb-0'>
          {description}
        </RichText>
      )}
      {rowHasDescription && !description && <div className='h-3 w-full lg:h-2.5' />}
      {!isTablet && (
        <>
          <RichText as='h4' className='mb-1'>
            {row.original.column1.title}
          </RichText>
          {row.original.column1.description && (
            <RichText className='b5 pricing-table-price-body'>
              {row.original.column1.description}
            </RichText>
          )}
          {row.original?.column1.cta && (
            <Link className='b5 mt-0.5 block' to={row.original?.column1.cta.to}>
              {row.original.column1?.cta.text}
            </Link>
          )}
        </>
      )}
      {cta && (
        <div
          className={`b5 mt-2 md:absolute md:bottom-3 md:mt-2.5 ${
            colId === "column1" ? "" : "left-0 w-full text-center md:pb-0.5"
          }`}
        >
          <Link to={cta.to}>{cta.text}</Link>
        </div>
      )}
    </td>
  )
}

PriceCell.propTypes = {
  row: PropTypes.shape({
    cells: PropTypes.arrayOf(PropTypes.shape({})),
    original: PropTypes.shape({
      column1: PropTypes.shape({
        cta: PropTypes.shape({
          text: PropTypes.string,
          to: PropTypes.string,
        }),
        description: PropTypes.string,
        title: PropTypes.string,
      }),
    }),
  }).isRequired,
  cell: PropTypes.shape({
    getCellProps: PropTypes.func,
    column: PropTypes.shape({
      id: PropTypes.string,
      columnWidth: PropTypes.number,
      textAlign: PropTypes.string,
    }),
    value: PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.string,
      description: PropTypes.string,
      cta: PropTypes.shape({
        to: PropTypes.string,
        text: PropTypes.string,
      }),
    }),
  }).isRequired,
}

export default PriceCell
