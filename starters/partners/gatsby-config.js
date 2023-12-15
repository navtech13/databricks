const dotenv = require("dotenv")

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
})

const web = `${process.env.GATSBY_QUERY_LIMIT_LANGUAGE}-partners`
const outputDir = `${web}-assets`

module.exports = {
  assetPrefix: outputDir,
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
