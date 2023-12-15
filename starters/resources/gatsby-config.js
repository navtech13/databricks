module.exports = {
  assetPrefix: `en-resources-assets`,
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
