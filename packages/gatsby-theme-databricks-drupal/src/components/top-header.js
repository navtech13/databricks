import React from "react"
import PropTypes from "prop-types"
import { TopHeader as TopHeaderComponent } from "databricks-ui"

//  TODO: Get the image from the Drupal
import logo from "../../../databricks-ui/static/images/top-header.svg"
import logoDark from "../../../databricks-ui/static/images/top-header-dark.svg"
import useTranslate from "../utils/translate"
import { useCurrentPrefix } from "../utils/current-prefix"

const TopHeader = ({ hideLogo, customLogos, bgColor, darkLogo }) => {
  const { translate } = useTranslate()
  let prefix = useCurrentPrefix()
  if(!prefix) {
    prefix = "/"
  }
  const image = {
    image: { src: darkLogo ? logoDark : logo, alt: "Databricks" },
    alt: translate("general.home"),
    to: prefix,
  }

  const images = []

  if (!hideLogo) {
    images.push(image)
  }

  return <TopHeaderComponent bgColor={bgColor} items={[...images, ...customLogos]} />
}

TopHeader.propTypes = {
  bgColor: PropTypes.string,
  hideLogo: PropTypes.bool,
  customLogos: PropTypes.arrayOf(PropTypes.shape({})),
}

TopHeader.defaultProps = {
  bgColor: "bg-gray-warm-light",
  hideLogo: false,
  customLogos: [],
}

export default TopHeader
