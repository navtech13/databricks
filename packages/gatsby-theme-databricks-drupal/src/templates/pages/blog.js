import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Router, useLocation } from "@reach/router"
import { Button, Breadcrumbs, Pagination, LoadingSpinner } from "databricks-ui"
import BaseLayout from "../../components/base-layout"
import NotFoundPage from "./404"
import BlogContent from "../../components/blog-content"
import blogListingMetatags from "../../helpers/blogListingMetatags"
import RelatedContent from "../../components/related-content"
import useTranslate from "../../utils/translate"
import { useCurrentPrefix } from "../../utils/current-prefix"
import eventTracking from "../../helpers/eventTracking"
import { toTitleCase } from "../../utils/blogs"

const spinner = (
  <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
    <LoadingSpinner className='bg-gray-warm-light rounded-md p-1' />
  </div>
)

export const BlogListing = ({
  type,
  page,
  author,
  category,
  subcategory,
  location,
  assetPrefix,
}) => {
  const { translate } = useTranslate()
  const { pathname } = useLocation()
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [isNotFound] = useState(false)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [metadata, setMetaData] = useState(undefined)
  const hasPreviousPage = page >= 2
  const nextPageRoute = `/page/${Number(page) + 1}`
  const previousPageRoute = page === "2" ? "" : `/page/${Number(page) - 1}`
  const prefix = useCurrentPrefix()

  const typeMap = {
    all: {
      basePath: `/blog`,
      endpoint: `/data/blog/${prefix.replace("/", "")}all_${page}.json`,
      enableLastLink: true,
      breadcrumbs: [
        {
          text: metadata?.title,
          to: metadata?.slug,
        },
      ],
      seo: {
        title: translate("blog.seo.title"),
        description: translate("blog.seo.description"),
      },
    },
    author: {
      basePath: `${prefix}/blog/author/${author}`,
      endpoint: `/data/blog/${prefix.replace("/", "")}author_${author}_${page}.json`,
      breadcrumbs: [
        {
          text: metadata?.title,
          to: metadata?.slug,
        },
      ],
      seo: {
        title: `${
          metadata?.name ? `Articles by ${metadata?.name} - ` : ""
        }${translate("blog.seo.title")}`,
        description: `Read all Databricks Blog articles by ${metadata?.name}.`,
      },
    },
    category: {
      basePath: `${prefix}/blog/category/${category}${
        subcategory ? `/${subcategory}` : ""
      }`,
      endpoint: `/data/blog/${prefix.replace("/", "")}category_${
        subcategory || category
      }_${page}.json`,
      breadcrumbs: metadata?.parent?.title
        ? [
            { text: translate("general.all"), to: `${prefix}/blog/` },
            {
              text: metadata?.parent?.title,
              to: `${prefix}/blog/category/${metadata?.parent?.slug}`,
            },
            {
              text: metadata?.title,
              to: `${prefix}/blog/category/${metadata?.parent?.slug}/${metadata?.slug}`,
            },
          ]
        : [
            { text: translate("general.all"), to: `${prefix}/blog/` },
            {
              text: metadata?.title,
              to: `${prefix}/blog/category/${metadata?.slug}`,
            },
          ],
      seo: {
        title: `${metadata?.title ? `${metadata?.title} | ` : ""}Databricks Blog`,
        description: `Read the Databricks ${metadata?.title} category on the company blog for the latest employee stories and events.`,
      },
    },
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const jsonData = await fetch(`${assetPrefix}${typeMap[type]?.endpoint}`)
        const resolvedData = await jsonData.json()
        if (!resolvedData?.posts?.length) {
          throw new Error("No posts found")
        }
        setHasNextPage(resolvedData.metadata.hasNextPage)
        setMetaData(resolvedData.metadata)
        setData(resolvedData.posts)
        setLoading(false)
      } catch (e) {
        // setIsNotFound(true)
        setLoading(false)
        setData([])
        setHasNextPage(false)
      }
    }
    fetchData()
    const eventData = {
      event: toTitleCase(`Blog Category Viewed`),
      blogCategory: category ? toTitleCase(category) : author ? "Author" : "All",
      blogSubCategory: subcategory ? toTitleCase(subcategory) : author || "All",
      blogLanguage:
        prefix.replace("/", "").toUpperCase() === ""
          ? "EN"
          : prefix.replace("/", "").toUpperCase(),
      blogPage: parseInt(page),
    }
    eventTracking(eventData)
  }, [pathname])

  const seo = {
    urls: {
      current: `${prefix}${typeMap[type]?.basePath}${
        page > 1 ? `/page/${page}` : ""
      }`,
      ...(hasPreviousPage && {
        prevUrl: `${prefix}${typeMap[type]?.basePath}${previousPageRoute}`,
      }),
      ...(hasNextPage && {
        nextUrl: `${prefix}${typeMap[type]?.basePath}${nextPageRoute}`,
      }),
    },
    metaTags: blogListingMetatags(
      typeMap[type]?.seo.title,
      typeMap[type]?.seo.description,
      "article"
    ),
  }

  if (isNotFound) {
    return <NotFoundPage location={location} />
  }

  const parsedCategory = category &&
    metadata && {
      name: metadata.parent?.title || metadata.title,
      fieldSlug: metadata.parent?.slug || metadata.slug,
    }

  return (
    <BaseLayout skipToMain seo={seo}>
      {data ? (
        <BlogContent showSidebar>
          <div className='mx-auto w-full lg:w-8/12 lg:max-w-[754px]'>
            <div className='flex justify-between'>
              <div className='mx-1 mb-1'>
                <Breadcrumbs
                  enableLastLink={typeMap[type].enableLastLink}
                  items={typeMap[type].breadcrumbs}
                />
              </div>
              <div className='mx-1 mb-1'>
                <Pagination
                  previousLink={
                    hasPreviousPage && {
                      to: `${prefix}${typeMap[type]?.basePath}${previousPageRoute}`,
                      label: translate("general.previous"),
                    }
                  }
                  nextLink={
                    hasNextPage && {
                      to: `${prefix}${typeMap[type]?.basePath}${nextPageRoute}`,
                      label: translate("general.next"),
                    }
                  }
                >
                  {translate("general.page-number", { pageNumber: page })}
                </Pagination>
              </div>
            </div>
            {data.length > 0 && (
              <RelatedContent items={data} category={parsedCategory} />
            )}
            {data.length === 0 && (
              <div className='my-6 text-center'>
                <h3>{translate("blog.category.empty")}</h3>
              </div>
            )}
            {hasNextPage && (
              <div className='w-full text-right'>
                <Button
                  href={`${prefix}${typeMap[type]?.basePath}${nextPageRoute}`}
                  className='mx-1 mb-1'
                >
                  {translate("general.next")}
                </Button>
              </div>
            )}
            {loading && <>{spinner}</>}
          </div>
        </BlogContent>
      ) : (
        <div className='h-[1000px] py-8 px-2 text-center'>{spinner}</div>
      )}
    </BaseLayout>
  )
}

