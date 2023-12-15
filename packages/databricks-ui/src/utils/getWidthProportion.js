const getWidthProportion = (width, breakpoint) => {
  // eslint-disable-next-line eqeqeq
  if (width == 0) {
    if (!breakpoint) {
      return `w-auto`
    }
    return `${breakpoint}:w-auto`
  }

  // eslint-disable-next-line eqeqeq
  if (width == 12) {
    if (!breakpoint) {
      return `w-full`
    }
    return `${breakpoint}:w-full`
  }

  if (!breakpoint) {
    return `w-${width}/12`
  }
  return `${breakpoint}:w-${width}/12`
}

export default getWidthProportion
