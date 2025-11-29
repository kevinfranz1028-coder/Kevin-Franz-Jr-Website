// Cloudflare Pages Function for AI Site Editor
export async function onRequestPost(context) {
  const { request, env } = context;

  // Get API keys from environment
  const anthropicKey = env.ANTHROPIC_API_KEY;
  const githubToken = env.GITHUB_TOKEN;
  const githubRepo = env.GITHUB_REPO; // Format: "owner/repo"
  const githubBranch = env.GITHUB_BRANCH || 'claude/webflow-athlete-site-01HLo1N59xxVGUuATbNLk2s4';

  if (!anthropicKey || anthropicKey.trim() === '') {
    return new Response(JSON.stringify({
      success: false,
      error: 'Anthropic API key not configured',
      message: 'Please set the ANTHROPIC_API_KEY environment variable in Cloudflare Pages. Get your API key from https://console.anthropic.com/'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  // Validate API key format
  if (!anthropicKey.startsWith('sk-ant-')) {
    console.error('Invalid Anthropic API key format. Key should start with "sk-ant-"');
    return new Response(JSON.stringify({
      success: false,
      error: 'Invalid API key format',
      message: 'The ANTHROPIC_API_KEY appears to be invalid. It should start with "sk-ant-". Please check your Cloudflare environment variables.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

  if (!githubToken || !githubRepo) {
    return new Response(JSON.stringify({
      success: false,
      error: 'GitHub integration not configured. Please set GITHUB_TOKEN and GITHUB_REPO environment variables.',
      message: 'GitHub auto-commit is not set up yet. Please configure the environment variables.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { message, context: pageContext } = await request.json();

    console.log('AI Site Editor Request:', { message, pageContext });

    // Build enhanced system prompt
    const systemPrompt = buildSiteEditorPrompt(pageContext);

    // Call Claude API to understand the request and generate changes
    const claudeResponse = await callClaudeAPI(anthropicKey, message, systemPrompt);

    console.log('Claude Response:', claudeResponse);

    // Parse Claude's response to extract file changes
    const changes = parseClaudeResponse(claudeResponse);

    if (!changes || changes.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        message: claudeResponse.explanation || 'I understood your request, but no file changes are needed.',
        changesApplied: false
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Commit changes to GitHub
    const commitResult = await commitChangesToGitHub(
      githubToken,
      githubRepo,
      githubBranch,
      changes,
      message
    );

    return new Response(JSON.stringify({
      success: true,
      message: `Successfully applied your changes! ${changes.length} file(s) updated.`,
      changesApplied: true,
      details: {
        filesChanged: changes.map(c => c.path),
        commitSha: commitResult.sha,
        commitUrl: commitResult.url
      },
      deployUrl: `https://dash.cloudflare.com/` // Cloudflare dashboard
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('AI Site Editor Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      message: 'Sorry, I encountered an error processing your request.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

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

async function callClaudeAPI(apiKey, message, systemPrompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: message
        }
      ],
      system: systemPrompt
    })
  });

  if (!response.ok) {
    const error = await response.json();
    const errorMessage = error.error?.message || error.error?.type || 'Claude API request failed';
    const errorType = error.error?.type || 'unknown';
    throw new Error(`${errorMessage} (Status: ${response.status}, Type: ${errorType})`);
  }

  const data = await response.json();
  const textContent = data.content?.[0]?.text || '';

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

  return parsedContent;
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

async function githubRequest(token, method, path, body) {
  const options = {
    method: method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'User-Agent': 'Cloudflare-Pages-Function',
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`https://api.github.com${path}`, options);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub API error: ${error.message || 'Unknown error'}`);
  }

  return await response.json();
}
