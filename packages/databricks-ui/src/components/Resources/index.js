import React from "react"
import PropTypes from "prop-types"
import Grid from "../Grid"
import RichText from "../RichText"
import HtmlParser from "../../../../gatsby-theme-databricks-drupal/src/helpers/htmlParser"

const Resources = ({ items, columns, ...props }) => (
  <Grid
    columns={columns}
    className='lg:gap-4'
    gap={3.2}
    {...props}
    data-cy='Resources'
  >
    {items?.map(({ title, children, eyebrow, displayAsButton }) => (
      <div key={title} className='border-gray-lines border-t pt-3 lg:pr-2.5'>
        {eyebrow && (
          <RichText variant='body' className='mb-2 uppercase'>
            <HtmlParser content={eyebrow} />
          </RichText>
        )}
        {displayAsButton ? (
          <h4 className='mb-2'>{title}</h4>
        ) : (
          <h3 className='mb-2'>{title}</h3>
        )}
        <div className='flex flex-col gap-2'>{children}</div>
      </div>
    ))}
  </Grid>
)

Resources.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      children: PropTypes.node.isRequired,
      eyebrow: PropTypes.string,
      displayAsButton: PropTypes.bool,
    })
  ).isRequired,
  columns: PropTypes.number,
}

Resources.defaultProps = {
  columns: 2,
}

export default Resources
