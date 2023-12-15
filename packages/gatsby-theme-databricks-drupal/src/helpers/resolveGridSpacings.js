const resolveGridSpacings = (entity) => {
  if (
    !entity.gridSpacings?.entity.spacingX &&
    !entity.gridSpacings?.entity.tabletSpacingX &&
    !entity.gridSpacings?.entity.tabletSpacingX &&
    !entity.gridSpacings?.entity.spacingY &&
    !entity.gridSpacings?.entity.tabletSpacingY &&
    !entity.gridSpacings?.entity.tabletSpacingY
  ) {
    return null
  }
  const mobileX = entity.gridSpacings?.entity.spacingX
  const tabletX = entity.gridSpacings?.entity.tabletSpacingX
  const desktopX = entity.gridSpacings?.entity.desktopSpacingX
  const mobileY = entity.gridSpacings?.entity.spacingY
  const tabletY = entity.gridSpacings?.entity.tabletSpacingY
  const desktopY = entity.gridSpacings?.entity.desktopSpacingY

  const className = `
  ${mobileX ? `gap-x-${mobileX}` : ""} ${tabletX ? `md:gap-x-${tabletX}` : ""} ${
    desktopX ? `lg:gap-x-${desktopX}` : ""
  } ${mobileY ? `gap-y-${mobileY}` : ""} ${tabletY ? `md:gap-y-${tabletY}` : ""} ${
    desktopY ? `lg:gap-y-${desktopY}` : ""
  }
  `
  return className.trim()
}

export default resolveGridSpacings
