import React from "react"
import PropTypes from "prop-types"
import TextButton from "../TextButton"
import Button from "../Button"
import Link from "../Link"
import RichText from "../RichText"

const CtaSection = ({ children, cta, variantType, ...props }) => {
  const variantMap = {
    primary: {
      background: "bg-navy-05",
      richText: "text-white",
      buttonStyle: "hover:text-orange-05 mt-4 transition-all",
      isText: true,
    },
    secondary: {
      background: "",
      richText: "text-black",
      buttonStyle: "mt-1 text-white transition-all",
    },
    tertiary: {
      background: "",
      richText: "",
      buttonStyle:
        "mt-1 mx-auto arrow-icon-tertiary tertiary-underline text-blue-700 hover:text-blue-700 transition-all",
      isText: true,
    },
  }
  const currentVariant = variantMap[variantType] || variantMap.primary
  return (
    <div
      data-cy='CtaSection'
      className={`${variantMap[variantType]?.background}`}
      {...props}
    >
      <div className='inner-wrapper py-6 text-center md:w-8/12 lg:w-7/12'>
        <RichText className={`${currentVariant?.richText}`}>{children}</RichText>
        {cta && currentVariant.isText && (
          <TextButton
            className={`${currentVariant.buttonStyle}`}
            to={cta.to}
            aria-label={cta.label}
            variant='A'
          >
            {cta.label}
          </TextButton>
        )}
        {cta && !currentVariant.isText && (
          <Button
            className={`${currentVariant.buttonStyle}`}
            as={Link}
            variant='primary'
            to={cta.to}
          >
            {cta.label}
          </Button>
        )}
      </div>
    </div>
  )
}

CtaSection.propTypes = {
  children: PropTypes.node.isRequired,
  variantType: PropTypes.oneOf(["primary", "secondary"]),
  cta: PropTypes.shape({ label: PropTypes.string, to: PropTypes.string }),
}

CtaSection.defaultProps = {
  cta: undefined,
  variantType: "primary",
}

export default CtaSection
