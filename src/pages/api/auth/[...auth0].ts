import auth0 from 'lib/auth0'
import {DecodedUserAuthToken} from 'types'
import {decodeAuthToken} from 'utils/jwtToken'

const afterCallback = (req, res, session) => {
  const {permissions}: DecodedUserAuthToken = decodeAuthToken(session.accessToken)

  if (permissions) {
    session.user.permissions = permissions
  }

  return session
}

export default auth0.handleAuth({
  async callback (req, res) {
    try {
      await auth0.handleCallback(req, res, {afterCallback})
    } catch (error) {
      console.error(error)
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.status(error.status || 500).send(error.message)
    }
  },
})
