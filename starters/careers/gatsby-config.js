// const web = `${process.env.GATSBY_QUERY_LIMIT_LANGUAGE}-careers`
// const web = `careers`
// const outputDir = `${web}-assets`

module.exports = {
  assetPrefix: "careers-assets",
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
    {
      resolve: 'gatsby-source-greenhouse-job-board',
      options: {
        boardToken: 'databricks'
      },
    }
  ],
}
