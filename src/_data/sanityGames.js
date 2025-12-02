const client = require('./sanityClient')

module.exports = async function() {
  if (!client) {
    return []
  }

  const query = `*[_type == "game"] | order(date desc) {
    _id,
    opponent,
    date,
    location,
    homeAway,
    result,
    score,
    stats,
    recap,
    "photos": photos[].asset->url
  }`

  try {
    const games = await client.fetch(query)
    return games
  } catch (error) {
    console.warn('Could not fetch Sanity games:', error.message)
    return []
  }
}
