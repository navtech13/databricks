const path = require("path")
const fs = require("fs")

const web = `${process.env.GATSBY_QUERY_LIMIT_LANGUAGE}-${process.env.GATSBY_STARTER_NAME}`

function copyDirectory(source, destination) {
  if (fs.existsSync(destination)) {
    fs.rmSync(destination, { recursive: true })
  }
  fs.mkdirSync(destination, { recursive: true })

  fs.readdirSync(source, { withFileTypes: true }).forEach((entry) => {
    const sourcePath = path.join(source, entry.name)
    const destinationPath = path.join(destination, entry.name)

    // eslint-disable-next-line no-unused-expressions
    entry.isDirectory()
      ? copyDirectory(sourcePath, destinationPath)
      : fs.copyFileSync(sourcePath, destinationPath)
  })
}

function deleteFiles(from) {
  fs.readdirSync(from, { withFileTypes: true }).forEach((entry) => {
    const sourcePath = path.join(from, entry.name)

    if (entry.isFile() && entry.name.indexOf("404") < 0) {
      fs.rmSync(sourcePath, { recursive: true })
    } else {
      console.log("skipping folder", sourcePath)
    }
  })
}

const moveAssets = () => {
  console.log("started onpostbuild")
  const outputDir = `${web}-assets`
  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true })
  }
  if (fs.existsSync(`./public/${outputDir}`)) {
    fs.rmSync(`./public/${outputDir}`, { recursive: true })
  }
  copyDirectory("./public", outputDir)

  copyDirectory(outputDir, `./public/${outputDir}`)

  if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true })
  }

  deleteFiles(`./public/`)

  if (fs.existsSync(`./public/${outputDir}/index.html`)) {
    fs.rename(`./public/${outputDir}/index.html`, `./public/index.html`, () => {
      console.log("moveAssets detected and moved homepage index")
    })
  }

  console.log("finished onpostbuild")
}

module.exports.moveAssets = moveAssets
