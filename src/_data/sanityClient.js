const {createClient} = require('@sanity/client')

// Sanity client configuration
const projectId = process.env.SANITY_PROJECT_ID || 'q1z27lr2'
const dataset = process.env.SANITY_DATASET || 'production'

const client = createClient({
  projectId: projectId,
  dataset: dataset,
  useCdn: true, // Use CDN for faster reads
  apiVersion: '2024-01-01',
})

module.exports = client
