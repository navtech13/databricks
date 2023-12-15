/* eslint-disable react/no-array-index-key */
import React, { useContext, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import Context from "./MainNavigationContext"
import Link from "../Link"
import Button from "../Button"
import { useBreakpoint } from "../../utils/use-breakpoint"
import AccordionLink from "./AccordionLink"
import AccordionButton from "./AccordionButton"
import NavAccordion from "./NavAccordion"

export const calculateId = (label, level) =>
  `${label?.split(" ").join("").toLowerCase()}-${level}`

const rearrangeArray = (arr, groups) => {
  const groupSize = Math.ceil(arr.length / groups)
  const rearrangedArray = []

  for (let i = 0; i < groupSize; i += 1) {
    for (let j = 0; j < groups; j += 1) {
      const index = i + j * groupSize
      if (index < arr.length) {
        rearrangedArray.push(arr[index])
      }
    }
  }

  return rearrangedArray
}

const MainNavigationItem = ({
  label,
  to,
  type,
  active,
  links,
  items,
  level,
  description,
  linkVariant,
  column,
  width,
  highlightedItem,
  breakAfter,
  subheader,
  idPrefix,
  ...props
}) => {
  const isDesktop = useBreakpoint("xl")
  const { setActiveSubmenu, activeSubmenu, setDesktopTop } = useContext(Context)
  const itemId = calculateId(label, level)
  let isLevel0Open = null
  let isLevel2Open = null
  let isLevel3Open = null
  const containerRef = useRef()
  const itemRef = useRef(null)
  if (level === 0) {
    isLevel0Open = activeSubmenu?.level0?.id === itemId
  }
  if (level === 2) {
    isLevel2Open = activeSubmenu?.level2?.id === itemId
  }
  if (level === 3) {
    isLevel3Open = activeSubmenu?.level3?.id === itemId
  }
  const isAccordion = links?.length > 0

  useEffect(() => {
    let resizeObserver
    if (itemRef.current) {
      resizeObserver = new ResizeObserver((entries) => {
        let heightValue = 0
        entries.forEach(() => {
          heightValue = itemRef?.current?.clientHeight
        })
        if (heightValue) {
          setDesktopTop(heightValue)
        }
      })
      resizeObserver.observe(itemRef?.current.parentElement)
    }
    return () => {
      resizeObserver?.disconnect()
    }
  }, [isDesktop])

  const level0LinkTypes = {
    hover: {
      styles: `xl:leading-none xl:h-[64.5px] xl:z-10 xl:mx-0 border-oat-medium xl:border-b-4 xl:margin-0 p-2.5  xl:pt-3 xl:px-1.5 xl:text-2 flex items-center justify-between leading-none xl:font-normal text-2.5 flex-1  ${
        isLevel0Open
          ? "xl:border-orange-600 xl:text-navy-800 bg-orange-100 border-l-4 xl:border-l-0 xl:bg-white pl-2 border-orange-600"
          : "xl:border-[transparent] xl:hover:border-navy-800"
      } ${
        activeSubmenu && !isLevel0Open ? "xl:text-gray-text hover:text-navy-800" : ""
      }`,
      props: { activeSubmenu, isLevel0Open },
      component: NavAccordion,
    },
    button: {
      variant: "primary",
      styles:
        "ml-2 xl:ml-3 header-cta hover:bg-navy-800 w-full btn-primary-accessible",
      component: Button,
    },
    text: {
      styles: `w-full bg-white flex justify-center hover:no-underline xl:pl-2 xl:h-full text-navy-800 py-0 xl:text-1.75 xl:leading-none hover:text-orange-600 flex items-center leading-12 text-1.75 flex-1`,
      component: Link,
    },
    bottom: {
      styles: `hover:no-underline xl:pr-3 xl:h-full items-center first:xl:ml-1 leading-none text-2 flex-1 ${
        linkVariant === "arrowCta"
          ? `arrow-icon-tertiary overflow-hidden text-blue-700 hover:text-blue-700 xl:text-yellow-500 xl:hover:text-yellow-500 initial-fix`
          : "text-navy-800 xl:text-white"
      }`,
      component: to ? Link : "div",
    },
  }

  const levelMap = [
    // level 0
    {
      link: {
        type: level0LinkTypes[type].component,
        styles: `${level0LinkTypes[type].styles}`,
        variant: level0LinkTypes[type].variant,
        properties: {
          ...level0LinkTypes[type].props,
          to,
          label,
          as: Link,
          onClickCallback: () => {
            if (isLevel0Open) {
              return setActiveSubmenu(null)
            }
            const newlevelState = isLevel0Open ? null : itemId
            const level2 = links?.[0]?.links?.[0]
            return setActiveSubmenu({
              level0: { id: newlevelState, links: null },
              ...(level2?.links && {
                level2: { id: calculateId(level2?.label, 2), links: level2?.links },
              }),
            })
          },
        },
      },
      // TODO: check alternative to show the same CTAs in desktop and mobile. Currently the first item of the menu is hidden in mobile according to Figma
      li: `xl:w-auto group transition-all xl:text-2 flex flex-wrap xl:py-0 xl:px-0 justify-between ${
        type === "text" ? "first:hidden xl:first:block" : ""
      } ${type === "bottom" ? "ml-2 first:ml-0 xl:ml-0 xl:first:ml-0" : ""}`,
      ul: `${
        isLevel0Open
          ? `animate-fade-in overflow-x-hidden xl:pb-4 xl:max-h-[calc(100vh-120px)]`
          : "hidden"
      } w-full xl:w-[100vw] bg-white ${
        isLevel0Open ? "xl:w-full xl:flex xl:justify-center" : "xl:hidden"
      } `,
    },
    // level 1
    {
      li: "xl:w-full inner-wrapper",
      ul: "xl:grid grid-cols-4 gap-x-4 relative grid-flow-dense",
    },
    // level 2
    {
      li: `xl:mr-2 header-mobile-accordion text-navy-100 `,
      liStyle: {
        gridColumn: `${column || "auto"} / span ${width || "auto"}`,
        gridRow: `span ${
          1 +
          Math.ceil(
            (links?.reduce(
              (accum, item) => (item.description ? accum + 4 : accum + 3),
              0
            ) || 1) / (width || 1)
          ) +
          (highlightedItem ? 1 : 0)
        }`,
      },
      link: {
        type: isAccordion ? AccordionButton : Link,
        properties: {
          to,
          "data-menulinktype": isAccordion ? "AccordionButton" : "Link",
          "aria-label": label,
          onClickCallback: () => {
            if (isDesktop) {
              return null
            }
            const newlevelState = isLevel2Open ? null : itemId

            return setActiveSubmenu({
              ...activeSubmenu,
              level2: { id: newlevelState, links },
            })
          },
          active: isLevel2Open,
        },
        styles: `xl:border-b xl:border-oat-medium w-full xl:rounded-sm text-left pb-1 xl:pb-2 text-navy-800 block hover:text-navy-800 hover:no-underline`,
        variant: "B",
      },
      ul: "xl:pt-0.5",
      ulProperties: {
        style: {
          columns: (isDesktop && width) || 1,
          columnGap: "32px",
        },
      },
    },
    // level 3
    {
      li: `xl:mt-2 mt-1.5 ${breakAfter ? "xl:break-after-column" : ""}`,
      link: {
        type: isAccordion ? AccordionButton : AccordionLink,
        "data-menulinktype": isAccordion ? "AccordionButton" : "Link",
        properties: {
          to,
          "aria-label": label,
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === "Spacebar") {
              e?.target?.click()
            }
          },
          onClickCallback: () => {
            if (isDesktop) {
              return null
            }
            const newlevelState = isLevel3Open ? null : itemId
            return setActiveSubmenu({
              ...activeSubmenu,
              level3: { id: newlevelState, links },
            })
          },
          active: isLevel3Open,
          description,
        },
        styles: `block xl:text-2 text-2 xl:leading-4 py-1 break-inside-avoid xl:-mx-1.5 xl:px-1.5 xl:hover:bg-oat-light rounded`,
        variant: "B",
      },
      ul: `${
        isLevel3Open ? "block" : "hidden"
      } xl:absolute top-0 left-full xl:border-oat-medium xl:pt-3 xl:px-2 xl:pb-2 xl:border-l min-h-[100%]`,
      description: {
        styles: "",
      },
    },
    // level 4
    {
      link: {
        type: AccordionLink,
        properties: {
          to,
          "aria-label": label,
          description,
        },
        styles: `block xl:text-2 py-2 pl-6 text-1.75 pr-0 xl:p-1 xl:mb-1 xl:rounded-sm xl:hover:bg-oat-light xl:w-[360px] xxl:w-[470px] ${
          isLevel3Open ? "xl:bg-oat-light xl:rounded-sm" : ""
        }`,
        variant: "B",
      },
      description: {
        styles: "",
      },
    },
  ]

  const LinkComponent = levelMap[level].link?.type
  const ulWrapperProps = {
    0: {
      className: `${
        activeSubmenu ? "border-oat-medium" : "border-[transparent]"
      } left-0 w-full bg-white xl:absolute xl:max-h-[calc(100vh-64px)] overflow-auto xl:overflow-x-hidden xl:shadow-shadow-2`,
      style: {
        top: isDesktop ? 64 : "auto",
      },
    },
    2: {
      className: ``,
    },
  }
  const UlWrapper = ulWrapperProps[level] ? "div" : React.Fragment

  let orderedLinks = links

  if (links && level === 2 && width > 1 && !isDesktop) {
    orderedLinks = rearrangeArray(orderedLinks, width)
  }

  return (
    <li
      ref={containerRef}
      className={levelMap[level].li}
      style={levelMap[level].liStyle}
      {...props}
    >
      {label && LinkComponent && (
        <LinkComponent
          id={`${idPrefix}${itemId}`}
          variant={levelMap[level].link?.variant}
          className={levelMap[level].link?.styles}
          {...levelMap[level].link?.properties}
          {...{
            [to ? "onClickCallback" : "onClick"]: (e) => {
              if (to) {
                const url = new URL(to, document.location)
                if (url.pathname === document.location.pathname) {
                  window.location.hash = url.hash
                  setTimeout(() => document.location.reload(), 10)
                }
              }
              if (levelMap[level].link?.properties?.onClickCallback) {
                levelMap[level].link.properties.onClickCallback(e)
              }
            },
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              document.getElementById(activeSubmenu?.level0?.id)?.focus()
              setActiveSubmenu(null)
            }
            if (level === 2 || level === 3) {
              if (e.key === "Enter" || e.key === "Spacebar") {
                levelMap[level].link?.properties.onClickCallback()
                levelMap[level].link?.properties.onMouseEnter()
              }
            }
          }}
        >
          {label}
        </LinkComponent>
      )}
      {highlightedItem && (
        <div className='group/highlight relative'>
          <AccordionLink
            className='xl:text-2 text-1.75 peer relative z-10 mt-2.5 block py-1 xl:leading-none'
            {...highlightedItem}
          >
            {highlightedItem.label}
          </AccordionLink>
          <div className='bg-oat-medium xl:peer-hover:bg-oat-light absolute -left-0.5 top-0 h-full w-[calc(100%+10px)] rounded-sm transition-all xl:peer-hover:-left-1.5 xl:peer-hover:-top-0.5 xl:peer-hover:h-[calc(100%+8px)] xl:peer-hover:w-[calc(100%+24px)]' />
        </div>
      )}
      {links && (
        <UlWrapper {...(UlWrapper === "div" ? ulWrapperProps[level] : null)}>
          <ul
            className={levelMap[level].ul}
            {...levelMap[level].ulProperties}
            ref={(ref) => {
              if (level !== 0) {
                return null
              }
              itemRef.current = ref
              return null
            }}
          >
            {orderedLinks.map((item, i) => {
              return (
                <MainNavigationItem
                  level={level + 1}
                  key={`${item.label}_${i}`}
                  breakAfter={
                    i === Math.ceil(orderedLinks.length / (width || 1)) - 1
                  }
                  {...item}
                />
              )
            })}
          </ul>
          {level === 0 && isLevel0Open && isDesktop && subheader}
        </UlWrapper>
      )}
      {/* Components */}
      {items && <div className='top-full w-full xl:block xl:h-full'>{items}</div>}
    </li>
  )
}

MainNavigationItem.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  idPrefix: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
  column: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  highlightedItem: PropTypes.shape({ label: PropTypes.string }),
  breakAfter: PropTypes.bool,
  active: PropTypes.bool,
  level: PropTypes.number,
  subheader: PropTypes.node,
  linkVariant: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      links: PropTypes.arrayOf(PropTypes.shape({})),
    })
  ),
}

MainNavigationItem.defaultProps = {
  type: "hover",
  active: false,
  items: undefined,
  idPrefix: "",
  to: undefined,
  links: undefined,
  label: undefined,
  column: undefined,
  width: 1,
  highlightedItem: undefined,
  breakAfter: undefined,
  description: undefined,
  linkVariant: "default",
  subheader: undefined,
  level: 0,
}

export default MainNavigationItem
