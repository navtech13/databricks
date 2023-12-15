const postcssImport = require("postcss-import")
const tailwindcss = require("tailwindcss")
const autoprefixer = require("autoprefixer")
const tailwindNesting = require("tailwindcss/nesting")
const cssnano = require("cssnano")

module.exports = () => ({
  plugins: [
    postcssImport,
    autoprefixer,
    tailwindNesting,
    tailwindcss,
    ...(process.env.NODE_ENV === "production" ? [cssnano] : []),
  ],
})
