import React from "react"
import PropTypes from "prop-types"
import Link from "../Link"
import RichText from "../RichText"

const variantMap = {
  dark: {
    colorLinks: "text-navy-300 hover:text-blue-400",
    colorCurrentLink: "text-white",
    backgroundColor: "bg-navy-05",
  },
  light: {
    colorLinks: "text-gray-text hover:text-blue-700",
    colorCurrentLink: "text-navy-800",
    backgroundColor: "bg-white",
  },
}

const BreadcrumbNavigation = ({
  items,
  enableLastLink,
  variant,
  backgroundColor,
  ...props
}) => {
  const currentVariant = variantMap[variant]
  return (
    <nav
      className={`inner-wrapper flex overflow-hidden whitespace-nowrap pt-2 pr-2 bg-${backgroundColor}`}
      {...props}
    >
      {items.map(({ id, to, text }, index) => {
        const isLarge = text.split(" ").length > 3
        let truncatedText = ""
        if (isLarge) {
          const words = text.split(" ")
          truncatedText = `${words.slice(0, 3).join(" ")}...`
        }
        const textEl = (
          <>
            <span className='invisible inline-block w-0.5'>a</span>
            {isLarge ? truncatedText : text}
          </>
        )
        return (
          <React.Fragment key={id}>
            {index !== 0 && (
              <div
                aria-hidden
                className='text-gray-text pr-0.25 flex-shrink-0 pl-0.5'
              >
                /
              </div>
            )}
            <div
              style={{
                flexShrink:
                  items.length - 1 === index
                    ? 0
                    : Math.pow(100, items.length - index),
              }}
              className='text-gray-text relative flex min-w-[16px] overflow-hidden  last:flex-[1_0_auto]'
            >
              {index + 1 === items.length && !enableLastLink ? (
                <>
                  <RichText
                    className={`inline-block w-full truncate pl-0.5 ${currentVariant.colorCurrentLink}`}
                  >
                    {text}
                  </RichText>
                </>
              ) : (
                <>
                  <RichText className='invisible inline-block pr-0.5'>
                    {textEl}
                  </RichText>
                  <Link
                    className={`tracking-w-1 absolute left-0 block w-full min-w-[20px] truncate ${currentVariant.colorLinks}`}
                    label={text}
                    to={to}
                  >
                    {textEl}
                  </Link>
                </>
              )}
            </div>
          </React.Fragment>
        )
      })}
    </nav>
  )
}

BreadcrumbNavigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      to: PropTypes.string,
      text: PropTypes.string,
    })
  ).isRequired,
  enableLastLink: PropTypes.bool,
  variant: PropTypes.oneOf(["dark", "light"]),
  backgroundColor: PropTypes.string,
}

BreadcrumbNavigation.defaultProps = {
  enableLastLink: false,
  variant: "light",
  backgroundColor: undefined,
}

export default BreadcrumbNavigation
