import countries from "../countries"
import optinCountries from "../optincountries"
import CardImage from "../../../../static/images/card-icon.svg"
import AwsPayImage from "../../../../static/images/aws-icon.svg"
import AwsImage from "../../../../static/images/logo-color-aws-icon.svg"
import GcpImage from "../../../../static/images/logo-color-google-cloud-icon.svg"
import AzureImage from "../../../../static/images/logo-color-microsoft-azure-icon.svg"
import { DBConsentStrings } from "../../../../../gatsby-theme-databricks-drupal/src/helpers/marketoFormHelpers"
import useTranslate from "../../../../../gatsby-theme-databricks-drupal/src/utils/translate"
import { useLanguageContext } from "../../../../../gatsby-theme-databricks-drupal/src/components/language-provider"

const noOptinCountries = countries.filter((n) => !optinCountries.includes(n))

const getSchema = (hasOptionalFields) => {
  const { translate } = useTranslate()
  const { currentLanguage } = useLanguageContext()
  const firstName = {
    id: "firstName",
    name: "FirstName",
    type: "string",
    title: translate("form.first-name")[0],
  }
  const lastName = {
    id: "lastName",
    name: "LastName",
    type: "string",
    title: translate("form.last-name")[0],
  }
  let fullName = {
    firstName,
    lastName,
  }
  if (currentLanguage.id === "JA") {
    fullName = {
      lastName,
      firstName,
    }
  }

  const Schema = {
    id: "free-trial-form",
    type: "object",
    properties: {
      step1: {
        id: "free-trial-form-step1",
        type: "object",
        title: translate("form.form-title"),
        step: 1,
        nextStep: 2,
        slug: "#account",
        required: hasOptionalFields
          ? ["firstName", "lastName", "email", "company", "title", "country"]
          : [
              "firstName",
              "lastName",
              "email",
              "company",
              "title",
              "country",
              "phone",
            ],
        submitText: translate("form.submit-text"),
        properties: {
          ...fullName,
          email: {
            id: "email",
            name: "Email",
            type: "string",
            format: "email",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
            title: translate("form.company-email")[0],
          },
          company: {
            id: "company",
            name: "Company",
            type: "string",
            title: translate("form.company")[0],
          },
          title: {
            id: "title",
            name: "Title",
            type: "string",
            title: translate("form.title")[0],
          },
          phone: {
            id: "phone",
            name: "Phone",
            type: "string",
            format: "tel",
            pattern: "^\\+?[0-9]{0,3}[-]?\\(?\\d{1,4}\\)?[-]?\\d{2,4}[-]?\\d{4}$",
            title: hasOptionalFields
              ? translate("form.phone-optional")[0]
              : translate("form.phone-input")[0],
          },
          country: {
            id: "country",
            name: "Country",
            type: "string",
            title: translate("form.country")[0],
            placeholder: translate("form.select")[0].replace("...", ""),
            enum: countries,
          },
          request_URI: {
            id: "request_URI",
            name: "Request_URI",
            type: "string",
            title: "Request_URI",
          },
          geo_country_code: {
            id: "geo_country_code",
            name: "Geo_country_code",
            type: "string",
            title: "Geo_country_code",
          },
          geo_country_ip: {
            id: "geo_country_ip",
            name: "Geo_country_ip",
            type: "string",
            title: "Geo_country_ip",
          },
          six_sense: {
            id: "six_sense",
            name: "6sense",
            type: "string",
            title: "Six_sense",
          },
          UTM_Campaign__c: {
            id: "UTM_Campaign__c",
            name: "UTM_Campaign__c",
            type: "string",
            title: "UTM_Campaign__c",
          },
          UTM_Source__c: {
            id: "UTM_Source__c",
            name: "UTM_Source__c",
            type: "string",
            title: "UTM_Source__c",
          },
          UTM_Keyword__c: {
            id: "UTM_Keyword__c",
            name: "UTM_Keyword__c",
            type: "string",
            title: "UTM_Keyword__c",
          },
          UTM_Medium__c: {
            id: "UTM_Medium__c",
            name: "UTM_Medium__c",
            type: "string",
            title: "UTM_Medium__c",
          },
          UTM_Term__c: {
            id: "UTM_Term__c",
            name: "UTM_Term__c",
            type: "string",
            title: "UTM_Term__c",
          },
          UTM_Content__c: {
            id: "UTM_Content__c",
            name: "UTM_Content__c",
            type: "string",
            title: "UTM_Content__c",
          },
          UTM_Offer__c: {
            id: "UTM_Offer__c",
            name: "UTM_Offer__c",
            type: "string",
            title: "UTM_Offer__c",
          },
          UTM_Ad_Group__c: {
            id: "UTM_Ad_Group__c",
            name: "UTM_Ad_Group__c",
            type: "string",
            title: "UTM_Ad_Group__c",
          },
          UTM_Ad__c: {
            id: "UTM_Ad__c",
            name: "UTM_Ad__c",
            type: "string",
            title: "UTM_Ad__c",
          },
          sCID: {
            id: "sCID",
            name: "sCID",
            type: "string",
            title: "sCID",
          },
          GCLID__c: {
            id: "GCLID__c",
            name: "GCLID__c",
            type: "string",
            title: "GCLID__c",
          },
          ITM__c: {
            id: "ITM__c",
            name: "ITM__c",
            type: "string",
            title: "ITM__c",
          },
        },
        dependencies: {
          country: {
            oneOf: [
              {
                properties: {
                  country: {
                    enum: optinCountries,
                  },
                  marketingOptOut: {
                    id: "marketingOptIn",
                    name: "marketingOptIn",
                    type: "boolean",
                    hideInput: false,
                    title: DBConsentStrings[currentLanguage.id].show_checkbox_text,
                    default: false,
                  },
                },
              },
              {
                properties: {
                  country: {
                    enum: noOptinCountries,
                  },
                  marketingOptIn: {
                    id: "marketingOptIn",
                    name: "marketingOptIn",
                    type: "boolean",
                    hideInput: true,
                    title: DBConsentStrings[currentLanguage.id].no_checkbox_text,
                    default: true,
                  },
                },
              },
            ],
          },
        },
      },
      step2: {
        id: "free-trial-form-step2",
        type: "object",
        title: translate("form.choose-a-cloud-provider")[0],
        step: 2,
        nextStep: 2,
        slug: "#provider",
        submitText: translate("form.get-started")[0],
        required: ["cloud"],
        properties: {
          cloud: {
            id: "cloud",
            type: "string",
            name: "Cloud",
            title: "Cloud",
            default: "AWS",
            enum: ["AWS", "AZURE", "GCP", "CE"],
          },
          arkose_token_response: {
            id: "arkose_token_response",
            type: "string",
            name: "Arkose",
            title: "Arkose",
          },
        },
      },
      step3: {
        id: "free-trial-form-step-aws-payment",
        type: "object",
        title: "Start a 14-day free trial, then only pay for what you use.",
        step: 2,
        nextStep: 2,
        slug: "#payment",
        submitText: translate("form.get-started")[0],
        required: ["awsPayment"],
        properties: {
          awsPayment: {
            id: "free-trial-aws-payment",
            type: "string",
            title: "Payment",
            step: 2,
            slug: "#payment",
            submitText: translate("form.get-started")[0],
            default: "CREDIT",
            enum: ["CREDIT", "AWS"],
          },
        },
      },
    },
  }
  return Schema
}

