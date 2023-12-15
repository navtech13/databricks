import React from "react"
import PropTypes from "prop-types"

const CardColumns = ({ children, className, title, columns, ...props }) => {
  const columnStyles = ["md:w-12/12", "md:w-6/12", "md:w-4/12", "md:w-3/12"]

  return (
    <section {...props} className='bg-gray-warm-light'>
      <div className='mx-auto max-w-[1145px] py-4'>
        {title && <h2 className='mx-auto mb-4 w-10/12 lg:w-full'>{title}</h2>}
        <div
          className={`flex flex-wrap ${
            columns > 2 ? "justify-between" : "justify-start"
          }`}
        >
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              columnSize: columnStyles[columns - 1],
            })
          })}
        </div>
      </div>
    </section>
  )
}

CardColumns.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  columns: PropTypes.oneOf([1, 2, 3, 4]),
}

CardColumns.defaultProps = {
  className: "",
  title: undefined,
  columns: 4,
}

export default CardColumns
