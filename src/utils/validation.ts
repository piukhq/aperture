export const isValidEmail = (email:string):boolean => {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  return Boolean(email.match(re))
}

export const isValidPassword = (password:string):boolean => password.length > 0

export const isNumberOnlyString = (value: string): RegExpMatchArray => value.match(/^[0-9]*$/)
