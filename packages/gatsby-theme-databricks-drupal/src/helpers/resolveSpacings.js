// Maps old tokens to the new base 8 values
const spacingMap = {
  0.4: "0.5",
  0.8: "1",
  1.2: "1.5",
  1.4: "2",
  1.5: "2",
  1.6: "2",
  2: "2.5",
  2.4: "3",
  2.5: "3",
  3: "4",
  3.2: "4",
  4: "5",
  5: "6",
  6: "8",
  8: "10",
  10: "12",
  12: "16",
  15: "20",
  20: "25",
  25: "30",
}

const resolveSpacings = (field) => {
  const spacings = field?.entity

  const mapValues = (value) => {
    return spacingMap[value] || value
  }

  return {
    topSpacing: mapValues(spacings?.fieldTopSpacing),
    bottomSpacing: mapValues(spacings?.fieldBottomSpacing),
    topSpacingTablet: mapValues(spacings?.fieldTopSpacingTablet),
    bottomSpacingTablet: mapValues(spacings?.fieldBottomSpacingTablet),
    topSpacingDesktop: mapValues(spacings?.fieldTopSpacingDesktop),
    bottomSpacingDesktop: mapValues(spacings?.fieldBottomSpacingDesktop),
  }
}

export default resolveSpacings
