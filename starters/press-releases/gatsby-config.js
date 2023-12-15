module.exports = {
  assetPrefix: "press-releases-assets",
  siteMetadata: {
    title: `Databricks`,
    description: `Databricks website`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-databricks-drupal`,
      options: {
        root: __dirname,
      },
    }
  ],
}
