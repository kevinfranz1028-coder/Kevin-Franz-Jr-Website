export default {
  name: 'timelineYear',
  title: '🏀 Basketball Timeline',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Year/Season',
      type: 'string',
      description: 'e.g., "2024-2025"',
      validation: Rule => Rule.required(),
    },
    {
      name: 'grade',
      title: 'Grade Level',
      type: 'string',
      description: 'e.g., "9th Grade - Freshman"',
      validation: Rule => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (1, 2, 3...)',
      validation: Rule => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'Brief summary of this year',
      rows: 3,
    },
    {
      name: 'thumbnailImage',
      title: '📸 Thumbnail/Featured Image',
      type: 'image',
      description: 'Main photo shown on the basketball timeline page',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'season',
      title: 'Season Type',
      type: 'string',
      options: {
        list: [
          {title: 'High School', value: 'high-school'},
          {title: 'AAU', value: 'aau'},
          {title: 'Youth League', value: 'youth'},
        ],
      },
    },
    {
      name: 'team',
      title: 'Team Name',
      type: 'string',
      description: 'e.g., "Blue Valley Southwest Freshman A"',
    },
    {
      name: 'achievements',
      title: 'Key Achievements',
      type: 'array',
      description: 'Highlights and accomplishments',
      of: [{type: 'string'}],
    },
    {
      name: 'stats',
      title: 'Season Stats',
      type: 'object',
      description: 'Overall statistics for this season',
      fields: [
        {name: 'gamesPlayed', title: 'Games Played', type: 'number'},
        {name: 'ppg', title: 'Points Per Game', type: 'number'},
        {name: 'rpg', title: 'Rebounds Per Game', type: 'number'},
        {name: 'apg', title: 'Assists Per Game', type: 'number'},
        {name: 'spg', title: 'Steals Per Game', type: 'number'},
        {name: 'bpg', title: 'Blocks Per Game', type: 'number'},
      ],
    },
    {
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'array',
      description: 'Photos from this season',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: Rule => Rule.required(),
            },
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
            },
          },
        },
      ],
    },
    {
      name: 'body',
      title: 'Body Content',
      type: 'text',
      description: 'Main text content from markdown',
      rows: 10,
    },
    {
      name: 'story',
      title: 'Full Story',
      type: 'array',
      description: 'Detailed story about this season',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
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
      title: 'year',
      subtitle: 'grade',
      media: 'thumbnailImage',
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
}
