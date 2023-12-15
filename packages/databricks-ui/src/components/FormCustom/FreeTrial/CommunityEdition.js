import React, { useEffect } from "react"
import includeArkose from "./arkose"
import useTranslate from "../../../../../gatsby-theme-databricks-drupal/src/utils/translate"
import getValidationMethod from "../../../../../gatsby-theme-databricks-drupal/src/utils/get-validation-method"
import includeRecaptcha, {
  RecaptchaModal,
  recaptchaCommunityEditionOnClick,
} from "./recaptcha"
import { novalidateCommunityEditionOnClick } from "./novalidate"

const verificationType = getValidationMethod()

const CommunityEdition = () => {
  const { translate } = useTranslate()
  useEffect(() => {
    if (verificationType === "recaptcha") {
      includeRecaptcha()
      return
    }
    if (verificationType !== "novalidation") {
      includeArkose()
    }
  }, [])

  return (
    <div className='mt-6'>
      <div className='b4 mb-1'>{translate("form.cumminity-edition-title")}</div>
      <div className='b6 mb-1'>{translate("form.cumminity-edition-text")}</div>
      <a
        id='community-edition'
        className='b6 text-navy-06 arrow-icon'
        onClick={
          verificationType === "recaptcha"
            ? recaptchaCommunityEditionOnClick
            : verificationType === "novalidation"
            ? novalidateCommunityEditionOnClick
            : () => {}
        }
      >
        {translate("form.cumminity-edition-get-started")}
      </a>
      <div className='b7 mt-1'>
        {translate("form.cumminity-edition-get-started-agreement")}{" "}
        <a
          href='/privacypolicy'
          className='text-gray-text underline'
          target='_blank'
        >
          {translate("form.privacy-policy")}
        </a>{" "}
        {translate("form.and")}{" "}
        <a href='/mcsa' className='text-gray-text underline' target='_blank'>
          {translate("form.terms-of-service")}
        </a>
        {` ${translate("form.get-started-agreement-end")}`}.
      </div>
      {verificationType === "recaptcha" && <RecaptchaModal />}
    </div>
  )
}

export default CommunityEdition
