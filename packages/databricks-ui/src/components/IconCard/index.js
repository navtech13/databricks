import React from "react"
import PropTypes from "prop-types"
import IconResolver from "../IconResolver"
import RichText from "../RichText"
import TextLink from "../TextLink"

const IconCard = ({ title, icon, content, cta, variant }) => {
  const variantMap = {
    A: "flex-col p-3 shadow-card-normal w-[344px] md:w-[328px] lg:w-[362px] h-[411px] md:h-[346px] lg:h-[411px]",
    B: "flex-row p-2 shadow-card-normal w-[344px] md:w-[328px] lg:w-[362px] h-16 md:h-12",
  }
  return (
    <div data-cy='IconCard' className={`flex ${variantMap[variant]}`}>
      <IconResolver token={icon} />
      {variant === "A" ? (
        <div className='flex h-full flex-col'>
          <h4 className='mt-2 font-bold'>{title}</h4>
          <RichText class='mt-2'>{content}</RichText>
          <div className='mt-2.5 flex lg:mt-auto'>
            <TextLink className='arrow-icon' variant='A' to={cta.link}>
              {cta.label}
            </TextLink>
          </div>
        </div>
      ) : (
        <div className='ml-2 flex max-w-[281px] flex-col'>
          <RichText className='font-bold'>{title}</RichText>
          <RichText className='mt-2'>{content}</RichText>
        </div>
      )}
    </div>
  )
}

IconCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  cta: PropTypes.shape({
    link: PropTypes.string,
    label: PropTypes.string,
  }),
  variant: PropTypes.oneOf(["A", "B"]),
}

IconCard.defaultProps = {
  variant: "A",
  cta: {
    link: "",
    label: "Read more",
  },
}

export default IconCard
