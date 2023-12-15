import React from "react"
import { gtmBody } from "./src/scripts/gtm"
import { munchkinBody } from "./src/scripts/munchkin"
import {
  excludedPathsVwo,
  includedPathsVwo,
  globalPrefixes,
  vwoHead,
  vwoHeadStaging,
} from "./src/scripts/vwo"
import { LanguageContextProvider } from "./src/components/language-provider"
import {
  qualifiedExcludedPages,
  qualifiedExcludedPagesExactMatch,
  qualifiedPages,
  qualifiedScript,
} from "./src/scripts/qualified"
import { onetrustBody } from "./src/scripts/onetrust"
import { rudderstackScript } from "./src/scripts/rudderstack"

export const onPreRenderHTML = ({
  pathname,
  getHeadComponents,
  replaceHeadComponents,
  getPreBodyComponents,
  replacePreBodyComponents,
}) => {
  const vwoScript =
    process.env.IS_STAGING === "true" || process.env.NODE_ENV !== "production"
      ? vwoHeadStaging
      : vwoHead
  const headComponents = getHeadComponents()
  const headScriptSrc =
    process.env.IS_STAGING === "true" || process.env.NODE_ENV === "production"
      ? "/webshared/js/db-headscripts.js"
      : "/db-headscripts.js"

  const headElements = [
    <script
      key='headScripts'
      type='text/javascript'
      className='optanon-category-C0001'
      data-ot-ignore='1'
      src={headScriptSrc}
    />,
    ...headComponents,
  ]

  const removePrefix = (path) => {
    const prefixToRemove = globalPrefixes.find((prefix) => path.startsWith(prefix))
    return prefixToRemove ? `/${path.slice(prefixToRemove.length)}` : path
  }

  const pathWithoutPrefix = removePrefix(pathname)

  const isExcludedPath = excludedPathsVwo.some((excludedPath) =>
    pathWithoutPrefix.startsWith(excludedPath)
  )

  const isIncludedPath = includedPathsVwo.some((includedPath) =>
    pathWithoutPrefix.startsWith(includedPath)
  )

  if (isIncludedPath || !isExcludedPath) {
    headElements.push(
      <script
        key='vwo'
        type='text/javascript'
        dangerouslySetInnerHTML={{ __html: vwoScript }}
        data-cfasync='false'
        async
      />
    )
  }

  if (qualifiedPages.some((entry) => pathname.toLowerCase().startsWith(entry))) {
    if (
      !qualifiedExcludedPages.some((entry) => pathname.toLowerCase().includes(entry))
      &&
      !qualifiedExcludedPagesExactMatch.some((entry) => pathname.toLowerCase() === entry)
    ) {
      headElements.push(
        <script
          key='qualifiedScript'
          dangerouslySetInnerHTML={{ __html: qualifiedScript }}
          async
        />
      )
    }
  }
  replaceHeadComponents(headElements)
  const bodyComponents = getPreBodyComponents()
  let bodyElements = []
  if (process.env.GATSBY_GTM_ID && process.env.GATSBY_GTM_ID !== "DISABLED") {
    bodyElements.push(
      <noscript key='gtmScript' dangerouslySetInnerHTML={{ __html: gtmBody }} />
    )
  }
  if (process.env.GATSBY_ONETRUST_ID && process.env.GATSBY_ONETRUST_ID.length) {
    if (
      process.env.GATSBY_ONETRUST_AUTOBLOCK_SRC &&
      process.env.GATSBY_ONETRUST_AUTOBLOCK_SRC.length
    ) {
      bodyElements.push(
        <script
          key='onetrust-autoblock-script'
          type='text/javascript'
          src={`${process.env.GATSBY_ONETRUST_AUTOBLOCK_SRC}`}
        />
      )
    }
    bodyElements.push(
      <script
        key='onetrust-script'
        src='https://cdn.cookielaw.org/scripttemplates/otSDKStub.js'
        type='text/javascript'
        data-document-language='true'
        data-domain-script={process.env.GATSBY_ONETRUST_ID}
      />
    )
  }

  bodyElements = [
    ...bodyElements,
    <script
      key='rudderstackScript'
      type='text/plain'
      className='optanon-category-C0003'
      dangerouslySetInnerHTML={{ __html: rudderstackScript }}
      async
    />,
    <script
      key='onetrust-script2'
      type='text/javascript'
      dangerouslySetInnerHTML={{ __html: onetrustBody }}
    />,
    <script
      key='munchkinScript'
      type='text/javascript'
      dangerouslySetInnerHTML={{ __html: munchkinBody }}
      defer
    />,
    ...bodyComponents,
  ]
  replacePreBodyComponents(bodyElements)
}

export const wrapPageElement = ({ element, props }) => {
  // Override context isn't available on preview (client side)
  let lang = props.pageContext.language
  if (props.uri === "/preview" && typeof window !== "undefined") {
    const urlSearchParams = new URLSearchParams(window.location.search)
    lang = urlSearchParams.get("lang") || "EN"
  }

  return <LanguageContextProvider lang={lang}>{element}</LanguageContextProvider>
}
