/* eslint-disable consistent-return */
import React, { useEffect, useState } from "react"
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser"
import {
  CodeSnippet,
  ThumbnailModal,
  Link,
  IconResolver,
  LongFormQuote,
  Image,
} from "databricks-ui"
import EmbedVideo from "databricks-ui/src/components/EmbedVideo"

const getInlineImageGatsbyData = (htmlnode, inlineImages) => {
  if (!htmlnode || htmlnode.name !== "img" || !inlineImages?.length) {
    return null
  }
  const nodeImageSrc = htmlnode.attribs.src
  const inlineImage = inlineImages.find((item) => nodeImageSrc.includes(item.name))
  return inlineImage?.childImageSharp?.gatsbyImageData
}

const getInnerText = (htmlnode) => {
  if (htmlnode?.data) {
    return htmlnode.data
  }

  if (htmlnode?.children) {
    return htmlnode.children.map(getInnerText).join("")
  }

  return ""
}
const getQuoteText = (htmlnode) => {
  if (htmlnode?.data) {
    if (htmlnode.parent.name === "a")
      return `<a href="${htmlnode.parent.attribs.href}" target="${htmlnode.parent.attribs.target}">${htmlnode.data}</a>`
    return htmlnode.data
  }

  if (htmlnode?.children) return htmlnode.children.map(getQuoteText).join("")

  return ""
}
const codeSnippetsTransform = (htmlnode) => {
  const { language } = htmlnode.attribs
  return (
    <CodeSnippet language={language}>
      {String(htmlnode.children[0]?.data || " ")}
    </CodeSnippet>
  )
}

const lightboxTransform = (htmlnode, caption, inlineImages) => {
  const { attribs } = htmlnode

  // String validation for attributes saved as empty strings
  const lightboxHref = attribs.href?.replace("test-web.", "www.") || ""
  const imageComponent = htmlnode.children[0]

  const imageSrc = lightboxHref.includes("/wp-content")
    ? lightboxHref
    : imageComponent.attribs?.src

  if (imageComponent?.name === "img") {
    const inlineImageGatsbyData = getInlineImageGatsbyData(
      imageComponent,
      inlineImages
    )
    const imageData = inlineImageGatsbyData
      ? { gatsbyData: inlineImageGatsbyData, alt: imageComponent.attribs?.alt || "" }
      : { src: imageSrc, alt: imageComponent.attribs?.alt || "" }
    return (
      <ThumbnailModal
        {...imageData}
        caption={caption}
        imageOptions={{
          loading: "lazy",
        }}
      />
    )
  }
}
const iframeTransform = (htmlnode) => {
  const { attribs } = htmlnode
  if (attribs.src.includes("youtube.com") || attribs.src.includes("vimeo.com")) {
    const newAttribs = { ...attribs }
    delete newAttribs.style
    delete newAttribs.class
    return (
      <span className='video-container'>
        {/* <iframe title={newAttribs.title} {...newAttribs} /> */}
        <EmbedVideo videoSrc={attribs.src} className='my-5' />
      </span>
    )
  }
}
const linkTransform = (htmlnode) => {
  const { attribs, children } = htmlnode

  // only transform RichText <a> tags that contain only text inside
  // e.g. ignore nodes that have HTML tags inside the anchor
  if (
    Array.isArray(children) &&
    children.length === 1 &&
    children[0].type &&
    children[0].type === "text"
  ) {
    // strip out relative link extra slashes coming from Drupal (e.g. https://cms.databricks.com//somepath
    let finalLink = attribs.href
    if (typeof finalLink === "string") {
      finalLink = finalLink.replace(
        "//cms.databricks.com//",
        "//www.databricks.com/"
      )
    }

    return (
      <Link to={finalLink} className={attribs?.class}>
        {children[0]?.data}
      </Link>
    )
  }

  return false
}
const dbceCtaTransform = (htmlnode) => {
  const { attribs, children } = htmlnode
  return (
    <Link to={attribs.href}>
      <IconResolver className='mr-0.5 inline-block' token='dbce' />
      {children[0]?.data}
    </Link>
  )
}
const blockquoteTransform = (htmlnode) => {
  const innerText = getQuoteText(htmlnode)

  // These get transformed by the twitter widget script
  if (htmlnode.attribs?.class?.includes("twitter-tweet")) {
    return
  }

  const [quote, source] = innerText.split("—")

  return (
    <LongFormQuote
      className='my-5 lg:my-8'
      {...(source && { source: `—${source}` })}
    >
      {quote}
    </LongFormQuote>
  )
}

// Parses images. If the first element is a link, it will be transformed to a thumbnail modal.
// Extracts the figcaption and adds it to the image.
const figureTransform = (htmlnode, inlineImages) => {
  const { children } = htmlnode
  const imageElement = children.find(({ name }) => name === "a" || name === "img")

  if (!imageElement) {
    return
  }

  const figcaption = getInnerText(children.find(({ name }) => name === "figcaption"))

  if (imageElement.name === "a") {
    return lightboxTransform(imageElement, figcaption, inlineImages)
  }

  const inlineImageGatsbyData = getInlineImageGatsbyData(imageElement, inlineImages)
  const imageData = inlineImageGatsbyData
    ? { gatsbyData: inlineImageGatsbyData, alt: imageElement.attribs?.alt || "" }
    : { src: imageElement.attribs.src, alt: imageElement.attribs?.alt || "" }

  return (
    <Image
      {...imageData}
      caption={figcaption}
      imageOptions={{
        loading: "lazy",
      }}
    />
  )
}

