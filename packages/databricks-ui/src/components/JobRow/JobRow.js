import React from "react"
import PropTypes from "prop-types"
import Link from "../Link"

const JobRow = ({ to, title, office, className }) => {
  return (
    <Link
      className={`text-navy-06 hover:text-orange-04 flex w-full cursor-pointer font-medium hover:no-underline ${className}`}
      label={title}
      to={to}
    >
      <span className='text-1.5 lg:text-2.5 w-1/2 py-2.5 pl-1 lg:pl-2.5'>
        {title}
      </span>
      <span className='text-1.5 lg:text-2.5 border-l-gray-lines w-1/2 border-l py-2.5 pl-1 lg:pl-2.5'>
        {office}
      </span>
    </Link>
  )
}

JobRow.propTypes = {
  to: PropTypes.string,
  title: PropTypes.string,
  office: PropTypes.string,
  className: PropTypes.string,
}

JobRow.defaultProps = {
  to: "",
  title: "",
  office: "",
  className: "",
}

export default JobRow
