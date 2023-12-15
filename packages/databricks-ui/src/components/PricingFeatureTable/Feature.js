import React, { useState } from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import RichText from "../RichText"

const Feature = ({ name, details }) => {
  const [isOpen, setOpen] = useState(false)

  return (
    <div className=''>
      <button
        type='button'
        onClick={() => setOpen(!isOpen)}
        aria-expanded={isOpen}
        className='flex w-full cursor-pointer items-center text-left'
      >
        <IconResolver
          className='text-orange-04 mr-1.5 w-2'
          token={isOpen ? "minus" : "plus"}
        />
        <p>{name}</p>
      </button>
      {isOpen && (
        <div className='flex flex-col pl-5'>
          <RichText
            className='text-1.75'
            dangerouslySetInnerHTML={{ __html: details }}
          />
        </div>
      )}
    </div>
  )
}

Feature.propTypes = {
  name: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
}

export default Feature
