import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
// TODO: get from site settings
import ogImage from "../../../databricks-ui/static/images/og-databricks.png"
import { useLanguageContext } from "./language-provider"
import appendTerritory from "../utils/append-territory"
import cleanURL from "../helpers/cleanURL"

const SEO = ({
  metaTags,
  image,
  urls,
  skipMetaImage,
  translations,
  forceNoRobots,
}) => {
  const baseUrl = process.env.GATSBY_DEPLOY_URL || ""
  const { currentLanguage } = useLanguageContext()
  const langLocale = appendTerritory(currentLanguage?.id)
  const imageObj = image || {
    url: `${baseUrl}${ogImage}`,
    width: 1200,
    height: 630,
  }

  const hreflangData = translations?.map((translation) => ({
    rel: "alternate",
   hreflang: `${translation.entityLanguage.id === "br" ? "pt-br" : translation.entityLanguage.id}`,
    href: `${baseUrl}${translation.entityUrl.path}`,
  }))

  // build x-default hreflang entry, defaulting to EN page if exists, otherwise use local LANG page
  const currentLangLowercase = currentLanguage?.id.toLowerCase()
  let enHreflangEntry = null
  let otherHreflangEntry = null
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(hreflangData)) {
    if (value.hreflang === "en") {
      enHreflangEntry = value.href
    }
    if (value.hreflang === currentLangLowercase) {
      otherHreflangEntry = value.href
    }
  }

  if (enHreflangEntry !== null) {
    hreflangData.push({
      rel: "alternate",
      hreflang: "x-default",
      href: enHreflangEntry,
    })
  } else if (otherHreflangEntry !== null) {
    hreflangData.push({
      rel: "alternate",
      hreflang: "x-default",
      href: otherHreflangEntry,
    })
  }

  // Force noindex on thank you pages
  let drupalMetaTags = metaTags
  let foundRobots = false
  if (forceNoRobots) {
    drupalMetaTags = metaTags.map((meta) => {
      if (meta.type.endsWith("Drupal_MetaValue") && meta.key === "robots") {
        // 👇️ change value
        foundRobots = true
        return { ...meta, value: "noindex, nofollow, noarchive" }
      }
      return meta
    })
  }

  // Robots meta data wasn't found, force a noindex/nofollow
  if (forceNoRobots === true && foundRobots === false) {
    drupalMetaTags.push({
      type: "Drupal_MetaValue",
      key: "robots",
      value: "noindex, nofollow, noarchive",
    })
  }

  const linkData = drupalMetaTags
    .filter((meta) => meta.type.endsWith("Link") && meta.key !== "canonical")
    .map(({ key, value }) => ({ rel: key, href: value }))
    .concat(hreflangData)

  const metaValue = drupalMetaTags
    .filter((meta) => meta.type.endsWith("Value"))
    .map(({ key, value }) => ({ name: key, content: value }))

  const metaProperty = drupalMetaTags
    .filter((meta) => meta.type.endsWith("Property") && meta.key !== "og:url")
    .map(({ key, value }) => ({ property: key, content: value }))

  const metaTitle = metaValue.filter((meta) => meta.name === "title").shift()
  const metaDescription = metaValue.filter((meta) => meta.name === "description").shift()

  // Image meta
  let isOgImageServer = false
  for (let i = 0; i < metaTags.length; i++) {
    if (metaTags[i].key === "og:image") isOgImageServer = metaTags[i].value
  }

  const metaImage = !skipMetaImage
    ? !isOgImageServer
      ? [
          { name: "image", content: imageObj.url },
          { name: "twitter:image", content: cleanURL(imageObj.url) },
          { property: "og:image", content: cleanURL(imageObj.url) },
          { property: "og:image:width", content: imageObj.width },
          { property: "og:image:height", content: imageObj.height },
        ]
      : [
          { name: "image", content: isOgImageServer },
          { name: "twitter:image", content: isOgImageServer },
          { property: "og:image:width", content: imageObj.width },
          { property: "og:image:height", content: imageObj.height },
        ]
    : []

  // URL meta
  let urlCanonical = urls.current
  if (urls.current.indexOf("/blog/page") > -1) {
    const arr = urls.current.split("/page")
    arr.pop()
    // eslint-disable-next-line prefer-destructuring
    urlCanonical = arr[0]
  }
  linkData.push({
    rel: "canonical",
    href: `${baseUrl}${urlCanonical}`,
  })

  metaProperty.push({
    property: "og:url",
    content: `${baseUrl}${urls.og || urls.current}`,
  })

if (metaProperty.filter(e => e.property === 'og:title').length < 1) {
  metaProperty.push({
    property: "og:title",
    content: `${metaTitle?.content}`,
  })
}
if (metaProperty.filter(e => e.property === 'og:description').length < 1) {
  metaProperty.push({
    property: "og:description",
    content: `${metaDescription?.content}`,
  })
}

  metaProperty.push({
    property: "og:locale",
    content: langLocale?.replace("-", "_"),
  })

  if (urls.prev) {
    linkData.push({
      rel: "prev",
      href: `${baseUrl}${urls.prev}`,
    })
  }

  if (urls.next) {
    linkData.push({
      rel: "next",
      href: `${baseUrl}${urls.next}`,
    })
  }

  return (
    <Helmet
      encodeSpecialCharacters={false}
      htmlAttributes={{
        lang: langLocale,
      }}
      title={metaTitle?.content}
      link={linkData}
      meta={[...metaValue, ...metaProperty, ...metaImage]}
    />
  )
}

SEO.defaultProps = {
  image: undefined,
  metaTags: [],
  translations: [],
  skipMetaImage: false,
  forceNoRobots: false,
}

SEO.propTypes = {
  metaTags: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      key: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  translations: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      key: PropTypes.string,
      name: PropTypes.string,
    })
  ),
  image: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    url: PropTypes.string,
  }),
  urls: PropTypes.shape({
    current: PropTypes.string,
    og: PropTypes.string,
    prev: PropTypes.string,
    next: PropTypes.string,
    qs: PropTypes.string,
  }).isRequired,
  skipMetaImage: PropTypes.bool,
  forceNoRobots: PropTypes.bool,
}

export default SEO
