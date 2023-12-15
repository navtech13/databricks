import React from "react"
import PropTypes from "prop-types"

const AgendaItem = ({ title, start, end, description }) => {
  return (
    <div data-cy='AgendaItem' className='bg-gray-warm-light m-2.5'>
      <div className='p-2.5'>{title}</div>
      <div className='p-2.5'>{start}</div>
      <div className='p-2.5'>{end}</div>
      <div className='p-2.5'>{description}</div>
    </div>
  )
}

AgendaItem.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default AgendaItem
