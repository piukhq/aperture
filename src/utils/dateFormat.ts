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

export const timeStampToDate = (timestamp: number | string) => {
  const time = typeof(timestamp) === 'number' ? timestamp * 1000 : timestamp
  const date = new Date(time)
  const day = numberWithOrdinal(date.getDate())
  const month = date.toLocaleString('default', {month: 'long'})
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}
