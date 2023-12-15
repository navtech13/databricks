/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { BlogHead, RichText, Cta, Link, Button } from "databricks-ui"
// these two imports were added as peer dependencies
// they are already included with 'react-html-parser'
import { parseDocument } from "htmlparser2"
import serializer from "dom-serializer"
import HtmlParser from "../helpers/htmlParser"
import BaseLayout from "../components/base-layout"
import BlogContent from "../components/blog-content"
import Social from "../components/social"
import RelatedContent from "../components/related-content"
import useTranslate from "../utils/translate"
import {
  parseAuthorsMetadata,
  parseCategoryMetadata,
  calculateCategoryLink,
  findCategoryImage,
  getAuthorNames,
  toTitleCase,
} from "../utils/blogs"
import resolveImage from "../utils/resolve-image"
import { useCurrentPrefix } from "../utils/current-prefix"
import loadTwitterWidget from "../scripts/twitter-widget"
import eventTracking from "../helpers/eventTracking"
import { componentResolver } from "../utils/component-resolver"

function divideHTMLintoChunks(text) {
  const dom = parseDocument(text)
  const chunks = []

  dom?.childNodes?.forEach((node) => {
    if (
      node?.type === "tag" &&
      node?.attribs?.["data-entity-type"] === "paragraphs_library_item"
    ) {
      chunks.push({
        uuid: node.attribs["data-entity-uuid"],
      })
      return
    }
    chunks.push(serializer(node))
  })

  return chunks
}

const BlogDetail = ({ data: { drupal }, location, pageContext }) => {
  const { article } = drupal

  const { translate, translateList } = useTranslate()
  const prefix = useCurrentPrefix()

  const dividedBody =
    article?.bodyEmbedParagraphs?.length > 0
      ? divideHTMLintoChunks(article.body?.processed)
      : [article.body?.processed]

  const avatars = article.fieldAuthors
    .filter((element) => {
      const { entity } = element
      return entity
    })
    .map(({ entity }) => {
      const image = entity.avatarImage?.childImageSharp
        ? { gatsbyData: entity.avatarImage.childImageSharp?.gatsbyImageData }
        : entity.fieldMedia && resolveImage(entity.fieldMedia)
      return {
        ...image,
        alt: entity.name,
        to: `${prefix}/blog/author/${entity.fieldSlug}`,
        imageOptions: {
          imgClassName: "rounded-full",
          className: "w-6 h-6 rounded-full",
        },
      }
    })

  const meta = (
    <p>
      {article.entityCreated} {translate("blog.head.meta")}{" "}
      {parseCategoryMetadata(
        article.fieldCategories[0]?.entity.name,
        article.fieldCategories[0]?.entity?.fieldSlug,
        article.fieldCategories[0]?.entity?.parent[0].entity?.fieldSlug
      )}
    </p>
  )

  const seo = {
    metaTags: article.entityMetatags,
    image: article?.fieldMedia?.entity?.fieldMediaImage,
    urls: {
      current: location.pathname,
    },
    translations: pageContext?.pathAliasTranslations,
  }

  const teasers =
    article?.fieldRelatedPosts?.length > 0 &&
    article.fieldRelatedPosts.map((el) => ({ ...el.entity }))

  const authors = (
    <>
      {translate("blog.head.author-prefix")}
      {translateList(parseAuthorsMetadata(article.fieldAuthors))}
      {translate("blog.head.author-suffix")}
    </>
  )

  useEffect(() => {
    if (typeof window !== "undefined" && window.twttr?.widgets) {
      window.twttr.widgets.load()
      return
    }
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        category: article.fieldCategories[0]?.entity.name,
      })
    }
    loadTwitterWidget()
    const eventData = {
      event: toTitleCase("Blog Article Viewed"),
      blogCategory: toTitleCase(
        article.fieldCategories[0]?.entity?.parent[0]?.entity?.fieldSlug
          ? article?.fieldCategories[0]?.entity?.parent[0]?.entity?.fieldSlug
          : article.fieldCategories[0]?.entity.name.toLowerCase()
      ),
      blogSubCategory: toTitleCase(
        article.fieldCategories[0]?.entity?.parent[0]?.entity?.fieldSlug
          ? article.fieldCategories[0]?.entity.name.toLowerCase()
          : ""
      ),
      blogAuthor: getAuthorNames(article.fieldAuthors).join("|"),
      blogDate: new Date(article.entityCreated).toISOString(),
      blogLanguage:
        prefix.replace("/", "").toUpperCase() === ""
          ? "EN"
          : prefix.replace("/", "").toUpperCase(),
    }
    eventTracking(eventData)
  }, [])

  const styles = "mx-auto w-full lg:w-8/12 lg:max-w-[754px]"
  const featuredCategoryImage = findCategoryImage(article.fieldCategories[0])
  return (
    <BaseLayout skipToMain seo={seo} useMainTag={false}>
      <BlogContent
        featuredImage={featuredCategoryImage}
        showSidebar={article.fieldSidebarPromotion || article.fieldSidebarOverride}
        sidebarOverride={
          article.fieldSidebarOverride && article.fieldSidebarComponents
        }
      >
        <div className={styles}>
          <BlogHead title={article.title} subtitle={article.fieldSubtitle}>
            {avatars.length <= 4 && <BlogHead.AvatarGroup avatars={avatars} />}
            <BlogHead.Metadata>
              <div className='mb-1'>{authors}</div>
              {meta}
            </BlogHead.Metadata>
          </BlogHead>
          <Social
            url={`${process.env.GATSBY_DEPLOY_URL}${location.pathname}`}
            className='pt-1 pb-5'
          >
            {translate("blog.head.share")}
          </Social>
        </div>
        {dividedBody?.map((item) => {
          if (typeof item === "string") {
            return (
              <RichText
                key={item.substring(0, 20)}
                className={`${styles} rich-text-blog`}
              >
                <HtmlParser content={item} inlineImages={article.inlineImages} />
              </RichText>
            )
          }
          const paragraph = article?.bodyEmbedParagraphs.find((embed) => {
            return embed?.fieldUuid === item?.uuid
          })
          if (paragraph) {
            return (
              <div className='wysiwyg-embed' key={item?.uuid}>
                {componentResolver([paragraph?.fieldParagraph])}
              </div>
            )
          }
          return <></>
        })}
        <div className={styles}>
          <div className='my-5 py-5 lg:mt-8'>
            <Cta
              ctas={[
                {
                  to: `${prefix}/try-databricks?itm_data=BlogPosts-GetStarted-Trial`,
                  text: translate("blog.try-free.cta"),
                },
              ]}
            >
              {translate("blog.try-free.body")}
            </Cta>
          </div>
          {teasers && (
            <>
              <h2 className='mb-5'>{translate("blog.related.title")}</h2>
              <RelatedContent items={teasers} />
            </>
          )}
          <Button
            as={Link}
            to={calculateCategoryLink(
              article.fieldCategories[0]?.entity?.fieldSlug,
              article.fieldCategories[0]?.entity?.parent[0].entity?.fieldSlug
            )}
            className='mb-2.5 mr-4'
          >
            {translate("blog.related.cta", {
              category: article.fieldCategories[0]?.entity.name,
            })}
          </Button>
        </div>
      </BlogContent>
    </BaseLayout>
  )
}

