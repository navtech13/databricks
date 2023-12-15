import React from "react"
import PropTypes from "prop-types"
import { TeaserList } from "databricks-ui"
import {
  parseAuthorsMetadata,
  parseCategoryMetadata,
  mapCategoryImages,
} from "../utils/blogs"
import { useCurrentPrefix } from "../utils/current-prefix"
import useTranslate from "../utils/translate"

const RelatedContent = ({ items, category, ...props }) => {
  const categoryImages = mapCategoryImages(items, category?.fieldSlug)
  const prefix = useCurrentPrefix()
  const { translate, translateList } = useTranslate()

  const teasers = items?.map(
    (
      { title, body, entityUrl, entityCreated, fieldAuthors, fieldCategories },
      i
    ) => {
      const authors = (
        <>
          {translate("blog.head.author-prefix")}
          {translateList(parseAuthorsMetadata(fieldAuthors))}
          {translate("blog.head.author-suffix")}
        </>
      )
      if (!fieldCategories) {
        return null
      }
      const parsedCategory =
        category || fieldCategories ? fieldCategories[0]?.entity : null

      const meta = (
        <>
          {entityCreated} {authors} {translate("blog.head.meta")}{" "}
          {parseCategoryMetadata(parsedCategory?.name, parsedCategory?.fieldSlug,parsedCategory?.parent[0].entity?.fieldSlug)}
        </>
      )
      return {
        image: categoryImages[i],
        key: title,
        title,
        meta,
        children: body?.teaser?.substring(0, 600),
        link: {
          to: entityUrl.path,
          label: title,
        },
      }
    }
  )

  return <TeaserList items={teasers} {...props} />
}

RelatedContent.defaultProps = {
  category: undefined,
}

RelatedContent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  category: PropTypes.string,
}

export default RelatedContent
