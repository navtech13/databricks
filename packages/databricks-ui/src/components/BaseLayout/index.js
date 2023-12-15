import React, { useCallback, useState, useEffect } from "react"
import PropTypes from "prop-types"
import Cookies from "js-cookie"
import SearchParentSticky from "../SearchSticky/SearchMainComponent/Parent/SearchParent"
import SkipToMainContentLink from "../SkipToMainContentLink"
import BaseLayoutContext from "./BaseLayoutContext"
import useTranslate from "../../../../gatsby-theme-databricks-drupal/src/utils/translate"
import getQueryParam from "gatsby-theme-databricks-drupal/src/helpers/getQueryParam"
import { checkCookieConsent } from "gatsby-theme-databricks-drupal/src/helpers/eventTracking"

const BaseLayout = ({
  variant,
  navComponent,
  alertComponent,
  footerComponent,
  className,
  children,
  SearchActivationStatus,
  DisableOverlaySearch,
  skipToMain,
  useMainTag = true,
}) => {
  const { translate } = useTranslate()
  let isDatabricksDomain = true
  if (typeof window !== "undefined") {
    isDatabricksDomain = window.location.hostname.includes("databricks.com")
  }
  const [navTop, setNavTop] = useState([])
  const [navHeight, setNavHeight] = useState()
  const addNavTop = useCallback(
    (ref) => {
      setNavTop((prev) => [...prev, ref])
    },
    [setNavTop]
  )
  const delNavTop = useCallback(
    (ref) => {
      setNavTop((prev) => {
        const index = prev.findIndex((item) => item === ref)
        if (index > -1) {
          prev.splice(index, 1)
        }
        return prev
      })
    },
    [setNavTop]
  )
  const [cookiesConsent, setCookiesConsent] = useState(true)
  const variantMap = {
    legacyDefault: {
      wrapper: "flex flex-col lg:flex-row",
      nav: "lg:w-20 min-h-[60px] w-full lg:h-auto",
      content: "flex-1 lg:layout-max-width",
      footer: "min-h-[385px]",
      alert: "main",
    },
    default: {
      wrapper: "flex flex-col xl:pt-[64px] pt-[48px] md:pt-[56px]",
      nav: "h-0",
      content: "flex-1",
      footer: "min-h-[385px]",
      alert: "main",
    },
    simple: {
      wrapper: "flex flex-col",
      nav: "h-8",
      content: "flex-1",
      footer: "min-h-[385px]",
      alert: "nav",
    },
    hidden: {
      wrapper: "flex flex-col lg:flex-row",
      nav: "hidden",
      content: "flex-1",
      footer: "hidden",
      alert: "nav",
    },
    minimal: {
      wrapper: "flex flex-col min-h-[100vh]",
      content: "flex-1 flex flex-col",
      footer: "min-h-[50px]",
      alert: "nav",
    },
    wt: {
      wrapper: "flex flex-col",
      nav: "min-h-[60px] lg:min-h-[92px] w-full",
      footer: "min-h-[185px]",
      alert: "main",
    },
  }

  function checkConsent() {
    const oneTrustCookie = Cookies.get("OptanonConsent")
    if (
      (typeof oneTrustCookie !== "undefined" &&
        getQueryParam("groups", oneTrustCookie)) ||
      !isDatabricksDomain
    ) {
      if (
        (checkCookieConsent("C0002") && checkCookieConsent("C0004")) ||
        !isDatabricksDomain
      ) {
        setCookiesConsent(true)
      } else {
        setCookiesConsent(false)
      }
    } else {
      setTimeout(checkConsent, 300)
    }
  }

  useEffect(() => {
    function addOneTrustConsentChangedEvent() {
      if (typeof OneTrust !== "undefined") {
        OneTrust.OnConsentChanged(() => checkConsent())
      } else {
        setTimeout(addOneTrustConsentChangedEvent, 300)
      }
    }

    addOneTrustConsentChangedEvent()
    checkConsent()
  }, [])

  return (
    <BaseLayoutContext.Provider
      value={{
        navTop,
        addNavTop,
        delNavTop,
        navHeight,
        setNavHeight,
        cookiesConsent,
      }}
    >
      <div
        data-cy='BaseLayout'
        className={`${variantMap[variant].wrapper} ${className}`}
      >
        {skipToMain && variant === "default" && (
          <SkipToMainContentLink label={translate("general.skip-to-main-content")} />
        )}
        {variantMap[variant].alert === "nav" && alertComponent}
        {variantMap[variant].nav && (
          <div className={variantMap[variant].nav}>{navComponent}</div>
        )}
        <div className={variantMap[variant].content}>
          <div className='flex-1'>
            {SearchActivationStatus && (
              <SearchParentSticky CloseSearch={() => DisableOverlaySearch()} />
            )}
            {useMainTag ? (
              <main id='main'>
                {variantMap[variant].alert === "main" && alertComponent}
                {children}
              </main>
            ) : (
              <>
                {variantMap[variant].alert === "main" && alertComponent}
                {children}
              </>
            )}
          </div>
          <div className={variantMap[variant].footer}>{footerComponent}</div>
        </div>
      </div>
    </BaseLayoutContext.Provider>
  )
}

BaseLayout.propTypes = {
  /**
   * Receives the variant of the layout
   */
  variant: PropTypes.oneOf(["default", "simple", "hidden", "minimal", "wt"]),
  /**
   * Receives the React component to render the Navbar
   */
  navComponent: PropTypes.node.isRequired,
  /**
   *  Receives the React Component to render the Footer
   */
  footerComponent: PropTypes.node.isRequired,
  /**
   *  React Component to render the Main content into the BaseLayouts component
   */
  children: PropTypes.element.isRequired,
  alertComponent: PropTypes.node,
  className: PropTypes.string,
  DisableOverlaySearch: PropTypes.func,
  SearchActivationStatus: PropTypes.bool,
  skipToMain: PropTypes.bool,
  useMainTag: PropTypes.bool,
}

BaseLayout.defaultProps = {
  alertComponent: undefined,
  variant: "default",
  className: "",
  skipToMain: undefined,
  DisableOverlaySearch: undefined,
  SearchActivationStatus: undefined,
  useMainTag: true,
}

export default BaseLayout
