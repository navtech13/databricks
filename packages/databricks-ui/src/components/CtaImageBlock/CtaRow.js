import React from "react"
import PropTypes from "prop-types"
import Link from "../Link"

const CtaRow = ({ ctaRow }) => {
  if (!ctaRow) {
    return <></>
  }

  return (
    <div className='mt-4 space-x-3'>
      {ctaRow.map(({ entity }) => {
        const colorMap = {
          primary: "bg-navy-800 text-white",
          secondary: "bg-white text-navy-800",
          tertiary: "bg-white text-navy-800",
        }

        const className = entity.fieldBoolean
          ? "arrow-icon-tertiary text-navy-800 hover:text-navy-800 tertiary-underline"
          : `${
              colorMap[entity.fieldCtasectionVariant]
            } border-navy-800 hover:border-navy-500 p-2 text-2 hover:btn-tertiary inline-block border font-medium leading-none transition-colors duration-200 hover:no-underline`

        return (
          <Link
            key={entity.uuid}
            className={className}
            to={entity.fieldLink?.url?.path}
          >
            {entity.fieldLink?.title}
          </Link>
        )
      })}
    </div>
  )
}

CtaRow.propTypes = {
  ctaRow: PropTypes.arrayOf(PropTypes.shape({})),
}

CtaRow.defaultProps = {
  ctaRow: undefined,
}

export default CtaRow
