import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "databricks-ui"
import { useCurrentPrefix } from "./current-prefix"
import resolveImage from "./resolve-image"

const getImageCategoryMap = () => {
  const { drupal } = useStaticQuery(
    graphql`
      query {
        drupal {
          taxonomyTermQuery(
            filter: {
              conditions: [
                { field: "vid", operator: EQUAL, value: "categories" }
                { operator: EQUAL, field: "status", value: ["1"] }
              ]
            }
            limit: 1000
          ) {
            entities {
              ... on Drupal_TaxonomyTermCategories {
                fieldSlug
                fieldImages {
                  entity {
                    ...MediaImage
                  }
                }
              }
            }
          }
        }
      }
    `
  )
  const data = drupal.taxonomyTermQuery.entities
  const imageCategoryMap = {}

  data.forEach((item) => {
    if (!item.fieldSlug || !item.fieldImages?.length) {
      return
    }
    const images = item.fieldImages.map((field) => {
      return resolveImage(field)
    })
    imageCategoryMap[item.fieldSlug] = images
  })

  return imageCategoryMap
}

const getAuthorNames = (fieldAuthors) => {
  if (!fieldAuthors?.length) {
    return ""
  }

  const authorNames = fieldAuthors
    ?.filter(function (element) {
      const { entity } = element
      return entity
    })
    .map(({ entity }) => entity.name)

  return authorNames
}

const parseAuthorsMetadata = (fieldAuthors) => {
  if (!fieldAuthors?.length) {
    return ""
  }

  const prefix = useCurrentPrefix()

  const parsedAuthors = fieldAuthors
    ?.filter(function (element) {
      const { entity } = element
      return entity
    })
    .map(({ entity }) => (
      <Link
        key={entity.entityId}
        aria-label={entity.name}
        to={`${prefix}/blog/author/${entity.fieldSlug}`}
      >
        {entity.name}
      </Link>
    ))
  return parsedAuthors
}

const calculateCategoryLink = (termSlug, parentTaxSlug) => {
  const prefix = useCurrentPrefix()

  return `${prefix}/blog/category/${
    parentTaxSlug ? `${parentTaxSlug}/${termSlug}` : termSlug
  }`
}

const parseCategoryMetadata = (name, termSlug, parentTaxSlug) => {
  const itemCategory = (
    <Link to={calculateCategoryLink(termSlug, parentTaxSlug)}>{name}</Link>
  )
  return itemCategory
}

const mapCategoryImages = (entities, category) => {
  const categoriesRef = {}
  const imageCategoryMap = getImageCategoryMap()

  const parsedImages = entities?.map((entity) => {
    // read slug from parent categories
    const fieldCategories = entity?.fieldCategories
    if (!fieldCategories) {
      return null
    }
    const categoryObject = fieldCategories[0]?.entity
    const categorySlug =
      category ||
      (categoryObject?.parent[0].entity
        ? categoryObject?.parent[0].entity.fieldSlug
        : categoryObject?.fieldSlug)

    if (!imageCategoryMap[categorySlug]) {
      return null
    }
    const images = imageCategoryMap[categorySlug]
    // create category and start it in 0
    if (typeof categoriesRef[categorySlug] !== "number") {
      categoriesRef[categorySlug] = 0
      return images[categoriesRef[categorySlug]]
    }
    // reset the loop if reaches maxIteration
    if (categoriesRef[categorySlug] === images.length - 1) {
      categoriesRef[categorySlug] = 0
      return images[categoriesRef[categorySlug]]
    }
    // increase by one in each iteration
    if (
      categoriesRef[categorySlug] < images.length - 1 &&
      categoriesRef[categorySlug] >= 0
    ) {
      categoriesRef[categorySlug] += 1
    }
    return images[categoriesRef[categorySlug]]
  })
  return parsedImages
}

const findCategoryImage = (post) => {
  const entity = post?.entity
  if (!entity) {
    return null
  }
  const imageEntity = entity.fieldImage || entity.parent?.[0].entity?.fieldImage
  if (!imageEntity) {
    return null
  }
  return resolveImage(imageEntity)
}

const toTitleCase = (str) => {
  if (!str) return ""
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(" ")
}

export {
  parseAuthorsMetadata,
  parseCategoryMetadata,
  calculateCategoryLink,
  mapCategoryImages,
  findCategoryImage,
  getAuthorNames,
  toTitleCase,
}
