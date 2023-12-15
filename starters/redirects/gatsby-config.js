module.exports = {
  // assetPrefix: `legal-asset-prefix`,
  // pathPrefix: `/legal`,
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
