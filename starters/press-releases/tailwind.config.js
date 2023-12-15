const config = require("../../packages/databricks-ui/tailwind.config")

config.content = [
  "../../packages/gatsby-theme-databricks-drupal/src/**/*.{js,jsx,ts,tsx}",
  "../../packages/databricks-ui/src/**/*.{js,jsx,ts,tsx}",
]

module.exports = config
