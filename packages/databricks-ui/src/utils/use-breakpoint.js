/* eslint-disable */
import React from "react"
import { isBrowser, useIsomorphicEffect } from "."
import tailwindConfig from "../../tailwind.config"

const { screens } = tailwindConfig.theme

if (!screens) {
  throw new Error(
    "Failed to create breakpoint hooks, given `screens` value is invalid."
  )
}
function useBreakpoint(breakpoint, defaultValue = false) {
  const [match, setMatch] = React.useState(() => defaultValue)
  const matchRef = React.useRef(defaultValue)
  useIsomorphicEffect(() => {
    if (!(isBrowser && "matchMedia" in window)) return undefined
    function track() {
      var _a
      // @ts-expect-error accessing index with uncertain `screens` type
      const value =
        (_a = screens[breakpoint]) !== null && _a !== void 0 ? _a : "999999px"
      const query = window.matchMedia(`(min-width: ${value})`)
      matchRef.current = query.matches
      if (matchRef.current != match) {
        setMatch(matchRef.current)
      }
    }
    window.addEventListener("resize", track)
    track()
    return () => window.removeEventListener("resize", track)
  })
  return match
}
function useBreakpointEffect(breakpoint, effect) {
  const match = useBreakpoint(breakpoint)
  React.useEffect(() => effect(match))
  return null
}
function useBreakpointValue(breakpoint, valid, invalid) {
  const match = useBreakpoint(breakpoint)
  const value = React.useMemo(
    () => (match ? valid : invalid),
    [invalid, match, valid]
  )
  return value
}

export { useBreakpoint, useBreakpointEffect, useBreakpointValue }
