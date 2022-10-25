import {getAccessToken, withApiAuthRequired} from '@auth0/nextjs-auth0'

export default withApiAuthRequired(async function accessToken (req, res) {
  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  try {
    const {accessToken} = await getAccessToken(req, res)

    res.statusCode = 200
    res.end(JSON.stringify(accessToken))
  }
  catch (error) {
    res.json(error)
    res.status(405).end()
  }
})
