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

export const timeStampToDate = (timestamp: number | string, isShortDate = false) => {
  const time = typeof(timestamp) === 'number' ? timestamp * 1000 : timestamp
  const date = new Date(time)

  if(isShortDate) {
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear().toString()
      .slice(-2)
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
