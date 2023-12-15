import React, { useState, useMemo } from "react"
import PropTypes from "prop-types"
import { Headline, Button } from "databricks-ui"
import useTranslate from "../utils/translate"

const Headlines = ({ count, data }) => {
  const {translate} = useTranslate()

  const [headlines] = useState(
    data.filter((item) => !item.fieldNewsFeaturedStory)
  )
  const [numItemsShown, setNumItemsShown] = useState(5)

  const showMore = () => {
    if (numItemsShown + count <= headlines.length) {
      setNumItemsShown(numItemsShown + count)
    } else {
      setNumItemsShown(headlines.length)
    }
  }

  const itemsToShow = useMemo(() => {
    return headlines
      .sort((a, b) => (a.fieldNewsDate?.value > b.fieldNewsDate?.value ? -1 : 1))
      .slice(0, numItemsShown)
      .map((item) => (
        <Headline
          key={item.uuid}
          title={item.title}
          publishDate={item.fieldNewsDate?.value}
          link={item.fieldNewsCtaLink.uri}
          thumbnail={item.fieldNewsLogo?.entity?.fieldMediaImage}
          company={item.fieldNewsCrnName}
        />
      ))
  }, [headlines, numItemsShown])

  return (
    <div className='py-8'>
      <h2 className='mb-4'>{translate("more.headlines")}</h2>
      <div>{itemsToShow.length ? itemsToShow : translate("form.error-loading")}</div>
      {numItemsShown < headlines.length && (
        <Button className='mt-2.5' variant='secondary' onClick={showMore}>
          Load more articles
        </Button>
      )}
    </div>
  )
}

Headlines.propTypes = {
  count: PropTypes.number,
}

Headlines.defaultProps = {
  count: 5,
}

export default Headlines
