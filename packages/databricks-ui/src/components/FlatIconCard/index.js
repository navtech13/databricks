import React from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import RichText from "../RichText"
import Link from "../Link"

const FlatIconCard = ({
  description,
  eyebrow,
  image,
  title,
  cta,
  bgColor,
  className,
  ...props
}) => {
  const MainWrapper = cta?.to ? Link : "div"
  const bgToken = `bg-${bgColor}`

  return (
    <MainWrapper
      className={`p-4 ${bgToken} ${
        cta?.to && "hover:shadow-shadow-2"
      } text-navy-800 hover:text-navy-800 duration-250 group-arrow-icon-tertiary flex flex-col transition-shadow hover:no-underline md:flex-row lg:flex-col ${className}`}
      {...(cta?.to && { to: cta.to })}
      {...props}
    >
      {image && (
        <Image
          className='mr-20 mb-8 h-full max-h-6 w-full max-w-[80px] lg:mr-0 xl:mb-6'
          imageOptions={{
            className: "h-full w-full object-contain object-left",
            objectFit: "contain",
          }}
          {...image}
          placeholderRatio={null}
        />
      )}
      <div className='flex flex-1 flex-col space-y-3'>
        {eyebrow && (
          <RichText className='text-1.5 font-mono uppercase leading-none'>
            {eyebrow}
          </RichText>
        )}
        {title && <RichText className='text-3 lg:text-4'>{title}</RichText>}
        {description && (
          <RichText className='text-2 lg:text-2.5'>{description}</RichText>
        )}
        {cta?.label && (
          <div className='text-2 flex flex-1 flex-col justify-end'>
            <span className='arrow-icon-tertiary text-2 leading-none'>
              {cta.label}
            </span>
          </div>
        )}
      </div>
    </MainWrapper>
  )
}

FlatIconCard.propTypes = {
  bgColor: PropTypes.string,
  description: PropTypes.string,
  eyebrow: PropTypes.string,
  image: PropTypes.shape({}),
  cta: PropTypes.shape({ to: PropTypes.string, label: PropTypes.string }),
  className: PropTypes.string,
  title: PropTypes.string,
}

FlatIconCard.defaultProps = {
  bgColor: "oat-light",
  image: undefined,
  eyebrow: undefined,
  description: undefined,
  title: undefined,
  className: "",
  cta: undefined,
}

export default FlatIconCard
