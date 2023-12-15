import React, { useEffect } from "react"
import { BaseLayout, Wrapper, RichText } from "databricks-ui"
import HeaderWT from "gatsby-theme-databricks-drupal/src/components/header-wt"
import FooterWT from "gatsby-theme-databricks-drupal/src/components/footer-wt"
import { LanguageContext } from "gatsby-theme-databricks-drupal/src/components/language-provider"
import SEO from "gatsby-theme-databricks-drupal/src/components/seo"
import ScriptComponent from "gatsby-theme-databricks-drupal/src/components/script"
import initUTMS from "databricks-ui/src/components/UTMS"
import {
  loadOneTrust,
  loadRudderStack,
} from "gatsby-theme-databricks-drupal/src/helpers/eventTracking"
import eventsPolicyMetadata from "../../../../data/worldTourMetadata"
import headerImage from "../../../../images/wt-header-bg.svg"
import WorldTourFooterCTA from "../../../../components/WorldTourFooterCTA"

const EventsPolicyPage = ({ location }) => {
  const seo = {
    skipMetaImage: true,
    metaTags: eventsPolicyMetadata,
    urls: {
      base: location.origin,
      current: location.pathname,
      qs: location.search,
    },
  }

  useEffect(() => {
    initUTMS()

    // event tracking
    loadOneTrust()
    loadRudderStack(seo)
  }, [])

  return (
    <>
      <LanguageContext.Provider
        value={{ currentLanguage: { id: "EN" }, defaultLanguage: { id: "EN" } }}
      >
        <SEO {...seo} />
        <ScriptComponent />
        <BaseLayout
          variant='wt'
          navComponent={<HeaderWT />}
          footerComponent={<FooterWT />}
        >
          <div
            className='bg-gray-warm-medium wt-inside-hero'
            style={{
              backgroundImage: `url("${headerImage}")`,
              backgroundPosition: "right",
              minHeight: "227px",
            }}
          >
            <div
              className='inner-wrapper flex items-end pb-2.5'
              style={{ minHeight: "227px" }}
            >
              <h1>Events Policy</h1>
            </div>
          </div>
          <Wrapper>
            <section className='md:w-3/4'>
              <RichText variant='body'>
                <h2>Events Policy</h2>
                <p>
                  Databricks reserves the right to deny registration to any
                  individual or entity for any reason, in Databricks’s sole
                  discretion, including for past or present failure to meet
                  Databricks’s standards of conduct (including, but not limited to,
                  engaging in violent, illegal, threatening, or discriminatory
                  conduct).
                </p>
                <p>
                  Sponsorship payment must be received in full prior to the event in
                  order to print attendee badge on-site.
                </p>
                <h2>Registration Confirmation</h2>
                <p>
                  Registration will be confirmed by email. You’ll receive a message
                  as soon as your registration has been processed.
                </p>
                <h2>Speakers & Sessions</h2>
                <p>
                  The speakers listed on this website are leading professionals in
                  their respective fields. Should a speaker be unable to attend the
                  conference, all efforts will be made to replace him or her with one
                  of comparable experience and qualifications. We are constantly
                  working on improving the quality of our conference products. If the
                  opportunity arises we may, at our discretion, add conference
                  sessions and workshops to the posted line-up to enhance the
                  schedule.
                </p>
                <h2>Photo Release & Privacy Information</h2>
                <p>
                  From time to time Databricks may choose to photograph and record
                  certain portions of the conference and may capture conference
                  participants. Databricks may choose such photographs and recordings
                  in our promotional materials. By virtue of your attendance at Data
                  + AI World Tour you consent to, Databricks’ use of your likeness in
                  such materials and you hereby waive “moral rights” in such photos,
                  recordings, or other digital content. You agree that any personal
                  data you provide us will be handled in accordance with this Event
                  Policy and our{" "}
                  <a href='https://databricks.com/privacypolicy'>Privacy Policy</a>.
                </p>
                <p>
                  You may not record any sessions or sessions at Data + AI World Tour
                  without prior approval from Databricks.
                </p>
              </RichText>
            </section>
          </Wrapper>
          <WorldTourFooterCTA />
        </BaseLayout>
      </LanguageContext.Provider>
    </>
  )
}

export default EventsPolicyPage
