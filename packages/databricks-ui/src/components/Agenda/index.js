import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"

const Agenda = ({ items, ...props }) => {
  return (
    <div data-cy='Agenda' className='flex flex-col gap-2.5' {...props}>
      {items.map((item) => (
        <div key={item.key}>
          <RichText className='b4 text-orange-05 '>{item.title}</RichText>
          <RichText className='b4 '>{item.description}</RichText>
          {item.footer && (
            <RichText className='b4 text-navy-04 '>{item.footer}</RichText>
          )}
        </div>
      ))}
    </div>
  )
}

Agenda.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      footer: PropTypes.string,
    })
  ).isRequired,
}

export default Agenda
