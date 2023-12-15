const footerLanguage = {
  text: "Worldwide",
  items: [
    { label: "English (United States)", to: "/" },
    { label: "Deutsch (Germany)", to: "/de" },
    { label: "Français (France)", to: "/fr" },
    { label: "日本語 (Japan)", to: "/jp" },
    { label: "한국어 (South Korea)", to: "/kr" },
    { label: "Italiano (Italy)", to: "/it" },
    { label: "Português (Brazil)", to: "/br" },
  ],
}

const iconList = [
  { to: "https://www.linkedin.com/company/databricks", icon: "linkedIn" },
  {
    to: "https://www.facebook.com/pages/Databricks/560203607379694",
    icon: "facebook",
  },
  { to: "https://twitter.com/databricks", icon: "twitter" },
  { to: "https://www.databricks.com/feed", icon: "rss" },
  {
    to: "https://www.glassdoor.com/Overview/Working-at-Databricks-EI_IE954734.11,21.htm",
    icon: "glassdoor",
  },
  { to: "https://www.youtube.com/c/Databricks", icon: "youtube" },
]

const careers = {
  info: `<p>
  See Careers
  <br />
  at Databricks
</p>`,
}

const about = {
  language: footerLanguage,
  info: `<p>
    Databricks Inc. 160 Spear Street, 13th Floor San Francisco, CA
    94105 1-866-330-0121
  </p>`,
}

const footer = {
  menus: [
    [
      { label: "Product", to: "/product" },
      { label: "Platform Overview", to: "/product-2" },
      { label: "Pricing", to: "/product-3" },
      { label: "Feature Comparison", to: "/product-4" },
      { label: "Open Source Tech", to: "/produc-t5" },
      { label: "Try Databricks", to: "/product-6" },
      { label: "Demo", to: "/product-7" },
    ],
    [
      { label: "Learn & Support", to: "/learnAndSupport" },
      { label: "Documentation", to: "/learnAndSupport-2" },
      { label: "Online Community", to: "/learnAndSupport-3" },
      { label: "Training & Certification", to: "/learnAndSupport-4" },
      { label: "Help Center", to: "/learnAndSupport-5" },
      { label: "Legal", to: "/learnAndSupport-6" },
    ],
    [
      { label: "Solutions", to: "/solutions" },
      { label: "By Industries", to: "/solutions-2" },
      { label: "Professional Services", to: "/solutions-3" },
      { label: "Feature Comparison", to: "/solutions-4" },
      { label: "Open Source Tech", to: "/solutions-5" },
    ],
    [
      { label: "Company", to: "/company" },
      { label: "About Us", to: "/company-2" },
      { label: "Careers at Databricks", to: "/company-3" },
      { label: "Newsroom", to: "/company-4" },
      { label: "Company Blog", to: "/company-5" },
      { label: "Contact Us", to: "/company-6" },
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
  careers,
  about,
  iconList,
}

export default footer
