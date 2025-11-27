const https = require('https');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get API key from environment variable
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key not configured' })
    };
  }

  try {
    const { message, contentType, context: userContext } = JSON.parse(event.body);

    // Build system prompt based on content type
    const systemPrompt = buildSystemPrompt(contentType, userContext);

    // Call Claude API
    const response = await callClaudeAPI(apiKey, message, systemPrompt);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

function buildSystemPrompt(contentType, userContext) {
  const basePrompt = `You are an AI assistant helping to create content for Kevin Franz Jr's student-athlete recruiting website.
Your role is to help generate properly formatted content based on user instructions.

Current context:
- Content Type: ${contentType || 'Unknown'}
${userContext ? `- Additional Context: ${JSON.stringify(userContext, null, 2)}` : ''}

IMPORTANT INSTRUCTIONS:
1. Generate content in valid JSON format that matches the expected schema
2. Be concise and factual - this is for a recruiting profile
3. Use proper grammar and professional tone
4. For dates, use ISO format (YYYY-MM-DD)
5. For game recaps, focus on basketball performance and stats
6. For timeline entries, highlight achievements and growth
7. Always return a JSON object with a 'content' field containing the generated data

Example response format:
{
  "content": {
    "title": "Generated Title",
    "date": "2025-01-15",
    "body": "Generated content...",
    ... other fields ...
  },
  "explanation": "Brief explanation of what was generated"
}`;

  // Add content-type specific instructions
  const typeSpecificPrompts = {
    'updates': `
You are generating a blog post/update entry. Expected fields:
- title (string): Concise title for the post
- date (string): ISO date (YYYY-MM-DD)
- type (string): One of: "Game Recap", "Tournament", "Academic Milestone", "Project Update", "Personal"
- summary (string): Brief 1-2 sentence summary
- body (string): Main content in markdown format
- featured (boolean): Whether this should be featured on homepage
- coverImage (string, optional): Path to cover image

Focus on basketball achievements, academic progress, or personal milestones.`,

    'games': `
You are generating a game/schedule entry. Expected fields:
- opponent (string): Name of opposing team
- date (string): ISO date (YYYY-MM-DD)
- location (string): Where the game is/was played
- homeAway (string): "Home" or "Away"
- time (string): Game time (e.g., "7:00 PM")
- result (string, optional): "Win" or "Loss" (if game already happened)
- points (number, optional): Kevin's points scored
- rebounds (number, optional): Kevin's rebounds
- assists (number, optional): Kevin's assists
- season (string): Season year (e.g., "2024-2025")
- team (string): Kevin's team name
- notes (string, optional): Additional game notes`,

    'timeline': `
You are generating a basketball timeline entry for a specific season/year. Expected fields:
- year (string): Year (e.g., "2024")
- grade (string): Grade level (e.g., "9th Grade", "Freshman")
- team (string): Team name
- season (string): Season description
- summary (string): Overview of the season
- highlights (array of strings): Key achievements and moments
- stats (object): Season statistics with fields like ppg, apg, rpg, etc.
- gallery (array of objects, optional): Images with src and alt fields
- body (string): Detailed narrative in markdown format

Focus on growth, achievements, and memorable moments from that season.`
  };

  return basePrompt + (typeSpecificPrompts[contentType] || '');
}

function callClaudeAPI(apiKey, message, systemPrompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      system: systemPrompt
    });

    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';

      res.on('data', (chunk) => {
        body += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(body);

          if (res.statusCode !== 200) {
            reject(new Error(response.error?.message || 'API request failed'));
            return;
          }

          // Extract the text content from Claude's response
          const textContent = response.content?.[0]?.text || '';

          // Try to parse as JSON if it looks like JSON
          let parsedContent;
          try {
            parsedContent = JSON.parse(textContent);
          } catch (e) {
            // If not JSON, return as plain text
            parsedContent = { content: textContent };
          }

          resolve({
            success: true,
            data: parsedContent,
            rawResponse: textContent
          });
        } catch (error) {
          reject(new Error('Failed to parse API response: ' + error.message));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}
