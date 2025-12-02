import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemas} from './schemas'
import {structure} from './structure'
import scheduleImportTool from './tools'

// Import custom styling
import './custom-studio.css'

export default defineConfig({
  name: 'default',
  title: 'Kevin Franz Jr. - Content Manager',

  projectId: 'q1z27lr2',
  dataset: 'production',

  plugins: [
    deskTool({
      structure,
      // Add document actions (publish, unpublish, etc.)
      defaultDocumentNode: (S, {schemaType}) => {
        // Show preview pane for certain content types
        if (['websitePage', 'timelineYear', 'update'].includes(schemaType)) {
          return S.document().views([
            S.view.form(),
            S.view.component(() => {
              return (
                <div style={{padding: '2rem', textAlign: 'center'}}>
                  <h2>Preview</h2>
                  <p>Preview your content on the live site:</p>
                  <a
                    href="https://kevin-franz-jr-website-2.pages.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '12px 24px',
                      background: '#1B5E20',
                      color: 'white',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      marginTop: '1rem',
                    }}
                  >
                    Open Live Site →
                  </a>
                  <p style={{marginTop: '2rem', color: '#666', fontSize: '14px'}}>
                    After publishing, allow 2-3 minutes for the site to rebuild
                  </p>
                </div>
              )
            }).title('Preview'),
          ])
        }
        return S.document().views([S.view.form()])
      },
    }),
    visionTool(),
    media(), // Advanced media library
    scheduleImportTool(), // Excel/CSV import tool
  ],

  schema: {
    types: schemas,
  },

  // Document actions (what you can do with documents)
  document: {
    actions: (prev, context) => {
      // Keep all default actions (publish, unpublish, delete, etc.)
      return prev
    },
  },
})
