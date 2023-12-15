import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Image from "../Image"
import RichText from "../RichText"
import "./styles.css"

const variantMap = {
  withBorderLine: {
    wrapper:
      "xl:border-gray-secondary xl:max-w-[95.83%] xl:m-auto xxl:max-w-[92%] relative overflow-hidden xl:border xl:min-h-[550px] md:min-h-[600px] min-h-[850px]",
    content:
      "xl:inner-wrapper xl:px-0 md:px-3.2 px-1.6 flex w-full flex-col justify-between py-4 xl:flex-row xl:py-[70px]",
    leftWrapper: "text-navy-800 flex-1 text-left xl:pr-3",
    rightWrapper: "xl:w-6/12 md:w-10/12 ",
    description: "h5",
    // TODO use the following token when it's available mt-2
    body: "h4 mt-[16px]",
  },
  fullBleed: {
    wrapper:
      "bg-gray-warm-light relative overflow-hidden xl:min-h-[550px] md:min-h-[600px] min-h-[850px] ",
    content:
      "xl:inner-wrapper xl:px-0 md:px-3.2 px-1.6 flex w-full flex-col justify-between py-4 xl:flex-row xl:py-[70px]",
    leftWrapper: "text-navy-800 flex-1 text-left xl:pr-3",
    rightWrapper: "xl:w-6/12 md:w-10/12 ",
    description: "h5",
    // TODO use the following token when it's available mt-2
    body: "h4 mt-[16px]",
  },
}
const HorizontalForm = ({
  children,
  title,
  description,
  body,
  image,
  variant,
  isMktoForm,
}) => {
  const currentVariant = variantMap[variant] || variantMap.fullBleed
  const [isJapanese, setIsJapanese] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window?.location?.href
      const isJapaneseRoute = url.includes("/jp/") && "isJapanese"
      setIsJapanese(isJapaneseRoute)
    }
  }, [])

  return (
    <div className={`${currentVariant.wrapper}`}>
      <div
        className={`${currentVariant.content} ${
          isMktoForm ? "gap-3 xl:gap-0" : "xl:gap-0"
        }
`}
      >
        <div className={`${currentVariant.leftWrapper}`}>
          {title && <h2 className='h3 md:h2 pb-1'>{title}</h2>}
          {description && (
            <RichText className={`${currentVariant.description}`}>
              {description}
            </RichText>
          )}
          {body && <RichText className={`${currentVariant.body}`}>{body}</RichText>}
          {image && !body && (
            <Image
              className='absolute top-[210px] left-[-11%] bottom-[-37%] hidden h-[600px] w-[600px] opacity-20 xl:block'
              {...image}
            />
          )}
        </div>
        <div
          className={`${currentVariant.rightWrapper} ${isMktoForm ? "mt-0" : ""}`}
        >
          <div
            className={`${
              isMktoForm
                ? `mktoHorizontalFormWrapper ${isJapanese}`
                : "customHorizontalFormWrapper mt-1 lg:mt-0"
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
HorizontalForm.propTypes = {
  isMktoForm: PropTypes.bool,
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
  image: PropTypes.string,
  variant: PropTypes.string,
}

HorizontalForm.defaultProps = {
  isMktoForm: false,
  title: "",
  description: "",
  body: "",
  image: "",
  variant: "fullBleed",
  children: undefined,
}

export default HorizontalForm
