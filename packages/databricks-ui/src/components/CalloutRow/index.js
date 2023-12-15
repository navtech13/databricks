import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Image from "../Image"
import Link from "../Link"
import { generateCTAs } from "../../utils/generateCTAs"
import { useBreakpoint } from "../../utils/use-breakpoint"

const CalloutRow = ({
  title,
  description,
  ctas,
  verticalCtas,
  graphic,
  image,
  imagePosition,
  variant,
  className,
}) => {
  const variantMap = {
    green: "bg-green-04",
    red: "bg-maroon-04",
    blue: "bg-navy-04",
  }
  const isTablet = useBreakpoint("md")
  const graphicSize = {
    width: isTablet ? "204" : "508",
    height: isTablet ? "325" : "318",
  }
  const isLeft = imagePosition === "left"
  return (
    <section
      data-cy='CalloutRow'
      className={`CalloutRow btn-bg overflow-x-hidden ${variantMap[variant]} ${className}`}
    >
      <div
        className={`inner-wrapper flex flex-col md:relative lg:gap-16 ${
          isLeft ? "md:flex-row-reverse" : "md:flex-row"
        } md:gap-10`}
      >
        <div className='my-4 w-full self-center text-white md:w-6/12 lg:my-5'>
          <h2 className='h1 font-medium'>{title}</h2>
          <RichText className='b4 mt-2'>{description}</RichText>
          {ctas?.length > 0 && (
            <div
              className={`cta-wrapper mt-3 flex flex-col flex-wrap items-start gap-2 lg:mt-4 ${
                verticalCtas ? "md:flex-col" : "md:flex-row"
              }`}
            >
              {generateCTAs(ctas, Link, "b4 font-medium")}
            </div>
          )}
        </div>
        <div
          className={`graphics mt-5 gap-1 md:mt-0 md:flex ${
            isLeft ? "md:flex-row-reverse" : ""
          }`}
        >
          <Image
            className='flex h-[60vw] max-h-[310px] items-center justify-center self-center md:hidden md:h-auto md:max-h-[unset] lg:block'
            aria-hidden
            imageOptions={{
              className:
                "h-[100vw] max-h-[508px] md:max-h-[unset] -translate-y-12 md:translate-y-0 w-auto rotate-90 md:rotate-0 md:h-auto md:w-full",
              ...graphicSize,
            }}
            {...graphic}
          />
          <Image
            aria-hidden
            className='h-[260px] md:relative md:h-auto md:w-20 lg:w-[360px]'
            imageOptions={{
              className: `absolute ${
                isLeft ? "right-0" : "left-0"
              } md:max-w-none w-full md:w-auto h-[260px] md:h-full object-cover ${
                isLeft ? "object-right" : "object-left"
              }`,
            }}
            {...image}
          />
        </div>
      </div>
    </section>
  )
}

CalloutRow.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  className: PropTypes.string,
  verticalCtas: PropTypes.bool,
  graphic: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
  image: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }).isRequired,
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  variant: PropTypes.oneOf(["green", "red", "blue"]),
  imagePosition: PropTypes.oneOf(["left", "right"]),
}

CalloutRow.defaultProps = {
  description: undefined,
  className: "",
  ctas: undefined,
  variant: "green",
  verticalCtas: false,
  imagePosition: "right",
}

export default CalloutRow
