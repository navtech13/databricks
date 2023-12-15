import React from "react"
import PropTypes from "prop-types"
import { Grid, Image } from ".."
import resolveImage from "../../../../gatsby-theme-databricks-drupal/src/utils/resolve-image"

const FeatureList = ({ title, items }) => {
  return (
    <div className='inner-wrapper'>
      <div className='border-gray-lines rounded-lg border p-5' data-cy='FeatureList'>
        <h2 className='section-title'>{title}</h2>
        <Grid columns={2} gap={3}>
          {items.map((item) => (
            <div className='flex space-x-6 pt-2.5'>
              <div>
                <Image
                  className='min-w-[68px]'
                  {...resolveImage(item.entity.fieldImage)}
                />
              </div>
              <div>
                <p className='text-green-04 text-1.5 font-bold'>
                  {item.entity.fieldSectionTitle}
                </p>
                <h3>{item.entity.fieldTitle}</h3>
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.entity.fieldDescription.processed,
                  }}
                />
              </div>
            </div>
          ))}
        </Grid>
      </div>
    </div>
  )
}

FeatureList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf({}).isRequired,
}

export default FeatureList
