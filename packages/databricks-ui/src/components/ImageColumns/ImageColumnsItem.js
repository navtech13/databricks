import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import { Image } from ".."

const ImageColumnItem = ({
  children,
  columnSize,
  description,
  image,
  title,
  ...props
}) => {
  return (
    <div className={`${columnSize}`}>
      <div className='mx-auto mb-2.5 w-10/12 bg-white pt-4 pr-4 lg:mx-0 lg:min-h-[450px] lg:w-11/12'>
        <Image {...image} className='h-20 w-20' />
        <RichText {...props} className='h4 mt-2 font-medium lg:min-h-[60px]'>
          {title}
        </RichText>
        <RichText className='pt-2'>{description}</RichText>
      </div>
    </div>
  )
}

ImageColumnItem.propTypes = {
  children: PropTypes.node.isRequired,
  columnSize: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.shape,
  title: PropTypes.string,
}

ImageColumnItem.defaultProps = {
  columnSize: "md:w-2/12",
  description: undefined,
  image: undefined,
  title: undefined,
}

export default ImageColumnItem