export const UISchema = {
  step1: {
    firstName: {
      classNames: "half-width",
    },
    lastName: {
      classNames: "half-width",
    },
    phone: {
      "ui:options": {
        inputType: "tel",
      },
    },
    email: {
      "ui:options": {
        inputType: "email",
      },
    },
    company: {
      classNames: "half-width",
    },
    title: {
      classNames: "half-width",
    },
    marketingOptIn: {
      classNames: "mt-0.5",
      "ui:options": {
        hideInput: true,
      },
    },
    marketingOptOut: {
      classNames: "mt-0.5",
      "ui:options": {
        hideInput: false,
      },
    },
    request_URI: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    geo_country_code: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    geo_country_ip: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    six_sense: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    UTM_Campaign__c: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    UTM_Source__c: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    UTM_Keyword__c: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    UTM_Medium__c: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    UTM_Term__c: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    UTM_Content__c: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    UTM_Offer__c: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    UTM_Ad_Group__c: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    UTM_Ad__c: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    sCID: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    GCLID__c: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
    ITM__c: {
      classNames: "hidden",
      "ui:widget": "hidden",
    },
  },
  step2: {
    cloud: {
      "ui:widget": "imageRadio",
      "ui:options": {
        radioOptions: {
          AWS: {
            text: "Amazon Web Services",
            image: {
              src: AwsImage,
              alt: "Amazon Web Services",
            },
          },
          GCP: {
            text: "Google Cloud Platform",
            image: {
              src: GcpImage,
              alt: "Google Cloud Platform",
            },
          },
          AZURE: {
            text: "Microsoft Azure",
            image: {
              src: AzureImage,
              alt: "Microsoft Azure",
            },
          },
        },
      },
    },
    arkose_token_response: {
      "ui:widget": "hidden",
    },
  },
  step3: {
    awsPayment: {
      "ui:widget": "BinarySelectorWidget",
      "ui:options": {
        title: "",
        radioOptions: {
          CREDIT: {
            title: "Pay with credit card",
            description:
              "No credit card required to start your trial. If you use Databricks after the trial, add a credit card and you’ll be billed monthly.",
            image: {
              src: CardImage,
              alt: "Credit Card",
            },
          },
          AWS: {
            title: "Pay with your AWS account",
            description:
              "Deploy through AWS Marketplace. After the trial, you'll be billed for Databricks usage via your AWS account",
            image: {
              src: AwsPayImage,
              alt: "AWS Account",
            },
          },
        },
      },
    },
  },
  redirects: {
    GCP: "https://www.databricks.com/p/thank-you/google-cloud-free-trial-147568",
    AWS: "https://www.databricks.com/try-databricks/thank-you-aws",
    AWSPAYGO:
      "https://aws.amazon.com/marketplace/pp/prodview-wtyi5lgtce6n6?trk=cf384a2d-e78d-4b40-abca-c2454bac8d02&sc_channel=el",
    AZURE: "https://www.databricks.com/p/thank-you/azure-free-trial-experience",
    CE: "https://www.databricks.com/try-databricks/thank-you-community-edition",
  },
}

const getErrorSchema = () => {
  const { translate } = useTranslate()

  const errorSchema = {
    general: {
      required: translate("form.error-required"),
      enum: translate("form.error-required"),
      loading: translate("form.error-loading"),
      error: translate("form.error-error"),
      emailError: translate("form.error-email-error"),
    },
    fields: {
      phone: {
        pattern: translate("form.error-field-phone"),
      },
      email: {
        pattern: translate("form.error-field-email"),
      },
      country: {
        type: translate("form.error-required"),
      },
    },
  }

  return errorSchema
}

export default { getSchema, getErrorSchema, UISchema }
