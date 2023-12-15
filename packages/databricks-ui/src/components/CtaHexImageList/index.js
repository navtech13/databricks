import React from "react"
import PropTypes from "prop-types"
import CtaHexImage from "../CtaHexImage"
import Wrapper from "../Wrapper"
import Link from "../Link"
import { generateCTAs } from "../../utils/generateCTAs"

const CtaHexImageList = ({ title, items, ctas, ...props }) => {
  return (
    <Wrapper title={title} {...props}>
      {items.map((item, i) => (
        <CtaHexImage
          className={`border-gray-lines-new border-b pt-5  pb-4 ${
            i === 0 ? "mt-5 border-t" : ""
          }`}
          {...item}
        />
      ))}
      {ctas?.length > 0 && (
        <div
          data-cy='hex-image-button'
          className='mt-4 flex flex-col items-start gap-2.5 md:mt-5 md:flex-row md:gap-4'
        >
          {generateCTAs(ctas, Link)}
        </div>
      )}
    </Wrapper>
  )
}

CtaHexImageList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  title: PropTypes.string,
  ctas: PropTypes.arrayOf(
    PropTypes.shape({ to: PropTypes.string, label: PropTypes.string })
  ),
}

CtaHexImageList.defaultProps = {
  title: "",
  ctas: undefined,
}

export default CtaHexImageList
