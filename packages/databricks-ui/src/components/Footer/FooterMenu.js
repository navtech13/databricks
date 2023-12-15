import React, { useState } from "react"
import PropTypes from "prop-types"
import Link from "../Link"
import IconResolver from "../IconResolver"

const FooterMenu = ({ items, ...props }) => {
  const [open, setOpen] = useState(false)

  return (
    <li className='basis-full first:ml-0' {...props}>
      <ul className='hidden md:block'>
        {items.map((item) => {
          return (
            <li
              key={`${item.to}${item.label}`}
              className='mr-4 pb-2 first:font-bold lg:pb-2'
            >
              <Link
                to={item.to}
                label={item.label}
                className='inline-block pl-0 text-white hover:text-white'
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>

      <ul className='block md:hidden'>
        {items.map((item, i) => {
          return (
            <li
              key={`${item.to}${item.label}`}
              className='flex items-start justify-between'
            >
              <Link
                label={item.label}
                to={item.to}
                className={`text-1.75 basis-full pl-0 pb-2 text-white hover:text-white ${
                  i === 0 ? "font-bold" : ""
                } ${i > 0 && !open ? "hidden" : ""}`}
              >
                {item.label}
              </Link>
              {i === 0 && (
                <button
                  aria-label={item.label}
                  type='button'
                  className={`text-2.5 font-bold transition-all duration-200 ${
                    open ? "-rotate-180" : ""
                  }`}
                  onClick={() => setOpen(!open)}
                >
                  <IconResolver token='arrowDown' />
                </button>
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
