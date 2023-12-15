import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { useLanguageContext } from "gatsby-theme-databricks-drupal/src/components/language-provider"
import Image from "../Image"
import IconResolver from "../IconResolver"
import Link from "../Link"
import Context from "./MainNavigationContext"
import { SearchComponentSideBar, MainNavigationPromo } from "../index"

const MainNavigation = ({ image, children, navigation, className, ...props }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchPage, setIsSearchPage] = useState(true)
  const [mobileOpen, setMobileOpen] = useState("none")
  const [hoverActive, setHoverActive] = useState(false)
  const [top, setTop] = useState(false)
  const { currentLanguage } = useLanguageContext()

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname !== "/search") {
      setIsSearchPage(false)
    }
  })

  // determine if we should show the search box (not for global sites)
  let showSearchBox = true
  if (
    typeof currentLanguage !== "undefined" &&
    typeof currentLanguage.id !== "undefined" &&
    currentLanguage.id !== "EN"
  ) {
    showSearchBox = false
  }

  return (
    <Context.Provider
      value={{ mobileOpen, setMobileOpen, setHoverActive, top, setTop }}
    >
      <nav
        data-cy='MainNavigation'
        className={`bg-nav-gray z-40 flex flex-wrap justify-between lg:fixed lg:block lg:h-full lg:w-20 lg:px-0 lg:py-4 ${className}`}
        {...props}
      >
        <Link aria-label={image.alt} to={image.to}>
          <Image
            className='hidden px-2.5 lg:mb-4 lg:block'
            src={image.desktop?.src}
            alt={image.alt}
            // TODO: read values from CMS or change approach to use Gatsby images for preventing CLS
            imageOptions={{
              width: "110",
              height: "62",
            }}
          />
          <Image
            className='px-2.5 py-2.5 lg:hidden'
            src={image.mobile?.src}
            alt={image.alt}
            imageOptions={{
              width: "132",
              height: "22",
            }}
          />
        </Link>
        <div className='flex lg:hidden'>
          {showSearchBox && !isSearchPage && (
            <SearchComponentSideBar
              isMobile='true'
              activateSearchPopup={() => navigation.ToggleSearchComponent()}
            />
          )}
          <button
            className='text-2.5 h-8 px-2 lg:hidden'
            type='button'
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
          >
            <IconResolver className='text-white' token='menuBars' />
          </button>
        </div>

        <div
          className={`${isMenuOpen ? "w-full" : "hidden"} ${
            mobileOpen === "none"
              ? "pb-4"
              : "relative mb-[400px] md:mb-[500px] lg:mb-0"
          } bg-nav-gray z-20 lg:block`}
        >
          {children}
        </div>
        {showSearchBox && !isSearchPage && (
          <div className='hidden lg:block'>
            <div
              aria-hidden='true'
              className='border-dark-gray mx-2.5 mb-4 w-20 border-t border-opacity-0 lg:w-auto lg:border-opacity-100'
            />
            <SearchComponentSideBar
              activateSearchPopup={() => navigation.ToggleSearchComponent()}
            />
          </div>
        )}
      </nav>
      <div
        aria-hidden
        className={
          hoverActive
            ? "lg:bg-nav-gray right-0 top-0 bottom-0 left-0 z-30 lg:fixed lg:bg-opacity-60"
            : " "
        }
      />
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
    mobile: PropTypes.shape({
      src: PropTypes.string,
    }),
    to: PropTypes.string,
  }).isRequired,
  navigation: PropTypes.shape({
    ToggleSearchComponent: PropTypes.func,
  }).isRequired,
}

MainNavigation.defaultProps = {
  className: "",
}

export default MainNavigation
