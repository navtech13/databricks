import React from "react"
import PropTypes from "prop-types"
import { RichText } from "databricks-ui"
import { convertDateString } from "../helpers/convertTimestamp"
import Social from "./social"

const PressReleaseDetail = ({ title, tagline, publishDate, content, pathname }) => {
  const dateOptions = {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  }

  const styles = {
    wrapper:
      "xxl:max-w-[1456px] mx-auto flex flex-col w-11/12 max-w-[508px] md:max-w-[704px] lg:max-w-[966px] xl:max-w-[1146px] pb-5",
  }
  return (
    <section className='bg-gray-warm-light'>
      <div className={styles.wrapper}>
        <div className='lg:w-8/12 xl:w-8/12'>
          <div className='mb-8 pt-5'>
            <h1 className='text-5' data-cy='title'>
              {title}
            </h1>
            <RichText className='text-2.5 mt-2.5'>{tagline}</RichText>
            <h6 className='mt-2.5 font-bold' data-cy='timestamp'>
              {/* {convertTimestampToDate(publishDate, dateOptions)}
              &nbsp;
              {convertTimestampToLocalTime(publishDate, timeOptions)} */}
              {convertDateString(publishDate, dateOptions)}
            </h6>
          </div>
          <Social
            url={`${process.env.GATSBY_DEPLOY_URL}${pathname}`}
            className='pt-1 pb-5'
          />
          <div
            className='rich-text-blog'
            dangerouslySetInnerHTML={{ __html: content }}
            data-cy='content'
          />
        </div>
      </div>
    </section>
  )
}

PressReleaseDetail.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  pathname: PropTypes.string.isRequired,
}

PressReleaseDetail.defaultProps = {
  subtitle: "",
}

export default PressReleaseDetail
