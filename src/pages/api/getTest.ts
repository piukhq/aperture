export default async function getTest (req, res) {
  try {
    res.statusCode = 200
    res.end(
      JSON.stringify(process.env.AUTH0_BASE_URL)
          + ' ' + JSON.stringify(process.env.AUTH0_ISSUER_BASE_URL)
          + ' ' + JSON.stringify(process.env.AUTH0_CLIENT_ID)
          + ' ' + JSON.stringify(process.env.AUTH0_AUDIENCE)
          + ' ' + JSON.stringify(process.env.AUTH0_SCOPE)
          + ' ' + JSON.stringify(process.env.AUTH0_SECRET)
          + ' ' + JSON.stringify(process.env.AUTH0_CLIENT_SECRET)
          + ' ' + JSON.stringify(process.env.SESSION_COOKIE_SECRET)
    )
  }
  catch (error) {
    res.json(error)
    res.status(405).end()
  }
}
