import React, { useEffect } from "react"
import {
  BaseLayout,
  Button,
  Card,
  LargePageHeader,
  Wrapper,
  CardGrid,
  CtaImageBlock,
  BasicAccordion,
} from "databricks-ui"
import { Link } from "gatsby"
import HeaderWT from "gatsby-theme-databricks-drupal/src/components/header-wt"
import FooterWT from "gatsby-theme-databricks-drupal/src/components/footer-wt"
// import headerImage from "../../../../../../packages/databricks-ui/static/images/wt/DAIWT-header-animation_no_loop.gif"
import { LanguageContext } from "gatsby-theme-databricks-drupal/src/components/language-provider"
import SEO from "gatsby-theme-databricks-drupal/src/components/seo"
import ScriptComponent from "gatsby-theme-databricks-drupal/src/components/script"
import initUTMS from "databricks-ui/src/components/UTMS"
import {
  loadOneTrust,
  loadRudderStack,
} from "gatsby-theme-databricks-drupal/src/helpers/eventTracking"
import headerImage from "../../../../../../packages/databricks-ui/static/images/wt/lakehouse_word_tour_animation_v1_loop.gif"
import globalReach from "../../../../../../packages/databricks-ui/static/images/wt/Global-Reach.png"
import keynoteSessions from "../../../../../../packages/databricks-ui/static/images/wt/Keynote-and-Breakout-Sessions.png"
import joinCommunity from "../../../../../../packages/databricks-ui/static/images/wt/Join-Community.jpg"
import exploreTechnologies from "../../../../../../packages/databricks-ui/static/images/wt/Explore-Technologies.png"
import expandKnowledge from "../../../../../../packages/databricks-ui/static/images/wt/Expand-Your-Knowledge.png"
import DataAiworldtour from "../../daiwt/data+aiworldtour"
import worldTourMetadata from "../../../data/worldTourMetadata"

const WorldTourPage = ({ location }) => {
  const seo = {
    skipMetaImage: true,
    metaTags: worldTourMetadata,
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

  const accordionList = [
    {
      description:
        "<h3>How much does it cost to attend the Data + AI World Tour? And how do I register?</h3>",
      children:
        "All Data + AI World Tour stops are free to attend. You must register for each individual event you want to attend. If registration is not open yet for an event you would like to attend or if you’d like to be informed as new cities are added, please complete the <a href='#sign-up'>Info Form </a> to receive updates.",
      key: 1,
    },
    {
      description:
        "<h3>I am having technical difficulties with my registration or virtual experience. Who can help me?</h3>",
      children:
        "Please email <a href='mailto:world-tour-support@databricks.com'>world-tour-support@databricks.com</a>.",
      key: 2,
    },
    {
      description: "<h3>How do I sponsor the Data + AI World Tour?</h3>",
      children:
        "If you are interested in sponsoring the Data + AI World Tour, please contact <a href='mailto:mike.mooney@databricks.com'>mike.mooney@databricks.com</a> for Tier 1 events, and <a href='mailto:world-tour-sponsorships@databricks.com'>world-tour-sponsorships@databricks.com</a> for Tier 2 events.",
      key: 3,
    },
  ]

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
          <div>
            <LargePageHeader
              backgroundToken='gray-warm-medium'
              image={{ src: headerImage }}
              contentWidthDesktop={7}
              contentWidthTablet={7}
              spaceBetweenTablet={0}
              spaceBetweenDesktop={1}
            >
              <h1 className='font-medium'>Join Generation AI</h1>
              <p className='h3'>
                In a world redefined by AI, your ability to build, train, deploy and
                manage your own models — using your own data — is what will set you
                apart. Join us for the Data + AI World Tour Virtual Experience to explore the latest in data,
                analytics and AI on the Databricks Data Intelligence Platform.
              </p>
              <Button
                variant='primary'
                className='w-25 rounded-full'
                to='#locations'
                as={Link}
              >
                Explore events
              </Button>
            </LargePageHeader>

            <Wrapper>
              <h2 className='mb-4 lg:mb-6'>Why Attend</h2>
              <div className='pb-5 md:pb-6 lg:mb-10 lg:py-0'>
                <CtaImageBlock
                  image={{ src: exploreTechnologies }}
                  imagePosition='right'
                  verticalAlignment='center'
                  spaceBetween={1}
                >
                  <h3>Explore technologies</h3>
                  <p>
                    Join us virtually to explore the latest advancements in the
                    Databricks Data Intelligence Platform, including products like
                    Unity Catalog, Databricks AI, Databricks SQL, MosaicML and
                    essential open source technologies like Delta Lake. Learn how
                    leading organizations in your region are using these technologies
                    to advance their data and AI initiatives.
                  </p>
                </CtaImageBlock>
              </div>

              <div className='py-5 md:py-6 lg:mb-10 lg:py-0'>
                <CtaImageBlock
                  image={{ src: expandKnowledge }}
                  imagePosition='left'
                  verticalAlignment='center'
                  spaceBetween={1}
                >
                  <h3>Expand your knowledge</h3>
                  <p>
                    Whether you’re a data team leader, data engineer, scientist or
                    architect — Data + AI World Tour is made for you. Join us
                    virtually to hear from technical speakers and attend sessions
                    that span a broad range of topics, participate in expert-led
                    training, and learn from the most advanced data teams in your
                    region.
                  </p>
                </CtaImageBlock>
              </div>

              <div className='py-5 md:py-6 lg:mb-10 lg:py-0'>
                <CtaImageBlock
                  image={{ src: joinCommunity }}
                  imagePosition='right'
                  verticalAlignment='center'
                  spaceBetween={1}
                >
                  <h3>Join your community </h3>
                  <p>
                    Don’t miss the opportunity to connect with local and like-minded
                    peers and companies who believe in the transformative power of
                    data, analytics and AI. Join an industry or topical meetup, check
                    out the job board and get to know your peers at one of our
                    in-person events.
                  </p>
                </CtaImageBlock>
              </div>
            </Wrapper>

            <DataAiworldtour />

            <Wrapper>
              <h2>FAQ</h2>
              <BasicAccordion
                parseToHtml={true}
                allowAllOpen={true}
                showExpandAll={true}
                variant='large'
                accordions={accordionList}
              />
            </Wrapper>
          </div>
        </BaseLayout>
      </LanguageContext.Provider>
    </>
  )
}

export default WorldTourPage
