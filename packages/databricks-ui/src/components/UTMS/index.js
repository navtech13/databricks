/* eslint-disable import/no-extraneous-dependencies */
import Cookies from "js-cookie"
import getQueryParam from "../../../../gatsby-theme-databricks-drupal/src/helpers/getQueryParam"
import cloudflareTrace from "../../../../gatsby-theme-databricks-drupal/src/helpers/cloudflareTrace"

const COOKIE_NAME_UTM_SOURCE = "_db_utm_source__c"
const COOKIE_NAME_UTM_CAMPAIGN = "_db_utm_campaign__c"
const COOKIE_NAME_UTM_MEDIUM = "_db_utm_medium__c"
const COOKIE_NAME_UTM_TERM = "_db_utm_term__c"
const COOKIE_NAME_UTM_CONTENT = "_db_utm_content__c"
const COOKIE_NAME_UTM_OFFER = "_db_utm_offer__c"
const COOKIE_NAME_UTM_KEYWORD = "_db_utm_keyword__c"
const COOKIE_NAME_UTM_GROUP = "_db_utm_ad_group__c"
const COOKIE_NAME_UTM_AD = "_db_utm_ad__c"
const COOKIE_NAME_GCLID = "_db_gclid"
const COOKIE_NAME_SCID = "_db_scid"
const COOKIE_NAME_ITM = "_dbw_itm_data"
const COOKIE_NAME_REFERRER = "_dbw_referrer"
const ORGANIC_SEARCH = "organic_search"
const DIRECT_SEARCH = "direct"
const ORGANIC_SOCIAL_SEARCH = "organic_social"
const WEB_SOURCE = "web"
const DB_DOMAIN = "databricks.com"

export const _debugDBUTMs = (step, value) => {
  if (document.cookie.indexOf("_debug_db_dev_utms") > 0) {
    if (value) {
      console.log("Debug:", step, "Value:", value || "Not defined")
    } else {
      console.log("Debug:", step)
    }
  }
}

export const hasUTMsParams = () => {
  const utmParams = [
    COOKIE_NAME_UTM_SOURCE,
    COOKIE_NAME_UTM_CAMPAIGN,
    COOKIE_NAME_UTM_MEDIUM,
    COOKIE_NAME_UTM_TERM,
    COOKIE_NAME_UTM_CONTENT,
    COOKIE_NAME_UTM_OFFER,
    COOKIE_NAME_UTM_KEYWORD,
    COOKIE_NAME_UTM_GROUP,
    COOKIE_NAME_UTM_AD,
  ]
  let found = false
  utmParams.forEach((val) => {
    if (
      typeof window !== "undefined" &&
      window.location.search.indexOf(val.replace("_db_", "").replace("__c", "")) !==
        -1
    ) {
      found = true
    }
  })
  if (found) {
    _debugDBUTMs("URL contains UTMs", window.location.search)
  } else {
    _debugDBUTMs("URL doesn't contain any UTMs", window.location.search)
  }

  return found
}

export const getSocialMedias = () => {
  const socialMediasDomains = [
    "facebook.",
    "youtube.",
    "instagram.",
    "tiktok.",
    "pinterest.",
    "reddit.",
    "linkedin.",
    "lnkd.in",
    "twitter.",
    "t.co",
    "snapchat.",
  ]
  _debugDBUTMs("Returned Social media", socialMediasDomains)

  return socialMediasDomains
}

export const getSearchEngines = () => {
  const searchEnginesDomains = [
    "google.",
    "bing.",
    "yahoo.",
    "yandex.",
    "duckduckgo.",
    "baidu.",
    "ask.",
    "naver.",
    "ecosia.",
    "aol.",
  ]
  _debugDBUTMs("Returned Search Engines", searchEnginesDomains)
  return searchEnginesDomains
}

