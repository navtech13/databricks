import Cookies from "js-cookie"
import eventTracking, { sendRudderStackIdentify } from "./eventTracking"

const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration))

export const setCookie = (name, value, days = 0, minutes = 0) => {
  const daysTime = days * 24 * 60 * 60 * 1000
  const minutesTime = minutes * 60 * 1000
  let expires = ""
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + daysTime + minutesTime)
    expires = `; expires=${date.toUTCString()}`
  }

  document.cookie = `${name}=${value || ""}${expires}; path=/`
}

const isValidJson = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const getMunchCookie = async (retries = 0) => {
  if (retries > 4) {
    return null
  }

  const cookie = document.cookie.match("(^|;)\\s*_mkto_trk\\s*=\\s*([^;]+)")?.pop()

  if (!cookie) {
    await delay(1000)
    return getMunchCookie(retries + 1)
  }
  return cookie
}

const fetchByCookie = async (includeId) => {
  const munchCookie = await getMunchCookie()

  if (!munchCookie) {
    return null
  }

  let existingCookie

  if (isValidJson(Cookies.get("db_mkto_lead"))) {
    existingCookie = JSON.parse(Cookies.get("db_mkto_lead"))
  }

  return fetch(`${process.env.GATSBY_MARKETO_DRUPAL_URL}/dbapi/mkto/lead/get`, {
    method: "GET",
    headers: {
      "cookie-filter": munchCookie,
    },
  })
    .then((response) => response.json())
    .then(({ data }) => {
      if (!data.success || !data?.result?.length) {
        return {
          known: false,
          subscribed: false,
          identified: existingCookie?.identified,
        }
      }
      return {
        known: data.result[0]?.isLead,
        subscribed: !data.result[0]?.unsubscribed,
        identified: existingCookie?.identified,
        ...(includeId && { id: data.result[0]?.id }),
      }
    })
    .catch((e) => console.log(e))
}

export const refreshLeadCookie = async () => {
  const leadObj = await fetchByCookie()

  if (!leadObj) {
    return null
  }
  setCookie("db_mkto_lead", JSON.stringify(leadObj), 14)
  leadObj.newCookie = true
  return leadObj
}

const getKnownLead = async () => {
  if (typeof document === "undefined") {
    return
  }

  const knownLeadCookie =
    document.cookie.match("(^|;)\\s*db_mkto_lead\\s*=\\s*([^;]+)")?.pop() || ""

  if (!knownLeadCookie) {
    const leadObj = await fetchByCookie()
    if (!leadObj) {
      return null
    }
    setCookie("db_mkto_lead", JSON.stringify(leadObj), 14)
    leadObj.newCookie = true
    return leadObj
  }

  if (isValidJson(knownLeadCookie)) {
    const leadObj = JSON.parse(knownLeadCookie)
    leadObj.newCookie = false
    return leadObj
  }
}

export const identifyUser = async () => {
  const cookie = await fetchByCookie(true)

  if (!cookie) {
    return false
  }

  if (cookie?.identified) {
    return true
  }

  if (cookie?.id && !cookie.identified) {
    sendRudderStackIdentify(cookie?.id)
    setCookie("db_mkto_lead", JSON.stringify({ ...cookie, identified: true }), 14)
    return true
  }
}

export const submitLeadForm = async (
  formId,
  location,
  langId,
  sendEventData = true,
  sfCampaignId = null,
  submitAction = "automatic"
) => {
  const munchCookie = await getMunchCookie()
  if (!formId || !munchCookie) {
    return null
  }
  const formData = new FormData()
  formData.append("formId", formId)

  const extraFields = {}
  let country

  try {
    extraFields.ITM__c = Cookies.get("itm_data") || null
    extraFields.UTM_Source__c = Cookies.get("_db_utm_source__c") || null
    extraFields.UTM_Medium__c = Cookies.get("_db_utm_medium__c") || null
    extraFields.UTM_Campaign__c = Cookies.get("_db_utm_campaign__c") || null
    extraFields.UTM_Offer__c = Cookies.get("_db_utm_offer__c") || null
    extraFields.UTM_Content__c = Cookies.get("_db_utm_content__c") || null
    extraFields.UTM_Keyword__c = Cookies.get("_db_utm_keyword__c") || null
    extraFields.UTM_Ad__c = Cookies.get("_db_utm_ad__c") || null
    extraFields.UTM_Term__c = Cookies.get("_db_utm_term__c") || null
    extraFields.UTM_Ad_Group__c = Cookies.get("_db_utm_adgroup__c") || null
    extraFields.GCLID__c = Cookies.get("_db_glc_id__c") || null
    extraFields._mktoReferrer = location || null
    // for 1001, set custom field for referrer url _mktoReferrer is mkto system field
    if (formId == "1001") {
      extraFields.referrerUrl = location || null
      extraFields.mkto_sfdc_campaign_id = sfCampaignId || null
    }
    const userLocation = Cookies.get("db_country")
    if (typeof userLocation !== "undefined") {
      const knownLocation = JSON.parse(userLocation)
      if (knownLocation.country_name) {
        country = knownLocation.country_name
      }
    }
  } catch (e) {
    console.log("Error reading cookie", e)
  }

  Object.keys(extraFields).forEach((key) => {
    formData.append(key, extraFields[key])
  })

  const eventData = {
    event: "Form Submit Failed",
    formId,
    formValueCountry: country,
    formSource: "Marketo",
    formRegion: langId,
    formFailReason: "",
    formFailCode: "",
    submitAction,
  }

  if (sfCampaignId) {
    eventData.formSfdcCampaignId = sfCampaignId
  }

  return fetch(`${process.env.GATSBY_MARKETO_DRUPAL_URL}/dbapi/mkto/lead/submit`, {
    method: "POST",
    headers: new Headers({
      "cookie-filter": munchCookie,
    }),
    body: formData,
  })
    .then((response) => response.json())
    .then(({ data }) => {
      if (!data.success || !data?.result?.length) {
        if (!sendEventData) {
          return null
        }
        eventData.formFailReason = data.errors
        eventData.formFailCode = "400"
        eventTracking(eventData)
        return null
      }
      if (!sendEventData) {
        return true
      }
      eventData.event = "Form Submit Success"
      eventTracking(eventData)
      return true
    })
    .catch((e) => {
      if (!sendEventData) {
        return null
      }
      eventData.formFailReason = e
      eventData.formFailCode = "400"
      eventTracking(eventData)
      return null
    })
}

export default getKnownLead
