const client = require('./sanityClient')

module.exports = async function() {
  if (!client) {
    return []
  }

  const query = `*[_type == "update"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    summary,
    "image": image.asset->url,
    body,
    tags
  }`

  try {
    const updates = await client.fetch(query)
    return updates
  } catch (error) {
    console.warn('Could not fetch Sanity updates:', error.message)
    return []
  }
}
