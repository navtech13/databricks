const blogListingMetatags = (title, description, type, lang = "en_US") => {
  const siteSettings = {
    pDomain: "e0c70fe08ba27888b8abee84a0f866b3",
    robots:
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
    siteName: "Databricks",
    twitterSite: "@databricks",
    twitterCard: "summary_large_image",
  }

  return [
    {
      type: "Value",
      key: "title",
      value: title,
    },
    {
      type: "Value",
      key: "robots",
      value: siteSettings.robots,
    },
    {
      type: "Property",
      key: "og:title",
      value: title,
    },
    {
      type: "Value",
      key: `description`,
      value: description,
    },
    {
      type: "Property",
      property: `og:description`,
      value: description,
    },
    {
      type: "Property",
      property: `og:type`,
      value: type,
    },
    {
      type: "Property",
      property: `og:locale`,
      value: lang,
    },
    {
      type: "Value",
      key: `twitter:card`,
      value: siteSettings.twitterCard,
    },
    {
      type: "Value",
      key: `twitter:site`,
      value: siteSettings.twitterSite,
    },
    {
      type: "Value",
      key: "p:domain_verify",
      value: siteSettings.pDomain,
    },
  ]
}

export default blogListingMetatags
