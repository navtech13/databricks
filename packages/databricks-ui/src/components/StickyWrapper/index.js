import React, { useState, useRef, useLayoutEffect, useContext } from "react"
import PropTypes from "prop-types"
import BaseLayoutContext from "../BaseLayout/BaseLayoutContext"

const stylesMap = {
  fixed: "fixed",
  top: "absolute",
  bottom: "absolute bottom-0",
}

const scrollbarStyle = `
     .sidenav::-webkit-scrollbar {

      width: 8px;
    }
    .sidenav::-webkit-scrollbar-thumb {
      background: #90a5b1;
      background-clip: padding-box;
      border-radius: 14px;
    }
  `
const StickyWrapper = ({
  children,
  as,
  className,
  offsetTop,
  containerRef,
  ...props
}) => {
  const Component = as || "div"
  const [elementHeight, setElementHeight] = useState(null)
  const stickyRef = useRef(null)
  const [stickyType, setStickyType] = useState(null)
  const [windowHeight, setWindowHeight] = useState(0)

  const { addNavTop, delNavTop, navHeight } = useContext(BaseLayoutContext)

  useLayoutEffect(() => {
    if (!addNavTop) {
      return false
    }
    addNavTop(stickyRef)
    return () => {
      delNavTop(stickyRef)
    }
  }, [stickyRef, addNavTop, delNavTop])

  useLayoutEffect(() => {
    // Make navigation sticky when it reaches the top of the viewport
    setWindowHeight(window.innerHeight)
    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    const handleScroll = () => {
      if (!containerRef) {
        const stickyTop = stickyRef.current?.getBoundingClientRect().y
        setStickyType(stickyTop < 0 ? "fixed" : null)
        return
      }

      if (!containerRef.current) {
        return
      }

      const containerTop =
        containerRef.current?.getBoundingClientRect().y - offsetTop
      const containerBottom = containerTop + containerRef.current?.offsetHeight
      const stickyHeight = stickyRef.current?.offsetHeight

      if (
        containerTop <= (navHeight || 0) &&
        containerBottom >=
          (stickyHeight > windowHeight - 55 ? windowHeight : stickyHeight)
      ) {
        setStickyType("fixed")
        return
      }
      if (containerTop >= 0) {
        setStickyType("top")
        return
      }
      setStickyType("bottom")
    }
    handleScroll()

    setTimeout(handleScroll, 300)

    const observer = new ResizeObserver(() => {
      setElementHeight(`${stickyRef.current.nextElementSibling.offsetHeight}px`)
      handleScroll()
    })

    window.stickyWrapperUpdate = handleScroll

    if (stickyRef?.current?.nextElementSibling) {
      observer.observe(stickyRef.current.nextElementSibling, {
        attributes: true,
        childList: true,
        subtree: true,
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      if (containerRef?.current) {
        observer.disconnect()
      }
      window.removeEventListener("scroll", handleScroll, { passive: true })
    }
  }, [stickyRef?.current, containerRef?.current, navHeight])

  let width = "100%"

  if (stickyRef?.current && window) {
    const scrollbarWidth =
      (window && window.innerWidth - document.documentElement.clientWidth) || "0"
    width = `calc(100vw - ${
      stickyRef?.current?.getBoundingClientRect().x
    }px - ${scrollbarWidth}px)`
  }

  const calculateTop = () => {
    const navGap = navHeight + offsetTop
    if (stickyType === "top") return 0
    if (navHeight && navHeight > offsetTop) return navGap
    return offsetTop
  }

  return (
    <>
      <div
        ref={stickyRef}
        {...(stickyType && {
          style: { height: elementHeight },
        })}
      />
      <Component
        className={`sidenav ${className} ${stylesMap[stickyType] || ""}`}
        style={{
          ...(stickyType && {
            width,
            maxWidth: stickyRef?.current?.getBoundingClientRect()?.width || "100%",
          }),
          ...(stickyType === "fixed" && {
            maxHeight: window.innerHeight - 50,
            overflow: "auto",
          }),
          ...((stickyType === "top" || stickyType === "fixed") && {
            top: calculateTop(),
          }),
          ...(navHeight && stickyType === "fixed" && { transition: "top 0.3s" }),
        }}
        {...props}
      >
        <style>{scrollbarStyle}</style>
        {children}
      </Component>
    </>
  )
}

StickyWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  className: PropTypes.string,
  containerRef: PropTypes.shape({
    current: PropTypes.node,
  }),
  offsetTop: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
}

StickyWrapper.defaultProps = {
  as: "div",
  className: "",
  offsetTop: 0,
  containerRef: null,
}

export default StickyWrapper
