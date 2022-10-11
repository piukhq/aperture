export const capitaliseFirstLetter = (string: string) => {
  return string?.charAt(0).toUpperCase() + string?.slice(1) || ''
}

export const getCountWithCorrectNoun = (count:number, singularNoun:string) => `${count} ${singularNoun}${count === 1 ? '' : 's'}`
