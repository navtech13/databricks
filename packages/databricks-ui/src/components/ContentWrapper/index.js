import React from "react"
import PropTypes from "prop-types"
import Grid from "../Grid"
import { useBreakpoint } from "../../utils/use-breakpoint"

const Wrapper = ({
  children,
  className,
  innerClassName,
  width,
  initialColumn,
  backgroundColor,
  bottomBackgroundColor,
  ...props
}) => {
  const isDesktop = useBreakpoint("lg")

  return (
    <div
      data-cy='Wrapper'
      className={`content-wrapper relative z-10 ${className}`}
      {...props}
    >
      {backgroundColor?.color && (
        <div
          aria-hidden
          className={`absolute inset-0 w-full ${
            bottomBackgroundColor ? "h-1/2" : "h-full"
          }`}
          style={{
            zIndex: "-1",
            backgroundColor: backgroundColor?.color || "none",
            opacity: backgroundColor?.opacity || "0",
          }}
        />
      )}
      {bottomBackgroundColor && (
        <div
          aria-hidden
          className={`absolute bottom-0 w-full bg-${bottomBackgroundColor} ${
            backgroundColor?.color ? "h-1/2" : "h-full"
          }`}
          style={{
            zIndex: "-1",
            opacity: backgroundColor?.opacity || "1",
          }}
        />
      )}

      <div className={`inner-wrapper ${innerClassName || ""}`}>
        <Grid columns={12} gap={0}>
          <div
            style={{
              gridColumn: isDesktop
                ? `${initialColumn || "1"} / span ${width || "12"}`
                : `1 / span 12`,
            }}
          >
            {children}
          </div>
        </Grid>
      </div>
    </div>
  )
}
Wrapper.propTypes = {
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  initialColumn: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  innerClassName: PropTypes.string,
  backgroundColor: PropTypes.shape({
    color: PropTypes.string,
    opacity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  bottomBackgroundColor: PropTypes.string,
}

Wrapper.defaultProps = {
  backgroundColor: undefined,
  className: "",
  innerClassName: "",
  width: "12",
  initialColumn: "1",
}

export default Wrapper
