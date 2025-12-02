export default {
  name: 'websitePage',
  title: '📄 Website Pages',
  type: 'document',
  fields: [
    {
      name: 'pageId',
      title: 'Page ID',
      type: 'string',
      description: 'Unique identifier (home, basketball, academics, etc.)',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: '🏠 Home Page', value: 'home'},
          {title: '🏀 Basketball Page', value: 'basketball'},
          {title: '📚 Academics Page', value: 'academics'},
          {title: '📸 Media & Photography Page', value: 'media'},
          {title: '🎯 Projects & Passion Page', value: 'projects'},
          {title: '💪 Character & Service Page', value: 'character'},
          {title: '📰 Updates Page', value: 'updates'},
          {title: '📧 Contact Page', value: 'contact'},
        ],
      },
    },
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    // Hero Section (for home page)
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      description: 'Large banner at top of page',
      fields: [
        {name: 'eyebrow', title: 'Eyebrow Text', type: 'string'},
        {name: 'heading', title: 'Main Heading', type: 'string'},
        {name: 'subheading', title: 'Subheading', type: 'text', rows: 2},
        {name: 'supportingText', title: 'Supporting Text', type: 'text', rows: 2},
        {name: 'image', title: 'Hero Image', type: 'image', options: {hotspot: true}},
        {name: 'primaryButtonText', title: 'Primary Button Text', type: 'string'},
        {name: 'primaryButtonLink', title: 'Primary Button Link', type: 'string'},
        {name: 'secondaryButtonText', title: 'Secondary Button Text', type: 'string'},
        {name: 'secondaryButtonLink', title: 'Secondary Button Link', type: 'string'},
      ],
    },
    // Glance Cards (for home page)
    {
      name: 'glanceCards',
      title: 'At a Glance Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'body', title: 'Body', type: 'text', rows: 4},
            {name: 'linkText', title: 'Link Text', type: 'string'},
            {name: 'linkUrl', title: 'Link URL', type: 'string'},
          ],
        },
      ],
    },
    // About Section
    {
      name: 'about',
      title: 'About Section',
      type: 'object',
      fields: [
        {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
        {name: 'heading', title: 'Heading', type: 'string'},
        {name: 'body', title: 'Body Text', type: 'text', rows: 8},
        {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
      ],
    },
    // Content Tiles
    {
      name: 'tiles',
      title: 'Content Tiles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'body', title: 'Body', type: 'text', rows: 3},
            {name: 'linkText', title: 'Link Text', type: 'string'},
            {name: 'linkUrl', title: 'Link URL', type: 'string'},
          ],
        },
      ],
    },
    // Player Info (for basketball page)
    {
      name: 'playerInfo',
      title: 'Player Information',
      type: 'object',
      description: 'Basketball player stats and info',
      fields: [
        {name: 'name', title: 'Name', type: 'string'},
        {name: 'height', title: 'Height', type: 'string'},
        {name: 'weight', title: 'Weight', type: 'string'},
        {name: 'position', title: 'Position', type: 'string'},
        {name: 'jersey', title: 'Jersey Number', type: 'string'},
        {name: 'hand', title: 'Dominant Hand', type: 'string'},
        {name: 'school', title: 'School', type: 'string'},
        {name: 'aauTeam', title: 'AAU Team', type: 'string'},
        {name: 'class', title: 'Graduation Class', type: 'string'},
        {name: 'image', title: 'Player Photo', type: 'image', options: {hotspot: true}},
      ],
    },
    // Highlights (for basketball page)
    {
      name: 'highlights',
      title: 'Video Highlights',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Video Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text'},
            {name: 'videoUrl', title: 'Video URL', type: 'url'},
          ],
        },
      ],
    },
    // Training Section
    {
      name: 'training',
      title: 'Training & Development',
      type: 'object',
      fields: [
        {name: 'focusAreas', title: 'Focus Areas', type: 'text', rows: 4},
        {name: 'routine', title: 'Training Routine', type: 'text', rows: 6},
        {name: 'statement', title: 'Personal Statement', type: 'text', rows: 3},
      ],
    },
    // Recruiting Profiles
    {
      name: 'recruitingProfiles',
      title: 'Recruiting Profiles',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Section Heading', type: 'string'},
        {name: 'description', title: 'Description', type: 'text'},
        {
          name: 'profiles',
          title: 'Profile Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', title: 'Platform Name', type: 'string'},
                {name: 'url', title: 'Profile URL', type: 'url'},
                {name: 'description', title: 'Description', type: 'string'},
              ],
            },
          ],
        },
      ],
    },
    // Social Media
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {name: 'heading', title: 'Section Heading', type: 'string'},
        {name: 'description', title: 'Description', type: 'text'},
        {
          name: 'links',
          title: 'Social Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'platform', title: 'Platform', type: 'string'},
                {name: 'handle', title: 'Handle', type: 'string'},
                {name: 'url', title: 'URL', type: 'url'},
              ],
            },
          ],
        },
      ],
    },
    // Generic Header (for other pages)
    {
      name: 'header',
      title: 'Page Header',
      type: 'object',
      fields: [
        {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
        {name: 'heading', title: 'Heading', type: 'string'},
        {name: 'subheading', title: 'Subheading', type: 'text'},
        {name: 'supportingText', title: 'Supporting Text', type: 'text'},
      ],
    },
    // Generic Sections (for flexible content)
    {
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description: 'Add custom sections to this page',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'sectionId', title: 'Section ID', type: 'string'},
            {name: 'heading', title: 'Section Heading', type: 'string'},
            {name: 'intro', title: 'Introduction Text', type: 'text', rows: 3},
            {
              name: 'content',
              title: 'Section Content',
              type: 'array',
              of: [{type: 'block'}],
            },
            {name: 'image', title: 'Section Image', type: 'image', options: {hotspot: true}},
          ],
          preview: {
            select: {
              title: 'heading',
              subtitle: 'sectionId',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'pageId',
    },
    prepare({title, subtitle}) {
      const icons = {
        home: '🏠',
        basketball: '🏀',
        academics: '📚',
        media: '📸',
        projects: '🎯',
        character: '💪',
        updates: '📰',
        contact: '📧',
      }
      return {
        title: `${icons[subtitle] || '📄'} ${title}`,
        subtitle: subtitle,
      }
    },
  },
}
