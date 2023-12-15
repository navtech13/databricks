import Cookies from "js-cookie"
import React, { useEffect } from "react"
import eventTracking, {
  sendQualifiedToRudderStack,
} from "gatsby-theme-databricks-drupal/src/helpers/eventTracking"

export const ValueCalc = () => {
  const formId = "8209"
  const mediaFlySrc = "https://prod2.valuestoryapp.com"

  useEffect(() => {
    function sendValueCalcEvents(message) {
      // trigger Sequence Viewed event
      if (message?.data?.sequenceId && !message?.data?.Clicked) {
        const eventData = {
          event: "Mediafly Form Sequence Viewed",
          ...message.data,
        }
        eventTracking(eventData)
      }

      // if schedule a meeting cta is clicked, trigger qualified chat
      if (
        message?.data?.Clicked === "Schedule meeting" &&
        message?.data?.formName === "Industry Question" &&
        typeof window.qualified !== "undefined"
      ) {
        window.qualified("showExperience", "experience-1697236073581", false)
        sendQualifiedToRudderStack()
      }

      if (
        message?.data?.Clicked === "Schedule meeting" &&
        message?.data?.formName === "Report Complete Landing Page" &&
        typeof window.qualified !== "undefined"
      ) {
        window.qualified("showExperience", "experience-1697235007159", false)
        sendQualifiedToRudderStack()
      }

      // form loaded
      if (message?.data?.formName === "Get Report Form") {
        const loadedEventData = {
          event: "Form Loaded",
          formId,
          formValueCountry: "Select One", // default on form load
          formSource: "Marketo",
          formRegion: "EN",
          formFailReason: "",
          formFailCode: "",
          isFormPrefilled: 0,
          isFormVisible: 1,
          isFormOverlay: 0,
        }
        eventTracking(loadedEventData)
      }

      // form validation failed
      if (message?.data?.formFailReason) {
        const failedEventData = {
          event: "Form Submit Failed",
          formId,
          formValueCountry: message?.data?.formValueCountry,
          formSource: "Marketo",
          formRegion: "EN",
          formFailReason: message?.data?.formFailReason,
          formFailCode: message?.data?.formFailCode,
          submitAction: "manual",
          isFormPrefilled: 0,
          isFormVisible: 1,
          isFormOverlay: 0,
        }
        eventTracking(failedEventData)
      }

      // form submit successful
      if (message?.data?.formName === "Report Complete Landing Page") {
        const successEventData = {
          event: "Form Submit Success",
          formId,
          formValueCountry: message?.data?.formValueCountry,
          formSource: "Marketo",
          formRegion: "EN",
          formFailReason: "",
          formFailCode: "",
          submitAction: "manual",
          isFormPrefilled: 0,
          isFormVisible: 1,
          isFormOverlay: 0,
        }
        eventTracking(successEventData)
      }
    }
    window.addEventListener("message", sendValueCalcEvents)

    function sendCookiesToIframe() {
      const cookieObject = {
        eventName: "vc-cookies",
        _db_utm_source__c: Cookies.get("_db_utm_source__c") || null,
        _db_utm_campaign__c: Cookies.get("_db_utm_campaign__c") || null,
        _db_utm_medium__c: Cookies.get("_db_utm_medium__c") || null,
        _db_utm_term__c: Cookies.get("_db_utm_term__c") || null,
        _db_utm_content__c: Cookies.get("_db_utm_content__c") || null,
        _db_utm_offer__c: Cookies.get("_db_utm_offer__c") || null,
        _db_utm_keyword__c: Cookies.get("_db_utm_keyword__c") || null,
        _db_utm_ad_group__c: Cookies.get("_db_utm_ad_group__c") || null,
        _db_utm_ad__c: Cookies.get("_db_utm_ad__c") || null,
        _db_gclid: Cookies.get("_db_gclid") || null,
        _db_scid: Cookies.get("_db_scid") || null,
        _dbw_itm_data: Cookies.get("_dbw_itm_data") || null,
        _dbw_referrer: Cookies.get("_dbw_referrer") || null,
      }
      iframe.contentWindow.postMessage(cookieObject, mediaFlySrc)
    }
    const iframe = document.getElementById("value_calc_iframe")
    iframe.addEventListener("load", sendCookiesToIframe)

    return function cleanupListener() {
      window.removeEventListener("message", sendValueCalcEvents)
      iframe.removeEventListener("load", sendCookiesToIframe)
    }
  }, [])

  return (
    <div className='inner-wrapper'>
      <iframe
        id='value_calc_iframe'
        height='1310'
        src={mediaFlySrc + "/Databricks/"}
        width='100%'
        title='How much value can Databricks bring to your business?'
      />
    </div>
  )
}
