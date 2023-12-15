import React, { useState, useEffect, useRef, useContext } from "react"
import PropTypes from "prop-types"
import { useLanguageContext } from "../../../../gatsby-theme-databricks-drupal/src/components/language-provider"
import Image from "../Image"
import LanguageSwitcher from "../LanguageSwitcher"
import Link from "../Link"
import Context from "./MainNavigationContext"
import SearchComponentSideBar from "../SearchSticky/SearchComponentSideBar/SearchComponentSideBar"
import SearchParentSticky from "../SearchSticky/SearchMainComponent/Parent/SearchParent"
import BaseLayoutContext from "../BaseLayout/BaseLayoutContext"
import { useBreakpoint } from "../../utils/use-breakpoint"
import "./keyframe.css"

const MainNavigation = ({ image, children, className, ctas, footer, ...props }) => {
  const { currentLanguage } = useLanguageContext()
  const { navTop, setNavHeight } = useContext(BaseLayoutContext)
  const [showSearchBox, setShowSearchBox] = useState(false)
  const [state, setState] = useState({
    isMenuOpen: false,
    isSearchPage: true,
    activeSubmenu: null,
    showNavbar: true,
    secondaryMenu: false,
    desktopTop: null,
    navbarHeight: null,
    heightLoaded: false,
  })
  const heightRef = useRef(0)
  const navbarRef = useRef(null)
  const navbarTabletRef = useRef(null)
  const menuTabletRef = useRef(null)
  const loadedRef = useRef(false)
  const isDesktop = useBreakpoint("xl")
  const isTablet = useBreakpoint("md")

  const closeMenu = () => {
    setState((prevState) => ({
      ...prevState,
      activeSubmenu: null,
    }))
  }

  const handleMenuButton = () => {
    setState((prevState) => ({
      ...prevState,
      isMenuOpen: !prevState.isMenuOpen,
    }))
  }

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/search") {
      setState((prevState) => ({
        ...prevState,
        isSearchPage: false,
      }))
    }
  }, [])

  useEffect(() => {
    if (isDesktop) {
      setState((prevState) => ({
        ...prevState,
        navbarHeight: navbarRef.current?.offsetHeight,
        heightLoaded: true,
      }))
    } else {
      setState((prevState) => ({
        ...prevState,
        navbarHeight: navbarTabletRef.current?.offsetHeight,
      }))
    }
  }, [isDesktop, isTablet])

  useEffect(() => {
    if (!loadedRef.current && state.heightLoaded) {
      loadedRef.current = true
    }
    const handleScroll = () => {
      const currentScrollPos = window.scrollY

      if (
        currentScrollPos - 5 < heightRef.current &&
        currentScrollPos + 5 > heightRef.current
      ) {
        return
      }

      let secondaryMenu = false

      if (navTop?.[0]?.current.getBoundingClientRect().top < 50) {
        secondaryMenu = true
      }

      if (state.secondaryMenu !== secondaryMenu) {
        setState((prevState) => ({
          ...prevState,
          secondaryMenu,
          ...(secondaryMenu && { activeSubmenu: null }),
        }))
      }

      if (
        currentScrollPos > 64 &&
        currentScrollPos >= heightRef.current &&
        !state.isMenuOpen &&
        !state.activeSubmenu
      ) {
        heightRef.current = currentScrollPos
        if (!state?.showNavbar) {
          return
        }
        setNavHeight(0)
        setState((prevState) => ({
          ...prevState,
          showNavbar: false,
        }))
        return
      }
      heightRef.current = currentScrollPos
      if (state.showNavbar) {
        return
      }
      let height = 48
      if (isTablet) {
        height = 56
      }
      if (isDesktop) {
        height = 64
      }
      setNavHeight(height)
      setState((prevState) => ({
        ...prevState,
        showNavbar: true,
      }))
    }

    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        closeMenu()
      }
      if (!menuTabletRef.current.contains(event.target)) {
        if (
          navbarTabletRef.current &&
          !navbarTabletRef.current.contains(event.target) &&
          isTablet
        ) {
          if (state.isMenuOpen) {
            handleMenuButton()
          }
        }
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll)
      window.addEventListener("mousedown", handleClickOutside)
    }

    if (state.activeSubmenu) {
      setShowSearchBox(false)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", handleScroll)
        window.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [state, setShowSearchBox, isDesktop, isDesktop])

  const transitionStyles = {
    visible: "bg-white pointer-events-auto",
    hidden: "bg-white opacity-0 pointer-events-none",
  }

  return (
    <Context.Provider
      value={{
        setActiveSubmenu: (submenu) =>
          setState((prevState) => ({
            ...prevState,
            activeSubmenu: submenu,
          })),
        activeSubmenu: state.activeSubmenu,
        desktopTop: state.desktopTop,
        setDesktopTop: (top) =>
          setState((prevState) => ({
            ...prevState,
            desktopTop: top,
          })),
      }}
    >
      <div className='pointer-events-none absolute top-0 left-0 w-full'>
        <nav
          ref={navbarRef}
          className={`${
            state.showNavbar ? transitionStyles.visible : transitionStyles.hidden
          } xl:border-oat-medium xxl:px-2 top-0 z-[60] w-full transition-opacity duration-300 xl:fixed xl:h-8 xl:border-b xl:pr-1.5 xl:pl-2.5`}
          data-cy='MainNavigation'
          {...props}
        >
          <div
            ref={navbarTabletRef}
            className={`border-oat-medium fixed top-0 z-[60] flex h-6 w-full bg-white p-2 md:h-[56px] md:border-b xl:hidden xl:h-6 xl:items-center  ${className}`}
          >
            {image && (
              <Link
                className='flex w-10 shrink-0 items-center md:w-20'
                aria-label={image.alt}
                to={image.to}
              >
                <Image
                  className='h-full w-full'
                  imageOptions={{
                    className: "max-h-full h-full object-contain object-center",
                  }}
                  src={image.logo?.src}
                  alt={image.alt}
                />
              </Link>
            )}
            {/* Burger menu */}
            <div className='ml-auto flex xl:hidden'>
              <div className='flex flex-row items-center gap-3 align-middle'>
                <LanguageSwitcher />
                {!state.isSearchPage && (
                  <SearchComponentSideBar
                    isMobile
                    activateSearchPopup={() => setShowSearchBox((prev) => !prev)}
                  />
                )}
              </div>
              <div className='relative ml-4 h-auto w-2.5'>
                <button
                  aria-label={state.isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={state.isMenuOpen}
                  type='button'
                  className={`btn-burger ${state.isMenuOpen ? "active" : ""}`}
                  onClick={handleMenuButton}
                />
              </div>
            </div>
          </div>
          {/* Menu Area */}
          <div
            ref={menuTabletRef}
            className={`${
              state.isMenuOpen
                ? "w-full md:translate-x-0 xl:transform-none"
                : "hidden md:block md:translate-x-full xl:transform-none"
            } md:shadow-shadow-2 fixed right-0 top-6 z-[60] h-full transform items-center bg-white transition-transform duration-300 md:top-[56px] md:w-[50vw] xl:static xl:mx-auto xl:flex xl:w-full xl:max-w-[1456px] xl:transform-none xl:overflow-visible xl:h-[${
              state.navbarHeight
            }px] xl:shadow-shadow-0 xl:border-oat-medium xl:overflow-visible xl:pb-0`}
          >
            {image && (
              <Link
                className='mr-4 hidden h-full w-20 xl:flex xl:shrink-0 xl:items-center'
                aria-label={image.alt}
                to={image.to}
              >
                <Image
                  className='h-full w-full md:max-h-[24px]'
                  imageOptions={{
                    className: "max-h-full h-full object-contain object-center",
                  }}
                  src={image.logo?.src}
                  alt={image.alt}
                />
              </Link>
            )}
            <div className='pb-15 h-[calc(100%-60px)] w-full overflow-auto xl:h-auto xl:overflow-hidden xl:pb-0'>
              {children}
              {!isDesktop && footer}
            </div>
            {!isDesktop && ctas}
            {/* Desktop Search component */}
            <div className='order-3 hidden xl:flex'>
              <LanguageSwitcher className='mr-2' />
              {!state.isSearchPage && currentLanguage?.id === "EN" && (
                <>
                  <SearchComponentSideBar
                    searchActivationStatus={showSearchBox}
                    activateSearchPopup={() => {
                      closeMenu()
                      setShowSearchBox((prev) => !prev)
                    }}
                  />
                  {showSearchBox && (
                    <SearchParentSticky
                      CloseSearch={() => setShowSearchBox(false)}
                    />
                  )}
                </>
              )}
            </div>
            {isDesktop && ctas}
          </div>
        </nav>
        <div
          className={`${state.isMenuOpen ? "block" : "hidden"} ${
            state.activeSubmenu ? "xl:block" : "xl:hidden"
          } bg-navy-800 fixed top-0 left-0 bottom-0 z-50 w-full bg-opacity-10`}
        />
      </div>
    </Context.Provider>
  )
}

MainNavigation.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  image: PropTypes.shape({
    alt: PropTypes.string,
    desktop: PropTypes.shape({
      src: PropTypes.string,
    }),
    logo: PropTypes.shape({
      src: PropTypes.string,
    }),
    to: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    ToggleSearchComponent: PropTypes.func,
    CloseSearchComponent: PropTypes.func,
    searchActivationStatus: PropTypes.bool,
  }).isRequired,
  ctas: PropTypes.node,
  footer: PropTypes.node,
}

MainNavigation.defaultProps = {
  className: "",
  ctas: undefined,
  footer: undefined,
}

export default MainNavigation
