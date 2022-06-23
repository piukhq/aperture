export const shortHandMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const determineDateSuffix = (date: number): string => {
  if ([1, 21, 31].includes(date)) {
    return 'st'
  } else if ([2, 22].includes(date)) {
    return 'nd'
  } else if ([3, 23].includes(date)) {
    return 'rd'
  }
  return 'th'
}
