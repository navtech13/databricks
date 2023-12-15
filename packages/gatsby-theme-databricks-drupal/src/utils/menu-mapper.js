import { useLanguageContext } from "../components/language-provider"
import { componentResolver } from "./component-resolver"
import { useCurrentPrefix } from "./current-prefix"

const menuMapper = (links, prefix = false, disableHomepagePrefix = false) => {
  const currentPrefix = useCurrentPrefix()

  return links?.map(({ text, url, links: sublinks, items, fieldOverrideUrl }) => {
    let urlPath = url?.path

    if (prefix && typeof urlPath !== "undefined") {
      // add prefix if:
      // 1) enabled
      // 2) not a http/https link
      // 3) link doesn't already start with the prefix
      if (!urlPath.startsWith("http") && !urlPath.startsWith(currentPrefix)) {
        if (!disableHomepagePrefix || urlPath?.length > 0) {
          urlPath = `${currentPrefix}${url?.path}`
        }
      }

      const supportedHostnames = ["www.databricks.com", "www.databricksweb.com"]
      // insert prefix into http/https link if:
      // 1) supported hostname is found
      // 2) prefix not already in place
      // 3) exception not in querystring (?nl=1)
      if (urlPath.startsWith("http")) {
        const urlObj = new URL(urlPath) // can add  + "?nl=1" to test exclusion for condition #3
        if (supportedHostnames.indexOf(urlObj.hostname) !== -1) {
          if (
            !urlObj.pathname.startsWith(currentPrefix) &&
            !urlObj.searchParams.has("nl")
          ) {
            urlObj.pathname = `${currentPrefix}${urlObj.pathname}`
            urlPath = urlObj.href
          }
        }
      }
    }

    if (fieldOverrideUrl) {
      urlPath = fieldOverrideUrl.url.path
    }

    return {
      label: text,
      ...(urlPath !== "" && { to: urlPath }),
      ...(sublinks &&
        sublinks.length > 0 && { links: menuMapper(sublinks, prefix, disableHomepagePrefix) }),
      ...(items && items.length > 0 && { items: componentResolver(items) }),
    }
  })
}

const menuLangMapper = (data, type = "main", property = "menu") => {
  const { currentLanguage, defaultLanguage } = useLanguageContext()

  const menuMap = {
    main: {
      EN: data.mainNavigation,
      DE: data.mainNavigationDE,
      FR: data.mainNavigationFR,
      IT: data.mainNavigationIT,
      JA: data.mainNavigationJA,
      KO: data.mainNavigationKO,
      BR: data.mainNavigationBR,
    },
    secondary: {
      EN: data.secondaryNavigation,
      DE: data.secondaryNavigationDE,
      FR: data.secondaryNavigationFR,
      IT: data.secondaryNavigationIT,
      JA: data.secondaryNavigationJA,
      KO: data.secondaryNavigationKO,
      BR: data.secondaryNavigationBR,
    },
    cta: {
      EN: data.mainNavigationCta,
      DE: data.mainNavigationCtaDE,
      FR: data.mainNavigationCtaFR,
      IT: data.mainNavigationCtaIT,
      JA: data.mainNavigationCtaJA,
      KO: data.mainNavigationCtaKO,
      BR: data.mainNavigationCtaBR,
    },
    footer: {
      EN: data.footer,
      DE: data.footerDE,
      FR: data.footerFR,
      IT: data.footerIT,
      JA: data.footerJA,
      KO: data.footerKO,
      BR: data.footerBR,
    },
    footerMenu: {
      EN: data.footerMenu,
      DE: data.footerMenuDE,
      FR: data.footerMenuFR,
      IT: data.footerMenuIT,
      JA: data.footerMenuJA,
      KO: data.footerMenuKO,
      BR: data.footerMenuBR,
    },
    footerLegal: {
      EN: data.footerLegal,
      DE: data.footerLegalDE,
      FR: data.footerLegalFR,
      IT: data.footerLegalIT,
      JA: data.footerLegalJA,
      KO: data.footerLegalKO,
      BR: data.footerLegalBR,
    },
  }

  const defaultLang = menuMap[type]?.[defaultLanguage.id][property]
  if (!menuMap[type]?.[currentLanguage?.id]) {
    return defaultLang
  }
  return menuMap[type]?.[currentLanguage.id]?.[property] || defaultLang
}

export { menuMapper, menuLangMapper }
