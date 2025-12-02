const client = require('./sanityClient')

module.exports = async function() {
  if (!client) {
    return []
  }

  const query = `*[_type == "timelineYear"] | order(order asc) {
    _id,
    year,
    grade,
    order,
    summary,
    "thumbnailImage": thumbnailImage.asset->url,
    season,
    team,
    achievements,
    stats,
    "gallery": gallery[]{
      "image": image.asset->url,
      caption
    },
    story
  }`

  try {
    const timeline = await client.fetch(query)
    return timeline
  } catch (error) {
    console.warn('Could not fetch Sanity timeline:', error.message)
    return []
  }
}
