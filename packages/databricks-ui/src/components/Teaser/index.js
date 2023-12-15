import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import RichText from "../RichText"
import TextLink from "../TextLink"

const Teaser = ({
  image,
  link,
  title,
  meta,
  children,
  headingTag,
  className,
  ...props
}) => {
  const Heading = headingTag
  return (
    <article data-cy='Teaser' className={`flex ${className}`} {...props}>
      <Image className='mr-1 mt-0.5 w-10 md:mr-4 md:w-8' {...image} />
      <div className='w-3/4 md:w-5/6'>
        <Heading className='h4 md:h3 mb-1'>
          <TextLink variant='A' className='text-navy-06' {...link}>
            {title}
          </TextLink>
        </Heading>
        <RichText className='b6'>{meta}</RichText>
        <RichText className='mt-2.5'>{children}</RichText>
      </div>
    </article>
  )
}

Teaser.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.shape({}).isRequired,
  link: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  meta: PropTypes.string.isRequired,
  headingTag: PropTypes.oneOf(["h2", "h3"]),
  className: PropTypes.string,
}

Teaser.defaultProps = {
  headingTag: "h2",
  className: "",
}

export default Teaser
