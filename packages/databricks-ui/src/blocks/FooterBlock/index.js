import React from "react"
import PropTypes from "prop-types"
import { Footer } from "../../components"

const FooterBlock = ({ disclaimer, menus, items, ...props }) => {
  return (
    <Footer {...props}>
      <Footer.MainSection>
        <Footer.MenuSection>
          {menus.map((menu) => {
            return <Footer.Menu key={JSON.stringify(menu)} items={menu} />
          })}
        </Footer.MenuSection>
        {items && (
          <Footer.Region>
            {items?.map((node) => {
              return <React.Fragment key={node.key}>{node}</React.Fragment>
            })}
          </Footer.Region>
        )}
      </Footer.MainSection>
      <Footer.Disclaimer links={disclaimer.links}>
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
  items: PropTypes.node,
}

FooterBlock.defaultProps = {
  items: undefined,
}

export default FooterBlock