export const getExistingCookies = () => {
  _debugDBUTMs(`Checking for existing cookies...`, ``)
  if (
    document.cookie.indexOf("_db_utm") > 0 ||
    document.cookie.indexOf("_db_scid") > 0 ||
    document.cookie.indexOf("_db_gclid") > 0
  ) {
    _debugDBUTMs(`Found some _db_utm cookies`, ``)
    if (document.cookie.indexOf("_db_utm_medium__c=direct") > 0) {
      _debugDBUTMs(`But _db_utm_medium__c is not one of them`, ``)
      return false
    }
    _debugDBUTMs(`And _db_utm_medium__c is one of them`, ``)
    return true
  }
  _debugDBUTMs(`No existing cookies`, ``)
  return false
}

export const isOrganicSearch = () => {
  const { referrer } = document

  if (referrer) {
    const domain = getDomainName(referrer)
    if (
      typeof domain !== "undefined" &&
      hasUTMsParams() === false &&
      getSearchEngines().includes(domain)
    ) {
      _debugDBUTMs(`Is Organic Search`)
      return true
    }
  }
  _debugDBUTMs(`Is NOT Organic Search`)
  return false
}

export const hasOnlyGclId = () => {
  if (typeof window !== "undefined") {
    if (window.location.search.indexOf("gclid=") >= 0 && !hasUTMsParams()) {
      _debugDBUTMs(`Url has Gclid and no UTMs`)
      return true
    }
  }
  _debugDBUTMs(`Url is missing Gclid`)
  return false
}

export const hasOnlyScId = () => {
  if (typeof window !== "undefined") {
    if (window.location.search.indexOf("scid=") >= 0 && !hasUTMsParams()) {
      _debugDBUTMs(`Url has scid and no UTMs`)
      return true
    }
  }
  _debugDBUTMs(`Url is missing scid`)
  return false
}

export const isDirect = () => {
  const domain = getDomainName(document?.referrer)
  let direct = false
  if (
    !domain &&
    hasUTMsParams() === false &&
    !getExistingCookies() &&
    window.location.search.indexOf("scid=") === -1 &&
    window.location.search.indexOf("gclid=") === -1
  ) {
    direct = true
  } else {
    direct = false
  }
  _debugDBUTMs(`Is Direct Traffic?`, direct ? `Yes` : `No`)
  return direct
}

// https://google.com => google.
// https://www.google.com => google.
// https://google.co.uk => google.
// https://www.google.co.uk => google.
// https://internal.www.google.co.uk => google.
// https://internal.google.co.uk => google.
// https://internal.test.io => test.
export const getDomainName = (url) => {
  // Tentatively trying to find the domain name without using a large library
  try {
    const parsedURl = new URL(url)
    const domain = parsedURl.hostname
    const domainParts = domain.split(".")
    let domainIndex = 2
    if (domainParts.length === 1 || domainParts.length === 2) {
      domainIndex = 0
    } else if (domainParts.length === 3) {
      domainIndex = domainParts.length - 2
    } else if (domainParts.length === 4) {
      domainIndex = domainParts.length - 3
    } else if (domainParts.length === 5) {
      domainIndex = domainParts.length - 3
    } else {
      domainIndex = domainParts.length - 2
    }
    // if the part we found is too short, pick the first item
    if (domainParts[domainIndex].length <= 3) {
      domainIndex = 0
    }
    return `${domainParts[domainIndex]}.`
  } catch (e) {
    _debugDBUTMs(`URL is not a valid referrer`, url)
  }
}

export const isOrganicSocial = () => {
  const { referrer } = document
  if (referrer) {
    const domain = getDomainName(referrer)
    if (
      (typeof domain !== "undefined" &&
        getSocialMedias().includes(domain) &&
        window.location.href.indexOf("gclid=") === -1 &&
        window.location.href.indexOf("scid=") === -1 &&
        window.location.href.indexOf("utm_medium=paid social") === -1) ||
      window.location.href.indexOf("utm_medium=social") >= 0 ||
      window.location.href.indexOf("utm_medium=organic_social") >= 0
    ) {
      _debugDBUTMs(`Is Social`)
      return true
    }
  }
  _debugDBUTMs(`Is Not Social`)
  return false
}