BlogDetail.propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string,
    origin: PropTypes.string,
    pathname: PropTypes.string,
  }).isRequired,
  data: PropTypes.shape({
    drupal: PropTypes.shape({
      article: PropTypes.shape({
        fieldAuthors: PropTypes.arrayOf(PropTypes.shape({})),
        entityMetatags: PropTypes.arrayOf(PropTypes.shape({})),
        entityCreated: PropTypes.string,
        title: PropTypes.string,
        fieldSubtitle: PropTypes.string,
        body: PropTypes.shape({
          processed: PropTypes.string,
          value: PropTypes.string,
        }),
        fieldMedia: PropTypes.shape({
          entity: PropTypes.shape({
            fieldMediaImage: PropTypes.shape({}),
          }),
        }),
        fieldSidebarPromotion: PropTypes.bool,
        fieldRelatedPosts: PropTypes.arrayOf(PropTypes.shape({})),
        fieldCategories: PropTypes.arrayOf(
          PropTypes.shape({
            entity: PropTypes.shape({
              entityUrl: PropTypes.shape({
                path: PropTypes.string,
              }),
              name: PropTypes.string,
              fieldSlug: PropTypes.string,
              parent: PropTypes.arrayOf(
                PropTypes.shape({
                  entity: PropTypes.shape({
                    fieldSlug: PropTypes.string,
                  }),
                })
              ),
            }),
          })
        ),
      }),
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query article($vid: String!, $language: Drupal_LanguageId!) {
    drupal {
      article: nodeRevisionById(id: $vid, language: $language) {
        ...NodePost
      }
    }
  }
`

export default BlogDetail
