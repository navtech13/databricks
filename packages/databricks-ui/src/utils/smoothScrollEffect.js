import { useEffect } from "react"
import observeElements from "./observeElements"
import { useBreakpoint } from "./use-breakpoint"

function smoothScrollEffect(links, setCurrent, menu) {
  const isDesktop = useBreakpoint("lg")
  useEffect(() => {
    const flatLinks = []
    if (menu?.fieldBoolean) {
      document.documentElement.style.scrollBehavior = "smooth"
      links.forEach(({ links: subLinks = [], to }) => {
        flatLinks.push(to)
        subLinks.forEach((subLink) => flatLinks.push(subLink.to))
      })
    }

    if (!menu?.fieldBoolean) {
      document.documentElement.style.scrollBehavior = "smooth"
      links.forEach(({ to }) => {
        flatLinks.push(to)
      })
    }

    const ids = flatLinks.filter((id) => id?.startsWith("#"))
    const cleanup = observeElements(
      ids,
      (elementId) => {
        setCurrent(elementId)
      },
      { rootMargin: isDesktop ? "-30px" : "-10px", threshold: [0, 0.5, 1] }
    )
    return () => {
      cleanup()
      document.documentElement.style.scrollBehavior = null
    }
  }, [links, setCurrent, menu?.fieldBoolean])
}

export default smoothScrollEffect
