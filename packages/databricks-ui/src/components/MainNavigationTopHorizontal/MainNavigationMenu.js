import React, { useContext } from "react"
import PropTypes from "prop-types"
import Context from "./MainNavigationContext"

const FooterWrapper = ({ children, ...props }) => (
  <div {...props}>
    <div className='xl:inner-wrapper border-oat-medium mt-3 border-t py-2 xl:mt-0 xl:border-t-0'>
      {children}
    </div>
  </div>
)

FooterWrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

const MainNavigationMenu = ({ children, menuType, ...props }) => {
  const { desktopTop, activeSubmenu } = useContext(Context)

  const menuMap = {
    sticky: {
      id: "megamenu-ctas",
      className:
        "md:w-full xl:bg-white sticky bottom-0 xl:w-auto grid grid-cols-2 pb-[64px] xl:pb-0 bg-oat-light border-t border-orange-600 xl:border-none px-2 pt-2 xl:pt-0 xl:px-0 left-0 md:right-0 xl:left-0 xl:static w-full bg-white xl:w-auto order-4 xl:shrink-0",
      style: {},
      Wrapper: React.Fragment,
    },
    default: {
      className:
        "xl:w-full block xl:py-0 xl:h-auto order-2 scroll-bar-transparent overflow-y-scroll xl:overflow-visible",
      style: {},
      Wrapper: React.Fragment,
    },
    bottom: {
      id: "megamenu-footer",
      className: "flex xl:mt-0",
      wrapperClassname: `xl:shadow-shadow-2 xl:mx-0 mx-2 xl:border-t xl:border-oat-medium xl:bg-navy-800 block xl:left-0 xl:pb-0 bg-white xl:w-full ${
        activeSubmenu ? "" : "xl:hidden "
      }`,
      style: {
        top: desktopTop ? desktopTop + 64 : -300,
      },
      Wrapper: FooterWrapper,
    },
  }
  const currentMenuType = menuMap[menuType] || menuMap.default

  const menuProps = {
    style: currentMenuType.style,
    className: currentMenuType.wrapperClassname,
  }
  return (
    <currentMenuType.Wrapper {...(menuType === "bottom" && menuProps)}>
      <ul
        className={`${currentMenuType.className} xl:flex`}
        {...props}
        id={currentMenuType.id}
      >
        {children}
      </ul>
    </currentMenuType.Wrapper>
  )
}

MainNavigationMenu.propTypes = {
  children: PropTypes.node.isRequired,
  menuType: PropTypes.oneOf(["default", "sticky", "bottom"]),
}

MainNavigationMenu.defaultProps = {
  menuType: "default",
}

export default MainNavigationMenu
