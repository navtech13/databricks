import React, { useContext } from "react"
import PropTypes from "prop-types"
import {
  PricingFeatureTable as PricingTable,
  IconResolver,
  PricingContext,
  Wrapper,
} from "databricks-ui"
import filterPricing from "../helpers/filterPricing"

const PricingFeatureTable = ({
  items,
  filters,
  columnCount,
  hideTopControls,
  title,
  wholeFilter,
}) => {
  const isShown = filterPricing([{ entity: { fieldItem: wholeFilter } }]).length > 0

  if (!isShown) {
    return <></>
  }

  const { cloud, plan, region } = useContext(PricingContext)

  const columnFilters = []
  const rowFilters = []

  filters.forEach(({ entity }) => {
    // 2nd condition is a hack for the translation caused error
    const isVisibleType = entity.fieldPricingVisibility === "visible" || entity.fieldPricingVisibility === "visível"

    let areFilterShowConditionsMet = null
    let cloudMatch = true
    let regionMatch = true
    let planMatch = true

    if (isVisibleType) {
      // Visible types
      // If Visible is selected, the indicated row/column will be visible when the conditions configured below are met otherwise will be hidden.
      if (entity.fieldPricingClouds?.length > 0 && cloud) {
        cloudMatch =
          entity.fieldPricingClouds.filter((str) =>
            str.toLowerCase().includes(cloud.toLowerCase())
          ).length > 0
      }

      if (entity.fieldPricingRegions?.length > 0 && region) {
        regionMatch = entity.fieldPricingRegions.includes(region)
      }

      if (entity.fieldPricingPlans?.length > 0 && plan) {
        planMatch = entity.fieldPricingPlans.includes(plan)
      }

      if (cloudMatch && regionMatch && planMatch) {
        areFilterShowConditionsMet = true
      } else {
        areFilterShowConditionsMet = false
      }
    }
    else {
      // Hidden types
      // If Hidden is selected the indicated row/column will be visible will be hidden when the conditions configured below are met otherwise will be visible
      if (entity.fieldPricingClouds?.length > 0 && cloud) {
        cloudMatch =
          !entity.fieldPricingClouds.filter((str) =>
            str.toLowerCase().includes(cloud.toLowerCase())
          ).length > 0
      }

      if (entity.fieldPricingRegions?.length > 0 && region) {
        regionMatch = !entity.fieldPricingRegions.includes(region)
      }

      if (entity.fieldPricingPlans?.length > 0 && plan) {
        planMatch = !entity.fieldPricingPlans.includes(plan)
      }

      if (cloudMatch && regionMatch && planMatch) {
        areFilterShowConditionsMet = true
      } else {
        areFilterShowConditionsMet = false
      }
    }

    if (areFilterShowConditionsMet) {
      return
    }

    // 2nd condition is a hack for the translation caused error
    if (entity.fieldPricingElement === "row" || entity.fieldPricingElement === "linha") {
      return rowFilters.push(entity.fieldCount)
    }
    return columnFilters.push(entity.fieldCount)
  })

  const columns = items[0]?.entity?.fieldItems
    .slice(0, columnCount + 1)
    .map((item, index) => {
      return {
        Header: columnResolve(item),
        accessor: `column${index}`,
      }
    })
    .filter((_, index) => !columnFilters.includes(index))

  //convert flat array to nested array
  const nestedArray = []
  items.slice(1).forEach((item, index) => {
    const row = {}
    const isHeading = index === 0 ? true : item?.entity?.fieldEnabled?.[0]
    let colIndex = 0
    item?.entity?.fieldItems?.forEach((item) => {
      let colSpan = item?.entity?.fieldCount || 1
      let finalSpan = colSpan
      let rendered = false
      let renderedIndex
      while (colSpan > 0) {
        if (rendered) {
          row[`column${colIndex}`] = { skip: true }
        }
        if (columnFilters.includes(colIndex)) {
          finalSpan -= 1
        }
        if (!columnFilters.includes(colIndex) && !rendered) {
          rendered = columnResolve(item)
          renderedIndex = colIndex
        }
        colIndex++
        colSpan--
      }
      if (rendered) {
        row[`column${renderedIndex}`] = {
          text: rendered,
          colSpan: finalSpan,
        }
      }
    })

    if (isHeading) {
      row.originalIndex = index + 1
      return nestedArray.push(row)
    }

    if (rowFilters.includes(index + 1)) {
      return
    }

    const lastRowIndex = nestedArray.length - 1

    if (!nestedArray[lastRowIndex]?.subRows) {
      nestedArray[lastRowIndex].subRows = []
    }

    nestedArray[lastRowIndex]?.subRows.push(row)
  })

  const filteredData = nestedArray.filter(
    (item) => !rowFilters.includes(item.originalIndex)
  )
  const hash = `#pricing-${cloud}-${region}-${plan}`

  return (
    <Wrapper title={title}>
      <PricingTable
        hideTopControls={hideTopControls}
        columnsData={columns}
        data={filteredData}
        hash={hash}
      />
    </Wrapper>
  )
}

PricingFeatureTable.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
      fieldItems: PropTypes.arrayOf(PropTypes.shape({})),
    })
  ).isRequired,
  filters: PropTypes.arrayOf({
    entity: PropTypes.shape({
      fieldPricingElement: PropTypes.string,
      fieldPricingVisibility: PropTypes.string,
      fieldPricingClouds: PropTypes.arrayOf(PropTypes.string),
      fieldPricingRegions: PropTypes.arrayOf(PropTypes.string),
      fieldPricingPlans: PropTypes.arrayOf(PropTypes.string),
      fieldCount: PropTypes.number,
    }),
  }).isRequired,
  columnCount: PropTypes.number.isRequired,
}

const columnResolve = ({ entity }) => {
  if (entity?.__typename.endsWith("Richtext")) {
    return entity.fieldDescription?.processed || ""
  }
  return (
    <IconResolver
      token={entity.fieldBoolean ? "radioEnabled" : "radioDisabled"}
      className={`mx-auto ${
        entity.fieldBoolean ? "text-green-03" : "text-gray-text"
      }`}
    />
  )
}

export default PricingFeatureTable
