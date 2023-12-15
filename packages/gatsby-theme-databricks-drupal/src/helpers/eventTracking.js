import Cookies from "js-cookie"
import getQueryParam from "./getQueryParam"
import getPageTitle from "./getPageTitle"

export const append6SenseData = (originalData, includeTracking = true) => {
  const data = { ...originalData }
  if (
    typeof localStorage !== "undefined" &&
    typeof localStorage._6senseCompanyDetails !== "undefined"
  ) {
    try {
      const _6senseData = JSON.parse(
        window.localStorage.getItem("_6senseCompanyDetails")
      )

      if (includeTracking) {
        data.company_annual_revenue_6sense = _6senseData.company.annual_revenue
        data.company_name_6sense = _6senseData.company.name
        data.company_state_6sense = _6senseData.company.state
        data.company_country_6sense = _6senseData.company.country
        data.company_domain_6sense = _6senseData.company.domain
        data.company_employee_count_6sense = _6senseData.company.employee_count
        data.company_employee_range_6sense = _6senseData.company.employee_range
        data.company_industry_6sense = _6senseData.company.industry
        data.company_naics_6sense = _6senseData.company.naics
        data.company_naics_description_6sense = _6senseData.company.naics_description
        data.company_country_iso_code_6sense = _6senseData.company.country_iso_code
        data.company_region_6sense = _6senseData.company.region
        data.company_revenue_range_6sense = _6senseData.company.revenue_range
        data.scoreObject_6sense = _6senseData.scores
        data.segmentsObject_6sense = _6senseData.segments
        data.company_sic_6sense = _6senseData.company.sic
        data.company_sic_description_6sense = _6senseData.company.sic_description
      }
      data.segments_ids_6sense = _6senseData.segments.ids.join("|")
      data.confidence_6sense = _6senseData.confidence
    } catch {
      // JSON Parse failed, don't send any event
    }
  }
  return data
}

export const appendOneTrustCookieData = (originalData, includeTracking = true) => {
  const data = { ...originalData }
  const oneTrustCookie = Cookies.get("OptanonConsent")
  const interactionCount = getQueryParam("interactionCount", oneTrustCookie)
  const consentId = getQueryParam("consentId", oneTrustCookie)
  const groups = getQueryParam("groups", oneTrustCookie)
  const awaitingReconsent = getQueryParam("AwaitingReconsent", oneTrustCookie)
  if (includeTracking) {
    data.ot_interactionCount = interactionCount
    data.ot_consentId = consentId
    data.ot_awaitingReconsent = awaitingReconsent
  }
  data.ot_groups = groups
  return data
}

export const sendRudderStackPageView = (pageTitle) => {
  if (typeof rudderanalytics !== "undefined") {
    const data = appendOneTrustCookieData({})
    if (typeof Cookies.get("_mkto_trk") !== "undefined") {
      data.mkto_trk = Cookies.get("_mkto_trk")
    }
    // eslint-disable-next-line no-undef
    rudderanalytics.page(pageTitle, data)
  }
}

export const checkCookieConsent = (groupId) => {
  // checks if consent given for category, ex: C0002
  let consent = false
  const oneTrustCookie = Cookies.get("OptanonConsent")
  const groups = getQueryParam("groups", oneTrustCookie)
  const arrGroups = groups.split(",")
  arrGroups.forEach((el) => {
    if (el.includes(`${groupId}:`)) {
      const arrGroup = el.split(":")
      if (arrGroup.length === 2 && arrGroup[1] === "1") {
        consent = true
      }
    }
  })
  return consent
}

export const sendIdentifyEvent = (traits) => {
  if (typeof rudderanalytics !== "undefined") {
    rudderanalytics.identify("", traits)
  }
}

export const sendMarketoToRudderStack = () => {
  const marketoTracking = Cookies.get("_mkto_trk")
  if (
    window.localStorage.getItem("_localmkto_trk") !== marketoTracking &&
    typeof marketoTracking !== "undefined"
  ) {
    const data = { mkto_trk: marketoTracking }
    sendIdentifyEvent(data)
    window.localStorage.setItem("_localmkto_trk", marketoTracking)
  }
}

const eventTracking = (eventData) => {
  const data = appendOneTrustCookieData(eventData)
  // Add munchkin cookie to GTM and rudderstack
  if (typeof Cookies.get("_mkto_trk") !== "undefined") {
    data.mkto_trk = Cookies.get("_mkto_trk")
  }

  if (typeof dataLayer !== "undefined") {
    dataLayer = dataLayer || []
    // eslint-disable-next-line no-undef
    dataLayer.push(data)
  }

  if (typeof rudderanalytics !== "undefined") {
    const eventName = data.event
    if (data.hasOwnProperty("event")) {
      delete data.event
    }
    // remove extra props added by data layer from rudderstack
    if (data.hasOwnProperty("gtm.uniqueEventId")) {
      delete data["gtm.uniqueEventId"]
    }
    if (data.hasOwnProperty("track.properties")) {
      delete data["track.properties"]
    }
    if (data?.properties?.["gtm.uniqueEventId"]) {
      delete data.properties["gtm.uniqueEventId"]
    }
    if (data?.context?.traits?.event) {
      // event is a reserved word within rudderstack traits
      delete data.context.traits.event
    }
    // eslint-disable-next-line no-undef
    rudderanalytics.track(eventName, data)
  }
}

