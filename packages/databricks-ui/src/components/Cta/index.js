import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import "./styles.css"
import { generateCTAs } from "../../utils/generateCTAs"
import Link from "../Link"

const Cta = ({ ctas, title, children, className, ...props }) => {
  if (!ctas) {
    return <></>
  }
  return (
    <section
      data-cy='Cta'
      className={`component-cta bg-gray-warm-medium flex flex-col items-center justify-center gap-4 p-4 text-center sm:flex-row sm:justify-between sm:gap-0 ${className}`}
      {...props}
    >
      <div className='flex flex-wrap'>
        {title && <h2 className='w-full'>{title}</h2>}
        {children && <RichText className='h3'>{children}</RichText>}
      </div>
      <div className='ml-1 flex gap-1'>
        {generateCTAs(ctas, Link, "first:px-4 text-center")}
      </div>
    </section>
  )
}

Cta.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      text: PropTypes.string,
    })
  ).isRequired,
}

Cta.defaultProps = {
  title: undefined,
  children: undefined,
  className: "",
}

export default Cta
