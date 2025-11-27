const https = require('https');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Get API keys from environment
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPO; // Format: "owner/repo"
  const githubBranch = process.env.GITHUB_BRANCH || 'claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4';

  if (!anthropicKey || anthropicKey.trim() === '') {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: 'Anthropic API key not configured',
        message: 'Please set the ANTHROPIC_API_KEY environment variable in Netlify. Get your API key from https://console.anthropic.com/'
      })
    };
  }

  // Validate API key format
  if (!anthropicKey.startsWith('sk-ant-')) {
    console.error('Invalid Anthropic API key format. Key should start with "sk-ant-"');
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: 'Invalid API key format',
        message: 'The ANTHROPIC_API_KEY appears to be invalid. It should start with "sk-ant-". Please check your Netlify environment variables.'
      })
    };
  }

  if (!githubToken || !githubRepo) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'GitHub integration not configured. Please set GITHUB_TOKEN and GITHUB_REPO environment variables.',
        message: 'GitHub auto-commit is not set up yet. Please configure the environment variables.'
      })
    };
  }

  try {
    const { message, context: pageContext } = JSON.parse(event.body);

    console.log('AI Site Editor Request:', { message, pageContext });

    // Build enhanced system prompt
    const systemPrompt = buildSiteEditorPrompt(pageContext);

    // Call Claude API to understand the request and generate changes
    const claudeResponse = await callClaudeAPI(anthropicKey, message, systemPrompt);

    console.log('Claude Response:', claudeResponse);

    // Parse Claude's response to extract file changes
    const changes = parseClaudeResponse(claudeResponse);

    if (!changes || changes.length === 0) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          success: true,
          message: claudeResponse.explanation || 'I understood your request, but no file changes are needed.',
          changesApplied: false
        })
      };
    }

    // Commit changes to GitHub
    const commitResult = await commitChangesToGitHub(
      githubToken,
      githubRepo,
      githubBranch,
      changes,
      message
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        message: `Successfully applied your changes! ${changes.length} file(s) updated.`,
        changesApplied: true,
        details: {
          filesChanged: changes.map(c => c.path),
          commitSha: commitResult.sha,
          commitUrl: commitResult.url
        },
        deployUrl: `https://app.netlify.com/sites/${process.env.NETLIFY_SITE_ID || 'your-site'}/deploys`
      })
    };

  } catch (error) {
    console.error('AI Site Editor Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        message: 'Sorry, I encountered an error processing your request.'
      })
    };
  }
};

function buildSiteEditorPrompt(pageContext) {
  return `You are an AI assistant that helps edit and update Kevin Franz Jr's student-athlete recruiting website.

CURRENT PAGE CONTEXT:
- URL: ${pageContext?.url || 'Unknown'}
- Page Type: ${pageContext?.pageType || 'Unknown'}
- Title: ${pageContext?.title || 'Unknown'}

SITE STRUCTURE:
This is an Eleventy (11ty) static site with the following structure:
- Content files: src/updates/*.md, src/games/*.md, src/timeline/*.md
- Data files: src/_data/**/*.json (player info, navigation, page content)
- Layouts: src/_layouts/*.njk (Nunjucks templates)
- Pages: src/*.njk
- Styles: src/css/*.css
- Scripts: src/js/*.js

YOUR TASK:
Understand the user's request and generate the necessary file changes to accomplish it.

RESPONSE FORMAT:
You MUST respond with a valid JSON object in this exact format:
{
  "explanation": "Brief explanation of what changes you're making and why",
  "changes": [
    {
      "path": "relative/path/to/file.ext",
      "action": "create" or "update" or "delete",
      "content": "full file content for create/update actions",
      "reason": "why this change is needed"
    }
  ]
}

IMPORTANT RULES:
1. Always provide the FULL file content for any file you're creating or updating
2. Use proper file paths relative to the repository root (e.g., "src/_data/player.json")
3. For markdown files, include proper frontmatter (---...---)
4. For JSON files, ensure valid JSON syntax
5. For layout changes, modify the appropriate .njk template files
6. For content changes, modify the appropriate .json or .md files
7. Keep changes minimal and focused on the user's request
8. If you're unsure about existing content, explain what you need and suggest the user provide more details

EXAMPLES:

Request: "Add my current GPA to the academics page"
Response:
{
  "explanation": "I'll update the academics page data to include your GPA. Please provide your actual GPA value.",
  "changes": [
    {
      "path": "src/_data/pages/academics.json",
      "action": "update",
      "content": "{ ... updated JSON with GPA field ... }",
      "reason": "Adding GPA information to academics page"
    }
  ]
}

Request: "Add a highlights section to the homepage"
Response:
{
  "explanation": "I'll add a highlights section to the homepage layout and create initial content",
  "changes": [
    {
      "path": "src/index.njk",
      "action": "update",
      "content": "... updated homepage with highlights section ...",
      "reason": "Adding highlights section to homepage"
    },
    {
      "path": "src/_data/pages/home.json",
      "action": "update",
      "content": "... updated with highlights data ...",
      "reason": "Adding highlights content"
    }
  ]
}

Now process the user's request and respond with the appropriate file changes.`;
}

