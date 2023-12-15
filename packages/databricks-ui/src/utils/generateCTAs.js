import React from "react"
import Button from "../components/Button"
import Link from "../components/Link"

export const generateCTAs = (ctas, as, className) => {
  return (
    <>
      {Array.isArray(ctas) &&
        ctas?.map((element, index) => {
          const isButton = element?.to?.includes("|button")
          const to = element?.to?.replace("|button", "")
          return (
            <Button
              as={as || Link}
              variant={index === 0 ? "primary" : "secondary"}
              to={to}
              className={className}
              {...(isButton && { role: "button", tabIndex: "0" })}
            >
              {element.label || element.text}
            </Button>
          )
        })}
    </>
  )
}
