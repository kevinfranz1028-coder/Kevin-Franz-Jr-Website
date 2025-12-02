export default {
  name: 'page',
  title: '📄 Website Pages',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'The title of this page',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'The URL path for this page',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Page Description',
      type: 'text',
      description: 'Brief description (for SEO)',
      rows: 3,
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Large image at the top of the page',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'content',
      title: 'Page Content',
      type: 'array',
      description: 'The main content of the page',
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
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'heroImage',
    },
  },
}
