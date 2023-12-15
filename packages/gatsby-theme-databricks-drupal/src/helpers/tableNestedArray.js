const convertToTableNestedArray = (items) => {
  const nestedArray = []
  items.forEach((item, index) => {
    const row = {}
    row.type = item?.entity?.__typename.endsWith("ParagraphTableRowAccordion")
      ? "features"
      : "price"
    const isHeading = index === 0 || item?.entity?.fieldBoolean
    let colIndex = 0
    item?.entity?.fieldItems?.forEach((cell) => {
      row[`column${colIndex + 1}`] = item?.entity?.__typename.endsWith(
        "ParagraphTableRowAccordion"
      )
        ? cell?.entity?.fieldDescription?.processed
        : {
            title: cell?.entity?.fieldTitle,
            description: cell?.entity?.fieldDescription?.processed,
            price: cell?.entity?.fieldSubtitle,
            cta: cell?.entity?.fieldLink && {
              text: cell?.entity?.fieldLink?.title,
              to: cell?.entity?.fieldLink?.url.path,
            },
          }
      colIndex++
    })

    if (
      isHeading ||
      !item.entity.__typename.endsWith("ParagraphTableRowAccordion")
    ) {
      row.originalIndex = index + 1
      return nestedArray.push(row)
    }

    const lastRowIndex = nestedArray.length - 1

    if (!nestedArray[lastRowIndex]?.subRows) {
      nestedArray[lastRowIndex].subRows = []
    }

    nestedArray[lastRowIndex]?.subRows.push(row)
  })
  return nestedArray
}

export default convertToTableNestedArray
