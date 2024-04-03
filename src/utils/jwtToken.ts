import jwtDecode from 'jwt-decode'
import {DecodedUserJWTToken, DecodedUserAuthToken} from 'types'

export const decodeJwtToken = (token: string): DecodedUserJWTToken | null => {
  if (token) {
    try {
      return jwtDecode(token)
    } catch (err) {
      console.error(err)
    }
  }
  return null
}

export const decodeAuthToken = (token: string): DecodedUserAuthToken | null => {
  if (token) {
    try {
      return jwtDecode(token)
    } catch (err) {
      console.error(err)
    }
  }
  return null
}
