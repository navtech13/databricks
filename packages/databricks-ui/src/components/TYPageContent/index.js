import React from "react"
import PropTypes from "prop-types"

const TYPageContent = ({ mainContent, secondaryContent }) => {
  // Remove spacing if the page doesn't have any content except callout row
  const hasContent =
    secondaryContent?.props?.children?.length > 1 &&
    secondaryContent?.props?.children[0] !== false

  return (
    <>
      <div data-cy='TYPageContent' className='bg-gray-warm-light pb-[0.1px]'>
        {mainContent}
      </div>
      {secondaryContent && (
        <div className={`bg-gray-warm-medium ${hasContent ? "pt-8" : ""}`}>
          {secondaryContent}
        </div>
      )}
    </>
  )
}

TYPageContent.propTypes = {
  mainContent: PropTypes.node.isRequired,
  secondaryContent: PropTypes.node.isRequired,
}

export default TYPageContent