BlogListing.propTypes = {
  type: PropTypes.string.isRequired,
  page: PropTypes.number,
  author: PropTypes.string,
  category: PropTypes.string,
  subcategory: PropTypes.string,
  location: PropTypes.shape({}).isRequired,
  assetPrefix: PropTypes,
}

BlogListing.defaultProps = {
  page: 1,
  author: undefined,
  category: undefined,
  subcategory: undefined,
  assetPrefix: "",
}

const BlogListingPage = ({ pageContext }) => {
  const prefix = useCurrentPrefix()
  const { assetPrefix } = pageContext

  return (
    <Router basepath={`${prefix}/blog`}>
      <BlogListing assetPrefix={assetPrefix} type='all' path='/' />
      <BlogListing assetPrefix={assetPrefix} type='all' path='/page/:page' />
      <BlogListing assetPrefix={assetPrefix} type='author' path='/author/:author' />
      <BlogListing
        assetPrefix={assetPrefix}
        type='author'
        path='/author/:author/page/:page'
      />
      <BlogListing
        assetPrefix={assetPrefix}
        type='category'
        path='/category/:category'
      />
      <BlogListing
        assetPrefix={assetPrefix}
        type='category'
        path='/category/:category/page/:page'
      />
      <BlogListing
        assetPrefix={assetPrefix}
        type='category'
        path='/category/:category/:subcategory'
      />
      <BlogListing
        assetPrefix={assetPrefix}
        type='category'
        path='/category/:category/:subcategory/page/:page'
      />
      <NotFoundPage path='/*' />
    </Router>
  )
}

BlogListingPage.propTypes = {
  pageContext: PropTypes.shape({
    assetPrefix: PropTypes.string.isRequired,
  }).isRequired,
}

export default BlogListingPage
