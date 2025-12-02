const client = require('./sanityClient')

module.exports = async function() {
  if (!client) {
    return {}
  }

  const query = `*[_type == "websitePage"] {
    _id,
    pageId,
    title,
    hero,
    glanceCards,
    about,
    tiles,
    playerInfo,
    highlights,
    training,
    recruitingProfiles,
    socialMedia,
    header,
    sections
  }`

  try {
    const pages = await client.fetch(query)

    // Convert array to object keyed by pageId for easy access
    const pagesObj = {}
    pages.forEach(page => {
      if (page.pageId) {
        pagesObj[page.pageId] = page
      }
    })

    return pagesObj
  } catch (error) {
    console.warn('Could not fetch Sanity pages:', error.message)
    return {}
  }
}
