import React from "react"
import PropTypes from "prop-types"

const BulletedList = ({ title, items }) => {
  return (
    <div className='text-navy-06 flex flex-col gap-3 md:w-7/12 lg:w-6/12'>
      {title && <h3 className='border-gray-lines border-t pt-3'>{title}</h3>}
      <ul className='marker:text-orange-04 flex list-outside list-disc flex-col gap-1 pl-2'>
        {items.map((item) => (
          <li className='b4' key={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

BulletedList.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.node.isRequired,
    })
  ).isRequired,
}
BulletedList.defaultProps = {
  title: null,
}

export default BulletedList
