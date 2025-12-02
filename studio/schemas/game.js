export default {
  name: 'game',
  title: '📅 Games & Schedule',
  type: 'document',
  fields: [
    {
      name: 'opponent',
      title: 'Opponent',
      type: 'string',
      description: 'Name of the opposing team',
      validation: Rule => Rule.required(),
    },
    {
      name: 'date',
      title: 'Game Date',
      type: 'datetime',
      description: 'When is this game?',
      validation: Rule => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where is the game being played?',
      validation: Rule => Rule.required(),
    },
    {
      name: 'homeAway',
      title: 'Home/Away',
      type: 'string',
      options: {
        list: [
          {title: '🏠 Home', value: 'home'},
          {title: '✈️ Away', value: 'away'},
        ],
        layout: 'radio',
      },
    },
    {
      name: 'result',
      title: 'Result',
      type: 'string',
      description: 'Leave blank if game hasn\'t been played yet',
      options: {
        list: [
          {title: '✅ Win', value: 'win'},
          {title: '❌ Loss', value: 'loss'},
          {title: '📅 Upcoming', value: 'upcoming'},
        ],
      },
    },
    {
      name: 'score',
      title: 'Final Score',
      type: 'object',
      description: 'Enter the final score (if game is complete)',
      fields: [
        {
          name: 'team',
          title: 'Our Score',
          type: 'number',
        },
        {
          name: 'opponent',
          title: 'Opponent Score',
          type: 'number',
        },
      ],
    },
    {
      name: 'stats',
      title: 'Kevin\'s Stats',
      type: 'object',
      description: 'Kevin\'s individual performance',
      fields: [
        {name: 'points', title: 'Points', type: 'number'},
        {name: 'rebounds', title: 'Rebounds', type: 'number'},
        {name: 'assists', title: 'Assists', type: 'number'},
        {name: 'steals', title: 'Steals', type: 'number'},
        {name: 'blocks', title: 'Blocks', type: 'number'},
      ],
    },
    {
      name: 'recap',
      title: 'Game Recap',
      type: 'text',
      description: 'Summary of the game',
      rows: 5,
    },
    {
      name: 'photos',
      title: 'Game Photos',
      type: 'array',
      description: 'Photos from this game',
      of: [{type: 'image', options: {hotspot: true}}],
    },
  ],
  preview: {
    select: {
      opponent: 'opponent',
      date: 'date',
      result: 'result',
    },
    prepare({opponent, date, result}) {
      const gameDate = date ? new Date(date).toLocaleDateString() : 'TBD'
      const emoji = result === 'win' ? '✅' : result === 'loss' ? '❌' : '📅'
      return {
        title: `vs ${opponent}`,
        subtitle: `${emoji} ${gameDate}`,
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
