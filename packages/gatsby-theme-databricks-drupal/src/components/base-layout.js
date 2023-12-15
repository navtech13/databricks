import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { BaseLayout, LanguageSelectorModal } from "databricks-ui"
import { PageTracker } from "databricks-ui/src/components"
import initUTMS from "databricks-ui/src/components/UTMS"
import SEO from "./seo"
import Footer from "./footer-2023"
import FooterMinimal from "./footer-minimal"
import MainNavigation from "./main-navigation"
import MainNavigationTopHorizontal from "./main-navigation-mega-menu"
import TopHeader from "./top-header"
import { GlobalAlert } from "./alert-message"
import Script from "./script"
import { loadOneTrust, loadRudderStack } from "../helpers/eventTracking"

// TODO: Check multi-language implementation for menu navigation
const Layout = ({
  variant,
  children,
  className,
  customLogos,
  hideLogo,
  headerBgColor,
  seo,
  hideGlobalAlert,
  hideCustomAlert,
  customAlert,
  skipToMain,
  displayLanguageSelectorModal,
  useMainTag = true,
}) => {
  const [SearchActivation, setSearchActivation] = React.useState(false)
  const [baseLayoutVariant, setBaseLayoutVariant] = React.useState(variant)
  const navMap = {
    legacyDefault: (
      <MainNavigation ActivateSearch={() => setSearchActivation((e) => !e)} />
    ),
    simple: <TopHeader customLogos={customLogos} hideLogo={hideLogo} bgColor={headerBgColor} />,
    simpleDark: (
      <TopHeader
        bgColor='bg-navy-06'
        darkLogo
        customLogos={customLogos}
        hideLogo={hideLogo}
      />
    ),
    minimal: <></>,
    hidden: "",
    default: <MainNavigationTopHorizontal />,
  }

  const footerMap = {
    default: <Footer />,
    simple: <Footer />,
    simpleDark: <Footer />,
    minimal: <FooterMinimal />,
    legacyDefault: <Footer />,
    hidden: "",
  }

  // if qs param pfmenu=hide then hide nav and footer, used for Pathfactory
  let parsedVariant = baseLayoutVariant

  if (variant === "simpleDark") {
    parsedVariant = "simple"
  }

  useEffect(() => {
    // if qs param pfmenu=hide then hide nav and footer, used for Pathfactory
    if (
      typeof window !== "undefined" &&
      window.location.search.indexOf("pfmenu=hid") > 0
    ) {
      setBaseLayoutVariant("hidden")
    }
    initUTMS()
    // event tracking
    loadOneTrust()
    loadRudderStack(seo)
  }, [])

  const alert = (
    <>
      {!hideGlobalAlert && <GlobalAlert />}
      {!hideCustomAlert && customAlert}
    </>
  )

  return (
    <>
      <SEO {...seo} />
      <Script />
      <BaseLayout
        skipToMain={skipToMain}
        alertComponent={alert}
        variant={parsedVariant}
        navComponent={navMap[variant]}
        footerComponent={footerMap[variant]}
        className={className}
        SearchActivationStatus={SearchActivation}
        DisableOverlaySearch={() => setSearchActivation(false)}
        useMainTag={useMainTag}
      >
        {displayLanguageSelectorModal && <LanguageSelectorModal />}
        {children}
        <PageTracker />
      </BaseLayout>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  seo: PropTypes.shape({
    urls: PropTypes.shape({
      current: PropTypes.string,
      og: PropTypes.string,
      prev: PropTypes.string,
      next: PropTypes.string,
      qs: PropTypes.string,
    }),
  }).isRequired,
  variant: PropTypes.oneOf(["default", "simple", "hidden", "minimal"]),
  className: PropTypes.string,
  customLogos: PropTypes.arrayOf(PropTypes.shape({})),
  hideLogo: PropTypes.bool,
  headerBgColor: PropTypes.string,
  customAlert: PropTypes.node,
  hideGlobalAlert: PropTypes.bool,
  hideCustomAlert: PropTypes.bool,
  skipToMain: PropTypes.bool,
  displayLanguageSelectorModal: PropTypes.bool,
  useMainTag: PropTypes.bool,
}

Layout.defaultProps = {
  variant: "default",
  className: "",
  customLogos: [],
  hideLogo: false,
  headerBgColor: undefined,
  customAlert: undefined,
  hideGlobalAlert: false,
  hideCustomAlert: false,
  skipToMain: undefined,
  displayLanguageSelectorModal: false,
  useMainTag: true,
}

export default Layout
