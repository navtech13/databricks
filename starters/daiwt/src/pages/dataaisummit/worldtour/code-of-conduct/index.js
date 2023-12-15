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
import codeOfConductMetadata from "../../../../data/worldTourMetadata"
import headerImage from "../../../../images/wt-header-bg.svg"
import WorldTourFooterCTA from "../../../../components/WorldTourFooterCTA"

const CodeOfConductPage = ({ location }) => {
  const seo = {
    skipMetaImage: true,
    metaTags: codeOfConductMetadata,
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
              <h1>Code of Conduct</h1>
            </div>
          </div>
          <Wrapper>
            <section className='md:w-3/4'>
              <RichText variant='body'>
                <h2>Data + AI World Tour Event, Organized by Databricks</h2>
                <p>
                  World Tour Organizers are committed to creating a safe and
                  inclusive experience for our conference attendees, regardless of
                  gender, sexual orientation, disability, physical appearance, body
                  size, race, or religion. We do not tolerate harassment in any form.
                  All communication — including at the event and various associated
                  venues, as well as online — should be appropriate for a
                  professional audience, including people of many different
                  backgrounds and experiences. Be kind to others. Do not insult or
                  put down other attendees. Act professionally. Remember that
                  harassment and sexist, racist, or exclusionary jokes are not
                  appropriate at any time at any event organized by Databricks.
                </p>
                <h2>Interaction Guidelines for Attendees</h2>
                <p>
                  For all interactions during the Data + AI World Tour Event, we
                  expect participants to abide by the event’s Code of Conduct to
                  ensure the environment remains productive and respectful. The
                  following guidelines will further help ensure we maintain an
                  inclusive experience throughout our event:
                </p>
                <ul>
                  <li>Be respectful of others.</li>
                  <li>Avoid conflicts and arguments.</li>
                  <li>
                    Use common sense, kindness, and consideration together with the
                    guidelines outlined above.
                  </li>
                  <li>
                    If you intend to participate in the event, please make sure to
                    dress appropriately.
                  </li>
                </ul>
                <h2>Enforcement</h2>
                <p>
                  If a participant engages in behavior that doesn’t comply with these
                  expectations, World Tour Organizers may take any action that we
                  deem appropriate, including warning the participant, excluding the
                  participant from certain activities, prohibiting the participant
                  from attending future events organized by Databricks, expelling the
                  participant from the event without a refund, banning the
                  participant from online forums, and other similar type experiences.
                  Participants asked to stop any harassing or other unacceptable
                  behaviors are expected to comply immediately. Anyone violating
                  these rules may be asked to leave the experience without a refund
                  at the sole discretion of World Tour Organizers.
                </p>
                <p>
                  Please note, while we take all concerns raised seriously, we will
                  use our discretion to determine when and how to follow up on
                  reported incidents, and may decline to take any further action
                  and/or may direct the participant to other resources to address the
                  concern.
                </p>
                <h2>Reporting an Issue</h2>
                <p>
                  If you are being harassed, notice that someone else is, or have any
                  concerns, please contact World Tour Organizers at{" "}
                  <a href='mailto:world-tour-support@databricks.com'>
                    world-tour-support@databricks.com
                  </a>{" "}
                  and provide your name, phone number, email, and a description of
                  the situation. World Tour Organizers can only address complaints
                  about behavior at the Event.
                </p>
                <p>
                  The reporting mechanisms under this Code of Conduct are not
                  intended to address criminal activity or emergency situations. If
                  you have been the victim of a crime or there is an emergency,
                  please contact the appropriate municipal authorities, such as the
                  police, fire, medical, or other emergency responders.
                </p>
                <p>
                  Thank you for helping make Databricks Data + AI World Tour a
                  welcoming, friendly place for all to share new ideas, learn, and
                  connect.
                </p>
                <p>
                  Information for Presenters: Presenters who are unsure whether their
                  presentations or other materials and communications are consistent
                  with these expectations, please contact{" "}
                  <a href='mailto:world-tour-support@databricks.com'>
                    world-tour-support@databricks.com
                  </a>{" "}
                  in advance of the experience.
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

export default CodeOfConductPage
