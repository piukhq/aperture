export const hexToRgb = (hex: string) => {
  const hexValue = hex.replace('#', '')
  const r = parseInt(hexValue.substring(0, 2), 16)
  const g = parseInt(hexValue.substring(2, 4), 16)
  const b = parseInt(hexValue.substring(4, 6), 16)
  return {r, g, b}
}

const getRelativeLuminance = (hexColour: string) => {
  const {r, g, b} = hexToRgb(hexColour)
  const srgb = [r, g, b].map(value => value / 255)
  const [R, G, B] = srgb.map(value => value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
  )

  const L = 0.2126 * R + 0.7152 * G + 0.0722 * B

  return L
}

const getContrastRatio = (color1: string, color2: string) => {
  const l1 = getRelativeLuminance(color1)
  const l2 = getRelativeLuminance(color2)
  const lightest = Math.max(l1, l2)
  const darkest = Math.min(l1, l2)
  const contrast = (lightest + 0.05) / (darkest + 0.05)

  return Math.floor(contrast * 100) / 100
}

export const getWCAGComplianceLevels = (hex1: string, hex2: string) => {
  const ratio = getContrastRatio(hex1, hex2)

  if (ratio >= 7) {
    return <span className='text-green font-heading-7'>Pass (AAA) - {ratio}</span>
  }
  if (ratio >= 4.5) {
    return <span className='text-green font-heading-7'>Pass (AA) - {ratio}</span>
  }
  if (ratio >= 3) {
    return <span className='font-heading-7 text-yellow'>Pass (AA for large text) - {ratio}</span>
  }
  return <span className='text-red font-heading-7'>Fail - {ratio} (Should be at least 3 to Pass)</span>
}