export const defineReferrer = () => {
  if (typeof window !== "undefined") {
    const { referrer } = document
    if (referrer) {
      _debugDBUTMs("Found Referrer", referrer)
      if (
        referrer.indexOf(".databricks.com") === -1 &&
        referrer.indexOf(".dataaisummit.com") === -1
      ) {
        Cookies.set(COOKIE_NAME_REFERRER, referrer, { domain: "databricks.com" })
        _debugDBUTMs(
          "Referrer is not DB web property, setting referrer cookie",
          referrer
        )
      } else {
        _debugDBUTMs("Referrer is DB web property", referrer)
      }
    } else {
      _debugDBUTMs("Referrer is empty")
    }
  }
}

export const clearCookies = () => {
  _debugDBUTMs("Clearing Cookies...")
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    if (cookieName.indexOf("_db_") === 0) {
      Cookies.remove(cookieName, { domain: "databricks.com" })
      _debugDBUTMs("Deleting Cookie", cookieName)
    }
  })
}

export const clearMarketoToken = () => {
  const params = window.location.search
  if (params !== "") {
    const mktTok = getQueryParam("mkt_tok", params)
    if (mktTok) {
      // Remove mkt_tok from urls
      const urlWithToken = new URL(window.location.href)
      const { searchParams } = urlWithToken
      searchParams.delete("mkt_tok")
      const nextURL = urlWithToken.toString()
      const nextState = { additionalInformation: "Updated the URL with JS" }
      // This will replace the current entry in the browser's history, without reloading
      window.history.replaceState(nextState, "", nextURL)
    }
  }
}

export const appendCookiesToLinks = () => {
  // Get all cookies
  const allCookies = document.cookie.split("; ")

  // Filter cookies starting with "_db_"
  const dbCookies = allCookies.filter((cookie) => cookie.startsWith("_db_"))

  // Get all links within the page
  const links = document.querySelectorAll('[href*="register.dataaisummit.com"]')

  const appendedCookies = dbCookies
    .map((cookie) => {
      const [cookieName, cookieValue] = cookie.split("=")
      return `${cookieName
        .replace("_db_", "")
        .replace("__c", "")
        .replace("_dbw_", "")}=${cookieValue}`
    })
    .join("&")

  // Loop through the links and append cookie name and value to them
  links.forEach((link) => {
    const linkHref = link.getAttribute("href")

    // Append cookies to link
    if (appendedCookies && linkHref.indexOf("&utm_") === -1) {
      if (linkHref.includes("?")) {
        link.setAttribute("href", `${linkHref}&${appendedCookies}`)
      } else {
        link.setAttribute("href", `${linkHref}?${appendedCookies}`)
      }
    }
  })
}

export const getUTMs = () => {
  const params = window.location.search
  if (params !== "") {
    if (hasOnlyGclId() || hasOnlyScId()) {
      clearCookies()
    }
    if (hasUTMsParams() === true) {
      clearCookies()
    }

    const utmCampaign = getQueryParam("utm_campaign", params)
    const utmSource = getQueryParam("utm_source", params)
    const utmMedium = getQueryParam("utm_medium", params)
    const utmTerm = getQueryParam("utm_term", params)
    const utmContent = getQueryParam("utm_content", params)
    const gclId = getQueryParam("gclid", params)
    const utmKeyword = getQueryParam("utm_keyword", params)
    const utmOffer = getQueryParam("utm_offer", params)
    const utmAdGroup = getQueryParam("utm_adgroup", params)
    const utmAd = getQueryParam("utm_ad", params)
    const itmData = getQueryParam("itm_data", params)
    const scId = getQueryParam("scid", params)
    const values = {
      utmSource: utmSource || "",
      utmCampaign: utmCampaign || "",
      utmMedium: utmMedium || "",
      utmTerm: utmTerm || "",
      utmContent: utmContent || "",
      utmKeyword: utmKeyword || "",
      scId: scId || "",
      gclId: gclId || "",
      utmAd: utmAd || "",
      utmAdGroup: utmAdGroup || "",
      utmOffer: utmOffer || "",
      itmData: itmData || "",
    }
    setCookie(values)
  }
}

