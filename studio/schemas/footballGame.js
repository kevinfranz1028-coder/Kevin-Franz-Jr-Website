export default {
  name: 'footballGame',
  title: '🏈 Football Games',
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
      name: 'time',
      title: 'Game Time',
      type: 'string',
      description: 'Time of the game (e.g., "7:00 PM")',
    },
    {
      name: 'season',
      title: 'Season',
      type: 'string',
      description: 'Which season (e.g., "2024")',
    },
    {
      name: 'team',
      title: 'Team Level',
      type: 'string',
      description: 'Which team (e.g., "JV", "Varsity")',
      options: {
        list: [
          {title: 'Varsity', value: 'Varsity'},
          {title: 'JV', value: 'JV'},
          {title: 'Freshman', value: 'Freshman'},
        ],
      },
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
      title: 'Kevin\'s Game Stats',
      type: 'object',
      description: 'Kevin\'s individual performance',
      fields: [
        // Offensive stats
        {name: 'rushingYards', title: 'Rushing Yards', type: 'number'},
        {name: 'rushingAttempts', title: 'Rushing Attempts', type: 'number'},
        {name: 'rushingTDs', title: 'Rushing TDs', type: 'number'},
        {name: 'receptions', title: 'Receptions', type: 'number'},
        {name: 'receivingYards', title: 'Receiving Yards', type: 'number'},
        {name: 'receivingTDs', title: 'Receiving TDs', type: 'number'},
        {name: 'passingYards', title: 'Passing Yards', type: 'number'},
        {name: 'passingTDs', title: 'Passing TDs', type: 'number'},
        {name: 'passingCompletions', title: 'Completions', type: 'number'},
        {name: 'passingAttempts', title: 'Pass Attempts', type: 'number'},
        // Defensive stats
        {name: 'tackles', title: 'Tackles', type: 'number'},
        {name: 'sacks', title: 'Sacks', type: 'number'},
        {name: 'interceptions', title: 'Interceptions', type: 'number'},
        {name: 'passDeflections', title: 'Pass Deflections', type: 'number'},
        {name: 'forcedFumbles', title: 'Forced Fumbles', type: 'number'},
        {name: 'fumbleRecoveries', title: 'Fumble Recoveries', type: 'number'},
        // Special teams
        {name: 'kickReturns', title: 'Kick Returns', type: 'number'},
        {name: 'kickReturnYards', title: 'Kick Return Yards', type: 'number'},
        {name: 'puntReturns', title: 'Punt Returns', type: 'number'},
        {name: 'puntReturnYards', title: 'Punt Return Yards', type: 'number'},
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