const imageTransform = (htmlNode, inlineImages) => {
  if (htmlNode.name !== "img") {
    return null
  }
  const inlineImageGatsbyData = getInlineImageGatsbyData(htmlNode, inlineImages)
  const imageData = inlineImageGatsbyData
    ? { gatsbyData: inlineImageGatsbyData, alt: htmlNode.attribs?.alt || "" }
    : { src: htmlNode.attribs.src, alt: htmlNode.attribs?.alt || "" }
  return (
    <Image
      {...imageData}
      imageOptions={{
        loading: "lazy",
      }}
    />
  )
}

const tableTransform = (htmlNode) => {
  if (htmlNode.name !== "table") {
    return null
  }
  return (
    <div className='max-w-full overflow-x-auto'>
      {convertNodeToElement(htmlNode)}
    </div>
  )
}

const inlineLinksParser = (htmlnode) => {
  // Drupal uses rel_to_abs module
  // We need to replace cms.databricks.com to www.databricks.com
  if (htmlnode?.attribs?.href) {
    let hrefurl = null

    try {
      hrefurl = new URL(htmlnode?.attribs?.href, "https://www.databricks.com")
      if (
        hrefurl.hostname === "cms.databricks.com" ||
        hrefurl.hostname === "live-databricksinc.pantheonsite.io"
      ) {
        hrefurl.hostname = "www.databricks.com"
        // eslint-disable-next-line no-param-reassign
        htmlnode.attribs.href = hrefurl.href
        return convertNodeToElement(htmlnode)
      }
      // external links get New Tab if target not explicitly set already
      if (hrefurl.hostname && !hrefurl.hostname.includes("www.databricks.com")) {
        if (!htmlnode.attribs.target || htmlnode.attribs.target.length < 1) {
          // eslint-disable-next-line no-param-reassign
          htmlnode.attribs.target = "_blank"
        }
      }
      return convertNodeToElement(htmlnode)
    } catch (e) {
      console.log(e)
    }
  }

  return convertNodeToElement(htmlnode)
}

const transform = (htmlnode, { inlineImages, hydrated }) => {
  // Code Snippet parsing
  if (htmlnode.type === "tag" && htmlnode.name === "pre") {
    return codeSnippetsTransform(htmlnode)
  }
  if (htmlnode.type === "tag" && htmlnode.name === "a") {
    // Parse BBCode dbce_cta
    if (htmlnode.attribs?.class === "dbce_cta") {
      return dbceCtaTransform(htmlnode)
    }
    if (
      typeof htmlnode.attribs["data-lightbox"] === "string" &&
      htmlnode.attribs["data-lightbox"] !== ""
    ) {
      return lightboxTransform(htmlnode, null, inlineImages)
    }

    // clean up generic links
    const genericLinktransformResult = linkTransform(htmlnode)
    if (genericLinktransformResult) {
      return genericLinktransformResult
    }
  }
  // Parse iframes
  if (htmlnode.type === "tag" && htmlnode.name === "iframe") {
    return iframeTransform(htmlnode)
  }

  if (htmlnode.type === "tag" && htmlnode.name === "a") {
    return inlineLinksParser(htmlnode)
  }

  // Parse figures
  if (htmlnode.type === "tag" && htmlnode.name === "figure" && hydrated) {
    return figureTransform(htmlnode, inlineImages, hydrated)
  }

  // Parse blockquotes
  if (htmlnode.type === "tag" && htmlnode.name === "blockquote") {
    return blockquoteTransform(htmlnode)
  }

  // Parse tables
  if (htmlnode.type === "tag" && htmlnode.name === "table") {
    return tableTransform(htmlnode)
  }

  // Parse images
  if (htmlnode.type === "tag" && htmlnode.name === "img" && hydrated) {
    return imageTransform(htmlnode, inlineImages)
  }
}

const HtmlParser = ({ content, inlineImages }) => {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    setHydrated(true)
  }, [setHydrated])
  if (!content) {
    return content
  }
  const preTagsContent = [...content.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/g)].map(
    (item) => item[1]
  )
  const removeCodeTags = (string) => {
    return string.replace(/<\/?code[^>]*>/g, "")
  }
  const escapeTags = (htmlStr) => {
    return htmlStr.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }
  const getModifiedBody = (body, tags) => {
    // Change src of images to absolute path
    let modifiedBody = body.replace(/src="\/sites(.*?)"/g, (match) => {
      return match.replace("/sites", `${process.env.GATSBY_DRUPAL_URL}/sites`)
    })

    // Add www to non-www databricks.com references
    modifiedBody = modifiedBody.replace(
      /\/\/databricks\.com/gi,
      "//www.databricks.com"
    )

    if (!tags.length) {
      return modifiedBody
    }

    let parsedBody = modifiedBody
    tags.forEach((string) => {
      parsedBody = parsedBody.split(string).join(escapeTags(removeCodeTags(string)))
    })
    return parsedBody
  }

  const options = {
    decodeEntities: true,
    transform: (node) => transform(node, { inlineImages, hydrated }),
  }

  return ReactHtmlParser(getModifiedBody(content, preTagsContent), options)
}

// TODO: check Inline Images implementation
// const inlineImagesParser = (content, inlineImages) => {
//   const options = {
//     decodeEntities: true,
//     // eslint-disable-next-line consistent-return
//     transform: (htmlnode) => {
//       if (htmlnode.type === "tag" && htmlnode.name === "img") {
//         const inlineImage = inlineImages.find((image) => {
//           return htmlnode.attribs.src.includes(image?.base)
//         })

//         if (inlineImage) {
//           const alt = htmlnode.attribs.alt ? htmlnode.attribs.alt : ""
//           return (
//             <Image
//               alt={alt}
//               gatsbyData={inlineImage.childImageSharp.gatsbyImageData}
//             />
//           )
//         }
//       }
//     },
//   }
//   return ReactHtmlParser(content, options)
// }

export default HtmlParser
