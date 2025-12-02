export default {
  name: 'siteSettings',
  title: '⚙️ Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The main title of the website',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Brief description of the website (for SEO)',
      rows: 3,
    },
    {
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'instagram', title: 'Instagram', type: 'url'},
        {name: 'twitter', title: 'Twitter/X', type: 'url'},
        {name: 'youtube', title: 'YouTube', type: 'url'},
        {name: 'hudl', title: 'Hudl', type: 'url'},
      ],
    },
    {
      name: 'navigation',
      title: 'Main Navigation',
      type: 'array',
      description: 'Links shown in the main navigation menu',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Link Label',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
