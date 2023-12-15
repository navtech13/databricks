import React from "react"
import { Image, RichText, IconList } from ".."
import simpleAdmin from "../../../static/images/Simple-Administration-1.png"

const careers = {
  image: {
    src: simpleAdmin,
    alt: "careers",
  },
  info: `<p>
  See Careers
  <br />
  at Databricks
</p>`,
}

const iconList = [
  { to: "https://www.linkedin.com/company/databricks", icon: "linkedIn" },
  {
    to: "https://www.facebook.com/pages/Databricks/560203607379694",
    icon: "facebookRounded",
  },
  { to: "https://twitter.com/databricks", icon: "twitter" },
  { to: "https://www.databricks.com/feed", icon: "rss" },
  {
    to: "https://www.glassdoor.com/Overview/Working-at-Databricks-EI_IE954734.11,21.htm",
    icon: "glassdoor",
  },
  { to: "https://www.youtube.com/c/Databricks", icon: "youtube" },
]

const footer = {
  menus: [
    [
      {
        label: "Why Databricks",
      },
      {
        label: "Why Choose Databricks",
        to: "/",
        links: [
          {
            label: "For Data Professionals",
            to: "/",
          },
          {
            label: "For Executives",
            to: "/",
          },
          {
            label: "For Startups",
            to: "/",
          },
        ],
      },
      {
        label: "Customers",
        to: "/",
        links: [
          {
            label: "By Industry",
            to: "/",
          },
          {
            label: "By Region",
            to: "/",
          },
          {
            label: "By Product",
            to: "/",
          },
        ],
      },
      {
        label: "Partners",
        to: "/",
        links: [
          {
            label: "Cloud Providers",
            to: "/",
          },
          {
            label: "Implementation",
            to: "/",
          },
          {
            label: "Partner Connect",
            to: "/",
          },
          {
            label: "Technology and Data",
            to: "/",
          },
        ],
      },
      {
        label: "Security and Trust",
        to: "/",
      },
    ],
    [
      {
        label: "Product",
      },
      {
        label: "Lakehouse Platform",
        to: "/",
        links: [
          {
            label: "Platform Overview",
            to: "/",
          },
          {
            label: "Data Management",
            to: "/",
          },
          {
            label: "Data Governance",
            to: "/",
          },
          {
            label: "Data Engineering",
            to: "/",
          },
          {
            label: "Data Streaming",
            to: "/",
          },
          {
            label: "Data Warehousing",
            to: "/",
          },
          {
            label: "Delta Sharing",
            to: "/",
          },
          {
            label: "Machine Learning",
            to: "/",
          },
          {
            label: "Data Science",
            to: "/",
          },
        ],
      },
      {
        label: "Pricing",
        to: "/",
        links: [
          {
            label: "Pricing Overview",
            to: "/",
          },
          {
            label: "Amazon Web Services",
            to: "/",
          },
          {
            label: "Microsoft Azure",
            to: "/",
          },
          {
            label: "Google Cloud",
            to: "/",
          },
        ],
      },
      {
        label: "Open Source",
        to: "/",
        links: [
          {
            label: "Apache Spark",
            to: "/",
          },
          {
            label: "Delta Lake",
            to: "/",
          },
          {
            label: "MLFlow",
            to: "/",
          },
          {
            label: "Redash",
            to: "/",
          },
        ],
      },
    ],
    [
      {
        label: "Solutions",
      },
      {
        label: "For Industries",
        to: "/",
        links: [
          {
            label: "Communications, Media, and Entertainment",
            to: "/",
          },
          {
            label: "Financial Services",
            to: "/",
          },
          {
            label: "Healthcare and Life Sciences",
            to: "/",
          },
          {
            label: "Manufacturing",
            to: "/",
          },
          {
            label: "Public Sector",
            to: "/",
          },
          {
            label: "Retail",
            to: "/",
          },
        ],
      },
      {
        label: "Solution Accelerators",
        to: "/",
      },
      {
        label: "Data Migration",
        to: "/",
      },
      {
        label: "Professional Services",
        to: "/",
      },
    ],
    [
      {
        label: "Resources",
      },
      {
        label: "Documentation",
        to: "/",
      },
      {
        label: "Customer Support",
        to: "/",
      },
      {
        label: "Community",
        to: "/",
      },
      {
        label: "Training and Certification",
        to: "/",
        links: [
          {
            label: "Training Overview",
            to: "/",
          },
          {
            label: "Learning Paths",
            to: "/",
          },
          {
            label: "Certification",
            to: "/",
          },
          {
            label: "Databricks Academy",
            to: "/",
          },
        ],
      },
      {
        label: "Events",
        to: "/",
        links: [
          {
            label: "Data + AI Summit",
            to: "/",
          },
          {
            label: "Lakehouse World Tour",
            to: "/",
          },
          {
            label: "Full Calendar",
            to: "/",
          },
        ],
      },
      {
        label: "Blog and Podcasts",
        to: "/",
        links: [
          {
            label: "Databricks Blog",
            to: "/",
          },
          {
            label: "Data Brew Podcast",
            to: "/",
          },
          {
            label: "Champions of Data & AI Podcast",
            to: "/",
          },
        ],
      },
      {
        label: "Databricks Labs",
        to: "/",
      },
      {
        label: "University Alliance",
        to: "/",
      },
    ],
    [
      // About
      {
        label: "About",
      },
      {
        label: "Company",
        to: "/",
        links: [
          {
            label: "Who We Are",
            to: "/",
          },
          {
            label: "Our Leadership",
            to: "/",
          },
          {
            label: "Our Leadership",
            to: "/",
          },
        ],
      },
      {
        label: "Press",
        to: "/",
        links: [
          {
            label: "Our Leadership",
            to: "/",
          },
          {
            label: "Newsroom",
            to: "/",
          },
        ],
      },
      {
        label: "Databricks Ventures",
        to: "/",
      },
      {
        label: "Careers",
        to: "/",
      },
    ],
  ],
  disclaimer: {
    copyright: `© Databricks 2023. All rights reserved. Apache, Apache Spark, Spark and
      the Spark logo are trademarks of the Apache Software Foundation.`,
    links: [
      { label: "Privacy Policy", to: "/1" },
      { label: "Terms of Use", to: "/2" },
      { label: "Your Privacy Choices", to: "/3" },
      { label: "Your California Privacy Rights", to: "/4" },
    ],
  },
  address: (
    <p>
      Databricks Inc. <br />
      160 Spear Street, 13th Floor San Francisco, CA 94105 <br />
      1-866-330-0121
    </p>
  ),
  social: <IconList variant='B' items={iconList} />,
  careers: (
    <div>
      <Image {...careers.image} />
      <RichText>{careers.info}</RichText>
    </div>
  ),
}

export default footer
