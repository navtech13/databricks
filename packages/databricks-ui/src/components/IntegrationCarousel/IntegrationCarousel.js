import React, { useState } from "react"
import { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import PropTypes from "prop-types"
import { useBreakpoint } from "../../utils/use-breakpoint"
import IntegrationCard, { VendorShape } from "./IntegrationCard"
import "swiper/css"
import "./styles.css"
import Controls from "./Controls"

const columnMap = [1, 2]

const twScales = {
  2: 8,
  4: 16,
  8: 32,
}

/**
 * @type {import('swiper').SwiperOptions['autoplay']} autoplayOptions
 */
const autoplayOptions = {
  delay: 5000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
}

/**
 * @typedef {import('swiper').Swiper} Swiper
 *
 * @typedef {import('swiper').SwiperOptions} SwiperOptions
 *
 *
 * @typedef {{
 *    name: string
 *    vendors: import('./IntegrationCard').Vendor[],
 *    variant?: { bgColor?: string }
 *    to?: string
 * }} Integration
 *
 * @typedef {{
 *   className?: string
 *   integrations?: Integration[]
 *   multiple?: boolean
 *   autoplay?: boolean
 * }} Props
 */

/**
 * @type {React.FC<Props>} IntegrationCarousel
 */
const IntegrationCarousel = ({
  className,
  integrations,
  multiple,
  autoplay,
  ...props
}) => {
  /**
   * @type {[Swiper, React.SetStateAction<Swiper|null>]>}
   */
  const [swiper, setSwiper] = useState(null)

  /**
   * @type {keyof typeof twScales} gap
   */
  let gap = 2
  const isTablet = useBreakpoint("md")
  const isDesktop = useBreakpoint("lg")

  if (isTablet) gap = 4
  if (isDesktop) gap = 8

  const columns = isTablet ? columnMap[1] : columnMap[0]

  return (
    <>
      <Swiper
        data-cy='IntegrationCarousel'
        onSwiper={setSwiper}
        spaceBetween={twScales[gap]}
        slidesPerView={columns}
        modules={[Autoplay]}
        autoplay={autoplayOptions}
        loop
        loopedSlides={3}
        {...props}
      >
        {integrations.map(({ vendors, variant, name, to }) => {
          return (
            <SwiperSlide key={name} style={{ height: "initial" }}>
              <IntegrationCard
                to={to}
                name={name}
                vendors={vendors}
                barBgColor={variant?.bgColor}
                barColor={variant?.titleColor}
                multiple={multiple}
              />
            </SwiperSlide>
          )
        })}
      </Swiper>
      {isTablet && <Controls swiper={swiper} autoplay />}
    </>
  )
}

const Integration = PropTypes.shape({
  name: PropTypes.string.isRequired,
  vendors: PropTypes.arrayOf(VendorShape).isRequired,
  to: PropTypes.string,
  variant: PropTypes.shape({
    bgColor: PropTypes.string,
  }),
})

IntegrationCarousel.propTypes = {
  className: PropTypes.string,
  integrations: PropTypes.arrayOf(Integration),
  multiple: PropTypes.bool,
  autoplay: PropTypes.bool,
}

IntegrationCarousel.defaultProps = {
  className: "",
  integrations: [],
  multiple: true,
  autoplay: false,
}

export default IntegrationCarousel
