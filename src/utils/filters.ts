export const isMatchingDateFilter = (entityDate: string, fromDateFilterValue: string, toDateFilterValue: string, setHasDateFilterFn: (arg0: unknown) => void) => {
  if (!fromDateFilterValue || !toDateFilterValue) {
    return true // no date filter
  }
  setHasDateFilterFn(true)
  const timeStampFromDate = new Date(fromDateFilterValue).setHours(0, 0, 0, 0)
  const timeStampToDate = new Date(toDateFilterValue).setHours(0, 0, 0, 0)

  // round down to the start of the day so that the filter is inclusive of the selected day
  const entityDateDate = new Date(entityDate).setHours(0, 0, 0, 0)
  const timeStampEntityDate = new Date(entityDateDate).getTime()
  const isEntityDateWithinRange = (timeStampEntityDate >= timeStampFromDate && timeStampEntityDate <= timeStampToDate) || (timeStampEntityDate >= timeStampToDate && timeStampEntityDate <= timeStampFromDate)

  return isEntityDateWithinRange
}
