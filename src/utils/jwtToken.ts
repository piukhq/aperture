import jwtDecode from 'jwt-decode'
import {DecodedUserToken} from 'types'

export const decodeJwtToken = (token: string):DecodedUserToken => {
  if (token) {
    try {
      return jwtDecode(token)
    } catch (err)
    {
      console.log(err)
    }
  }
  return null
}

