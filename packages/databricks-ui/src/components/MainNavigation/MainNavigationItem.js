import React, { useContext } from "react"
import PropTypes from "prop-types"
import TextLink from "../TextLink"
import TextButton from "../TextButton"
import IconResolver from "../IconResolver"
import Context from "./MainNavigationContext"

const MainNavigationItem = ({
  label,
  to,
  type,
  active,
  links,
  items,
  level,
  ...props
}) => {
  const { mobileOpen, setMobileOpen, setHoverActive, top, setTop } =
    useContext(Context)

  const activeStyles =
    "focus:bg-gray hover:bg-gray lg:leading-5 transition-colors duration-200"

  const linkTypes = {
    hover: {
      variant: "C",
      styles: `hover:no-underline py-0 lg:py-1 lg:text-1.6 font-bold lg:font-normal leading-11 text-2.5 flex-1 ${
        active ? "" : activeStyles
      }`,
    },
    button: {
      variant: "D",
      styles: "mx-2.5 lg:mx-1 mb-1 lg:w-full text-sm text-1.75",
    },
    text: {
      variant: "C",
      styles: `hover:no-underline py-0 lg:py-1 lg:text-2 leading-12 text-1.75 flex-1 ${
        active ? "" : activeStyles
      }`,
    },
    // button: { variant: "D", styles: "mx-2.5 lg:mx-1 mb-1 lg:w-full text-sm text-1.4" },
    // text: { variant: "C", styles: "mx-0.5 lg:mx-0" },
  }

  const isCurrentMobile = mobileOpen === label

  const levelMap = [
    // level 0
    {
      link: {
        type: TextLink,
        styles: `${linkTypes[type].styles} ${
          isCurrentMobile ? "bg-orange-04 hover:bg-orange-04 focus:bg-orange-04" : ""
        }`,
        variant: linkTypes[type].variant,
        properties: {
          to,
          label,
        },
      },
      li: `group flex flex-wrap justify-between`,
      ul: `${
        isCurrentMobile ? "" : "hidden"
      } w-full bg-white lg:min-w-[850px] transition-all lg:fixed lg:hidden lg:w-auto lg:-translate-y-6 left-20 lg:duration-300 lg:group-focus-within:flex lg:group-hover:flex`,
    },
    // level 1
    {
      li: items
        ? "lg:w-[385px]"
        : "lg:flex-1 first:pt-2.5 px-2.5 lg:py-8 first:lg:pt-8 lg:pl-8 first:lg:pl-8 lg:pr-0",
    },
    // level 2
    {
      li: "pb-1",
      link: {
        type: TextButton,
        properties: { to, "aria-label": label },
        styles: "h4 lg:b2 py-0.5",
        variant: "B",
      },
      ul: "lg:pl-1",
    },
    // level 3
    {
      link: {
        type: TextButton,
        properties: { to, "aria-label": label },
        styles: "text-2 py-1 lg:py-0.5",
        variant: "B",
      },
    },
  ]

  const LinkComponent = levelMap[level].link?.type

  const changeElementPosition = (e) => {
    const rect = e.target.getBoundingClientRect()
    setTop(rect.top)
  }
  const transitionStyles = level === 0 ? { top } : {}

  return (
    <li
      className={levelMap[level].li}
      {...(level === 0 &&
        type === "hover" && {
          onMouseEnter: (e) => {
            changeElementPosition(e)
            setHoverActive(true)
          },
          onFocus: () => setHoverActive(true),
          onMouseLeave: (event) => {
            // Validate if the mouseleave is triggered by the gatsby image
            // hover state should not deactivate if triggered by the image tag
            if (event.relatedTarget.tagName !== "IMG") {
              return setHoverActive(false)
            }
            return false
          },
          onBlur: () => setHoverActive(false),
        })}
      {...props}
    >
      {label && LinkComponent && (
        <LinkComponent
          variant={levelMap[level].link?.variant}
          className={levelMap[level].link?.styles}
          {...levelMap[level].link?.properties}
        >
          {label}
        </LinkComponent>
      )}
      {links && level === 0 && (
        <button
          aria-label={label}
          type='button'
          className={`px-1 transition-colors duration-200 lg:hidden ${
            isCurrentMobile
              ? "bg-orange-04 hover:bg-orange-04 focus:bg-orange-04"
              : ""
          } ${activeStyles}`}
          onClick={() => setMobileOpen(isCurrentMobile ? "none" : label)}
        >
          <IconResolver
            token='arrowDown'
            className={`h2 text-white ${isCurrentMobile ? "" : "-rotate-90"}`}
          />
        </button>
      )}
      {links && (
        <ul className={levelMap[level].ul} style={transitionStyles}>
          {links.map((item) => {
            return (
              <MainNavigationItem
                level={level + 1}
                key={JSON.stringify({ ...item, items: item?.items?.length })}
                {...item}
              />
            )
          })}
        </ul>
      )}
      <div className='absolute top-full w-full lg:static lg:block lg:h-full'>
        {items}
      </div>
    </li>
  )
}

MainNavigationItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  label: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
  active: PropTypes.bool,
  level: PropTypes.number,
  links: PropTypes.arrayOf(PropTypes.shape({})),
}

MainNavigationItem.defaultProps = {
  type: "hover",
  active: false,
  items: undefined,
  to: undefined,
  links: undefined,
  label: undefined,
  level: 0,
}

export default MainNavigationItem
