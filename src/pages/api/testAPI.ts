export default async function testAPI (req, res) {
  // If your Access Token is expired and you have a Refresh Token
  // `getAccessToken` will fetch you a new one using the `refresh_token` grant
  try {
    res.statusCode = 200
    res.end('WORKED')
  }
  catch (error) {
    res.json(error)
    res.status(405).end()
  }
}
