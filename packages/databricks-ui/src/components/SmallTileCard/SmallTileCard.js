import React from "react"
import PropTypes from "prop-types"
import Link from "../Link"
import Image from "../Image"
import RichText from "../RichText"

const SmallTileCard = ({
  backgroundColor,
  eyebrow,
  img,
  stroke,
  to,
  title,
  className,
  removeHover,
  ...props
}) => {
  const Component = removeHover && !to ? "div" : Link
  const componentProps = {
    ...props,
    ...(to ? { to } : {}),
  }

  return (
    <Component
      className={`flex h-[90px] w-full transition-all ease-in hover:no-underline ${
        stroke && "border-gray-lines border"
      } ${
        removeHover ? "" : `hover:shadow-shadow-2${!to ? " cursor-default" : ""}`
      } ${className}`}
      {...componentProps}
    >
      <div
        className={`bg-${backgroundColor} flex min-w-[90px] items-center justify-center`}
      >
        <Image
          imageOptions={{
            className: "h-full object-cover",
          }}
          className={`${img ? "h-full w-full" : "h-[64px] w-[64px]"}`}
          {...img}
        />
      </div>
      <div
        className={`after:text-navy-400 after:top-1.6 relative p-2 after:right-2 w-full${
          to
            ? " arrow-icon arrow-icon-rotate-45 after:absolute after:hover:text-orange-600"
            : ""
        }`}
      >
        <h3 className='text-1.25 text-gray-text line-clamp-2 mb-1 font-mono font-medium uppercase leading-none'>
          {eyebrow}
        </h3>
        <RichText className='text-1.75 md:h6 text-navy-800 line-clamp-2'>
          {title}
        </RichText>
      </div>
    </Component>
  )
}

export default SmallTileCard

SmallTileCard.propTypes = {
  backgroundColor: PropTypes.string,
  eyebrow: PropTypes.string,
  img: PropTypes.shape({}),
  stroke: PropTypes.bool,
  to: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  removeHover: PropTypes.bool,
}

SmallTileCard.defaultProps = {
  backgroundColor: "",
  eyebrow: "",
  img: "",
  stroke: false,
  to: "",
  title: "",
  className: "",
  removeHover: false,
}
