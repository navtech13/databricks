const calculateBgColor = (row) => {
  const colorOrder = row.depth === 0 ? row.index % 2 === 1 : row.index % 2 === 0
  const darkColor = row.depth === 0 ? "bg-[#F7F9FA]" : "bg-navy-04 bg-opacity-10"
  const lightColor = row.depth === 0 ? "bg-[#FFFCF8]" : "bg-white bg-opacity-10"
  return colorOrder ? darkColor : lightColor
}

export default calculateBgColor
