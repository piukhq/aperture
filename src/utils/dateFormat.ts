const numberWithOrdinal = (n: number) => {
  const pluralRule = new Intl.PluralRules('en-GB', {type: 'ordinal'})
  const ordinals = {
    one: 'st',
    two: 'nd',
    few: 'rd',
    many: 'th',
    zero: 'th',
    other: 'th',
  }
  return `${n}${ordinals[pluralRule.select(n)]}`
}

export const timeStampToDate = (
  timestamp: number | string,
  options?: {
    isShortDate?: boolean,
    isShortMonthYear?: boolean,
  }
) => {

  const {isShortDate, isShortMonthYear} = options || {}
  const time = typeof (timestamp) === 'number' ? timestamp * 1000 : timestamp
  const date = new Date(time)

  if (isShortMonthYear) {
    const day = date.toLocaleDateString('en-GB', {day: '2-digit'})
    const month = date.toLocaleDateString('en-GB', {month: 'short'})
    const year = date.toLocaleDateString('en-GB', {year: '2-digit'})
    return `${day} ${month} ${year}`
  }

  if (isShortDate) {
    const day = date.toLocaleDateString('en-GB', {day: '2-digit'})
    const month = date.toLocaleDateString('en-GB', {month: '2-digit'})
    const year = date.toLocaleDateString('en-GB', {year: 'numeric'})
    return `${day}/${month}/${year}`
  }

  const day = numberWithOrdinal(date.getDate())
  const month = date.toLocaleString('default', {month: 'long'})
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}

export const isoToDateTime = (isoTimestamp: string, isCommentTime = false) => {
  const date = new Date(isoTimestamp)
  const isValidDate = date instanceof Date && !isNaN(Number(date))
  if (!isValidDate) {
    return isoTimestamp
  }
  const day = date.getDate()
  const month = date.toLocaleString('default', {month: isCommentTime ? 'short' : 'long'})
  const year = date.getFullYear()

  if (isCommentTime) {
    return `${month} ${day}, ${year}`
  }

  const time = date.toLocaleString('default', {hour: 'numeric', minute: 'numeric', hour12: true}).replace(/\s/g, '')
  return `${month} ${day}, ${year}, ${time}`
}
