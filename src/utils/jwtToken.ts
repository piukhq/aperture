import jwtDecode from 'jwt-decode'
import {DecodedUserToken} from 'types'


export const decodeJwtToken = (token: string):DecodedUserToken => jwtDecode(token)
