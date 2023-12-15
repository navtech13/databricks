import React from "react"
import PropTypes from "prop-types"
import RichText from "../RichText"
import TextLink from "../TextLink"
import {
  convertDateString,
  convertDrupalDateToLocalDate,
} from "../../../../gatsby-theme-databricks-drupal/src/helpers/convertTimestamp"

const PressRelease = ({
  publishDate,
  title,
  link,
  company,
  dateFormat,
  dateOptions,
}) => {
  return (
    <div className='mb-4 flex flex-col' data-cy='PressRelease'>
      <div className='flex'>
        {company !== "" && (
          <RichText className='text-1.75 md:text-2 text-gray-dark-logo'>
            {company}
            {publishDate && `,`}&nbsp;
          </RichText>
        )}
        {publishDate && (
          <RichText className='text-1.75 md:text-2 text-gray-dark-logo'>
            {dateFormat === "drupal"
              ? convertDrupalDateToLocalDate(publishDate, dateOptions)
              : convertDateString(publishDate, dateOptions)}
          </RichText>
        )}
      </div>
      <RichText className='text-navy-06 text-2 md:text-2.5 mt-1'>{title}</RichText>
      <TextLink className='text-2 arrow-icon mt-1' variant='A' to={link}>
        Read now
      </TextLink>
    </div>
  )
}

PressRelease.propTypes = {
  publishDate: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  company: PropTypes.string,
  dateOptions: PropTypes.shape({}),
  dateFormat: PropTypes.string,
}

PressRelease.defaultProps = {
  company: "",
  dateOptions: {
    timeZone: "UTC",
    month: "short",
    day: "numeric",
    year: "numeric",
  },
  dateFormat: "",
}

export default PressRelease
