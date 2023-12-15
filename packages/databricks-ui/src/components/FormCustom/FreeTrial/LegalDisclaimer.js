import React from "react"
import PropTypes from "prop-types"
import Link from "../../Link"
import useTranslate from "../../../../../gatsby-theme-databricks-drupal/src/utils/translate"

const LegalDisclaimer = ({ provider }) => {
  const { translate } = useTranslate()
  const content =
    provider === "AZURE" ? (
      <>
        {`Please note that Azure Databricks is provided by Microsoft and is subject to
        Microsoft's terms.`}
      </>
    ) : (
      <>
        {translate("form.get-started-agreement")}
        <Link
          to='/privacypolicy'
          className='text-gray-text underline'
          target='_blank'
        >
          {translate("form.privacy-policy")}
        </Link>{" "}
        {translate("form.and")}{" "}
        <Link to='/mcsa' className='text-gray-text underline' target='_blank'>
          {translate("form.terms-of-service")}
        </Link>{" "}
        {translate("form.get-started-agreement-end")}.
      </>
    )

  return <div className='text-gray-text b7 mt-2'>{content}</div>
}

LegalDisclaimer.propTypes = {
  provider: PropTypes.string.isRequired,
}

export default LegalDisclaimer
