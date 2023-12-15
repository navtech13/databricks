const splitComponentsByHero = (components) => {
  const heroIndex = components.findIndex((component) => {
    if (component?.entity?.__typename?.includes("Hero")) {
      return true
    }
    if (component?.entity?.__typename?.endsWith("ParagraphFromLibrary")) {
      return component.entity?.fieldReusableParagraph?.entity?.paragraphs?.entity?.__typename?.includes(
        "Hero"
      )
    }
  })

  const componentsBeforeHero =
    heroIndex === -1 ? [] : components.slice(0, heroIndex + 1)
  const componentsAfterHero = components.slice(heroIndex + 1)

  return {
    componentsBeforeHero,
    componentsAfterHero,
  }
}

export default splitComponentsByHero
