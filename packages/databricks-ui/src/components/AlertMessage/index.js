import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import TextButton from "../TextButton"
import Image from "../Image"

const AlertMessage = ({
  children,
  cta,
  image,
  backgroundImage,
  variant,
  ...props
}) => {
  const variants = {
    primary: {
      backgroundImage: true,
      cta: "text-navy-06 hover:text-navy-06 mt-2",
      imageWrapper: "w-4/12 md:w-2/12 lg:w-2/12 xl:w-1/12",
      contentWrapper: "w-8/12 xl:w-11/12",
      text: "text-1.75",
    },
    secondary: {
      backgroundImage: false,
      text: "text-1.75 rich-text-alert",
      wrapper: "bg-navy-06 min-h-[114px]",
      cta: "text-white hover:text-white mt-2",
      imageWrapper: "w-2/12 lg:w-1/12",
      contentWrapper: "w-10/12 lg:w-11/12",
    },
    secondarySmall: {
      backgroundImage: false,
      text: "b6 rich-text-alert",
      wrapper: "bg-navy-06",
      cta: "b4 text-yellow-04 hover:text-white",
      imageWrapper: "w-5 max-w-[40px]",
      contentWrapper: "flex justify-between items-center gap-4 flex-1",
      innerWrapper: "py-1.5",
    },
  }
  return (
    <div
      data-cy='AlertMessage'
      className={`relative ${variants[variant]?.wrapper || "min-h-[114px]"}`}
      {...props}
    >
      {backgroundImage && variants[variant]?.backgroundImage && (
        <Image
          aria-hidden
          imageOptions={{
            className: "absolute object-cover z-[-1] h-full max-w-full",
          }}
          {...backgroundImage}
        />
      )}

      <div
        className={`inner-wrapper flex gap-2 ${
          variants[variant]?.innerWrapper || "py-2.5"
        }`}
      >
        {image && (
          <div className={variants[variant]?.imageWrapper || ""}>
            <Image className='mx-auto max-w-[80px]' {...image} />
          </div>
        )}

        <div className={`${variants[variant]?.contentWrapper || ""}`}>
          <RichText className={variants[variant]?.text || ""}>{children}</RichText>
          {cta && (
            <TextButton
              className={variants[variant]?.cta || ""}
              to={cta.to}
              aria-label={cta.label}
              variant='A'
            >
              {cta.label}
            </TextButton>
          )}
        </div>
      </div>
    </div>
  )
}

AlertMessage.propTypes = {
  children: PropTypes.node.isRequired,
  image: PropTypes.shape({}),
  backgroundImage: PropTypes.shape({}),
  cta: PropTypes.shape({
    label: PropTypes.string,
    to: PropTypes.string,
  }),
  variant: PropTypes.oneOf(["primary", "secondary", "secondarySmall"]),
}

AlertMessage.defaultProps = {
  cta: undefined,
  image: undefined,
  backgroundImage: undefined,
  variant: "primary",
}

export default AlertMessage