export const sendQualifiedToRudderStack = () => {
  window.qualified("handleEvents", function (name, data) {
    const eventData = {
      event: "Qualified Chat Custom Action",
      qualifiedAction: name,
      qualifiedBotId: data?.bot?.id,
      qualifiedBotName: data?.bot?.name,
      qualifiedSenderType: data?.sender?.type,
    }
    eventTracking(eventData)
  })
}

export const send6senseToRudderStack = () => {
  const eventName = { event: "company_details_updated_6sense" }
  const eventDataTracking = append6SenseData(eventName)

  // the append functions were originally referencing and not making a copy
  // of the object, which caused oneTrust traits being added on the eventTracking function
  // from below. A call to the appendOneTrust function needs to be added here, since
  // that function call won't add those traits anymore
  const identify6sense = append6SenseData(eventName, false)
  const eventDataIdentify = appendOneTrustCookieData(identify6sense, false)

  // check if the local rl_trait cookie has any deprecated fields. If it does,
  // delete the cookie and trigger the identify event
  let hasDeprecatedFields = false

  if (typeof rudderanalytics !== "undefined") {
    const traits = rudderanalytics.getUserTraits()
    hasDeprecatedFields = traits?.company_name_6sense || traits?.ot_consentId
  }

  // rudderstack seems to cache the initial values present in the cookie until
  // the next page load. Even if the cookie is deleted, the identify event will
  // still have the old fields. For this, we will remove the cookie and clear the
  // _local6senseCompanyDetails local storage to trigger the identify event
  // on the next page load
  if (hasDeprecatedFields) {
    Cookies.remove("rl_trait", { path: "/", domain: ".databricks.com" })
    window.localStorage.removeItem("_local6senseCompanyDetails")
    return
  }

  if (
    window.localStorage.getItem("_6senseCompanyDetails") !==
    window.localStorage.getItem("_local6senseCompanyDetails")
  ) {
    eventTracking(eventDataTracking)
    sendIdentifyEvent(eventDataIdentify)
    window.localStorage.setItem(
      "_local6senseCompanyDetails",
      window.localStorage.getItem("_6senseCompanyDetails")
    )
  }
}

export const loadOneTrust = () => {
  if (typeof OneTrust !== "undefined") {
    // eslint-disable-next-line no-undef
    OneTrust.OnConsentChanged(function (e) {
      const eventData = {
        event: "Onetrust Consent Updated",
      }
      eventTracking(eventData)
      const data = appendOneTrustCookieData({}, true)
      const interactionCount = parseInt(data.ot_interactionCount, 10)
      if (!Number.isNaN(interactionCount)) {
        data.ot_interactionCount = (interactionCount + 1).toString()
      }
      sendIdentifyEvent(data)
    })
  } else {
    setTimeout(loadOneTrust, 300)
  }
}

export const loadRudderStack = (seo) => {
  if (typeof rudderanalytics !== "undefined") {
    sendRudderStackPageView(getPageTitle(seo))
    document.addEventListener(
      "6si_company_details_loaded",
      () => {
        send6senseToRudderStack()
      },
      { once: true }
    )
    if (typeof qualified !== "undefined") {
      sendQualifiedToRudderStack()
    }
    if (typeof Munchkin !== "undefined") {
      sendMarketoToRudderStack()
    }
  } else {
    setTimeout(loadRudderStack, 300)
  }
}

export const handleMarketoEvents = () => {
  if (typeof window.MktoForms2 !== "undefined") {
    // const formId = window.MktoForms2.getId()
    window.MktoForms2.whenReady(function (form) {
      const formInstance = window.MktoForms2.allForms()[0]
      const eventData = {
        event: "Form Loaded",
        formId: formInstance.getId(),
        formValueCountry: form.vals().Country,
        formSource: "Marketo",
        formRegion: "EN",
        formFailReason: "",
        formFailCode: "",
      }
      eventTracking(eventData)

      formInstance.onValidate(function () {
        const timer = setInterval(function () {
          const currentError = document.getElementsByClassName("mktoErrorMsg")[0]
          if (document.getElementsByClassName("mktoErrorMsg").length > 0) {
            const validateEventData = {
              event: "Form Submit Failed",
              formId: formInstance.getId(),
              formSource: "Marketo",
              formValueCountry: document.getElementById("Country")?.value,
              formRegion: "EN",
              formFailReason: `${currentError?.id?.replace(
                "ValidMsg",
                ""
              )} is invalid`,
              formFailCode: "400",
            }
            clearInterval(timer)
            eventTracking(validateEventData)
          }
        }, 200)
      })
      formInstance.onSuccess(function (values) {
        const successEventData = {
          event: "Form Submit Success",
          formId: formInstance.getId(),
          formValueCountry: values.Country,
          formSource: "Marketo",
          formRegion: "EN",
          formFailReason: "",
          formFailCode: "",
        }
        eventTracking(successEventData)
      })
    })
  }
}

export const sendRudderStackIdentify = (mktoLeadId) => {
  if (typeof rudderanalytics === "undefined") {
    return setTimeout(() => sendRudderStackIdentify(mktoLeadId), 1500)
  }

  // eslint-disable-next-line no-undef
  rudderanalytics.identify(mktoLeadId, {
    mkto_lead_id: mktoLeadId,
  })
}

export default eventTracking
