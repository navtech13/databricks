import React from "react"
import PropTypes from "prop-types"

const TextColumns = ({ children, className, title, columns, ...props }) => {
  const columnStyles = ["md:w-12/12", "md:w-6/12", "md:w-3/12", "md:w-2/12"]

  return (
    <section {...props} className={className}>
      {title && <h2 className='mb-2.5 px-2 md:w-6/12 lg:w-4/12'>{title}</h2>}
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
    </section>
  )
}

TextColumns.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  columns: PropTypes.oneOf([1, 2, 3, 4]),
}

TextColumns.defaultProps = {
  className: "",
  title: undefined,
  columns: 4,
}

export default TextColumns
