/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState, useRef } from "react"
import { Script } from "gatsby"
import PropTypes from "prop-types"
import "./styles.css"
import Cookies from "js-cookie"
import getKnownLead from "gatsby-theme-databricks-drupal/src/helpers/mktoLead"
import { setCookie } from "gatsby-theme-databricks-drupal/src/helpers/cookie"
import RichText from "../../components/RichText"
import HtmlParser from "./transformInputs"
import SimpleDTO from "../../../../gatsby-theme-databricks-drupal/src/helpers/simpleDTO"
import {
  DBConsentStrings,
  showCheckboxCountries,
} from "../../../../gatsby-theme-databricks-drupal/src/helpers/marketoFormHelpers"
import { useLanguageContext } from "../../../../gatsby-theme-databricks-drupal/src/components/language-provider"
import eventTracking from "../../../../gatsby-theme-databricks-drupal/src/helpers/eventTracking"
import descriptionMove from "./descriptionMove"
import { variantMap } from "./variants"

const MarketoForm = ({
  formId,
  campaignId,
  munchkinId,
  title,
  cta,
  thankyou,
  useMarketoThankYouUrl,
  gated,
  disableAutoSubmit,
  disableFormPrefill,
  legalCopy,
  variant,
  formVariant,
  description,
  formClassName,
  onLoad,
  onSubmitSuccess,
  cookieName,
}) => {
  const [formIsLoaded, setFormIsLoaded] = useState(false)
  const [marketoFormId, setMarketoFormId] = useState(formId)
  const [formElement, setFormElement] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [knownLead, setKnownLead] = useState(false)
  const [isPrefill, setIsPrefill] = useState(false)
  const [prefillCount, setPrefillCount] = useState(0)
  const onSubmitRef = useRef(onSubmitSuccess)
  const { currentLanguage } = useLanguageContext()

  useEffect(() => {
    onSubmitRef.current = onSubmitSuccess
  }, [onSubmitSuccess])

  if (!marketoFormId) setMarketoFormId(1001)

  const onSelectAll = (e) => {
    const selectAllSelector = document.getElementById("Unsubscribed-react")
    if (selectAllSelector !== null) {
      if (e.target.id === "Unsubscribed-react" && selectAllSelector.checked) {
        const inputs = document.querySelectorAll("input[type='checkbox']")
        inputs.forEach((input) => {
          if (input.id.indexOf("Unsubscribed") && input.checked === true) {
            input.click()
          }
        })
      } else if (
        e.target.id !== "Unsubscribed-react" &&
        e.target.checked === true &&
        selectAllSelector.checked
      ) {
        selectAllSelector.click()
      }
    }
  }

  const changeCountry = (consentValue) => {
    // TODO: This code will be problematic on pages with more than 1 Marketo form
    const countrySelector = document.getElementById("Country")
    const mktoblankcheckbox3 = document.getElementById("mkto_form_consent-react")
    if (mktoblankcheckbox3?.classList?.contains("sr-only")) {
      mktoblankcheckbox3.tabIndex = -1
    }
    if (typeof countrySelector !== "undefined" && countrySelector) {
      const countryName = countrySelector.value
      const consentSelector = document.querySelector(
        'label[for="mkto_form_consent"]'
      )
      if (consentSelector) {
        if (showCheckboxCountries.includes(countryName)) {
          const checkboxText =
            DBConsentStrings[currentLanguage.id].show_checkbox_text
          consentSelector.dataset.hideInput = false
          consentSelector.innerHTML = checkboxText
          document.getElementById("mkto_form_consent").checked =
            consentValue === "yes" || false
        } else {
          const noCheckboxText =
            DBConsentStrings[currentLanguage.id].no_checkbox_text

          consentSelector.dataset.hideInput = true
          consentSelector.innerHTML = noCheckboxText

          document.getElementById("mkto_form_consent").checked = true
        }
      }
    }
  }
  useEffect(() => {
    if (isPrefill) {
      changeCountry()
    }
  }, [isPrefill])

  const submitForm = () => {
    window.MktoForms2.whenReady((form) => {
      setTimeout(() => {
        if (form.allFieldsFilled() && form.submittable() === true) {
          form.submit()
        }
      }, 2000)
    })
  }

  const prefillCountry = () => {
    window.MktoForms2.whenReady((form) => {
      const consentValue = form?.vals()?.mkto_form_consent
      const userLocation = Cookies.get("db_country")
      const formCountryValue = form.vals().Country

      if (typeof userLocation !== "undefined") {
        const knownLocation = JSON.parse(userLocation)

        if (knownLocation.country_name) {
          form.vals({ Country: formCountryValue || knownLocation.country_name })
        }
      }
      changeCountry(consentValue) // initialize for hardcoded marketo country field
    })
  }

  const prefillForm = () => {
    if (typeof window.MktoForms2 !== "undefined" && Cookies) {
      try {
        const DTO = SimpleDTO({
          domain: "databricks.com",
          dataSrc: "https://pages.databricks.com/knownUserFormPreFills.html",
          debug: false,
          mode: "receive",
          cb() {
            // Check if fields are available every 100ms
            const setFields = () => {
              if (!DTO.getGlobal()) {
                return
              }
              try {
                if (!DTO.getGlobal().mktoPreFillFields) {
                  setTimeout(setFields, 100)
                  return
                }
                db_debug("MarketoForm: mktoPreFillFields")
                const mktoFields = DTO.getGlobal().mktoPreFillFields
                window.MktoForms2.whenReady((form) => {
                  if (mktoFields.Country === "") {
                    delete mktoFields.Country
                  }
                  form.setValuesCoerced(mktoFields)
                  setIsPrefill(true)
                  DTO.cleanup()
                })
                submitForm()
              } catch (e) {
                console.log("Prefill data not loaded due to environment", e)
              }
            }
            setFields()
          },
        })
      } catch (error) {
        console.log(error)
      }
      // CF tracer
      // cloudflareTrace()
      prefillCountry()
    }
  }

  if (typeof OneTrust !== "undefined") {
    OneTrust.OnConsentChanged(() => {
      setPrefillCount(prefillCount + 1)
    })
  }
  useEffect(() => {
    prefillForm()
  }, [prefillCount])

  // Set Custom CTA
  // Hide form for known leads
  const alterForm = () => {
    if (typeof window.MktoForms2 !== "undefined") {
      if (window.MktoForms2) {
        window.MktoForms2.whenReady((form) => {
          prefillCountry()
          const formElem = form.getFormElem()
          if (formElem.find(".mktoTemplateBox").length) {
            setKnownLead(true)
          }
          formElem.find("button.mktoButton").html(cta)
          form.onSubmit(() => {
            // Set referrer to current page since react doesn't reload the page
            form.vals({ _mktoReferrer: window.location.href })
          })
          if (formElem.selector === "form#mktoForm_3717") {
            descriptionMove(formElem, [4, 13])
          }
          if (formElem.selector === "form#mktoForm_3707") {
            descriptionMove(formElem, [6, 13])
          }
        })
      }
    }
  }

  const createThankYouUrl = () => {
    // Query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search)

    // Check if any UTM parameters are present
    const hasUTMParams = Array.from(queryParams.keys()).some((key) =>
      key.startsWith("utm_")
    )

    if (hasUTMParams) {
      queryParams.forEach((value, key) => {
        if (key.startsWith("utm_")) {
          queryParams.delete(key)
        }
      })
    }
    // Update the URL without UTM parameters
    const endOfUrl = `${queryParams.toString()}${window.location.hash}`
    const updatedURL = `${
      window.location.pathname
    }/thank-you${endOfUrl ? `?${endOfUrl}`: ""}`

    return new URL(updatedURL, window.location.origin)
  }

  const checkMarketoScriptLoad = () => {
    if (!formIsLoaded && typeof window.MktoForms2 !== "undefined") {
      MktoForms2.loadForm(
        "//pages.databricks.com",
        munchkinId,
        marketoFormId,
        (form) => {
          const mktoElement = form.getFormElem()[0]
          mktoElement.style = {}
          mktoElement.classList.add("mktoFormVariant" + formVariant)
          const transformElement = HtmlParser(
            mktoElement,
            variantMap[variant]?.replaceAllFields
          )
          setFormElement(transformElement)
          setFormIsLoaded(true)

          if (document.getElementById("Country")) {
            document
              .getElementById("Country")
              .addEventListener("change", changeCountry)
          }
          // Moved this out of form.whenReady, to prevent multiple triggers per form load
          onLoad(form)
          const eventData = {
            event: "Form Loaded",
            formId,
            formValueCountry: form.vals().Country,
            formSource: "Marketo",
            formRegion: currentLanguage.id,
            formFailReason: "",
            formFailCode: "",
          }
          if (campaignId) {
            eventData.formSfdcCampaignId = campaignId
          }
          eventTracking(eventData)
          if (document.querySelectorAll("input[type='checkbox']")) {
            document.querySelectorAll("input[type='checkbox']").forEach((elem) => {
              elem.addEventListener("change", onSelectAll)
            })
            // document
            //   .querySelectorAll("input[type='checkbox']")
            //   .addEventListener("change", onSelectAll)
          }
          // Handle Promo Code field by element ID for now
          if (
            form.getId() === 6271 &&
            document.getElementById("programmemberstring1")
          ) {
            const offerElement = document.querySelector("#programmemberstring1")
            offerElement.addEventListener("change", () => {
              offerElement.dataset.dbvalid = false
            })
            form.onValidate(() => {
              form.submittable(true)
              let validationErrorEncountered = false

              // check code against API and allow submit if success
              // skip validation check if dbvalid is already passed
              if (
                document.querySelector("#programmemberstring1").dbvalid !== true &&
                document.getElementById("programmemberstring1").value &&
                document.getElementById("Email").value
              ) {
                const xmlhttprequest = new XMLHttpRequest() // new HttpRequest instance
                xmlhttprequest.open(
                  "POST",
                  `${process.env.GATSBY_DRUPAL_URL}/dbapi/form/offercode/check`,
                  false
                )
                xmlhttprequest.setRequestHeader(
                  "Content-Type",
                  "application/json;charset=UTF-8"
                )
                xmlhttprequest.send(
                  JSON.stringify({
                    key: "awsreinvent2022",
                    code: document.getElementById("programmemberstring1").value,
                    email: document.getElementById("Email").value,
                  })
                )

                if (xmlhttprequest.status === 200) {
                  try {
                    const data = JSON.parse(xmlhttprequest.responseText)
                    if (data.success === "1") {
                      offerElement.dataset.dbvalid = true
                    } else {
                      validationErrorEncountered = true
                      if (data.used === "1") {
                        form.showErrorMessage(
                          "Promo code has already been used",
                          form.getFormElem().find("#programmemberstring1")
                        )
                      } else {
                        form.showErrorMessage(
                          "Promo code is not valid",
                          form.getFormElem().find("#programmemberstring1")
                        )
                      }
                      form.submittable(false)
                    }
                  } catch (e) {
                    console.error(e)
                  }
                }
              }

              // validate account ID length
              if (
                !validationErrorEncountered &&
                document.getElementById("programmemberstring2")
              ) {
                if (
                  document.getElementById("programmemberstring2").value.length !== 36
                ) {
                  form.showErrorMessage(
                    "Invalid Account ID length. Should be 36 characters long.",
                    form.getFormElem().find("#programmemberstring2")
                  )
                  validationErrorEncountered = true
                  form.submittable(false)
                }
              }
            })
            form.onSuccess(() => {
              const xmlhttprequest = new XMLHttpRequest() // new HttpRequest instance
              xmlhttprequest.open(
                "POST",
                `${process.env.GATSBY_DRUPAL_URL}/dbapi/form/offercode/check`
              )
              xmlhttprequest.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
              )
              xmlhttprequest.send(
                JSON.stringify({
                  key: "awsreinvent2022",
                  code: document.getElementById("programmemberstring1").value,
                  email: document.getElementById("Email").value,
                  markused: "yes",
                })
              )
              return true
            })
          }
          if (form.getId() === 4648) {
            form.onValidate(function () {
              form.submittable(true)
              let validationErrorEncountered = false

              if (
                !validationErrorEncountered &&
                document.getElementById("mktoblankcheckbox11")
              ) {
                const checkboxEl = document.getElementById("mktoblankcheckbox11")
                const parentCheckbox = checkboxEl.closest(".mktoFormRow")
                if (
                  checkboxEl.checked !== true &&
                  document.getElementsByClassName("checkbox4648error").length === 0
                ) {
                  parentCheckbox.insertAdjacentHTML(
                    "afterend",
                    "<div id='checkbox4648Id' class='mktoFormRow checkbox4648error'<label style='color: #ff3621 !important; font-size:10px;'>* Please Accept Terms & Conditions</label></div>"
                  )
                  validationErrorEncountered = true
                  form.submittable(false)
                }
              }
            })
          }
          form.onValidate(() => {
            const errorMessage =
              document.getElementsByClassName("mktoErrorMsg").length > 0
            if (errorMessage) {
              const isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
              )
              if (isSafari && document?.activeElement) {
                const element = document.activeElement
                const y = element.getBoundingClientRect().top + window.scrollY - 200
                window.scrollTo({ top: y, behavior: "smooth" })
              }
            }
            const timer = setInterval(() => {
              const currentError = document.getElementsByClassName("mktoErrorMsg")[0]
              if (document.getElementsByClassName("mktoErrorMsg").length > 0) {
                const eventData = {
                  event: "Form Submit Failed",
                  formId,
                  formSource: "Marketo",
                  formValueCountry: document.getElementById("Country")?.value,
                  formRegion: currentLanguage.id,
                  formFailReason: `${currentError?.id?.replace(
                    "ValidMsg",
                    ""
                  )} is invalid`,
                  formFailCode: "400",
                }
                if (campaignId) {
                  eventData.formSfdcCampaignId = campaignId
                }
                clearInterval(timer)
                eventTracking(eventData)
              }
            }, 200)
          })
          form.onSuccess((values, followUpUrl) => {
            const onSuccess = async () => {
              if (cookieName) {
                setCookie(cookieName, true, 14)
              }
              const eventData = {
                event: "Form Submit Success",
                formId,
                formValueCountry: values.Country,
                formSource: "Marketo",
                formRegion: currentLanguage.id,
                formFailReason: "",
                formFailCode: "",
                submitAction: "manual",
              }
              if (campaignId) {
                eventData.formSfdcCampaignId = campaignId
              }
              eventTracking(eventData)
              onSubmitRef.current()
              if (Cookies) {
                Cookies.set("db_known_user", 1, 2) // 2 days cookie
              }
              // TODO: add mkto_lead_id trait to identify event. Consider using mkto API for the matter (new envs needed)
              // Test form.addHiddenFields()
              if (useMarketoThankYouUrl === true) {
                if (followUpUrl) {
                  window.location = followUpUrl
                  return false
                }
              }

              const thankYouUrl = createThankYouUrl()

              // Refresh db_mkto_lead if the user has changed their consent preferences
              // or if they were not a known lead
              const leadObj = await getKnownLead()
              const userConsent = values.mkto_form_consent === "yes"

              if (
                leadObj &&
                !leadObj.newCookie &&
                (!leadObj.known || userConsent !== leadObj.subscribed)
              ) {
                const existingCookie = Cookies.get("db_mkto_lead")
                const newObj = {
                  known: true,
                  subscribed: userConsent,
                  identified: existingCookie?.identified,
                }
                // Sets the cookie with the current values. A 5 minute expiry time is set to
                // force the cookie to be refreshed with data from Marketo's API
                setCookie("db_mkto_lead", JSON.stringify(newObj), 0, 5)
              }

              // Get the form's jQuery element and hide it
              if (thankyou) {
                window.location = thankyou
                return false
              }

              if (thankYouUrl) {
                window.location = thankYouUrl
                return false
              }

              setTimeout(() => {
                setSubmitted(true)
              }, 2000)
            }
            onSuccess()
            // Return false to prevent the submission handler from taking the lead to the follow up url
            return false
          })
        }
      )

      window.MktoForms2.whenReady((form) => {
        if (campaignId) {
          form.addHiddenFields({ mkto_sfdc_campaign_id: campaignId })
        }

        alterForm()
        if (disableAutoSubmit === true) {
          changeCountry()
        }
        if (disableFormPrefill !== true) {
          prefillForm()
        }

        if (form.getId() === 3717) {
          // Logic to ensure no optins are checked if unsubscribe from all is checked
          const formEl = form.getFormElem()[0]
          const optInList = [
            "Subscription_TrainingCertification__c-react",
            "Company_Blog_Opt_In__c-react",
            "SubscriptionNewsletter__c-react",
            "SubscriptionProductUpdates__c-react",
            "Subscription_EventsEducation__c-react",
            "Subscription_FeedbackSurveys__c-react",
            "Engineering_Blog_Opt_In__c-react",
          ]

          formEl.addEventListener("change", (e) => {
            if (e.target.id === "Unsubscribed-react") {
              optInList.forEach((item) => {
                const el = document.getElementById(item)
                if (el?.checked) {
                  el.click()
                }
              })
            }
            if (optInList.includes(e.target.id)) {
              const el = document.getElementById("Unsubscribed-react")
              if (el?.checked) {
                el.click()
              }
            }
          })

          form.onValidate(() => {
            form.submittable(false)
            const formValues = form.vals()
            if (
              formValues.Unsubscribed === "no" &&
              formValues.Subscription_TrainingCertification__c === "no" &&
              formValues.Company_Blog_Opt_In__c === "no" &&
              formValues.SubscriptionNewsletter__c === "no" &&
              formValues.SubscriptionProductUpdates__c === "no" &&
              formValues.Subscription_EventsEducation__c === "no" &&
              formValues.Subscription_FeedbackSurveys__c === "no" &&
              formValues.Engineering_Blog_Opt_In__c === "no"
            ) {
              const firstCheckBox = form
                .getFormElem()
                .find(".mktoButtonRow")
                .parent()
              form.showErrorMessage(
                "At least one of the checkboxes have to be checked",
                firstCheckBox
              )
            } else {
              form.submittable(true)
            }
          })
        }
      })
    } else {
      window.setTimeout(() => {
        checkMarketoScriptLoad()
      }, 20)
    }
  }

  useEffect(() => {
    document
      .querySelector('meta[name="viewport"]')
      .setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit"
      )

    if (typeof gated === "undefined" || gated === true) {
      if (!formIsLoaded) {
        checkMarketoScriptLoad()
      }
    } else {
      window.location.href = `${window.location.pathname}/thank-you${window.location.search}`
    }
  }, [])

  // Blog signup hides the form for known users so hide the form
  if (knownLead) {
    return <></>
  }

  return (
    <>
      {description && (
        <RichText className='rich-text-body mb-8'>{description}</RichText>
      )}
      {!formIsLoaded && <div className={variantMap[variant]?.placeholderStyles} />}
      <div
        className={`${variantMap[variant]?.wrapperStyle} ${
          !formIsLoaded ? "hidden" : ""
        }`}
      >
        <div>
          {title && <h2 className={variantMap[variant]?.titleStyle}>{title}</h2>}
          {formElement}
        </div>
        {submitted && (
          <p className='b4'>
            <strong>Thank you for signing up!</strong>
            <br />
            Our latest blogs will come directly to your inbox.
          </p>
        )}
        {!submitted && (
          <>
            <form
              id={`mktoForm_${marketoFormId}`}
              className={`b4 marketoCustom ${variantMap[variant]?.form} ${formClassName}`}
            />

            {formIsLoaded && legalCopy && (
              <RichText
                className={
                  variantMap[variant]?.legalStyles ||
                  "rich-text-body b6 text-navy-06 my-3 w-full opacity-70"
                }
              >
                {legalCopy}
              </RichText>
            )}
          </>
        )}
        <div id='dto-container' />
      </div>
      <Script
        data-ot-ignore='1'
        src='//pages.databricks.com/js/forms2/js/forms2.min.js'
        type='text/javascript'
      />
    </>
  )
}

MarketoForm.propTypes = {
  cta: PropTypes.string,
  disableAutoSubmit: PropTypes.bool,
  formId: PropTypes.string,
  campaignId: PropTypes.string,
  description: PropTypes.string,
  cookieName: PropTypes.string,
  gated: PropTypes.bool,
  legalCopy: PropTypes.string,
  useMarketoThankYouUrl: PropTypes.bool,
  munchkinId: PropTypes.string,
  thankyou: PropTypes.string,
  title: PropTypes.string,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "companyContact",
    "mktoSubscription",
    "wt",
  ]),
  formVariant: PropTypes.string,
  disableFormPrefill: PropTypes.bool,
  formClassName: PropTypes.string,
  onLoad: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
}

MarketoForm.defaultProps = {
  formId: "1001",
  campaignId: "",
  cta: "Submit",
  thankyou: "",
  legalCopy: "",
  description: "",
  cookieName: "",
  munchkinId: "094-YMS-629",
  title: "Sign up",
  variant: "secondary",
  formVariant: "",
  gated: true,
  useMarketoThankYouUrl: false,
  disableAutoSubmit: false,
  disableFormPrefill: false,
  onLoad: () => {},
  onSubmitSuccess: () => {},
  formClassName: "",
}

export default MarketoForm
