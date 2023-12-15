import React from "react"
import PropTypes from "prop-types"
import { useLocation } from "@reach/router"
import IconResolver from "../IconResolver"
import Link from "../Link"
import Wrapper from "../ContentWrapper"
import RichText from "../RichText"

// TODO: look for an alternative for this color map
const socialColorMap = {
  twitter: "#000000",
  linkedIn: "#0A66C2",
  facebook: "#3b5998",
}

const LabelRow = ({
  backgroundColor,
  contentLinks,
  firstSection,
  secondarySection,
  share,
}) => {
  const location = useLocation()
  // @TODO: check if it's possible add the other social media
  const shareLink = (socialNetwork) => {
    const url = `${process.env.GATSBY_DEPLOY_URL}${location.pathname}`
    switch (socialNetwork) {
      case "facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`
      case "twitter":
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(url)}`
      case "linkedIn":
        return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
          url
        )}&summary=&source=`
      default:
        return null
    }
  }

  const eyebrowLabel = (label) => {
    if (!label) {
      return <></>
    }
    const maxLength = 20
    const truncatedLabel = label.slice(0, maxLength)
    return (
      <p className='text-1.5 text-gray-text mb-1 font-mono font-medium uppercase'>
        {truncatedLabel}
      </p>
    )
  }

  const textContent = (content) => {
    if (!content) {
      return <></>
    }
    const maxLength = 32
    const truncatedContent = content.slice(0, maxLength)
    return <RichText className='b4 text-navy-06'>{truncatedContent}</RichText>
  }

  return (
    <Wrapper className={`bg-${backgroundColor}`}>
      <div className='my-4 grid grid-cols-2 gap-x-1 md:grid-cols-3 md:gap-x-2 lg:grid-cols-5 lg:gap-x-4'>
        {firstSection && (
          <div className='col-start-1 row-span-1'>
            {eyebrowLabel(firstSection.label)} {textContent(firstSection.content)}
          </div>
        )}
        {secondarySection && (
          <div className='col-start-2 row-span-1'>
            {eyebrowLabel(secondarySection.label)}
            {textContent(secondarySection.content)}
          </div>
        )}
        {contentLinks && (
          <div className='col-start-1 col-end-3 row-start-2 mt-4 lg:col-start-3 lg:col-end-5 lg:row-span-1 lg:mt-0 '>
            {eyebrowLabel(contentLinks?.label)}
            <ul className='space-y-1'>
              {contentLinks.links.map((link) => (
                <li key={link.label}>
                  <Link
                    className='arrow-icon-tertiary tertiary-underline text-blue-700 hover:text-blue-700'
                    to={link.url}
                  >
                    {link.label.trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className='col-start-1 col-end-3 row-start-3 mt-4 md:col-start-3 md:row-start-1 md:mt-0 lg:col-start-5 lg:col-end-6 lg:row-span-1'>
          {eyebrowLabel(share?.label)}
          <div className='flex'>
            {share?.items?.map((item) => {
              return (
                <Link
                  target='_blank'
                  className='mr-2 last:mr-0'
                  key={item.id}
                  to={shareLink(item.type) ? shareLink(item.type) : item.url}
                >
                  <IconResolver
                    token={item.type}
                    style={{
                      color: socialColorMap[item.type] || "inherit",
                    }}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

LabelRow.propTypes = {
  backgroundColor: PropTypes.string,
  contentLinks: PropTypes.shape({
    label: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }),
  firstSection: PropTypes.shape({
    label: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  secondarySection: PropTypes.shape({
    label: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  share: PropTypes.shape({
    label: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
}

LabelRow.defaultProps = {
  backgroundColor: undefined,
  contentLinks: undefined,
}

export default LabelRow
