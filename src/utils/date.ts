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

export const timeStampToDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  const day = numberWithOrdinal(date.getDate())
  const month = date.toLocaleString('default', {month: 'long'})
  const year = date.getFullYear()
  return `${day} ${month} ${year}`
}
