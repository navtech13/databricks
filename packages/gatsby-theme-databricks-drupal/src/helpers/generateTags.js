const generateTags = (data) => {
  const tags = data.map((item) => {
    return {
      label: item.entity?.fieldTitle,
      value: item.entity?.fieldIndustry[0]?.entity?.name,
    }
  })

  return tags
}

export default generateTags
