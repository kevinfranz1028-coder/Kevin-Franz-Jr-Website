import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemas} from './schemas'

// Import custom styling
import './custom-studio.css'

export default defineConfig({
  name: 'default',
  title: 'Kevin Franz Jr. - Content Manager',

  projectId: 'q1z27lr2',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool(),
    media(), // Advanced media library
  ],

  schema: {
    types: schemas,
  },

  // Custom theme/branding
  theme: {
    // You can add custom theme configuration here
  },

  // Custom studio title and logo
  studio: {
    components: {
      // You can add custom components here
    },
  },
})
