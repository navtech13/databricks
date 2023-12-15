import React from "react"
import PropTypes from "prop-types"
import { Pagination, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useBreakpoint } from "../../utils/use-breakpoint"
import "swiper/css"
import "./pagination.css"

const Carousel = ({ children, slidesPerView, ...props }) => {
  const isTablet = useBreakpoint("md")

  const columnMap = Array.isArray(slidesPerView) ? slidesPerView : [3, slidesPerView]

  return (
    <Swiper
      style={{ paddingBottom: "50px", cursor: "grab" }}
      pagination={{ type: "bullets", clickable: true }}
      slidesPerView={isTablet ? columnMap[1] : columnMap[0]}
      slidesPerGroup={isTablet ? columnMap[1] : columnMap[0]}
      modules={[Pagination, Autoplay]}
      {...props}
    >
      {children.map((node) => (
        <SwiperSlide key={node.key} style={{ height: "auto" }}>
          {node}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

Carousel.propTypes = {
  children: PropTypes.node.isRequired,
  slidesPerView: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
}

Carousel.defaultProps = {
  slidesPerView: 4,
}

export default Carousel
