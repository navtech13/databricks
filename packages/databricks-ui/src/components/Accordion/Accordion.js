import React, { useState } from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import IconResolver from "../IconResolver"
import "./styles.css"

const Accordion = ({ children, description, variant, index }) => {
  const [isOpen, setOpen] = useState(index === 0)

  const variantMap = {
    gray: "gap-2.5 pt-0 pl-5",
    white: "gap-2.5 pt-0 pl-5",
    alternate: "",
  }

  const style = variantMap[variant]

  return (
    <div data-cy='Accordion' className={`component-accordion ${(variant === 'gray' || variant === 'white') && 'px-3 py-4'}`}>
      <button
        type='button'
        onClick={() => setOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full cursor-pointer text-left items-center ${variant === 'alternate' && 'p-2.5'} ${isOpen && (style === 'alternate') ? "border-dashed border-b border-gray-lines-new" : ""}`}
      >
        <IconResolver
          className='text-orange-04'
          token={isOpen ? "minus" : "plus"}
        />
        <RichText className='rich-text-body pl-2.5 w-full b2'>{description}</RichText>
      </button>
      <div
        aria-hidden={!isOpen}
        className={`flex flex-col b3 ${style} ${isOpen ? "" : "hidden"}`}
      >
        {children}
      </div>
    </div>
  )
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["gray", "white", "alternate"]),
  index: PropTypes.number,
}

Accordion.defaultProps = {
  variant: "gray",
  index: 0,
}

export default Accordion