export const prefillMarketoForm = () => {
  if (typeof window !== "undefined") {
    let retries = 0
    const timer = setInterval(function () {
      _debugDBUTMs("is Marketo Ready...?")
      retries += 1
      if (window.MktoForms2) {
        const utmCampaign = Cookies.get(COOKIE_NAME_UTM_CAMPAIGN)
        const utmSource = Cookies.get(COOKIE_NAME_UTM_SOURCE)
        const utmMedium = Cookies.get(COOKIE_NAME_UTM_MEDIUM)
        const utmTerm = Cookies.get(COOKIE_NAME_UTM_TERM)
        const utmContent = Cookies.get(COOKIE_NAME_UTM_CONTENT)
        const gclId = Cookies.get(COOKIE_NAME_GCLID)
        const utmKeyword = Cookies.get(COOKIE_NAME_UTM_KEYWORD)
        const utmOffer = Cookies.get(COOKIE_NAME_UTM_OFFER)
        const utmAdGroup = Cookies.get(COOKIE_NAME_UTM_GROUP)
        const utmAd = Cookies.get(COOKIE_NAME_UTM_AD)
        const itmData = Cookies.get(COOKIE_NAME_ITM)
        const scId = Cookies.get(COOKIE_NAME_SCID)
        window.MktoForms2.whenReady(function (form) {
          _debugDBUTMs("Marketo is finally ready!")
          // In case GTM or Marketo is overriding the values, set them on validate
          form.onValidate(function () {
            form.vals({
              UTM_Campaign__c: utmCampaign,
              UTM_Source__c: utmSource,
              UTM_Keyword__c: utmKeyword,
              UTM_Medium__c: utmMedium,
              UTM_Term__c: utmTerm,
              UTM_Content__c: utmContent,
              UTM_Offer__c: utmOffer,
              UTM_Ad_Group__c: utmAdGroup,
              UTM_Ad__c: utmAd,
              sCID: scId,
              GCLID__c: gclId,
              ITM__c: itmData,
            })
            _debugDBUTMs(
              `on Validate Marketo Form and set hidden fields`,
              form.vals()
            )
          })
          form.onSubmit(function () {
            form.vals({
              UTM_Campaign__c: utmCampaign,
              UTM_Source__c: utmSource,
              UTM_Keyword__c: utmKeyword,
              UTM_Medium__c: utmMedium,
              UTM_Term__c: utmTerm,
              UTM_Content__c: utmContent,
              UTM_Offer__c: utmOffer,
              UTM_Ad_Group__c: utmAdGroup,
              UTM_Ad__c: utmAd,
              sCID: scId,
              GCLID__c: gclId,
              ITM__c: itmData,
            })
            _debugDBUTMs(`on Marketo Form submit and set hidden fields`, form.vals())
          })
          clearInterval(timer)
        })
      }
      if (retries === 10) {
        clearInterval(timer)
        _debugDBUTMs(`Marketo is not available`)
      }
    }, 200)
  }
  // For Trial, see freeTrialSignup
}

