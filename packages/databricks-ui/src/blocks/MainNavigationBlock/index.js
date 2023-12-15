/* eslint-disable camelcase */
import React from "react"
import PropTypes from "prop-types"
import { MainNavigation, MainNavigationTopHorizontal } from "../../components"

const MainNavigationBlock = ({
  navigation_behavior,
  image,
  menus,
  variant,
  ...props
}) => {
  // TODO: check if it's needed to support only 2 menus
  const menuMap = {
    0: "default",
    1: "bottom",
    2: "sticky",
  }
  if (variant === "topHorizontal") {
    return (
      <MainNavigationTopHorizontal
        image={image}
        navigation={navigation_behavior}
        {...props}
      >
        {menus.map(({ divider, links: menuItems }, i) => {
          return (
            <MainNavigationTopHorizontal.Menu
              menuType={menuMap[i]}
              key={`${divider}${menuItems.length}`}
              divider={divider}
            >
              {menuItems?.map(({ label, to, type, links, items }) => {
                return (
                  <MainNavigationTopHorizontal.Item
                    key={label}
                    label={label}
                    to={to}
                    type={type}
                    links={links}
                    items={items}
                  />
                )
              })}
            </MainNavigationTopHorizontal.Menu>
          )
        })}
      </MainNavigationTopHorizontal>
    )
  }

  return (
    <MainNavigation image={image} navigation={navigation_behavior} {...props}>
      {menus.map(({ divider, links: menuItems }) => {
        return (
          <MainNavigation.Menu
            key={`${divider}${menuItems.length}`}
            divider={divider}
          >
            {menuItems?.map(({ label, to, type, links, items }) => {
              return (
                <MainNavigation.Item
                  key={label}
                  label={label}
                  to={to}
                  type={type}
                  links={links}
                  items={items}
                />
              )
            })}
          </MainNavigation.Menu>
        )
      })}
    </MainNavigation>
  )
}

MainNavigationBlock.propTypes = {
  image: PropTypes.shape({}).isRequired,
  menus: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  navigation_behavior: PropTypes.shape({}).isRequired,
  variant: PropTypes.string,
}

MainNavigationBlock.defaultProps = {
  variant: "default",
}

export default MainNavigationBlock
