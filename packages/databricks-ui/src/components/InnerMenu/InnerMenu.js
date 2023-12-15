import React from "react"
import PropTypes from "prop-types"
import TextButton from "../TextButton"

const InnerMenu = ({ items, ...props }) => {
  return (
    <ul data-cy='InnerMenu' {...props}>
      {items.length > 0 &&
        items.map((item) => {
          return (
            <li
              data-cy='InnerMenu-item'
              key={item.key || item.text}
              className='border-r-gray-lines b4 mr-2.5 mb-3 inline-block border-r pr-4 last:border-none'
            >
              <TextButton variant='A' to={item.to}>
                {item.text}
              </TextButton>
            </li>
          )
        })}
    </ul>
  )
}

InnerMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
}

export default InnerMenu
