const dotenv = require("dotenv")

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})
const path = require("path")
const login = require("./src/auth/login")

module.exports = {
  siteMetadata: {
    siteUrl: `https://www.databricks.com`,
    embedGreenhouseForm: true,
    greenhouseBoardToken: "databricks",
  },
  trailingSlash: `never`,
  plugins: [
    "gatsby-plugin-webpack-bundle-analyser-v2",
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://www.databricks.com",
        sitemap: "https://www.databricks.com/sitemap.xml",
        env: {
          development: {
            policy: [{ userAgent: "*", disallow: ["/"] }],
          },
          production: {
            policy: [{ userAgent: "*", allow: "/" }],
          },
        },
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Drupal",
        fieldName: "drupal",
        url: `${process.env.GATSBY_DRUPAL_URL}/graphql`,
        headers: async () => {
          const token = await login.fetchOauthToken(
            process.env.GATSBY_DRUPAL_URL,
            process.env.DRUPAL_AUTH_USERNAME,
            process.env.DRUPAL_AUTH_PASSWORD,
            process.env.DRUPAL_AUTH_CLIENT_ID,
            process.env.DRUPAL_AUTH_CLIENT_SECRET
          )
          if (typeof token === "object") {
            const json = await token
            return {
              Authorization: `${json.token_type} ${json.access_token}`,
            }
          }
          return {
            Authorization: token,
          }
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, "../databricks-ui/static/images/"),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Databricks`,
        short_name: `Databricks`,
        start_url: `/`,
        display: `standalone`,
        icon: "../../assets/global/images/databricks-icon-32x32.png",
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 80,
          breakpoints: [360, 768, 1440, 1800],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        checkSupportedExtensions: false,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: "@vercel/gatsby-plugin-vercel-analytics",
      options: {
        // (optional) Prints metrics in the console when true
        debug: false,
      },
    },
    {
      resolve: "gatsby-plugin-newrelic",
      options: {
        config: {
          instrumentationType: "proAndSPA",
          accountId: `${process.env.GATSBY_NEW_RELIC_ACCOUNT_ID}`,
          trustKey: `${process.env.GATSBY_NEW_RELIC_TRUST_KEY}`,
          agentID: `${process.env.GATSBY_NEW_RELIC_AGENT_ID}`,
          licenseKey: `${process.env.GATSBY_NEW_RELIC_BROWSER_LICENSE_KEY}`,
          applicationID:
            process.env.NODE_ENV === "production"
              ? `${process.env.GATSBY_NEW_RELIC_APPLICATION_ID}`
              : `${process.env.GATSBY_NEW_RELIC_APPLICATION_ID_DEV}`,
          beacon: "bam.nr-data.net",
          errorBeacon: "bam.nr-data.net",
        },
      },
    },
    // {
    //   resolve: "gatsby-build-newrelic",
    //   options: {
    //     NR_INSERT_KEY: process.env.GATSBY_NEW_RELIC_INSERT_KEY || "",
    //     NR_LICENSE_KEY: process.env.GATSBY_NEW_RELIC_LICENSE_KEY || "",
    //     NR_ACCOUNT_ID: process.env.GATSBY_NEW_RELIC_ACCOUNT_ID,
    //     SITE_NAME: "databricks-localhost",
    //     customTags: { gatsbySite: true },
    //   },
    // },
  ],
}
