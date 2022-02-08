const isValidEmail = (email:string):boolean => {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
  return Boolean(email.match(re))
}

const isValidPassword = (password:string):boolean => password.length > 0

export {isValidEmail, isValidPassword}
