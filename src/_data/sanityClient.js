const {createClient} = require('@sanity/client')

// Sanity client configuration
// Only create client if project ID is set
const projectId = process.env.SANITY_PROJECT_ID

let client = null

if (projectId && projectId !== 'YOUR_PROJECT_ID' && projectId !== 'your_project_id_here') {
  client = createClient({
    projectId: projectId,
    dataset: process.env.SANITY_DATASET || 'production',
    useCdn: true, // Use CDN for faster reads (set to false for fresh data)
    apiVersion: '2024-01-01', // Use current date in YYYY-MM-DD format
  })
} else {
  console.log('⚠️  Sanity not configured yet. Set SANITY_PROJECT_ID environment variable.')
}

module.exports = client
