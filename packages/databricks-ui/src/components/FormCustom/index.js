import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { FormCustomFreeTrial, SchemaFreeTrial, ContentWrapper } from "databricks-ui"
import { theme } from "../../../tailwind.config"

export const SemiCircle = ({ color }) => (
  <svg
    width='full'
    viewBox='0 0 889 436'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M889 444.5C889 326.611 842.169 213.551 758.809 130.191C675.449 46.8311 562.389 8.90035e-06 444.5 0C326.611 -8.90035e-06 213.551 46.8311 130.191 130.191C46.8311 213.551 1.78007e-05 326.611 0 444.5L889 444.5Z'
      fill={theme.colors[color]}
    />
  </svg>
)

SemiCircle.propTypes = {
  color: PropTypes.string.isRequired,
}
const FormCustom = ({ entity, buttonVariant, disableHash, hasOptionalFields }) => {
  useEffect(() => {
    if (entity.fieldFreeTrialDisplayType) {
      document
        .querySelector('meta[name="viewport"]')
        .setAttribute(
          "content",
          "width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit"
        )
    }
  }, [entity.fieldFreeTrialDisplayType])

  if (entity.fieldFreeTrialDisplayType === "fullwidth") {
    return (
      <ContentWrapper
        innerClassName='py-8 md:py-12'
        backgroundColor={{ color: "#F9F7F4", opacity: 1 }}
      >
        <div className='absolute bottom-0 left-1/2 -z-[1] w-10/12 max-w-[1200px] -translate-x-1/2 lg:w-8/12'>
          <SemiCircle color={entity.fieldBackgroundToken || "orange-01"} />
        </div>
        <FormCustomFreeTrial
          className='mx-auto pb-3 md:w-8/12 lg:w-6/12'
          cloudType={entity.fieldCloudType}
          title={entity.fieldTitle}
          ctaLabel={entity.fieldLink?.title}
          redirectUrl={entity.fieldThankYouUrl?.url?.path}
          key={entity.uuid}
          ErrorSchema={SchemaFreeTrial.default.getErrorSchema()}
          UISchema={SchemaFreeTrial.default.UISchema}
          Schema={SchemaFreeTrial.default.getSchema(hasOptionalFields)}
          disableHash={disableHash}
        />
      </ContentWrapper>
    )
  }

  return (
    <FormCustomFreeTrial
      cloudType={entity.fieldCloudType || "default"}
      buttonVariant={buttonVariant}
      title={entity.fieldTitle}
      ctaLabel={entity.fieldLink?.title}
      redirectUrl={entity.fieldThankYouUrl?.url?.path}
      key={entity.uuid}
      ErrorSchema={SchemaFreeTrial.default.getErrorSchema()}
      UISchema={SchemaFreeTrial.default.UISchema}
      Schema={SchemaFreeTrial.default.getSchema(hasOptionalFields)}
      disableHash={disableHash}
    />
  )
}

FormCustom.propTypes = {
  buttonVariant: PropTypes.string,
  disableHash: PropTypes.bool,
  hasOptionalFields: PropTypes.bool,
  entity: PropTypes.shape({
    fieldFreeTrialDisplayType: PropTypes.string,
    fieldCloudType: PropTypes.string,
    fieldTitle: PropTypes.string,
    fieldLink: PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.shape({
        path: PropTypes.string,
      }),
    }),
    uuid: PropTypes.string,
  }).isRequired,
}
SemiCircle.propTypes = {
  color: PropTypes.string.isRequired,
}

FormCustom.defaultProps = {
  buttonVariant: "primary",
  disableHash: false,
  hasOptionalFields: true,
}

export default FormCustom
