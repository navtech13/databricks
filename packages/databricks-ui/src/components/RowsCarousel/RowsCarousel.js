import React from "react"
import PropTypes from "prop-types"
import { useBreakpoint } from "../../utils/use-breakpoint"
import Carousel from "../Carousel/Carousel"
import RichText from "../RichText"
import "./swiperStyles.css"

const RowsCarousel = ({
  columns,
  gap,
  multipleRows,
  description,
  footer,
  children,
  loop,
  autoplay,
  className,
  ...props
}) => {
  const isTablet = useBreakpoint("md")

  const columnMap = Array.isArray(columns) ? columns : [3, columns]

  const GridComponent = (
    <div
      className={`grid items-center grid-cols-${columnMap[0]} gap-${gap} md:grid-cols-${columnMap[1]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )

  const renderBullet = (index, className) => {
    return `<span class="${className} flat"></span>`
  }
  const slidesPerView = isTablet ? columnMap[1] : columnMap[0]
  const CarouselComponent = (
    <Carousel
      data-cy='RowsCarousel'
      slidesPerView={slidesPerView}
      spaceBetween={gap * 10}
      loop={loop}
      pagination={{
        clickable: true,
        type: "bullets",
        renderBullet,
      }}
      {...(autoplay && {
        autoplay: {
          delay: 4000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        },
      })}
      {...props}
    >
      {children}
    </Carousel>
  )

  const CarouselElement =
    slidesPerView < children?.length ? CarouselComponent : GridComponent
  const RowsComponent = multipleRows ? GridComponent : CarouselElement

  return (
    <>
      {description && (
        <RichText className='rich-text-body mb-4 md:w-10/12 lg:mb-8 lg:w-8/12'>
          {description}
        </RichText>
      )}
      {RowsComponent}
      {footer && (
        <RichText className='b5 text-gray-text mt-4 text-center'>{footer}</RichText>
      )}
    </>
  )
}

RowsCarousel.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  gap: PropTypes.oneOf([1, 2, 3, 4]),
  multipleRows: PropTypes.bool,
  description: PropTypes.string,
  className: PropTypes.string,
  footer: PropTypes.string,
  loop: PropTypes.bool,
  autoplay: PropTypes.bool,
}

RowsCarousel.defaultProps = {
  columns: 5,
  gap: 3,
  multipleRows: true,
  description: undefined,
  footer: undefined,
  className: "",
  loop: true,
  autoplay: true,
}

export default RowsCarousel