function callClaudeAPI(apiKey, message, systemPrompt) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
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
            // Enhanced error reporting
            const errorMessage = response.error?.message || response.error?.type || 'Claude API request failed';
            const errorType = response.error?.type || 'unknown';
            const fullError = `${errorMessage} (Status: ${res.statusCode}, Type: ${errorType})`;

            console.error('Claude API Error:', {
              statusCode: res.statusCode,
              error: response.error,
              fullResponse: response
            });

            reject(new Error(fullError));
            return;
          }

          const textContent = response.content?.[0]?.text || '';

          // Try to parse as JSON
          let parsedContent;
          try {
            parsedContent = JSON.parse(textContent);
          } catch (e) {
            // If not JSON, wrap in explanation
            parsedContent = {
              explanation: textContent,
              changes: []
            };
          }

          resolve(parsedContent);
        } catch (error) {
          reject(new Error('Failed to parse Claude API response: ' + error.message));
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

function parseClaudeResponse(response) {
  if (!response.changes || !Array.isArray(response.changes)) {
    return [];
  }

  return response.changes.filter(change => {
    return change.path && change.action && (change.action === 'delete' || change.content);
  });
}

async function commitChangesToGitHub(token, repo, branch, changes, commitMessage) {
  const [owner, repoName] = repo.split('/');

  // Get the latest commit SHA for the branch
  const refData = await githubRequest(
    token,
    'GET',
    `/repos/${owner}/${repoName}/git/ref/heads/${branch}`
  );

  const latestCommitSha = refData.object.sha;

  // Get the tree SHA from the latest commit
  const commitData = await githubRequest(
    token,
    'GET',
    `/repos/${owner}/${repoName}/git/commits/${latestCommitSha}`
  );

  const baseTreeSha = commitData.tree.sha;

  // Create blobs for each file change
  const tree = [];
  for (const change of changes) {
    if (change.action === 'delete') {
      tree.push({
        path: change.path,
        mode: '100644',
        type: 'blob',
        sha: null
      });
    } else {
      const blob = await githubRequest(
        token,
        'POST',
        `/repos/${owner}/${repoName}/git/blobs`,
        {
          content: change.content,
          encoding: 'utf-8'
        }
      );

      tree.push({
        path: change.path,
        mode: '100644',
        type: 'blob',
        sha: blob.sha
      });
    }
  }

  // Create a new tree
  const newTree = await githubRequest(
    token,
    'POST',
    `/repos/${owner}/${repoName}/git/trees`,
    {
      base_tree: baseTreeSha,
      tree: tree
    }
  );

  // Create a new commit
  const newCommit = await githubRequest(
    token,
    'POST',
    `/repos/${owner}/${repoName}/git/commits`,
    {
      message: `AI Site Editor: ${commitMessage}`,
      tree: newTree.sha,
      parents: [latestCommitSha]
    }
  );

  // Update the branch reference
  await githubRequest(
    token,
    'PATCH',
    `/repos/${owner}/${repoName}/git/refs/heads/${branch}`,
    {
      sha: newCommit.sha,
      force: false
    }
  );

  return {
    sha: newCommit.sha,
    url: newCommit.html_url
  };
}

function githubRequest(token, method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;

    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'Netlify-Function',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = https.request(options, (res) => {
      let responseBody = '';

      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseBody);

          if (res.statusCode >= 400) {
            reject(new Error(`GitHub API error: ${parsed.message || responseBody}`));
            return;
          }

          resolve(parsed);
        } catch (error) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve({});
          } else {
            reject(new Error('Failed to parse GitHub API response: ' + error.message));
          }
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(data);
    }

    req.end();
  });
}