export const setCookie = (values) => {
  const {
    utmMedium,
    utmSource,
    utmCampaign,
    utmTerm,
    utmContent,
    itmData,
    utmAd,
    utmAdGroup,
    utmOffer,
    utmKeyword,
    scId,
    gclId,
  } = values

  if (utmMedium && utmMedium !== "") {
    Cookies.set(COOKIE_NAME_UTM_MEDIUM, utmMedium, { domain: "databricks.com" })
    _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_UTM_MEDIUM}`, utmMedium)
  }
  if (utmSource && utmSource !== "") {
    Cookies.set(COOKIE_NAME_UTM_SOURCE, utmSource, { domain: "databricks.com" })
    _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_UTM_SOURCE}`, utmSource)
  }
  if (utmCampaign && utmCampaign !== "") {
    Cookies.set(COOKIE_NAME_UTM_CAMPAIGN, utmCampaign, { domain: "databricks.com" })
    _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_UTM_CAMPAIGN}`, utmCampaign)
  }
  if (utmTerm && utmTerm !== "") {
    Cookies.set(COOKIE_NAME_UTM_TERM, utmTerm, { domain: "databricks.com" })
    _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_UTM_TERM}`, utmCampaign)
  }
  if (utmContent && utmContent !== "") {
    Cookies.set(COOKIE_NAME_UTM_CONTENT, utmContent, { domain: "databricks.com" })
    _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_UTM_CONTENT}`, utmContent)
  }
  if (utmKeyword && utmKeyword !== "") {
    Cookies.set(COOKIE_NAME_UTM_KEYWORD, utmKeyword, { domain: "databricks.com" })
    _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_UTM_KEYWORD}`, utmKeyword)
  }
  if (itmData && itmData !== "") {
    Cookies.set(COOKIE_NAME_ITM, itmData, { domain: "databricks.com" })
    _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_ITM}`, itmData)
  }
  if (utmAd && utmAd !== "") {
    Cookies.set(COOKIE_NAME_UTM_AD, utmAd, { domain: "databricks.com" })
    _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_UTM_AD}`, utmAd)
  }
  if (utmOffer && utmOffer !== "") {
    Cookies.set(COOKIE_NAME_UTM_OFFER, utmOffer, { domain: "databricks.com" })
    _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_UTM_OFFER}`, utmOffer)
  }
  if (utmAdGroup && utmAdGroup !== "") {
    Cookies.set(COOKIE_NAME_UTM_GROUP, utmAdGroup, { domain: "databricks.com" })
    _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_UTM_GROUP}`, utmAdGroup)
  }
  if (gclId && gclId !== "") {
    Cookies.set(COOKIE_NAME_GCLID, gclId, { domain: "databricks.com" })
    _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_GCLID}`, gclId)
  }
  if (scId && scId !== "") {
    Cookies.set(COOKIE_NAME_SCID, scId, { domain: "databricks.com" })
    _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_SCID}`, scId)
  }
}

const getSearchType = () => {
  const fromOrganicSearch =
    !hasUTMsParams() && !hasOnlyGclId() && !hasOnlyScId() && isOrganicSearch()
  const fromOrganicSocialSearch = isOrganicSocial() && !hasUTMsParams()

  if (isDirect()) {
    return DIRECT_SEARCH
  }
  if (fromOrganicSearch) {
    return ORGANIC_SEARCH
  }
  if (fromOrganicSocialSearch) {
    return ORGANIC_SOCIAL_SEARCH
  }
  return ""
}

const setSearchTypeCookies = (medium) => {
  clearCookies()
  Cookies.set(COOKIE_NAME_UTM_SOURCE, WEB_SOURCE, { domain: DB_DOMAIN })
  Cookies.set(COOKIE_NAME_UTM_MEDIUM, medium, { domain: DB_DOMAIN })
  _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_UTM_SOURCE}`, WEB_SOURCE)
  _debugDBUTMs(`Setting cookie for ${COOKIE_NAME_UTM_MEDIUM}`, medium)
}

/**
 * Set cookies for different types of search
 * it could be organic_search, organic_social, or direct
 */
const setSearchType = () => {
  const searchType = getSearchType()
  switch (searchType) {
    case ORGANIC_SEARCH:
      setSearchTypeCookies(ORGANIC_SEARCH)
      break
    case ORGANIC_SOCIAL_SEARCH:
      setSearchTypeCookies(ORGANIC_SOCIAL_SEARCH)
      break
    case DIRECT_SEARCH:
      setSearchTypeCookies(DIRECT_SEARCH)
      break
    default:
      break
  }
}

const initUTMs = () => {
  _debugDBUTMs("Started UTMs Debugging...")

  _debugDBUTMs("Setting Country cookie...")
  cloudflareTrace()
  _debugDBUTMs("Country cookie is set", Cookies.get("db_country"))

  _debugDBUTMs("Setting Referrer...", ``)
  defineReferrer()

  _debugDBUTMs("Checking for UTMs...", ``)
  getUTMs()

  _debugDBUTMs("Checking for Organic/Social...", ``)
  setSearchType()

  appendCookiesToLinks()
  _debugDBUTMs(`Prefill Marketo Form`, ``)
  prefillMarketoForm()
  clearMarketoToken()
}

export default initUTMs
