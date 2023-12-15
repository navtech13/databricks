import React from "react"
import PropTypes from "prop-types"
import ReactHtmlParser from "react-html-parser"
import RichText from "../RichText"
import IconResolver from "../IconResolver"

const AccordionItem = ({
  children,
  description,
  isOpen,
  handleClick,
  variant,
  parseToHtml,
}) => {
  const variantMap = {
    default: {
      wrapper: "bg-gray-warm-light p-2.5",
      button: "flex w-full cursor-pointer text-left",
      description: "rich-text-body pl-2.5 w-full",
      descriptionNoIcon: "rich-text-body pl-5 w-full",
      childrenWrapper: "flex flex-col gap-2.5 pt-2.5 pl-5",
    },
    large: {
      wrapper: "border-gray-lines py-3 gap-2 flex flex-col border-t",
      button:
        "flex w-full cursor-pointer flex-row-reverse items-baseline justify-between gap-0.5 text-left",
      description: "h3 w-full",
      childrenWrapper: "lg:w-10/12",
      icon: "md:pr-1.5 lg:pr-3 lg:pl-8",
    },
  }

  return (
    <div data-cy='AccordionItem' className={variantMap[variant]?.wrapper}>
      {children.length > 0 ? (
        <button
          type='button'
          onClick={() => handleClick(!isOpen)}
          aria-expanded={isOpen}
          className={variantMap[variant]?.button}
        >
          <div className={variantMap[variant]?.icon}>
            <IconResolver
              className='text-orange-04'
              token={isOpen ? "minus" : "plus"}
            />
          </div>
          <RichText className={variantMap[variant]?.description}>
            {description}
          </RichText>
        </button>
      ) : (
        <RichText className={variantMap[variant]?.descriptionNoIcon}>
          {description}
        </RichText>
      )}
      <div
        aria-hidden={!isOpen}
        className={`${variantMap[variant]?.childrenWrapper} ${
          isOpen ? "" : "hidden"
        }`}
      >
        {parseToHtml ? ReactHtmlParser(children) : children}
      </div>
    </div>
  )
}

AccordionItem.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  variant: PropTypes.oneOf(["default", "large"]),
  parseToHtml: PropTypes.bool,
}

AccordionItem.defaultProps = {
  variant: "default",
  handleClick: undefined,
  isOpen: undefined,
  parseToHtml: false,
}

export default AccordionItem
