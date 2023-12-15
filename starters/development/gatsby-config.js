const dotenv = require("dotenv")

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  assetPrefix: process.env.GATSBY_ASSET_PREFIX,
  siteMetadata: {
    title: `Databricks`,
    description: `Databricks website`,
    author: `@Octahedroid`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-databricks-drupal`,
      options: {
        root: __dirname,
      },
    },
  ],
}
