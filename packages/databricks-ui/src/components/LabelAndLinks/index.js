import React from "react"
import PropTypes from "prop-types"
import TextButton from "../TextButton"

const LabelAndLinks = ({ title, ctas, ...props }) => {
  let allCtas = null
  if (ctas) {
    allCtas = ctas?.map((item, index) => {
      if (!item) {
        return null
      }

      if (item.label && !item.to) {
        return (
          <span className='mr-0.5'>
            {item.label}
            {index < ctas.length - 1 ? "," : ""}
          </span>
        )
      }

      return (
        <TextButton variant='primary' className='text-orange-04 mr-0.5' to={item.to}>
          {item.label}
          {index < ctas.length - 1 ? "," : ""}
        </TextButton>
      )
    })
  }

  return (
    <div data-cy='LabelAndLinks' className='sm:w-12/12 b2 flex md:w-7/12' {...props}>
      {ctas?.length > 0 && (
        <span className='flex flex-wrap'>
          {" "}
          <span className='b2 mr-0.5 uppercase'>{title}: </span>
          {allCtas}
        </span>
      )}
    </div>
  )
}

LabelAndLinks.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.shape({}),
  backgroundImage: PropTypes.shape({}),
  ctas: PropTypes.shape({
    label: PropTypes.string,
    to: PropTypes.string,
  }),
  title: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "secondarySmall"]),
}

LabelAndLinks.defaultProps = {
  ctas: [],
  image: undefined,
  title: undefined,
  backgroundImage: undefined,
  variant: "primary",
}

export default LabelAndLinks
