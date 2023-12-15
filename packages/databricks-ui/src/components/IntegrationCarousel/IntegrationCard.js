import React from "react"
import PropTypes from "prop-types"
import Link from "../Link"
import Image from "../Image"
import tailwindConfig from "../../../tailwind.config"

/**
 * @typedef {{ name: string, image: { src: string, alt: string } }} Vendor
 * @typedef {{
 *   name: string,
 *   vendors: Vendor[],
 *   barBgColor?: string,
 *   to?: string,
 *   multiple?: boolean
 * }} Props
 *
 * @type {React.FC<Props> } IntegrationCard
 */
const IntegrationCard = ({ to, name, barBgColor, barColor, vendors }) => {
  const twUtils = `h-full border border-gray-lines transition-shadow duration-200 ${
    to ? "hover:border-b-orange-400 hover:shadow-shadow-2" : ""
  } border-b-2 border-transparent shadow-shadow-1 flex flex-col`

  const vendorImages = (
    <div className='flex min-h-[125px] w-full grow grid-cols-6 flex-wrap items-center justify-center justify-items-center gap-y-5 px-4 py-4'>
      {vendors.map(({ name: vendorName, image }) => {
        return (
          <Image
            className='h-3 w-1/3 px-1 md:h-3 md:px-2 lg:h-6 lg:px-3 xl:px-4'
            key={vendorName}
            imageContainerOptions='w-full'
            imageOptions={{
              className: "h-full object-contain",
              objectFit: "contain",
            }}
            {...image}
          />
        )
      })}
    </div>
  )

  const bar = (
    <header
      style={{
        backgroundColor: tailwindConfig.theme.colors[barBgColor || "navy-06"],
        color: tailwindConfig.theme.colors[barColor || "white"],
      }}
      className='flex h-6 w-full items-center py-1.5 px-4'
    >
      <p className='h4 font-bold'>{name}</p>
    </header>
  )

  if (to) {
    return (
      <Link to={to} className='hover:no-underline'>
        <article className={twUtils}>
          {bar}
          {vendorImages}
        </article>
      </Link>
    )
  }

  return (
    <article className={twUtils}>
      {bar}
      {vendorImages}
    </article>
  )
}

export const VendorShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
})

IntegrationCard.propTypes = {
  name: PropTypes.string.isRequired,
  vendors: PropTypes.arrayOf(VendorShape).isRequired,
  barBgColor: PropTypes.string,
  logoContainerClassName: PropTypes.string,
  multiple: PropTypes.bool,
  to: PropTypes.string,
  barColor: PropTypes.string,
}

IntegrationCard.defaultProps = {
  barBgColor: "#000",
  logoContainerClassName: "",
  multiple: true,
  to: undefined,
  barColor: undefined,
}

export default IntegrationCard
