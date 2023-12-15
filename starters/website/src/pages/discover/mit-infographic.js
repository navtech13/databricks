import React from "react"
import {
  HeroBlock,
  MitBlockTwo,
  BlockComponentThree,
  MitFourBlock,
  MitFiveBlock,
  MitBlockSix,
  MitSevenBlock,
  MitBlockEight,
  Block9,
  MitFooter,
  MitHero,
} from "../../../../../packages/databricks-ui/src/components/MIT"

import BaseLayout from "../../../../../packages/gatsby-theme-databricks-drupal/src/components/base-layout"

const seo = {
  metaTags: [
    {
      type: "Drupal_MetaLink",
      key: "canonical",
      value: "/discover/mit-infographic",
    },
    {
      type: "Drupal_MetaValue",
      key: "robots",
      value:
        "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    },
    {
      type: "Drupal_MetaValue",
      key: "title",
      value: "MIT Infographic - Databricks",
    },
    {
      type: "Drupal_MetaValue",
      key: "description",
      value:
        "See what CIOs, CDOs, and other data and analytics leaders have to say in the recent MIT Tech Review Insights report.",
    },
    {
      type: "Drupal_MetaValue",
      key: "keywords",
      value: "[]",
    },
    {
      type: "Drupal_MetaProperty",
      key: "og:site_name",
      value: "Databricks",
    },
    {
      type: "Drupal_MetaProperty",
      key: "og:type",
      value: "article",
    },
    {
      type: "Drupal_MetaProperty",
      key: "og:url",
      value: "/discover/mit-infographic",
    },
    {
      type: "Drupal_MetaProperty",
      key: "og:title",
      value: "MIT Infographic - Databricks",
    },
    {
      type: "Drupal_MetaProperty",
      key: "og:description",
      value:
        "See what CIOs, CDOs, and other data and analytics leaders have to say in the recent MIT Tech Review Insights report.",
    },
    {
      type: "Drupal_MetaProperty",
      key: "og:image",
      value:
        "https://www.databricks.com/wp-content/uploads/2021/12/MITreport-og-image.jpg",
    },
    {
      type: "Drupal_MetaProperty",
      key: "og:image:width",
      value: "1200",
    },
    {
      type: "Drupal_MetaProperty",
      key: "og:image:height",
      value: "628",
    },
    {
      type: "Drupal_MetaProperty",
      key: "article:publisher",
      value: "https://www.facebook.com/databricksinc/",
    },
    {
      type: "Drupal_MetaProperty",
      key: "article:published_time",
      value: "Tue, 06/07/2016 - 15:02",
    },
    {
      type: "Drupal_MetaProperty",
      key: "article:modified_time",
      value: "Sat, 10/22/2022 - 15:02",
    },
    {
      type: "Drupal_MetaValue",
      key: "p:domain_verify",
      value: "e0c70fe08ba27888b8abee84a0f866b3",
    },
    {
      type: "Drupal_MetaValue",
      key: "twitter:card",
      value: "summary_large_image",
    },
    {
      type: "Drupal_MetaValue",
      key: "twitter:site",
      value: "@databricks",
    },
    {
      type: "Drupal_MetaValue",
      key: "twitter:creator",
      value: "@databricks",
    },
  ],
  translations: [],
  skipMetaImage: true,
  image:
    "https://www.databricks.com/wp-content/uploads/2021/12/MITreport-og-image.jpg",
  urls: {
    current: "/discover/mit-infographic",
  },
}

// Static MIT infographic page
const MIT = () => {
  return (
    <BaseLayout skipToMain seo={seo}>
      <MitHero />
      <MitBlockTwo />
      <div>
        <BlockComponentThree />
        <HeroBlock
          title='Technology-enabled collaboration is creating a working data culture'
          body='Pushing analytics and ML capabilities to the edge with advanced data technologies will help end users make more informed business decisions — the hallmark of a strong data culture.'
          index='02'
          direction='right'
        >
          <MitFourBlock />
        </HeroBlock>
        <HeroBlock
          title='ML’s business impact is limited by difficulties managing its end-to-end lifecycle'
          body='The most significant challenge, according to 55% of respondents, is the lack of a central place to store and discover ML models.'
          index='03'
          direction='left'
        >
          <MitFiveBlock />
        </HeroBlock>
        <MitBlockSix />
        <HeroBlock
          title='Open standards are the top requirement of future data architecture strategies'
          body='If respondents could build a new data architecture for their business, the most critical advantage over the existing architecture would be a greater embrace of open source standards and open data formats.'
          index='05'
          direction='left'
        >
          <MitSevenBlock />
        </HeroBlock>
      </div>
      <MitBlockEight />
      <Block9 />
      <MitFooter />
    </BaseLayout>
  )
}

export default MIT
