const observeElements = (elements, callback, options = {}) => {
  const domElements = elements
    .map((id) => document.getElementById(id.replace("#", "")))
    .filter((element) => element)
  const observer = new IntersectionObserver(() => {
    let current = domElements[0]
    let currentHeight = current.getBoundingClientRect().y
    domElements.forEach((element) => {
      const elementHight = element.getBoundingClientRect().y
      if (elementHight <= (options.topGap || 30) && elementHight > currentHeight) {
        current = element
        currentHeight = elementHight
      }
      if (current) {
        callback(current.id)
      }
    })
  }, options)

  domElements.forEach((element) => {
    if (element) {
      observer.observe(element)
    }
  })

  return () => {
    elements.forEach((elementId) => {
      const element = document.getElementById(elementId)
      if (element) {
        observer.unobserve(element)
      }
    })
    observer.disconnect()
  }
}

export default observeElements
