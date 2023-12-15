import React from "react"
import PropTypes from "prop-types"
import { Link, Image, RichText, TextLink } from ".."
import { variantMap } from "./variants"

const Card = ({
  variant,
  image,
  description,
  cta,
  additionalLinks,
  removeHover,
  eyebrow,
}) => {
  const currentVariant = variantMap[variant] || variantMap.simple
  let hrefUrl = cta?.to
  // Create a readable label
  let label = cta?.text

  if (label instanceof Array) {
    label = label.toString()
  }

  if (!label) {
    label = String(description)
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/&[#a-z0-9]+;/gi, "")
      .replace(/\n/g, "")
    label = label.replace(/^(.{100}[^\s]*).*/, "$1")
  }

  if (hrefUrl && typeof hrefUrl === "string" && hrefUrl.includes("internal:")) {
    hrefUrl = hrefUrl.substring(9)
  }
  if (!hrefUrl && additionalLinks?.length === 1) {
    hrefUrl = additionalLinks[0]?.url?.path
  }
  const allCardLinks = cta?.to ? [cta, ...additionalLinks] : [...additionalLinks]
  const isSingleLink =
    (allCardLinks?.length === 1 || additionalLinks.length === 0) && hrefUrl
  const Component = isSingleLink ? Link : "div"

  return (
    <Component
      className={`${
        isSingleLink ? "group-arrow-icon-tertiary" : ""
      } hover:no-underline ${
        isSingleLink || !removeHover ? currentVariant?.hover : "cursor-default"
      } ${currentVariant.wrapper}`}
      {...(isSingleLink && { to: hrefUrl, label })}
      variant='C'
      data-cy='Card'
      tabIndex='-1'
    >
      {image && (
        <div className={currentVariant.image}>
          <Image
            className={currentVariant.imageStyles}
            imageOptions={currentVariant.imageOptions}
            {...image}
            variant={variant}
          />
        </div>
      )}
      <div className={currentVariant.content}>
        <div className='flex-1'>
          {eyebrow && (
            <span className='text-1.5 text-gray-text pb-1 font-mono uppercase leading-[15px]'>
              {eyebrow}
            </span>
          )}
          <RichText className={`rich-text-body ${currentVariant.description}`}>
            {description}
          </RichText>
        </div>
        <div className='swiper-no-swiping'>
          {cta?.text &&
            isSingleLink &&
            (currentVariant.ctaType === "button" ? (
              <span
                tabIndex='0'
                role='button'
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Spacebar") {
                    e.target.click()
                  }
                }}
                className={`${currentVariant.linkStyle} b4 btn-primary inline-block py-1 px-2.5 transition duration-200 ease-in-out hover:no-underline`}
              >
                {cta.text}
              </span>
            ) : (
              <span
                tabIndex='0'
                role='button'
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Spacebar") {
                    e.target.click()
                  }
                }}
                className={`mt-4 ${
                  cta.text === "This event has ended" ? "" : "arrow-icon-tertiary"
                } block text-blue-700 ${currentVariant.linkStyle || "mt-2"}`}
              >
                {cta.text}
              </span>
            ))}
        </div>
        {additionalLinks?.length > 0 && (
          <div className='flex-1'>
            {additionalLinks.map((link) => (
              <TextLink
                tabIndex='0'
                key={`${link.url?.path}${link.title}`}
                className='arrow-icon-tertiary mt-1 block text-blue-700 hover:text-blue-700 active:text-blue-700'
                variant='A'
                to={link.url?.path}
              >
                {link.title}
              </TextLink>
            ))}
          </div>
        )}
      </div>
    </Component>
  )
}

Card.propTypes = {
  image: PropTypes.shape({}).isRequired,
  description: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(Object.keys(variantMap)),
  eyebrow: PropTypes.string,
  cta: PropTypes.shape({
    to: PropTypes.string,
    text: PropTypes.string,
  }),
  additionalLinks: PropTypes.arrayOf(
    PropTypes.shape({ url: PropTypes.shape({ path: PropTypes.string }) })
  ),
  removeHover: PropTypes.bool,
}

Card.defaultProps = {
  variant: "simple",
  cta: undefined,
  additionalLinks: [],
  eyebrow: undefined,
  removeHover: false,
}

export default Card
