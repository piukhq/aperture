import jwtDecode from 'jwt-decode'

type decodedPayload= {
  bundle_id: string,
  user_id: string,
  sub: number,
  iat: number,
}

export const getBundleId = (token:string): string => {
  const payload: decodedPayload = jwtDecode(token)
  return payload.bundle_id
}
