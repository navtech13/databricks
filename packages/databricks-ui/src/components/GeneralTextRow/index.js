import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import Image from "../Image"
import Button from "../Button"
import Link from "../Link"
import TextLink from "../TextLink"
import ThumbnailModal from "../ThumbnailModal"
import Wrapper from "../Wrapper"

const GeneralTextRow = ({
  image,
  children,
  title,
  eyebrow,
  ctas,
  imageLink,
  videoSrc,
  background,
  widthColumns,
  verticalPadding,
  horizontalAlignment,
  ctaStyle,
  variant,
}) => {
  const variantMap = {
    default: {
      textStyles: "mb-2.5 rich-text-general-text-row",
      bottomSpacing: "pb-5",
    },
    dark: {
      textStyles: "text-white rich-text-general-text-row",
      bottomSpacing: "pb-0",
    },
  }
  const hasAsset = image || videoSrc
  const MediaWrapper = imageLink ? Link : "div"
  const ImageElement = videoSrc
    ? ({ ...rest }) => <ThumbnailModal videoSrc={videoSrc} {...rest} />
    : Image
  const bgColor = background ? `bg-${background}` : "bg-white"
  const isTextLink = ctaStyle === "text_link"

  let columnWidth = "6"
  if (!hasAsset && widthColumns) {
    columnWidth = widthColumns
  }

  return (
    <div className={`component-generaltextrow ${bgColor}`}>
      <Wrapper>
        <section
          className={`${
            image || videoSrc || !hasAsset ? "justify-between" : "justify-center"
          } ${
            verticalPadding && `py-${verticalPadding}`
          } xxl:max-w-[1456px] mx-auto flex w-full max-w-[508px] flex-col md:max-w-[704px] md:flex-row md:items-center lg:max-w-[966px] xl:max-w-[1146px]`}
        >
          <div
            className={`pb-0 md:${
              variantMap[variant]?.bottomSpacing || variantMap.default?.bottomSpacing
            } md:w-${columnWidth}/12 ${
              horizontalAlignment && `text-${horizontalAlignment}`
            }`}
          >
            {eyebrow && <p className='text-orange-03 mb-2.5'>{eyebrow}</p>}
            {title && (
              <RichText
                className={
                  variant
                    ? variantMap[variant]?.textStyles
                    : variantMap.default?.textStyles
                }
              >
                {title}
              </RichText>
            )}
            <RichText
              className={
                variant
                  ? variantMap[variant]?.textStyles
                  : variantMap.default?.textStyles
              }
            >
              {children}
            </RichText>
            {ctas?.length > 0 && (
              <div className='flex flex-col items-start gap-2.5 lg:flex-row lg:gap-4'>
                {isTextLink ? (
                  <TextLink
                    as={Link}
                    variant='A'
                    className='arrow-icon block cursor-pointer'
                    to={ctas[0].to}
                  >
                    {ctas[0].label}
                  </TextLink>
                ) : (
                  <Button as={Link} variant='primary' to={ctas[0].to}>
                    {ctas[0].label}
                  </Button>
                )}
                {ctas[1] && (
                  <Button as={Link} to={ctas[1].to}>
                    {ctas[1].label}
                  </Button>
                )}
              </div>
            )}
          </div>
          {image && (
            <MediaWrapper className='w-full md:w-5/12' {...imageLink}>
              <ImageElement
                className='h-full'
                imageOptions={{ className: "h-full", objectFit: "contain" }}
                {...image}
              />
            </MediaWrapper>
          )}
          {!image && videoSrc && (
            <div className='w-full md:mb-0 md:w-5/12'>
              <div className='bg-navy-06 relative pt-[56.25%]'>
                <iframe
                  allow='autoplay; fullscreen; picture-in-picture'
                  allowFullScreen
                  title={title}
                  className='absolute inset-0 h-full w-full'
                  src={
                    videoSrc.indexOf("?") >= 0
                      ? `${videoSrc}&h=71ae779e1e&badge=0&autopause=0&player_id=1&byline=0&title=0&muted=1`
                      : `${videoSrc}?h=71ae779e1e&badge=0&autopause=0&player_id=1&byline=0&title=0&muted=1`
                  }
                />
              </div>
            </div>
          )}
        </section>
      </Wrapper>
    </div>
  )
}

GeneralTextRow.propTypes = {
  image: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]),
  children: PropTypes.node,
  title: PropTypes.string,
  eyebrow: PropTypes.string,
  ctas: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    })
  ),
  imageLink: PropTypes.shape({
    to: PropTypes.string,
    label: PropTypes.string,
  }),
  videoSrc: PropTypes.string,
  background: PropTypes.string,
  widthColumns: PropTypes.string,
  verticalPadding: PropTypes.string,
  horizontalAlignment: PropTypes.string,
  ctaStyle: PropTypes.string,
  variant: PropTypes.oneOf([
    "default",
    "dark",
    "dark default-text",
    "textRow/right cta",
  ]),
  // variant: PropTypes.string,
}

GeneralTextRow.defaultProps = {
  image: undefined,
  children: undefined,
  title: undefined,
  eyebrow: undefined,
  ctas: undefined,
  imageLink: undefined,
  videoSrc: undefined,
  background: "white",
  widthColumns: "6",
  verticalPadding: undefined,
  horizontalAlignment: "left",
  ctaStyle: "button",
  variant: "default",
}

export default GeneralTextRow
