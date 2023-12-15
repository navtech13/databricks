import React, { useState, useMemo, useContext } from "react"
import { useLocation } from "@reach/router"
import PropTypes from "prop-types"
import { PressRelease, Button } from "databricks-ui"
import { useLanguageContext } from "./language-provider"
import useTranslate from "../utils/translate"
import GlobalContext from "./global-context"
import Wrapper from "databricks-ui/src/components/ContentWrapper"

const PressReleases = ({ count }) => {
  const { currentLanguage } = useLanguageContext()
  const { translate } = useTranslate()

  const context = useContext(GlobalContext)

  if (!context) {
    return <></>
  }

  const entities = context?.pressReleases?.entities

  const filteredData =
    entities &&
    entities.filter(
      (item) => item.entityLanguage.id === currentLanguage.id.toLowerCase()
    )

  if (!filteredData || filteredData.length <= 0) {
    return <></>
  }

  const [pressReleases] = useState(entities)
  const [numItemsShown, setNumItemsShown] = useState(5)
  const urlPath = useLocation()

  const showMore = () => {
    if (numItemsShown + count <= pressReleases.length) {
      setNumItemsShown(numItemsShown + count)
    } else {
      setNumItemsShown(pressReleases.length)
    }
  }

  const dateOptions = {
    timeZone: "UTC",
    month: "long",
    day: "numeric",
    year: "numeric",
  }

  const itemsToShow = useMemo(() => {
    return pressReleases
      .slice(0, numItemsShown)
      .map((item) => (
        <PressRelease
          key={item.uuid}
          title={item.title}
          publishDate={item.fieldNewsDate?.value}
          dateOptions={dateOptions}
          link={item.entityUrl.path}
        />
      ))
  }, [pressReleases, numItemsShown])

  return (
    <Wrapper>
      <div className='pt-2.5 pb-8' data-cy='PressReleases'>
        <h2 className='mb-4'>{translate("press.releases")}</h2>
        <div className='w-full lg:w-2/3'>
          {itemsToShow.length ? itemsToShow : translate("form.error-loading")}
        </div>
        {urlPath?.pathname === "/company/newsroom" ? (
          <Button variant='secondary' href='/company/newsroom/press-releases'>
            {translate("press.releases.see.all")}
          </Button>
        ) : (
          <Button variant='secondary' onClick={showMore}>
            {translate("press.releases.see.more")}
          </Button>
        )}
      </div>
    </Wrapper>
  )
}

PressReleases.propTypes = {
  count: PropTypes.number,
  headline: PropTypes.string,
}

PressReleases.defaultProps = {
  count: 5,
  headline: "",
}

export default PressReleases
