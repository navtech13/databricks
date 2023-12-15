import React from "react"
import PropTypes from "prop-types"
import Button from "../Button"
import Image from "../Image"
import RichText from "../RichText"

const HeroPromo = ({
  cta,
  title,
  description,
  variant,
  datePlace,
  backgroundImage,
  logoImage,
  items,
}) => {
  const variantMap = {
    v1: {
      backgroundImageStyles: "max-h-[559px] h-[559px]",
      logoImageStyles: "w-[77%] min-w-[277px] md:min-w-[581px] lg:max-w-[726px]",
      container: "px-2 flex h-full flex-col items-center py-12 text-center md:py-10",
      wrapper: "",
      textStyles: "",
      titleStyles: "text-[32px] my-4 text-green-900 md:text-7",
      buttonVariant: "promo",
      textContainer: "md:text-2 mb-4 md:max-w-[581px] lg:max-w-[881px]",
      ctasStyles: "mt-2 flex justify-center",
      datePlace: "text-1.5 md:text-2.5 font-mono mb-1 text-green-900 w-full",
    },
    v2: {
      backgroundImageStyles: "lg:max-h-[559px]",
      logoImageStyles:
        "order-1 w-full min-w-[328px] md:min-w-[407px] lg:max-w-[554px]",
      container: "flex lg:max-w-[554px] flex-col",
      wrapper:
        "flex flex-col lg:mx-0 justify-between lg:inner-wrapper gap-5 md:flex-row py-10 mx-2 md:mx-4",
      textStyles: "",
      titleStyles: "text-6 mt-4 mb-2 text-green-900 order-3 lg:text-7",
      buttonVariant: "promo",
      textContainer:
        "md:text-2 lg:text-2.5 md:max-w-[581px] mb-4 lg:max-w-[881px] order-4",
      ctasStyles: "mb-2 lg:mt-2 order-5",
      datePlace:
        "text-1.5 md:text-1.75 lg:text-2.5 mt-2 font-mono font-normal text-green-900 order-2 w-full",
    },
  }
  const currentVariant = variantMap[variant]
  return (
    <div
      style={{
        backgroundImage: `url("${backgroundImage}")`,
      }}
      className={`bg-DAIS23-black text-DAIS23-off-white w-full bg-cover bg-fixed bg-center bg-no-repeat ${currentVariant.backgroundImageStyles}`}
    >
      <div className={`${currentVariant.wrapper}`}>
        <div className={`${currentVariant.container}`}>
          <Image {...logoImage} className={`${currentVariant.logoImageStyles}`} />
          <h2 className={`${currentVariant.titleStyles}`}>{title}</h2>
          <RichText className={`${currentVariant.datePlace} `}>{datePlace}</RichText>
          <RichText className={`${currentVariant.textContainer} `}>
            {description}
          </RichText>
          <div className={`${currentVariant.ctasStyles} `}>
            <Button
              className='hover:text-DAIS23-black text-DAIS23-black hover:bg-DAIS23-off-white min-w-[137px] transition-all duration-200 md:max-w-[70%] lg:max-w-[50%]'
              href={cta.to}
              variant={`${variantMap[variant]?.buttonVariant}`}
            >
              <p className='text-2.5'>{cta.label}</p>
            </Button>
          </div>
        </div>
        {variant === "v2" && items && (
          <div className='flex w-[261px] min-w-[261px] flex-col gap-2.5 lg:gap-4'>
            {items.map((item) => {
              return (
                <div key={item.key} className='flex flex-row gap-1.5'>
                  <Image
                    imageOptions={{
                      className:
                        "rounded-full shadow-card-normal w-[72px] min-w-[72px]",
                    }}
                    {...item.image}
                  />
                  <div className='mt-1 flex flex-col gap-0.5'>
                    <p className='text-1.75 font-bold text-white'>{item.name}</p>
                    <p className='text-1.5'>{item.role}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

HeroPromo.propTypes = {
  title: PropTypes.string,
  backgroundImage: PropTypes.string,
  logoImage: PropTypes.shape({}),
  datePlace: PropTypes.string,
  description: PropTypes.string,
  variant: PropTypes.oneOf(["v1", "v2"]),
  cta: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
  }),
  items: PropTypes.arrayOf(PropTypes.shape({})),
}

HeroPromo.defaultProps = {
  title: undefined,
  backgroundImage: undefined,
  logoImage: undefined,
  description: undefined,
  variant: "v1",
  cta: undefined,
  datePlace: undefined,
  items: undefined,
}

export default HeroPromo
