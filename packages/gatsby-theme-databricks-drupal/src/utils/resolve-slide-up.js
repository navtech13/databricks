const resolveSlideUp = (url) => {
  const form = url?.associatedNode?.fieldGatedAssetForm?.entity
  if (!url?.path || !form?.__typename?.endsWith("ParagraphSlideUpForm")) {
    return false
  }
  return form
}

export default resolveSlideUp
