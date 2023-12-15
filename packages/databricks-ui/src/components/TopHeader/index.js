import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import Link from "../Link"
import IconResolver from "../IconResolver"

const TopHeader = ({ items, bgColor, ...props }) => {
  return (
    <div className={`${bgColor} h-full px-2`}>
      <section
        className='xxl:max-w-[1456px] mx-auto flex max-w-[508px] items-center gap-3 py-2.5 md:max-w-[704px] lg:max-w-[966px] xl:max-w-[1146px]'
        {...props}
      >
        {items.map(({ to, alt, image }, index) => {
          const imageElement = (
            <Image
              className='h-3 w-auto'
              alt={alt}
              imageOptions={{ className: "w-auto h-full" }}
              {...image}
            />
          )
          if (to) {
            return (
              <React.Fragment key={JSON.stringify(image)}>
                {index > 0 && <IconResolver token='logoSeparator' />}
                <Link className='inline-block' to={to}>
                  {imageElement}
                </Link>
              </React.Fragment>
            )
          }
          return (
            <React.Fragment key={JSON.stringify(image)}>
              {index > 0 && <IconResolver token='logoSeparator' />}
              {imageElement}
            </React.Fragment>
          )
        })}
      </section>
    </div>
  )
}

TopHeader.propTypes = {
  bgColor: PropTypes.string,
  items: PropTypes.arrayOf({
    to: PropTypes.string,
    alt: PropTypes.string,
    image: PropTypes.shape({}),
  }).isRequired,
}

TopHeader.defaultProps = {
  bgColor: "bg-gray-warm-light",
}

export default TopHeader
