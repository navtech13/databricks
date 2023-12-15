import React from "react"
import { Grid, RichText, TextLink, IconList } from "../../components"
import useTranslate from "gatsby-theme-databricks-drupal/src/utils/translate"

const NewsroomResources = () => {
  const {translate} = useTranslate()
  const iconList = [
    {
      to: "https://www.facebook.com/pages/Databricks/560203607379694",
      icon: "facebookCircle",
    },
    { to: "https://www.linkedin.com/company/databricks", icon: "linkedIn" },
    { to: "https://twitter.com/databricks", icon: "twitter" },
    { to: "https://www.databricks.com/feed", icon: "rss" },
  ]

  return (
    <div className='mb-12 flex flex-col pt-2.5'>
      <h2 className='mb-4'>{translate("resources.title")}</h2>
      <Grid columns={3.5} gap={3}>
        <div className='border-navy-01 border-t pt-4'>
          <h3 className='mb-1'>{translate("resources.contact.title")}</h3>
          <RichText>
            <strong>{translate("resources.inquires")}</strong>
            <p className='mt-1'>
              <a href='mailto:press@databricks.com'>press@databricks.com</a>
            </p>
          </RichText>
        </div>
        <div className='border-navy-01 border-t pt-4'>
          <h3 className='mb-1'>{translate("resources.stay.connected")}</h3>
          <RichText className='mb-4 max-w-[265px]'>
            {translate("resources.stay.connected.description")}
          </RichText>
          <TextLink
            variant='A'
            className='arrow-icon'
            to='https://pages.databricks.com/signupfornewsletter.html'
          >
            {translate("resources.subscribe")}
          </TextLink>
          <div className='mt-4 flex items-center'>
            <IconList variant='A' basis='5' items={iconList} sameTab />
          </div>
        </div>
        <div className='border-navy-01 border-t pt-4'>
          <h3 className='mb-1'>{translate("resources.get")}</h3>
          <div className='mb-4 max-w-[265px]'>
            <RichText>{translate("resources.contact.description")[0]}</RichText>
            <br />
            <RichText as="strong">{translate("resources.contact.info")[0]}</RichText>
          </div>
          <TextLink
            variant='A'
            className='arrow-icon'
            to='https://brand.databricks.com/'
          >
            {translate("resources.contact.guidelines")}
          </TextLink>
        </div>
      </Grid>
    </div>
  )
}

NewsroomResources.propTypes = {}

export default NewsroomResources
