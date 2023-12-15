import React from "react"
import PropTypes from "prop-types"
import Button from "../Button"
import TextLink from "../TextLink"
import Link from "../Link"

const CtaRow = ({ items, position, ...props }) => {
  const variantMap = {
    left: { wrapper: "justify-start md:items-center" },
    center: { wrapper: "justify-center items-center" },
    right: { wrapper: "justify-end md:items-center" },
  }
  return (
    <div {...props}>
      <div data-cy='CtaRow' className={`${variantMap[position]?.wrapper} flex`}>
        <div className='flex flex-col gap-2 md:flex-row md:gap-3'>
          {items.map((row) => {
            if (row.variantButton === "tertiary") {
              return (
                <Link
                  key={row.id}
                  to={row.linkUrl}
                  event={row.linkEvent}
                  className='arrow-icon-tertiary tertiary-underline text-blue-700 hover:text-blue-700'
                >
                  {row.linkName}
                </Link>
              )
            }

            return row.isLink ? (
              <TextLink
                className='arrow-icon self-center'
                variant='A'
                to={row.linkUrl}
                event={row.linkEvent}
                label={row.linkName}
                key={row.id}
              >
                {row.linkName}
              </TextLink>
            ) : (
              <Button
                as={Link}
                variant={row.variantButton}
                className='text-center'
                to={row.linkUrl}
                event={row.linkEvent}
                key={row.id}
              >
                {row.linkName}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

CtaRow.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  position: PropTypes.oneOf(["left", "center", "right"]),
}
CtaRow.defaultProps = {
  position: "center",
}

export default CtaRow
