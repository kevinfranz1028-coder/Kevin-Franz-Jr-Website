export default {
  name: 'update',
  title: '📝 Updates',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Update Title',
      type: 'string',
      description: 'The headline for this update',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Auto-generated from title - this creates the page URL',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'When this update was published',
      validation: Rule => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Brief summary (appears in preview cards)',
      rows: 3,
      validation: Rule => Rule.required().max(200),
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      description: 'Main image for this update',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'body',
      title: 'Content',
      type: 'array',
      description: 'The main content of your update',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
              {title: 'Underline', value: 'underline'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Topics or categories for this update',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString() : 'No date',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Date, Newest first',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
  ],
}
