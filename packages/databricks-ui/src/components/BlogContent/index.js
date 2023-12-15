import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Image, Promotion, SecondaryNavigation } from "../../components"

const BlogContent = ({
  secondaryNavigation,
  children,
  featuredImage,
  sidebarItems,
}) => {
  const [isSecNav, setIsSecNav] = useState(true)

  useEffect(() => {
    // if qs param pfmenu=hide then hide nav and footer, used for Pathfactory
    if (
      typeof window !== "undefined" &&
      window.location.search.indexOf("pfmenu=hid") > 0
    ) {
      setIsSecNav(false)
    }
  }, [])
  return (
    <div className='flex flex-col justify-between lg:flex-row'>
      {isSecNav && (
        <SecondaryNavigation
          className='lg:w-20'
          title={secondaryNavigation.title}
          links={secondaryNavigation.links}
        />
      )}
      <div className='grow lg:w-10/12'>
        {featuredImage && <Image {...featuredImage} />}
        <div className='flex flex-col justify-between lg:flex-row'>
          <main id='main' className='w-full'>
            <div className='py-5 px-2 sm:px-4 lg:px-0 lg:pb-10 lg:pt-8'>
              {children}
            </div>
          </main>
          <Promotion className='hidden max-w-[290px] lg:flex lg:w-3/12 lg:flex-col lg:gap-2.5'>
            {sidebarItems}
          </Promotion>
        </div>
      </div>
    </div>
  )
}

BlogContent.propTypes = {
  secondaryNavigation: PropTypes.shape({
    title: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  children: PropTypes.node.isRequired,
  sidebarItems: PropTypes.node,
  featuredImage: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
}

BlogContent.defaultProps = {
  featuredImage: null,
  sidebarItems: null,
}

export default BlogContent
