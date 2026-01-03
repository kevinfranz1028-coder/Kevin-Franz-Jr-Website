const client = require('./sanityClient')

module.exports = async function() {
  if (!client) {
    return []
  }

  const query = `*[_type == "footballTimeline"] | order(order asc) {
    _id,
    year,
    grade,
    order,
    summary,
    body,
    "thumbnailImage": thumbnailImage.asset->url,
    season,
    team,
    position,
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
    // Add URL field for each item (matching the permalink pattern)
    return timeline.map(item => ({
      ...item,
      url: `/football-timeline/${item.year.toLowerCase().replace(/\s+/g, '-')}/`
    }))
  } catch (error) {
    console.warn('Could not fetch Sanity football timeline:', error.message)
    return []
  }
}
