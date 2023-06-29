export const hexToRgb = (hex: string): string => {
  const hexValue = hex.replace('#', '')
  const r = parseInt(hexValue.substring(0, 2), 16)
  const g = parseInt(hexValue.substring(2, 4), 16)
  const b = parseInt(hexValue.substring(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

export const calculateLuminance = (hex: string): number => {
  const rgb = hexToRgb(hex)
  const [r, g, b] = rgb.split(',').map((x) => parseInt(x, 10))
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

export const getContrastRatio = (hex1: string, hex2: string): number => {
  const lum1 = calculateLuminance(hex1)
  const lum2 = calculateLuminance(hex2)
  return lum1 > lum2 ? (lum1 + 0.05) / (lum2 + 0.05) : (lum2 + 0.05) / (lum1 + 0.05)
}

export const getWCAGComplianceLevels = (hex1: string, hex2: string): string => {
  const ratio = getContrastRatio(hex1, hex2)
  console.log(ratio)
  if (ratio >= 7) {
    return `AAA - ${ratio.toFixed(2)}`
  }
  if (ratio >= 4.5) {
    return `AA - ${ratio.toFixed(2)}`
  }
  if (ratio >= 3) {
    return `AA Large - ${ratio.toFixed(2)}`
  }
  return `Fail - ${ratio.toFixed(2)}`
}
