import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import TextButton from "../TextButton"
import ContentWrapper from "../ContentWrapper"

const TextRowRightCta = ({ columns, cta, description, title, ctaAlignment }) => {
  const alignment = ctaAlignment || "bottom"
  const ctaAlignmentMap = {
    top: "md:items-start",
    center: "md:items-center",
    bottom: "md:items-end",
  }

  const isBaseline = title && alignment === "top"

  return (
    <ContentWrapper width={columns}>
      <section className='md:flex'>
        <div className={`w-full${!isBaseline ? " md:w-9/12" : ""}`}>
          {title && (
            <div className='flex items-baseline justify-between'>
              <RichText className={isBaseline ? " md:w-9/12" : ""}>{title}</RichText>
              {isBaseline && (
                <TextButton
                  className='hidden text-blue-700 hover:text-blue-700 md:block'
                  variant='C'
                  to={cta.to}
                >
                  {cta.textLink}
                </TextButton>
              )}
            </div>
          )}
          {description && (
            <div
              className={`${title ? "pt-3" : ""} ${cta ? "pb-2 md:pb-0" : ""}${
                isBaseline ? " md:w-9/12" : ""
              }`}
            >
              <RichText className='b4'>{description}</RichText>
            </div>
          )}
        </div>
        <div
          className={`pt-1 md:flex md:w-3/12 md:justify-end md:py-1 ${
            isBaseline ? "md:hidden" : ""
          } ${ctaAlignmentMap?.[alignment] || ctaAlignmentMap.bottom}`}
        >
          <TextButton
            className='text-blue-700 hover:text-blue-700'
            variant='C'
            to={cta.to}
          >
            {cta.textLink}
          </TextButton>
        </div>
      </section>
    </ContentWrapper>
  )
}

TextRowRightCta.propTypes = {
  columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cta: PropTypes.shape({
    textLink: PropTypes.string,
    to: PropTypes.string,
  }).isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
  ctaAlignment: PropTypes.oneOf(["top", "center", "bottom"]),
}

TextRowRightCta.defaultProps = {
  columns: 12,
  description: undefined,
  title: undefined,
  ctaAlignment: "bottom",
}
export default TextRowRightCta
