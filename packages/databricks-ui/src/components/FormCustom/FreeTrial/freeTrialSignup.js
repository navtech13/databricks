import Cookies from "js-cookie"
import { UISchema } from "../../../../../databricks-ui/src/components/FormCustom/FreeTrial/schemas"
import getValidationMethod from "../../../../../gatsby-theme-databricks-drupal/src/utils/get-validation-method"
import storeFormSubmit from "../../../../../gatsby-theme-databricks-drupal/src/utils/store-form-submit"

if (typeof window !== "undefined") {
  window.Cookies = Cookies
}

const firstTouchSourceMap = {
  AWS: "Clicked Aws",
  AZURE: "Clicked Azure",
  GCP: "Clicked Google",
  CE: "Clicked CE",
}
const workspaceTypeMap = {
  AWS: "STANDARD",
  AZURE: "STANDARD",
  GCP: "ENTERPRISE",
  CE: "CE",
}
const subscriptionTypeMap = {
  AWS: "PAY_AS_YOU_GO",
  AZURE: "PAY_AS_YOU_GO",
  GCP: "INVOICE",
  CE: "COMMUNITY_EDITION",
}
const environment = `${process.env.GATSBY_TRIAL_SIGNUP_ENDPOINT_VERCEL}`
const VALIDATE = "validate"
const CREATE = "create"

const validationMethod = getValidationMethod()

const freeTrialSignup = async (values, action) => {
  let dbCountry = {}
  let mktTrk
  let itmData
  let utmSource
  let utmMedium
  let utmCampaign
  let utmOffer
  let utmContent
  let utmKeyword
  let utmAd
  let utmTerm
  let utmAdgroup
  let gclId
  let scId

  if (action) {
    try {
      dbCountry = Cookies.get("db_country") && JSON.parse(Cookies.get("db_country"))
      mktTrk = Cookies.get("_mkto_trk")
      itmData = Cookies.get("_dbw_itm_data")
      utmSource = Cookies.get("_db_utm_source__c")
      utmMedium = Cookies.get("_db_utm_medium__c")
      utmCampaign = Cookies.get("_db_utm_campaign__c")
      utmOffer = Cookies.get("_db_utm_offer__c")
      utmContent = Cookies.get("_db_utm_content__c")
      utmKeyword = Cookies.get("_db_utm_keyword__c")
      utmAd = Cookies.get("_db_utm_ad__c")
      utmTerm = Cookies.get("_db_utm_term__c")
      utmAdgroup = Cookies.get("_db_utm_adgroup__c")
      gclId = Cookies.get("_db_gclid")
      scId = Cookies.get("_db_scid")
    } catch (e) {
      console.log("Error reading cookiee", e)
    }
  }

  const actions = {
    [VALIDATE]: {
      endpoint: process.env.GATSBY_TRIAL_SIGNUP_ENDPOINT_VALIDATE_PATH
        ? `${environment}${process.env.GATSBY_TRIAL_SIGNUP_ENDPOINT_VALIDATE_PATH}`
        : `${environment}/dbapi/trial/validate`,
      body: JSON.stringify({
        first_name: values.firstName,
        last_name: values.lastName,
        company: values.company,
        title: values.title,
        ...(values.phone && { phone: values.phone }),
        email: values.email,
        country: values.country,
        mkto_form_consent: values.marketingOptOut !== "",
        First_Touch_Source__c: firstTouchSourceMap[values.cloud.toUpperCase()],
        request_URI: window.location.pathname,
        geo_country_code: dbCountry?.country_code || "",
        geo_country_ip: dbCountry?.IP || "",
        six_sense: values.six_sense,
        thank_you_url: "",
        mkt_trk: mktTrk,
        validation_method: validationMethod,
        itm: itmData,
        UTM_Source__c: utmSource,
        UTM_Medium__c: utmMedium,
        UTM_Campaign__c: utmCampaign,
        UTM_Offer__c: utmOffer,
        UTM_Content__c: utmContent,
        UTM_Keyword__c: utmKeyword,
        UTM_Ad__c: utmAd,
        UTM_Term__c: utmTerm,
        UTM_Ad_Group__c: utmAdgroup,
        sCID: scId,
        GCLID__c: gclId,
      }),
    },
    [CREATE]: {
      endpoint: process.env.GATSBY_TRIAL_SIGNUP_ENDPOINT_CREATE_PATH
        ? `${environment}${process.env.GATSBY_TRIAL_SIGNUP_ENDPOINT_CREATE_PATH}`
        : `${environment}/dbapi/trial/create`,
      body: JSON.stringify({
        first_name: values.firstName,
        last_name: values.lastName,
        company: values.company,
        title: values.title,
        ...(values.phone && { phone: values.phone }),
        email: values.email,
        country: values.country,
        mkto_form_consent: values.marketingOptOut !== "",
        First_Touch_Source__c: firstTouchSourceMap[values.cloud.toUpperCase()],
        cloud: values.cloud,
        trialType: values.cloud,
        workspace_type: workspaceTypeMap[values.cloud?.toUpperCase()],
        subscription_type: subscriptionTypeMap[values.cloud?.toUpperCase()],
        ...(values.arkose_token_response && {
          arkose_session_token: values.arkose_token_response,
        }),
        ...(values.recaptcha_token && {
          recaptcha_token: values.recaptcha_token,
        }),
        ...(values.recaptcha_token && {
          recaptcha_token: values.recaptcha_token,
        }),
        ...(values.validate_type && {
          validation_method: values.validate_type || "arkose",
        }),
        request_URI: window.location.pathname,
        geo_country_code: dbCountry?.country_code || "",
        geo_country_ip: dbCountry?.IP || "",
        six_sense: values.six_sense,
        thank_you_url: values.customRedirect || UISchema.redirects[values.cloud],
        mkt_trk: mktTrk,
        itm: itmData,
        UTM_Source__c: utmSource,
        UTM_Medium__c: utmMedium,
        UTM_Campaign__c: utmCampaign,
        UTM_Offer__c: utmOffer,
        UTM_Content__c: utmContent,
        UTM_Keyword__c: utmKeyword,
        UTM_Ad__c: utmAd,
        UTM_Term__c: utmTerm,
        UTM_Ad_Group__c: utmAdgroup,
        sCID: scId,
        GCLID__c: gclId,
      }),
    },
  }

  const headersInitObj = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }

  if (process.env.GATSBY_TRIAL_SIGNUP_ENDPOINT_AUTH_TOKEN) {
    headersInitObj.Authorization = `Basic ${process.env.GATSBY_TRIAL_SIGNUP_ENDPOINT_AUTH_TOKEN}`
  }

  const response = await fetch(`${actions[action].endpoint}`, {
    method: "post",
    headers: new Headers(headersInitObj),
    processData: false,
    body: actions[action].body,
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error)
      return { error }
    })
  if (
    response.status === true ||
    response.status === 200 ||
    response.status === "Created"
  ) {
    storeFormSubmit(action, values.cloud)
    return {
      ...response,
      success: true,
    }
  }
  return {
    ...response,
    success: false,
  }
}

freeTrialSignup.VALIDATE = VALIDATE
freeTrialSignup.CREATE = CREATE

export default freeTrialSignup
