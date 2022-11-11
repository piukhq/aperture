export const capitaliseFirstLetter = (string: string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1) || ''
}

export const getCountWithCorrectNoun = (count:number, noun:string) => `${count} ${noun}${count === 1 || noun.charAt(noun.length - 1) === 's' ? '' : 's'}`
