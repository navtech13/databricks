const resolveImage = (objectParam) => {
  if (typeof objectParam === "undefined") {
    return null
  }
  const entity = objectParam?.entity
  if (!entity) {
    return null
  }
  if (!entity?.fieldMediaImage) {
    return null
  }

  // We do not support svgs in the Gatsby Image component
  // We could add it to add the fade in effect on load,
  // but there were some issues in certain use cases.
  const isSvg = entity.fieldMediaImage?.url?.includes(".svg")

  // Add support for client side preview
  // where gatsby is not available
  if (!entity.gatsbyImageFile || !entity.remoteSourceSet || isSvg) {
    return {
      alt: entity.fieldMediaImage.alt,
      src: entity.fieldMediaImage.url,
      placeholderRatio: entity?.placeholderRatio,
    }
  }
  // If there is not remoteSourceSet for the Drupal Generated images,
  // default back to Gatsby generated images
  if (!entity.remoteSourceSet) {
    return {
      alt: entity.fieldMediaImage.alt,
      ...(entity.gatsbyImageFile?.childImageSharp
        ? {
            gatsbyData: entity.gatsbyImageFile?.childImageSharp.gatsbyImageData,
          }
        : { src: entity.gatsbyImageFile?.publicURL || entity.fieldMediaImage?.url }),
      placeholderRatio: entity.placeholderRatio,
    }
  }

  let optimizedImages = ""
  const gatsbyData = {
    layout: "fullWidth",
    backgroundColor: "transparent",
    images: {
      fallback: {
        src: entity.remoteSourceSet?.originalImage?.publicURL,
        srcSet: entity.remoteSourceSet?.sources?.reduce((prev, cur) => {
          // We need to build a single srcSet string for the Gatsby Image component
          // which includes the image url and its width
          // If the optimized Image Data is present, we also build a srcset string for that
          if (cur?.optimizedImageData?.publicURL) {
            optimizedImages = `${optimizedImages}${optimizedImages ? ", " : ""}${
              cur?.optimizedImageData?.publicURL
            } ${cur.width}`
          }
          return `${prev}${prev ? ", " : ""}${cur?.imageData?.publicURL} ${
            cur.width
          }`
        }, ""),
        sizes: "100vw",
      },
    },
    height: entity.placeholderRatio / 100,
    width: 1,
  }
  // If the placeholderRatio is null, we can calculate a new ratio
  // with the image height and width from the media image field.
  if (Number.isNaN(gatsbyData.height)) {
    gatsbyData.height =
      entity?.fieldMediaImage?.height / entity?.fieldMediaImage?.width
  }

  // If the optimized images srcset was built, we add it and set it as
  // webp type
  if (optimizedImages) {
    gatsbyData.images.sources = [
      {
        srcSet: optimizedImages,
        type: "image/webp",
        sizes: "100vw",
      },
    ]
  }
  // Fallback in case the image height was set to zero
  // This would make the image square, but having a zero value
  // would completely hide the image.
  if (gatsbyData.height === 0) {
    gatsbyData.height = 1
  }
  return {
    alt: entity.fieldMediaImage.alt,
    gatsbyData,
  }
}

export default resolveImage
