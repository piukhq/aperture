import {handleAuth, handleCallback} from '@auth0/nextjs-auth0'
import {DecodedUserAuthToken} from 'types'
import {decodeAuthToken} from 'utils/jwtToken'

const afterCallback = (req, res, session) => {
  const {permissions}: DecodedUserAuthToken = decodeAuthToken(session.accessToken)

  if (permissions) {
    session.user.permissions = permissions
  }

  return session
}

export default handleAuth({
  async callback (req, res) {
    try {
      await handleCallback(req, res, {afterCallback})
    } catch (error) {
      res.status(error.status || 500).end(error.message)
    }
  },
})
