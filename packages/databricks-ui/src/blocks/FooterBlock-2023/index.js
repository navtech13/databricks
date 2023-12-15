import React from "react"
import PropTypes from "prop-types"
import Footer from "../../components/Footer-2023"

const FooterBlock = ({
  disclaimer,
  menus,
  image,
  addressSection,
  socialSection,
  careerSection,
  ...props
}) => {
  return (
    <Footer {...props}>
      <Footer.MainSection>
        <Footer.Image className='lg:hidden'>{image}</Footer.Image>
        <Footer.MenuSection>
          {menus.map((menu) => {
            return <Footer.Menu key={JSON.stringify(menu)} items={menu} />
          })}
        </Footer.MenuSection>
        <div>
          <Footer.Image className='hidden lg:mb-4 lg:block'>{image}</Footer.Image>
          <div className='flex flex-row items-end justify-between lg:w-[164px] lg:flex-col lg:items-baseline lg:align-baseline'>
            <Footer.Address>{addressSection}</Footer.Address>
            <div className='mt-4 hidden lg:block lg:w-16'>{socialSection}</div>
            <div className='text-1.75 footer-careers flex w-12 flex-col gap-1 lg:mt-10'>
              {careerSection}
            </div>
          </div>
          <div className='mt-4 lg:hidden'>{socialSection}</div>
        </div>
      </Footer.MainSection>
      <Footer.Disclaimer className='text-1.5' links={disclaimer.links}>
        {disclaimer.copyright}
      </Footer.Disclaimer>
    </Footer>
  )
}

FooterBlock.propTypes = {
  menus: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))).isRequired,
  disclaimer: PropTypes.shape({
    links: PropTypes.arrayOf(PropTypes.shape({})),
    copyright: PropTypes.node,
  }).isRequired,
  image: PropTypes.shape({}),
  addressSection: PropTypes.node,
  socialSection: PropTypes.node,
  careerSection: PropTypes.node,
}

FooterBlock.defaultProps = {
  image: undefined,
  addressSection: undefined,
  socialSection: undefined,
  careerSection: undefined,
}

export default FooterBlock
