export default {
  name: 'media',
  title: '📸 Media Library',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Image Title',
      type: 'string',
      description: 'Give this image a descriptive name',
      validation: Rule => Rule.required(),
    },
    {
      name: 'image',
      title: 'Upload Image',
      type: 'image',
      description: 'Upload your photo here',
      options: {
        hotspot: true, // Enables image cropping
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Categorize this image for easy finding',
      options: {
        list: [
          {title: '🏀 Basketball Action', value: 'basketball-action'},
          {title: '📚 Academic/School', value: 'academic'},
          {title: '👤 Profile Photos', value: 'profile'},
          {title: '🏆 Awards & Recognition', value: 'awards'},
          {title: '👥 Team Photos', value: 'team'},
          {title: '📸 Photography/Arts', value: 'photography'},
          {title: '📅 Timeline Photos', value: 'timeline'},
          {title: '📰 Updates/News', value: 'updates'},
          {title: '📁 Other', value: 'other'},
        ],
      },
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for accessibility',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
      description: 'Optional caption for the image',
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
}
