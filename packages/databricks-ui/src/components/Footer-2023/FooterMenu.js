import React, { useState } from "react"
import PropTypes from "prop-types"
import Link from "../Link"
import IconResolver from "../IconResolver"

const FooterMenu = ({ items, ...props }) => {
  const [open, setOpen] = useState(false)

  return (
    <li className='basis-full first:ml-0' {...props}>
      <ul className='hidden lg:block'>
        {items?.map((item, index) => {
          const links = item?.links
          const Component = item?.to ? Link : "span"
          return (
            <li
              key={`${item.to}${item.label}`}
              className={`first:text-2 text-1.75 pb-2 text-white first:pb-3 first:font-medium first:text-orange-500 hover:text-white first:hover:text-orange-500 lg:pb-2 ${
                links && " flex flex-col gap-1"
              } `}
            >
              <Component
                to={item.to}
                label={item.label}
                className={`inline-block pl-0 text-inherit hover:text-inherit ${
                  Component !== "span" && "tertiary-underline"
                }
                `}
              >
                {item.label}
              </Component>
              {links && (
                <ul className='text-navy-400 flex flex-col gap-1'>
                  {links.map((link) => {
                    const ComponentLi = link?.to ? Link : "span"
                    return (
                      <li key={`${link.to}${link.label} `}>
                        <ComponentLi
                          to={link.to}
                          label={link.label}
                          className='tertiary-underline text-inherit hover:text-inherit'
                        >
                          {link.label}
                        </ComponentLi>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>

      <ul className='block lg:hidden'>
        {items.map((item, index) => {
          const links = item?.links
          const Component = item?.links ? Link : "button"
          return (
            <li
              key={`${item.to}${item.label}`}
              className={`first:text-2 text-1.75 flex flex-col items-start gap-1 text-white first:font-medium first:text-orange-500 hover:text-white first:hover:text-orange-500 ${
                open && index > 0 ? " pt-2" : " "
              }`}
            >
              <div className=' flex items-center'>
                <Component
                  label={item.label}
                  to={item.to}
                  onClick={Component === "button" ? () => setOpen(!open) : null}
                  className={`${
                    item?.links && "pl-0 text-inherit hover:text-inherit"
                  } ${index > 0 && !open ? "hidden" : ""}`}
                >
                  {item.label}
                </Component>
                {index === 0 && (
                  <button
                    aria-label={item.label}
                    type='button'
                    className={`text-3 font-bold transition-all duration-200 ${
                      open ? "-rotate-180" : ""
                    }`}
                    onClick={() => setOpen(!open)}
                  >
                    <IconResolver token='arrowDown' />
                  </button>
                )}
              </div>
              {links && (
                <ul
                  className={`text-navy-400 flex flex-col gap-1 ${
                    index > 0 && !open ? "hidden" : ""
                  }`}
                >
                  {links.map((link) => {
                    return (
                      <li key={`${link.to}${link.label}`}>
                        <Link
                          to={link.to}
                          label={link.label}
                          className='inline-block text-inherit hover:text-inherit'
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </li>
  )
}

FooterMenu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
}

export default FooterMenu
