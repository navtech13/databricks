import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import Link from "../Link"

const BlogHeadAvatarGroup = ({ avatars, ...props }) => {
  return (
    <div className='mb-2.5 flex md:mb-0' {...props}>
      {avatars?.map(({ to, alt, ...image }) => {
        return (
          <Link
            key={to}
            className='-mr-2 last:mr-1 md:last:mr-2.5'
            to={to}
            aria-label={alt}
          >
            <Image
              imageOptions={{ className: "w-6 h-6 rounded-full shadow" }}
              alt={alt}
              {...image}
            />
          </Link>
        )
      })}
    </div>
  )
}

BlogHeadAvatarGroup.propTypes = {
  avatars: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      alt: PropTypes.string,
      src: PropTypes.string,
    })
  ).isRequired,
}

export default BlogHeadAvatarGroup
