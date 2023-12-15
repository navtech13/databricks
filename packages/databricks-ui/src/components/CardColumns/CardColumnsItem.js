import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import IconResolver from "../IconResolver"

const CardColumnItem = ({
  children,
  columnSize,
  description,
  icon,
  title,
  ...props
}) => {
  return (
    <div className={`${columnSize}`}>
      <div className='shadow-card-normal mx-auto mb-2.5 w-10/12 bg-white p-4 lg:mx-0 lg:min-h-[450px] lg:w-11/12'>
        <IconResolver className='p-1' token={icon} />
        <RichText {...props} className='h4 mt-1 font-medium lg:min-h-[60px]'>
          {title}
        </RichText>
        <RichText className='pt-2.5'>{description}</RichText>
      </div>
    </div>
  )
}

CardColumnItem.propTypes = {
  children: PropTypes.node.isRequired,
  columnSize: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
}

CardColumnItem.defaultProps = {
  columnSize: "md:w-2/12",
  description: undefined,
  title: undefined,
  icon: undefined,
}

export default CardColumnItem
