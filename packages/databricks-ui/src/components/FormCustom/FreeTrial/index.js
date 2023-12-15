import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
// eslint-disable-next-line import/no-unresolved
import Form from "@rjsf/core"
import ObjectFieldTemplate from "../customWidgets/ObjectFieldTemplate"
import FieldTemplate from "../customWidgets/FieldTemplate"
import HiddenWidget from "../customWidgets/HiddenWidget"
import TextWidget from "../customWidgets/TextWidget"
import RadioCardWidget from "../customWidgets/RadioCardWidget"
import SelectWidget from "../customWidgets/SelectWidget"
import CheckboxWidget from "../customWidgets/CheckboxWidget"
import BinarySelectorWidget from "../customWidgets/BinarySelectorWidget"
import Button from "../../Button"
import CommunityEdition from "./CommunityEdition"
import LegalDisclaimer from "./LegalDisclaimer"
import freeTrialSignup from "./freeTrialSignup"
import RichText from "../../RichText"
import cloudflareTrace from "../../../../../gatsby-theme-databricks-drupal/src/helpers/cloudflareTrace"
import SimpleDTO from "../../../../../gatsby-theme-databricks-drupal/src/helpers/simpleDTO"
import eventTracking from "../../../../../gatsby-theme-databricks-drupal/src/helpers/eventTracking"
import { useLanguageContext } from "../../../../../gatsby-theme-databricks-drupal/src/components/language-provider"

const cloudMap = {
  aws: "AWS",
  azure: "AZURE",
  gcloud: "GCP",
}

