import React, { useRef } from "react"
import PropTypes from "prop-types"
import Link from "../Link"
import { useBreakpoint } from "../../utils/use-breakpoint"

const variantMap = {
  primary: "btn-primary",
  secondary: "btn-secondary",
}

const InPageNavigationSticky = ({ ctas, offsetTop, ...props }) => {
  const elementRef = useRef(null)
  const isDesktop = useBreakpoint("lg")
  const isDesignTablet = useBreakpoint("design-lg")
  let width = "100%"

  if (isDesktop && !isDesignTablet) {
    const menuWidth = elementRef.current?.getBoundingClientRect().x || 0
    width = `calc(100% - ${menuWidth}px)`
  }

  if (isDesignTablet) {
    width = "94px"
  }

  return (
    <div
      ref={elementRef}
      className='design-lg:top-[60%] design-lg:right-0 design-lg:max-w-[94px] design-lg:flex-col fixed bottom-0 z-20 flex'
      style={{ width }}
      {...props}
    >
      {ctas?.map((item) => {
        return (
          <Link
            className={`${
              variantMap[item.variant] || variantMap.primary
            } design-lg:w-12 b5 design-lg:h-8 design-lg:text-left design-lg:flex w-full items-center justify-center p-1 transition duration-200 hover:no-underline`}
            key={item.text}
            to={item.to}
          >
            {item.text}
          </Link>
        )
      })}
    </div>
  )
}

InPageNavigationSticky.propTypes = {
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      to: PropTypes.string,
      variant: PropTypes.oneOf([
        "primary",
        "secondary",
        "tertiary",
        "secondaryNavy",
        "disabled",
      ]),
    })
  ).isRequired,
  offsetTop: PropTypes.number,
}

InPageNavigationSticky.defaultProps = {
  offsetTop: 600,
}

export default InPageNavigationSticky
