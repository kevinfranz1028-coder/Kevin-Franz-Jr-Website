import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemas} from './schemas'

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
})