const FreeTrial = ({
  Schema,
  UISchema,
  ctaLabel,
  redirectUrl,
  cloudType,
  ErrorSchema,
  className,
  title,
  buttonVariant,
  disableHash,
}) => {
  const [step, setStep] = useState(1)
  const [values, setValues] = useState({ cloud: "AWS" })
  const [loading, setLoading] = useState(false)
  const [formerror, setError] = useState(false)
  const [lastCloudType, setLastCloudType] = useState("AWS")
  const [formSchema, setFormSchema] = useState(Schema)
  const { currentLanguage } = useLanguageContext()
  const [prefillCount, setPrefillCount] = useState(0)

  const onSubmit = async () => {
    let response = false
    setError(false)

    if (cloudType === "awspaygo" && values.awsPayment === "AWS") {
      window.location = UISchema.redirects.AWSPAYGO
      return
    }

    if (cloudType !== "default" && cloudType !== "awspaygo") {
      setLoading(true)
      setLastCloudType(cloudMap[values.cloud])
      response = await freeTrialSignup(
        { ...values, cloud: cloudMap[values.cloud], customRedirect: redirectUrl },
        freeTrialSignup.CREATE
      )
    } else {
      if (step === 1) {
        setLoading(true)
        // Send Submitted step 1 event to GTM
        let eventData = {
          event: "Form Submit Success",
          formId: "Trial Form Step 1",
          formSource: "Custom Form",
          formValueCountry: values.country,
          formRegion: currentLanguage.id,
        }
        eventTracking(eventData)
        eventData = {
          event: "Form Loaded",
          formId: "Trial Form Step 2",
          formSource: "Custom Form",
          formValueCountry: values.country,
          formRegion: currentLanguage.id,
          formFailReason: "",
          formFailCode: "",
        }
        eventTracking(eventData)
        response = await freeTrialSignup(values, freeTrialSignup.VALIDATE)
      }

      if (step === 2 || step === 3) {
        setLoading(true)
        setLastCloudType(values.cloud)
        response = await freeTrialSignup(
          { ...values, customRedirect: redirectUrl },
          freeTrialSignup.CREATE
        )
      }
    }

    if (!response.success && response?.status === 409) {
      setLoading(false)
      setStep(1)
      let eventData = {
        event: "Form Submit Failed",
        formId: "Trial Form Step 2",
        formSource: "Custom Form",
        formValueCountry: values.country,
        formRegion: currentLanguage.id,
        formFailReason: "Account already exists",
        formFailCode: "409",
      }
      eventTracking(eventData)
      eventData = {
        event: "Form Loaded",
        formId: "Trial Form Step 1",
        formSource: "Custom Form",
        formValueCountry: values.country,
        formRegion: currentLanguage.id,
        formFailReason: "",
        formFailCode: "",
      }
      eventTracking(eventData)
      setError("email")
      return
    }

    if (!response.success) {
      setLoading(false)
      const eventData = {
        event: "Form Submit Failed",
        formId: "Trial Form Step 2",
        formSource: "Custom Form",
        formValueCountry: values.country,
        formRegion: currentLanguage.id,
        formFailReason: response?.errors ? response?.errors : "Unknown Error",
        formFailCode: "500",
      }
      eventTracking(eventData)
      setError("unknown")
      return
    }

    setError(false)
    if (step === 1 && cloudType === "awspaygo") {
      setLoading(false)
      window.db_arkoseDE_ID = response.arkoseDE_ID
      if (!disableHash) {
        window.location.hash = Schema.properties[`step${step + 2}`].slug
      }
      setStep(step + 2)
      return
    }

    if (step === 1 && cloudType === "default") {
      setLoading(false)
      window.db_arkoseDE_ID = response.arkoseDE_ID

      if (!disableHash) {
        window.location.hash = Schema.properties[`step${step + 1}`].slug
      }
      setStep(step + 1)
      return
    }

    const eventData = {
      event: "Form Submit Success",
      formId: "Trial Form Step 2",
      formSource: "Custom Form",
      formValueCountry: values.country,
      formValueCloud: values.cloud,
      formRegion: currentLanguage.id,
      formFailReason: "",
      formFailCode: "",
    }
    eventTracking(eventData)

    window.location =
      redirectUrl ||
      UISchema.redirects[values.cloud.toUpperCase()] ||
      UISchema.redirects[cloudMap[values?.cloud]]
  }

  const onChange = ({ formData }) => {
    setValues({ ...values, ...formData })
  }

  if (typeof OneTrust !== "undefined") {
    OneTrust.OnConsentChanged(() => {
      setPrefillCount(prefillCount + 1)
    })
  }

  useEffect(() => {
    // set hash to first step's slug
    if (!disableHash) {
      window.location.hash = Schema.properties.step1.slug
    }

    const eventData = {
      event: "Form Loaded",
      formId: `Trial Form Step ${step}`,
      formSource: "Custom Form",
      formValueCountry: values.country,
      formRegion: currentLanguage.id,
      formFailReason: "",
      formFailCode: "",
    }
    eventTracking(eventData)

    // add a hashchange listener to update the step
    if (!disableHash) {
      window.addEventListener("hashchange", () => {
        const { hash } = window.location
        const newStep = Object.keys(Schema.properties).find(
          (key) => Schema.properties[key].slug === hash
        )
        if (newStep) {
          setStep(parseInt(newStep.replace("step", ""), 10))
        }
      })
    }

    if (title) {
      formSchema.properties.step1.title = title
    }

    // If cloud type is PAYGO, change the second step
    if (cloudType === "awspaygo") {
      const defaultCloud = { cloud: "AWS" }
      setValues({ ...values, ...defaultCloud })
    }

    // Change cloudtype and remove step 2
    if (cloudType !== "default" && cloudType !== "awspaygo") {
      const defaultCloud = { cloud: cloudType }
      setValues({ ...values, ...defaultCloud })
      formSchema.properties.step1.nextStep = 0
      delete formSchema.properties.step2
      setFormSchema(formSchema)
    }
    return () => {
      if (!disableHash) {
        window.removeEventListener("hashchange", () => {})
      }
    }
  }, [])
  useEffect(() => {
    // add a mutation observer to 6sense input
    if (step !== 1) {
      return
    }
    const element = document.getElementById("free-trial-form_six_sense")
    if (!element) {
      return
    }
    const setCountryData = async () => {
      const countryData = await cloudflareTrace()
      try {
        const prefillURL = process.env.PREFILL_URL
          ? process.env.PREFILL_URL
          : "https://pages.databricks.com/knownUserFormPreFills.html"
        const DTO = SimpleDTO({
          domain: "databricks.com",
          dataSrc: prefillURL,
          debug: false,
          mode: "receive",
          cb() {
            const setFields = () => {
              if (!DTO.getGlobal()) {
                return
              }
              // Wrap prefill in try catch to avoid JS errors on non-databricks.com environments
              try {
                if (!DTO.getGlobal().mktoPreFillFields) {
                  setTimeout(setFields, 100)
                  return
                }
                db_debug("Trial: mktoPreFillFields")
                const mktoFields = DTO.getGlobal().mktoPreFillFields || {}
                const newFormValues = {}
                const prefillFields = {
                  FirstName: "firstName",
                  LastName: "lastName",
                  Company: "company",
                  Email: "email",
                  Phone: "phone",
                  Title: "title",
                }
                prefillFields?.forEach((key) => {
                  if (key in mktoFields && mktoFields[key]) {
                    newFormValues[prefillFields[key]] = mktoFields[key]
                  }
                })
                if (!mktoFields.Country || mktoFields.Country === "") {
                  newFormValues.Country = countryData.countryName
                } else {
                  newFormValues.Country = mktoFields.Country
                }
                setValues((previous) => ({
                  ...previous,
                  ...newFormValues,
                }))
                DTO.cleanup()
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
      setValues((previous) => ({
        ...previous,
        six_sense: element.value,
        country: countryData.countryName,
      }))
    }
    setCountryData()
    const observer = new MutationObserver(() => {
      // set the value from the hidden input
      setValues((previous) => ({
        ...previous,
        six_sense: element.value,
      }))
    })
    observer.observe(element, { attributes: true })
    // eslint-disable-next-line consistent-return
    return () => {
      observer.disconnect()
    }
  }, [step, prefillCount])

  useEffect(() => {
    setTimeout(() => {
      const formCheckbox = document.getElementById("free-trial-form_marketingOptIn")
      if (formCheckbox?.classList?.contains("sr-only")) {
        formCheckbox.tabIndex = -1
      }
    }, 1500)
  }, [])

  useEffect(() => {
    // add a function to the window object 'db_freetrial' to
    // allow the values to be updated from the outside
    window.db_freetrial = (property, value) => {
      setValues((previous) => ({ ...previous, [property]: value }))
      if (value === "CE") {
        setTimeout(() => {
          document.getElementById("submit").click()
        }, 1500)
      }
    }
  }, [])

  const transformErrors = (errors) => {
    // Submit error data to GTM
    if (errors.length) {
      const errorString = errors.map((error) => {
        const propertyName = error?.property.replace(".", "")
        const errorMessage = error?.message
        return `${propertyName}: This field ${errorMessage}`
      })
      const eventData = {
        event: "Form Submit Failed",
        formId: `Trial Form Step ${step}`,
        formSource: "Custom Form",
        formValueCountry: values.country,
        formRegion: currentLanguage.id,
        formFailReason: errorString.join(" || "),
        formFailCode: "400",
      }
      eventTracking(eventData)
    }
    return errors.map((error) => {
      const { name } = error
      const property = error.property.replace(".", "")

      let { message } = error

      if (ErrorSchema.general[name]) {
        message = ErrorSchema.general[name]
      }

      if (ErrorSchema.fields[property]?.[name]) {
        message = ErrorSchema.fields[property][name]
      }
      return { ...error, message }
    })
  }

  const errorText =
    formerror === "email"
      ? ErrorSchema.general.emailError
      : ErrorSchema.general.error

  // replace link if Community Edition was selected
  if (lastCloudType === "CE" && errorText[0]) {
    errorText[0] = errorText[0].replace(
      "//accounts.cloud.databricks.com/registration",
      "//community.cloud.databricks.com/login.html"
    )
  } else {
    errorText[0] = errorText[0].replace(
      "//community.cloud.databricks.com/login.html",
      "//accounts.cloud.databricks.com/registration"
    )
  }

  return (
    <div className={`shadow-card-normal bg-white p-2.5 ${className}`}>
      <div id='free-trial-anchor' className='invisible -translate-y-8' />
      <Form
        id='free-trial'
        idPrefix='free-trial-form'
        className='rjsf free-trial-form'
        onSubmit={onSubmit}
        showErrorList={false}
        widgets={{
          TextWidget,
          EmailWidget: TextWidget,
          SelectWidget,
          CheckboxWidget,
          imageRadio: RadioCardWidget,
          hidden: HiddenWidget,
          BinarySelectorWidget,
        }}
        schema={formSchema.properties[`step${step}`]}
        uiSchema={UISchema[`step${step}`]}
        formData={values}
        noHtml5Validate
        onChange={onChange}
        ObjectFieldTemplate={ObjectFieldTemplate}
        FieldTemplate={FieldTemplate}
        transformErrors={transformErrors}
      >
        <div className='px-0.5'>
          <Button
            id='submit'
            as='button'
            type='submit'
            disabled={loading}
            variant={buttonVariant}
            className={`mt-2 w-full text-center ${loading ? "cursor-wait" : ""}`}
          >
            {loading
              ? ErrorSchema.general.loading
              : ctaLabel || Schema.properties[`step${step}`].submitText}
          </Button>
        </div>
        {formerror && (
          <RichText
            className='text-orange-05 b6 mt-2 text-center'
            dangerouslySetInnerHTML={{ __html: errorText }}
          />
        )}
        {(step === 2 || step === 3) && <LegalDisclaimer provider={values.cloud} />}
      </Form>
      {step === 2 && <CommunityEdition />}
    </div>
  )
}

FreeTrial.propTypes = {
  ErrorSchema: PropTypes.shape({
    fields: PropTypes.shape({}),
    general: PropTypes.shape({
      emailError: PropTypes.string,
      error: PropTypes.string,
      loading: PropTypes.string,
    }),
  }).isRequired,
  Schema: PropTypes.shape({
    properties: PropTypes.shape({
      step1: PropTypes.shape({
        slug: PropTypes.string,
      }),
    }),
  }).isRequired,
  UISchema: PropTypes.shape({
    properties: PropTypes.shape({}),
    redirects: PropTypes.shape({}),
  }).isRequired,
  className: PropTypes.string,
  ctaLabel: PropTypes.string,
  cloudType: PropTypes.string,
  redirectUrl: PropTypes.string,
  title: PropTypes.string,
  buttonVariant: PropTypes.string,
  disableHash: PropTypes.bool,
  redirectUrl: PropTypes.string,
}

FreeTrial.defaultProps = {
  className: "",
  ctaLabel: "",
  buttonVariant: "primary",
  cloudType: "",
  redirectUrl: "",
  title: "",
  disableHash: false,
  redirectUrl: "",
}

export default FreeTrial
